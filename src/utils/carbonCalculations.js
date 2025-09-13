// Carbon footprint calculation utilities
// Based on real-world carbon emission factors

// Transportation emission factors (kg CO2 per km)
export const TRANSPORT_EMISSIONS = {
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
};

// Energy emission factors (kg CO2 per kWh)
export const ENERGY_EMISSIONS = {
  grid_electricity: 0.5,
  solar_power: 0.05,
  wind_power: 0.02,
  natural_gas: 0.35,
  coal: 0.82
};

// Product category emission factors (kg CO2 per item)
export const PRODUCT_EMISSIONS = {
  // Sustainable products (negative values indicate carbon savings)
  bamboo_toothbrush: -2.1,
  organic_cotton_bag: -1.8,
  solar_charger: -15.2,
  reusable_water_bottle: -8.5,
  led_bulb: -12.0,
  organic_food: -0.5,
  recycled_paper: -1.2,
  hemp_clothing: -3.5,
  cork_yoga_mat: -4.2,
  
  // Traditional products
  plastic_toothbrush: 0.8,
  plastic_bag: 0.3,
  regular_charger: 2.1,
  disposable_bottle: 0.2,
  incandescent_bulb: 1.5,
  conventional_food: 2.5,
  regular_paper: 0.8,
  synthetic_clothing: 5.2,
  pvc_yoga_mat: 3.8
};

// Home activity emission factors
export const HOME_EMISSIONS = {
  heating_natural_gas: 0.19, // per kWh
  cooling_ac: 0.5, // per kWh
  water_heating: 0.3, // per kWh
  appliances: 0.5, // per kWh
  lighting: 0.5 // per kWh
};

/**
 * Calculate carbon emissions for transportation
 * @param {string} vehicleType - Type of vehicle
 * @param {number} distance - Distance in kilometers
 * @param {number} passengers - Number of passengers (for shared transport)
 * @returns {number} Carbon emissions in kg CO2
 */
export const calculateTransportEmissions = (vehicleType, distance, passengers = 1) => {
  const emissionFactor = TRANSPORT_EMISSIONS[vehicleType] || TRANSPORT_EMISSIONS.car_petrol;
  return (emissionFactor * distance) / passengers;
};

/**
 * Calculate carbon emissions for energy usage
 * @param {string} energyType - Type of energy source
 * @param {number} usage - Energy usage in kWh
 * @returns {number} Carbon emissions in kg CO2
 */
export const calculateEnergyEmissions = (energyType, usage) => {
  const emissionFactor = ENERGY_EMISSIONS[energyType] || ENERGY_EMISSIONS.grid_electricity;
  return emissionFactor * usage;
};

/**
 * Calculate carbon impact of a product purchase
 * @param {string} productCategory - Product category
 * @param {number} quantity - Quantity purchased
 * @returns {number} Carbon impact in kg CO2 (negative for savings)
 */
export const calculateProductEmissions = (productCategory, quantity = 1) => {
  const emissionFactor = PRODUCT_EMISSIONS[productCategory] || 0;
  return emissionFactor * quantity;
};

/**
 * Calculate home activity emissions
 * @param {string} activityType - Type of home activity
 * @param {number} usage - Usage amount (typically kWh)
 * @returns {number} Carbon emissions in kg CO2
 */
export const calculateHomeEmissions = (activityType, usage) => {
  const emissionFactor = HOME_EMISSIONS[activityType] || HOME_EMISSIONS.appliances;
  return emissionFactor * usage;
};

/**
 * Calculate total monthly carbon footprint
 * @param {Array} activities - Array of user activities
 * @returns {Object} Monthly totals and breakdown
 */
export const calculateMonthlyFootprint = (activities) => {
  const totals = {
    transport: 0,
    energy: 0,
    shopping: 0,
    home: 0,
    total: 0,
    savings: 0
  };

  activities.forEach(activity => {
    const category = activity.category || 'total';
    if (totals.hasOwnProperty(category)) {
      totals[category] += activity.emissions;
    }
    
    totals.total += activity.emissions;
    
    // Track savings (negative emissions)
    if (activity.emissions < 0) {
      totals.savings += Math.abs(activity.emissions);
    }
  });

  return totals;
};

/**
 * Get carbon footprint goal based on global averages and sustainability targets
 * @param {string} lifestyle - User's lifestyle type (minimal, moderate, active)
 * @returns {number} Monthly carbon goal in kg CO2
 */
export const getCarbonGoal = (lifestyle = 'moderate') => {
  const goals = {
    minimal: 800,    // Very eco-conscious lifestyle
    moderate: 1000,  // Average sustainable lifestyle
    active: 1200     // Active but trying to be sustainable
  };
  
  return goals[lifestyle] || goals.moderate;
};

