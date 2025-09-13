const mongoose = require('mongoose');

// Carbon Activity Schema for individual carbon tracking activities
const carbonActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['transport', 'energy', 'shopping', 'home', 'travel', 'food', 'waste'],
    required: true
  },
  category: {
    type: String,
    required: true // e.g., 'car_petrol', 'solar_power', 'bamboo_toothbrush'
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true // quantity, distance, kWh, etc.
  },
  unit: {
    type: String,
    default: 'unit' // km, kWh, items, etc.
  },
  emissions: {
    type: Number,
    required: true // calculated CO2 emissions in kg (can be negative for savings)
  },
  date: {
    type: Date,
    default: Date.now
  },
  isEcoFriendly: {
    type: Boolean,
    default: false // true for activities that reduce carbon footprint
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: false // link to product if this is a purchase-related activity
  },
  metadata: {
    location: String,
    weather: String,
    notes: String,
    verified: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true
});

// Carbon Profile Schema for user's overall carbon footprint profile
const carbonProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  // Current month statistics
  currentMonth: {
    totalEmissions: {
      type: Number,
      default: 0
    },
    transportEmissions: {
      type: Number,
      default: 0
    },
    energyEmissions: {
      type: Number,
      default: 0
    },
    shoppingEmissions: {
      type: Number,
      default: 0
    },
    homeEmissions: {
      type: Number,
      default: 0
    },
    travelEmissions: {
      type: Number,
      default: 0
    },
    carbonSavings: {
      type: Number,
      default: 0
    },
    ecoProductsPurchased: {
      type: Number,
      default: 0
    },
    activitiesCount: {
      type: Number,
      default: 0
    }
  },
  // Goals and targets
  goals: {
    monthlyTarget: {
      type: Number,
      default: 1000 // kg CO2
    },
    annualTarget: {
      type: Number,
      default: 12000 // kg CO2
    },
    lifestyle: {
      type: String,
      enum: ['minimal', 'moderate', 'active'],
      default: 'moderate'
    }
  },
  // Historical data
  monthlyHistory: [{
    month: Number,
    year: Number,
    totalEmissions: Number,
    carbonSavings: Number,
    ecoProducts: Number,
    activities: Number,
    goalAchieved: Boolean
  }],
  // User preferences
  preferences: {
    trackTransport: {
      type: Boolean,
      default: true
    },
    trackEnergy: {
      type: Boolean,
      default: true
    },
    trackShopping: {
      type: Boolean,
      default: true
    },
    autoTrackPurchases: {
      type: Boolean,
      default: true
    },
    notifications: {
      goalReminders: {
        type: Boolean,
        default: true
      },
      weeklyReports: {
        type: Boolean,
        default: true
      },
      ecoTips: {
        type: Boolean,
        default: true
      }
    }
  },
  // Achievements and badges
  achievements: [{
    type: {
      type: String,
      enum: [
        'first_week', 'goal_achiever', 'eco_shopper', 'carbon_saver',
        'green_transport', 'energy_efficient', 'tree_planter', 'sustainability_champion'
      ]
    },
    earnedAt: {
      type: Date,
      default: Date.now
    },
    description: String
  }],
  // Statistics
  stats: {
    totalActivities: {
      type: Number,
      default: 0
    },
    totalEmissions: {
      type: Number,
      default: 0
    },
    totalSavings: {
      type: Number,
      default: 0
    },
    bestMonth: {
      month: Number,
      year: Number,
      emissions: Number
    },
    streakDays: {
      type: Number,
      default: 0
    },
    lastActivityDate: Date
  }
}, {
  timestamps: true
});

// Carbon Goal Schema for tracking user's carbon reduction goals
const carbonGoalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  targetReduction: {
    type: Number,
    required: true // percentage or absolute value
  },
  targetType: {
    type: String,
    enum: ['percentage', 'absolute'],
    default: 'percentage'
  },
  category: {
    type: String,
    enum: ['transport', 'energy', 'shopping', 'home', 'overall'],
    default: 'overall'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'failed', 'paused'],
    default: 'active'
  },
  progress: {
    type: Number,
    default: 0 // percentage completed
  },
  currentValue: {
    type: Number,
    default: 0
  },
  baselineValue: {
    type: Number,
    required: true
  },
  milestones: [{
    percentage: Number,
    achieved: Boolean,
    achievedAt: Date
  }]
}, {
  timestamps: true
});

// Middleware to update carbon profile when activities are added
carbonActivitySchema.post('save', async function(doc) {
  try {
    const CarbonProfile = mongoose.model('CarbonProfile');
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    
    await CarbonProfile.findOneAndUpdate(
      { userId: doc.userId },
      {
        $inc: {
          'currentMonth.totalEmissions': doc.emissions,
          [`currentMonth.${doc.type}Emissions`]: doc.emissions,
          'currentMonth.activitiesCount': 1,
          'stats.totalActivities': 1,
          'stats.totalEmissions': doc.emissions
        },
        $set: {
          'stats.lastActivityDate': doc.date
        }
      },
      { upsert: true, new: true }
    );

    // Update carbon savings if it's an eco-friendly activity
    if (doc.isEcoFriendly || doc.emissions < 0) {
      await CarbonProfile.findOneAndUpdate(
        { userId: doc.userId },
        {
          $inc: {
            'currentMonth.carbonSavings': Math.abs(doc.emissions),
            'stats.totalSavings': Math.abs(doc.emissions)
          }
        }
      );
    }

    // Update eco products count if it's a shopping activity
    if (doc.type === 'shopping' && doc.isEcoFriendly) {
      await CarbonProfile.findOneAndUpdate(
        { userId: doc.userId },
        {
          $inc: {
            'currentMonth.ecoProductsPurchased': 1
          }
        }
      );
    }
  } catch (error) {
    console.error('Error updating carbon profile:', error);
  }
});

// Add indexes for better query performance
carbonActivitySchema.index({ userId: 1, date: -1 });
carbonActivitySchema.index({ userId: 1, type: 1 });
carbonActivitySchema.index({ date: -1 });

carbonProfileSchema.index({ userId: 1 }, { unique: true });

carbonGoalSchema.index({ userId: 1, status: 1 });
carbonGoalSchema.index({ endDate: 1 });

// Create models
const CarbonActivity = mongoose.model('CarbonActivity', carbonActivitySchema);
const CarbonProfile = mongoose.model('CarbonProfile', carbonProfileSchema);
const CarbonGoal = mongoose.model('CarbonGoal', carbonGoalSchema);

module.exports = {
  CarbonActivity,
  CarbonProfile,
  CarbonGoal
};