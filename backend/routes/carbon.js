const express = require('express');
const router = express.Router();
const { CarbonActivity, CarbonProfile, CarbonGoal } = require('../models/Carbon');

// Carbon calculation utilities
const calculateEmissions = (type, category, amount) => {
  const emissionFactors = {
    transport: {
      car_petrol: 0.22,
      car_diesel: 0.20,
      car_electric: 0.05,
      bus: 0.10,
      train: 0.04,
      motorcycle: 0.15,
      bicycle: 0,
      walking: 0,
      flight_domestic: 0.25,
      flight_international: 0.28
    },
    energy: {
      grid_electricity: 0.5,
      solar_power: 0.05,
      wind_power: 0.02,
      natural_gas: 0.35,
      coal: 0.82
    },
    shopping: {
      bamboo_toothbrush: -2.1,
      organic_cotton_bag: -1.8,
      solar_charger: -15.2,
      reusable_water_bottle: -8.5,
      led_bulb: -12.0,
      organic_food: -0.5,
      recycled_paper: -1.2,
      hemp_clothing: -3.5,
      cork_yoga_mat: -4.2,
      plastic_toothbrush: 0.8,
      plastic_bag: 0.3,
      regular_charger: 2.1,
      disposable_bottle: 0.2,
      incandescent_bulb: 1.5,
      conventional_food: 2.5,
      regular_paper: 0.8,
      synthetic_clothing: 5.2,
      pvc_yoga_mat: 3.8
    },
    home: {
      heating_natural_gas: 0.19,
      cooling_ac: 0.5,
      water_heating: 0.3,
      appliances: 0.5,
      lighting: 0.5
    }
  };

  const factor = emissionFactors[type]?.[category] || 0;
  return factor * amount;
};

// GET /api/carbon/profile - Get user's carbon profile
router.get('/profile', async (req, res) => {
  try {
    // In a real app, you'd get userId from authentication middleware
    const userId = req.query.userId || 'default_user_id';
    
    let profile = await CarbonProfile.findOne({ userId });
    
    if (!profile) {
      // Create default profile for new user
      profile = new CarbonProfile({
        userId,
        goals: {
          monthlyTarget: 1000,
          lifestyle: 'moderate'
        }
      });
      await profile.save();
    }
    
    res.json(profile);
  } catch (error) {
    console.error('Error fetching carbon profile:', error);
    res.status(500).json({ message: 'Error fetching carbon profile', error: error.message });
  }
});

// POST /api/carbon/activity - Add new carbon activity
router.post('/activity', async (req, res) => {
  try {
    const { userId, type, category, description, amount, unit, productId } = req.body;
    
    if (!userId || !type || !category || !description || amount === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Calculate emissions
    const emissions = calculateEmissions(type, category, amount);
    const isEcoFriendly = emissions < 0;
    
    const activity = new CarbonActivity({
      userId,
      type,
      category,
      description,
      amount,
      unit: unit || 'unit',
      emissions,
      isEcoFriendly,
      productId
    });
    
    await activity.save();
    
    res.status(201).json(activity);
  } catch (error) {
    console.error('Error adding carbon activity:', error);
    res.status(500).json({ message: 'Error adding carbon activity', error: error.message });
  }
});

// GET /api/carbon/activities - Get user's carbon activities
router.get('/activities', async (req, res) => {
  try {
    const userId = req.query.userId || 'default_user_id';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const startDate = req.query.startDate ? new Date(req.query.startDate) : null;
    const endDate = req.query.endDate ? new Date(req.query.endDate) : null;
    const type = req.query.type;
    
    const query = { userId };
    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = startDate;
      if (endDate) query.date.$lte = endDate;
    }
    
    if (type) {
      query.type = type;
    }
    
    const activities = await CarbonActivity.find(query)
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('productId', 'name image');
    
    const total = await CarbonActivity.countDocuments(query);
    
    res.json({
      activities,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalActivities: total
    });
  } catch (error) {
    console.error('Error fetching carbon activities:', error);
    res.status(500).json({ message: 'Error fetching carbon activities', error: error.message });
  }
});