/**
 * Get eco-friendly alternatives and their carbon savings
 * @param {string} category - Product or activity category
 * @returns {Array} Array of alternatives with savings
 */
export const getEcoAlternatives = (category) => {
  const alternatives = {
    transport: [
      { name: 'Electric Vehicle', savings: 0.17, description: 'Switch from petrol car' },
      { name: 'Public Transport', savings: 0.12, description: 'Use bus or train instead' },
      { name: 'Cycling', savings: 0.22, description: 'Bike for short distances' },
      { name: 'Walking', savings: 0.22, description: 'Walk for very short trips' }
    ],
    energy: [
      { name: 'Solar Power', savings: 0.45, description: 'Install solar panels' },
      { name: 'LED Bulbs', savings: 0.3, description: 'Replace incandescent bulbs' },
      { name: 'Energy Efficient Appliances', savings: 0.2, description: 'Upgrade old appliances' }
    ],
    shopping: [
      { name: 'Bamboo Products', savings: 2.9, description: 'Choose bamboo alternatives' },
      { name: 'Organic Cotton', savings: 1.8, description: 'Buy organic cotton items' },
      { name: 'Solar Devices', savings: 15.2, description: 'Use solar-powered gadgets' },
      { name: 'Reusable Items', savings: 8.5, description: 'Replace disposables' }
    ]
  };
  
  return alternatives[category] || [];
};

/**
 * Format carbon value for display
 * @param {number} value - Carbon value in kg
 * @param {boolean} showUnit - Whether to show unit
 * @returns {string} Formatted carbon value
 */
export const formatCarbonValue = (value, showUnit = true) => {
  const absValue = Math.abs(value);
  let formatted;
  
  if (absValue >= 1000) {
    formatted = (absValue / 1000).toFixed(1) + (showUnit ? ' tonnes' : '');
  } else {
    formatted = absValue.toFixed(1) + (showUnit ? ' kg' : '');
  }
  
  return value < 0 ? `-${formatted}` : formatted;
};

/**
 * Get carbon impact level and color
 * @param {number} emissions - Emissions value
 * @returns {Object} Impact level and color class
 */
export const getCarbonImpactLevel = (emissions) => {
  const absValue = Math.abs(emissions);
  
  if (emissions < 0) {
    return { level: 'Positive Impact', color: 'text-green-600', bgColor: 'bg-green-100' };
  } else if (absValue < 1) {
    return { level: 'Low Impact', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
  } else if (absValue < 5) {
    return { level: 'Medium Impact', color: 'text-orange-600', bgColor: 'bg-orange-100' };
  } else {
    return { level: 'High Impact', color: 'text-red-600', bgColor: 'bg-red-100' };
  }
};

/**
 * Calculate equivalent trees needed to offset carbon emissions
 * @param {number} emissions - Carbon emissions in kg CO2
 * @returns {number} Number of trees needed (average tree absorbs 22kg CO2/year)
 */
export const calculateTreesNeeded = (emissions) => {
  const CO2_PER_TREE_PER_YEAR = 22; // kg CO2
  return Math.ceil(emissions / CO2_PER_TREE_PER_YEAR);
};

/**
 * Get personalized carbon tips based on user's emission patterns
 * @param {Object} userProfile - User's carbon profile
 * @returns {Array} Array of personalized tips
 */
export const getPersonalizedTips = (userProfile) => {
  const tips = [];
  
  if (userProfile.transport > userProfile.total * 0.4) {
    tips.push({
      category: 'transport',
      tip: 'Your transport emissions are high. Consider carpooling, public transport, or cycling.',
      icon: 'car',
      priority: 'high'
    });
  }
  
  if (userProfile.energy > userProfile.total * 0.3) {
    tips.push({
      category: 'energy',
      tip: 'Switch to renewable energy sources or invest in energy-efficient appliances.',
      icon: 'bolt',
      priority: 'medium'
    });
  }
  
  if (userProfile.savings < 50) {
    tips.push({
      category: 'shopping',
      tip: 'Choose more eco-friendly products to increase your carbon savings.',
      icon: 'shopping-cart',
      priority: 'medium'
    });
  }
  
  return tips;
};

export default {
  calculateTransportEmissions,
  calculateEnergyEmissions,
  calculateProductEmissions,
  calculateHomeEmissions,
  calculateMonthlyFootprint,
  getCarbonGoal,
  getEcoAlternatives,
  formatCarbonValue,
  getCarbonImpactLevel,
  calculateTreesNeeded,
  getPersonalizedTips
};