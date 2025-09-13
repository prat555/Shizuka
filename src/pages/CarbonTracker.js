import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaLeaf, 
  FaRecycle, 
  FaShoppingCart, 
  FaTree, 
  FaBolt, 
  FaCar,
  FaHome,
  FaPlane,
  FaArrowUp,
  FaArrowDown,
  FaAward,
  FaExclamationTriangle
} from 'react-icons/fa';

const CarbonTracker = () => {
  const [carbonData, setCarbonData] = useState({
    totalEmissions: 0,
    monthlyEmissions: 0,
    shoppingEmissions: 0,
    savedEmissions: 0,
    ecoProductsPurchased: 0,
    carbonGoal: 1000 // kg CO2 per month
  });

  const [activities, setActivities] = useState([]);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [newActivity, setNewActivity] = useState({
    type: 'transport',
    description: '',
    amount: '',
    unit: 'km'
  });

  // Simulated data - in real app, this would come from your backend
  useEffect(() => {
    // Simulate fetching user's carbon data
    setCarbonData({
      totalEmissions: 847.5,
      monthlyEmissions: 234.2,
      shoppingEmissions: 45.8,
      savedEmissions: 123.4,
      ecoProductsPurchased: 12,
      carbonGoal: 1000
    });

    setActivities([
      { id: 1, type: 'shopping', description: 'Purchased Bamboo Toothbrush', emissions: -2.1, date: '2025-09-12', positive: true },
      { id: 2, type: 'transport', description: 'Car trip (25 km)', emissions: 5.5, date: '2025-09-11', positive: false },
      { id: 3, type: 'shopping', description: 'Bought Organic Cotton Tote Bag', emissions: -1.8, date: '2025-09-10', positive: true },
      { id: 4, type: 'energy', description: 'Used solar charger', emissions: -0.5, date: '2025-09-09', positive: true },
    ]);
  }, []);

  const activityTypes = {
    transport: { icon: FaCar, color: 'text-red-500', bgColor: 'bg-red-100' },
    energy: { icon: FaBolt, color: 'text-yellow-500', bgColor: 'bg-yellow-100' },
    shopping: { icon: FaShoppingCart, color: 'text-green-500', bgColor: 'bg-green-100' },
    home: { icon: FaHome, color: 'text-blue-500', bgColor: 'bg-blue-100' },
    travel: { icon: FaPlane, color: 'text-purple-500', bgColor: 'bg-purple-100' }
  };

  const handleAddActivity = (e) => {
    e.preventDefault();
    
    // Simple carbon calculation based on activity type
    let emissions = 0;
    const amount = parseFloat(newActivity.amount);
    
    switch (newActivity.type) {
      case 'transport':
        emissions = amount * 0.22; // kg CO2 per km (average car)
        break;
      case 'energy':
        emissions = amount * 0.5; // kg CO2 per kWh
        break;
      case 'travel':
        emissions = amount * 0.255; // kg CO2 per km (flight)
        break;
      default:
        emissions = amount * 0.1;
    }

    const activity = {
      id: Date.now(),
      type: newActivity.type,
      description: newActivity.description,
      emissions: emissions,
      date: new Date().toISOString().split('T')[0],
      positive: false
    };

    setActivities([activity, ...activities]);
    setCarbonData(prev => ({
      ...prev,
      totalEmissions: prev.totalEmissions + emissions,
      monthlyEmissions: prev.monthlyEmissions + emissions
    }));

    setNewActivity({ type: 'transport', description: '', amount: '', unit: 'km' });
    setShowAddActivity(false);
  };

  const getProgressColor = () => {
    const percentage = (carbonData.monthlyEmissions / carbonData.carbonGoal) * 100;
    if (percentage < 50) return 'bg-green-500';
    if (percentage < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getProgressPercentage = () => {
    return Math.min((carbonData.monthlyEmissions / carbonData.carbonGoal) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center mb-4"
          >
            <FaLeaf className="text-4xl text-green-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Carbon Footprint Tracker</h1>
          </motion.div>
          <p className="text-gray-600 text-lg">Monitor your environmental impact and make sustainable choices</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Emissions</p>
                <p className="text-2xl font-bold text-gray-900">{carbonData.monthlyEmissions} kg</p>
                <p className="text-sm text-gray-500">CO₂ equivalent</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <FaExclamationTriangle className="text-2xl text-red-500" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Emissions Saved</p>
                <p className="text-2xl font-bold text-green-600">{carbonData.savedEmissions} kg</p>
                <p className="text-sm text-gray-500">Through eco purchases</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FaTree className="text-2xl text-green-500" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Eco Products</p>
                <p className="text-2xl font-bold text-blue-600">{carbonData.ecoProductsPurchased}</p>
                <p className="text-sm text-gray-500">This month</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FaRecycle className="text-2xl text-blue-500" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Carbon Goal</p>
                <p className="text-2xl font-bold text-purple-600">{carbonData.carbonGoal} kg</p>
                <p className="text-sm text-gray-500">Monthly target</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <FaAward className="text-2xl text-purple-500" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Monthly Carbon Goal Progress</h3>
            <span className="text-sm font-medium text-gray-600">
              {carbonData.monthlyEmissions} / {carbonData.carbonGoal} kg CO₂
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className={`h-4 rounded-full transition-all duration-500 ${getProgressColor()}`}
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {carbonData.monthlyEmissions < carbonData.carbonGoal 
              ? `You're ${(carbonData.carbonGoal - carbonData.monthlyEmissions).toFixed(1)} kg under your goal! 🎉`
              : `You're ${(carbonData.monthlyEmissions - carbonData.carbonGoal).toFixed(1)} kg over your goal. Consider eco-friendly alternatives.`
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Recent Activities</h3>
              <button
                onClick={() => setShowAddActivity(!showAddActivity)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Add Activity
              </button>
            </div>

            {showAddActivity && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleAddActivity}
                className="mb-6 p-4 bg-gray-50 rounded-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    value={newActivity.type}
                    onChange={(e) => setNewActivity({...newActivity, type: e.target.value})}
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="transport">Transportation</option>
                    <option value="energy">Energy Usage</option>
                    <option value="travel">Air Travel</option>
                    <option value="home">Home Activities</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Description"
                    value={newActivity.description}
                    onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Amount"
                    value={newActivity.amount}
                    onChange={(e) => setNewActivity({...newActivity, amount: e.target.value})}
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddActivity(false)}
                      className="flex-1 bg-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.form>
            )}

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {activities.map((activity, index) => {
                const ActivityIcon = activityTypes[activity.type]?.icon || FaShoppingCart;
                const iconColor = activityTypes[activity.type]?.color || 'text-gray-500';
                const bgColor = activityTypes[activity.type]?.bgColor || 'bg-gray-100';
                
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center p-4 bg-gray-50 rounded-lg"
                  >
                    <div className={`p-3 ${bgColor} rounded-full mr-4`}>
                      <ActivityIcon className={`text-lg ${iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{activity.description}</p>
                      <p className="text-sm text-gray-600">{activity.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${activity.positive ? 'text-green-600' : 'text-red-600'}`}>
                        {activity.positive ? '-' : '+'}{Math.abs(activity.emissions).toFixed(1)} kg
                      </p>
                      <p className="text-xs text-gray-500">CO₂</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Tips and Insights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Eco Tips & Insights</h3>
            
            <div className="space-y-6">
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="flex items-center mb-2">
                  <FaLeaf className="text-green-500 mr-2" />
                  <h4 className="font-semibold text-green-800">Great Progress!</h4>
                </div>
                <p className="text-green-700 text-sm">
                  Your eco-friendly purchases have saved {carbonData.savedEmissions}kg of CO₂ this month. Keep it up!
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-center mb-2">
                  <FaRecycle className="text-blue-500 mr-2" />
                  <h4 className="font-semibold text-blue-800">Sustainability Tip</h4>
                </div>
                <p className="text-blue-700 text-sm">
                  Consider our bamboo products - they absorb 35% more CO₂ than traditional alternatives during growth.
                </p>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <div className="flex items-center mb-2">
                  <FaBolt className="text-yellow-500 mr-2" />
                  <h4 className="font-semibold text-yellow-800">Energy Saving</h4>
                </div>
                <p className="text-yellow-700 text-sm">
                  Switch to our solar-powered devices to reduce your energy footprint by up to 80%.
                </p>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Set weekly carbon budget</span>
                      <FaArrowDown className="text-green-500" />
                    </div>
                  </button>
                  <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">View eco product recommendations</span>
                      <FaShoppingCart className="text-blue-500" />
                    </div>
                  </button>
                  <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Share your progress</span>
                      <FaArrowUp className="text-purple-500" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CarbonTracker;