// GET /api/carbon/dashboard - Get dashboard data
router.get('/dashboard', async (req, res) => {
  try {
    const userId = req.query.userId || 'default_user_id';
    
    // Get current month's data
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    // Get profile
    const profile = await CarbonProfile.findOne({ userId });
    
    // Get recent activities
    const activities = await CarbonActivity.find({
      userId,
      date: { $gte: startOfMonth, $lte: endOfMonth }
    }).sort({ date: -1 }).limit(10);
    
    // Calculate monthly totals
    const monthlyTotals = await CarbonActivity.aggregate([
      {
        $match: {
          userId: userId,
          date: { $gte: startOfMonth, $lte: endOfMonth }
        }
      },
      {
        $group: {
          _id: '$type',
          totalEmissions: { $sum: '$emissions' },
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Calculate total emissions and savings
    const totalEmissions = activities.reduce((sum, activity) => sum + Math.max(0, activity.emissions), 0);
    const totalSavings = activities.reduce((sum, activity) => sum + Math.abs(Math.min(0, activity.emissions)), 0);
    const ecoProductsCount = activities.filter(a => a.isEcoFriendly && a.type === 'shopping').length;
    
    // Get weekly trend data
    const weeklyData = await CarbonActivity.aggregate([
      {
        $match: {
          userId: userId,
          date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }
      },
      {
        $group: {
          _id: { $week: '$date' },
          totalEmissions: { $sum: '$emissions' },
          activities: { $sum: 1 }
        }
      },
      {
        $sort: { '_id': 1 }
      }
    ]);
    
    const dashboardData = {
      profile: profile || { goals: { monthlyTarget: 1000 } },
      monthlyStats: {
        totalEmissions,
        savedEmissions: totalSavings,
        ecoProductsPurchased: ecoProductsCount,
        activitiesCount: activities.length,
        carbonGoal: profile?.goals?.monthlyTarget || 1000
      },
      recentActivities: activities.slice(0, 5),
      monthlyBreakdown: monthlyTotals,
      weeklyTrend: weeklyData,
      tips: [
        {
          category: 'transport',
          tip: 'Consider using public transport or cycling for short trips',
          icon: 'car',
          priority: 'medium'
        },
        {
          category: 'shopping',
          tip: 'Choose sustainable products to reduce your carbon footprint',
          icon: 'shopping-cart',
          priority: 'high'
        }
      ]
    };
    
    res.json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Error fetching dashboard data', error: error.message });
  }
});

// POST /api/carbon/goal - Create or update carbon goal
router.post('/goal', async (req, res) => {
  try {
    const { userId, title, description, targetReduction, targetType, category, endDate } = req.body;
    
    if (!userId || !title || !targetReduction || !endDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Calculate baseline value (current emissions)
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    
    const baselineData = await CarbonActivity.aggregate([
      {
        $match: {
          userId,
          date: { $gte: startOfMonth },
          ...(category !== 'overall' && { type: category })
        }
      },
      {
        $group: {
          _id: null,
          totalEmissions: { $sum: '$emissions' }
        }
      }
    ]);
    
    const baselineValue = baselineData[0]?.totalEmissions || 0;
    
    const goal = new CarbonGoal({
      userId,
      title,
      description,
      targetReduction,
      targetType: targetType || 'percentage',
      category: category || 'overall',
      endDate: new Date(endDate),
      baselineValue,
      milestones: [
        { percentage: 25, achieved: false },
        { percentage: 50, achieved: false },
        { percentage: 75, achieved: false },
        { percentage: 100, achieved: false }
      ]
    });
    
    await goal.save();
    
    res.status(201).json(goal);
  } catch (error) {
    console.error('Error creating carbon goal:', error);
    res.status(500).json({ message: 'Error creating carbon goal', error: error.message });
  }
});

// GET /api/carbon/goals - Get user's carbon goals
router.get('/goals', async (req, res) => {
  try {
    const userId = req.query.userId || 'default_user_id';
    const status = req.query.status;
    
    const query = { userId };
    if (status) {
      query.status = status;
    }
    
    const goals = await CarbonGoal.find(query).sort({ createdAt: -1 });
    
    res.json(goals);
  } catch (error) {
    console.error('Error fetching carbon goals:', error);
    res.status(500).json({ message: 'Error fetching carbon goals', error: error.message });
  }
});

// POST /api/carbon/purchase-impact - Track carbon impact of a purchase
router.post('/purchase-impact', async (req, res) => {
  try {
    const { userId, productId, productName, productCategory, quantity, isEcoFriendly } = req.body;
    
    if (!userId || !productName || !quantity) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Calculate emissions based on product category
    const emissions = calculateEmissions('shopping', productCategory, quantity);
    
    const activity = new CarbonActivity({
      userId,
      type: 'shopping',
      category: productCategory,
      description: `Purchased ${productName} (${quantity} items)`,
      amount: quantity,
      unit: 'items',
      emissions,
      isEcoFriendly: isEcoFriendly || emissions < 0,
      productId
    });
    
    await activity.save();
    
    // Calculate impact summary
    const impactSummary = {
      emissions: Math.abs(emissions),
      type: emissions < 0 ? 'positive' : 'negative',
      message: emissions < 0 
        ? `Great choice! You saved ${Math.abs(emissions).toFixed(1)} kg CO₂ with this eco-friendly purchase.`
        : `This purchase added ${emissions.toFixed(1)} kg CO₂ to your footprint. Consider eco-alternatives next time.`,
      treesEquivalent: Math.ceil(Math.abs(emissions) / 22) // Average tree absorbs 22kg CO2/year
    };
    
    res.status(201).json({
      activity,
      impact: impactSummary
    });
  } catch (error) {
    console.error('Error tracking purchase impact:', error);
    res.status(500).json({ message: 'Error tracking purchase impact', error: error.message });
  }
});

// GET /api/carbon/insights - Get carbon insights and recommendations
router.get('/insights', async (req, res) => {
  try {
    const userId = req.query.userId || 'default_user_id';
    
    // Get last 30 days of activities
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    
    const activities = await CarbonActivity.find({
      userId,
      date: { $gte: thirtyDaysAgo }
    });
    
    // Calculate category breakdown
    const categoryBreakdown = activities.reduce((acc, activity) => {
      if (!acc[activity.type]) {
        acc[activity.type] = { emissions: 0, count: 0, savings: 0 };
      }
      acc[activity.type].emissions += Math.max(0, activity.emissions);
      acc[activity.type].savings += Math.abs(Math.min(0, activity.emissions));
      acc[activity.type].count += 1;
      return acc;
    }, {});
    
    // Generate insights
    const insights = [];
    const totalEmissions = Object.values(categoryBreakdown).reduce((sum, cat) => sum + cat.emissions, 0);
    
    Object.entries(categoryBreakdown).forEach(([category, data]) => {
      const percentage = (data.emissions / totalEmissions) * 100;
      if (percentage > 30) {
        insights.push({
          type: 'high_impact',
          category,
          message: `${category} accounts for ${percentage.toFixed(1)}% of your carbon footprint`,
          recommendation: `Consider eco-friendly alternatives for ${category} activities`,
          priority: 'high'
        });
      }
    });
    
    // Check for positive trends
    const recentActivities = activities.slice(-10);
    const ecoActivities = recentActivities.filter(a => a.isEcoFriendly);
    if (ecoActivities.length >= 5) {
      insights.push({
        type: 'positive_trend',
        message: 'Great job! You\'ve made several eco-friendly choices recently',
        recommendation: 'Keep up the sustainable lifestyle!',
        priority: 'positive'
      });
    }
    
    res.json({
      categoryBreakdown,
      insights,
      totalEmissions,
      totalSavings: Object.values(categoryBreakdown).reduce((sum, cat) => sum + cat.savings, 0),
      period: '30 days'
    });
  } catch (error) {
    console.error('Error generating carbon insights:', error);
    res.status(500).json({ message: 'Error generating carbon insights', error: error.message });
  }
});

// DELETE /api/carbon/activity/:id - Delete carbon activity
router.delete('/activity/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.query.userId || 'default_user_id';
    
    const activity = await CarbonActivity.findOneAndDelete({ _id: id, userId });
    
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    
    // Update profile (reverse the emissions)
    await CarbonProfile.findOneAndUpdate(
      { userId },
      {
        $inc: {
          'currentMonth.totalEmissions': -activity.emissions,
          [`currentMonth.${activity.type}Emissions`]: -activity.emissions,
          'currentMonth.activitiesCount': -1,
          'stats.totalActivities': -1,
          'stats.totalEmissions': -activity.emissions
        }
      }
    );
    
    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error('Error deleting carbon activity:', error);
    res.status(500).json({ message: 'Error deleting carbon activity', error: error.message });
  }
});

module.exports = router;