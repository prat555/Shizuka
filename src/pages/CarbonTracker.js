import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaLeaf, 
  FaRecycle, 
  FaTree, 
  FaAward,
  FaExclamationTriangle,
  FaArrowLeft
} from 'react-icons/fa';
import { auth } from '../firebase';

const CarbonTracker = () => {
  const [carbonData, setCarbonData] = useState({
    totalEmissions: 0,
    monthlyEmissions: 0,
    shoppingEmissions: 0,
    savedEmissions: 0,
    ecoProductsPurchased: 0,
    carbonGoal: 1000 // kg CO2 per month
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get userId from Firebase user
  const user = auth.currentUser;
  const userId = user ? user.uid : null;

  // Removed activity tracking UI below progress; keeping core stats only

  // Load demo data only if user is signed in
  useEffect(() => {
    try {
      if (userId) {
        setCarbonData({
          totalEmissions: 847.5,
          monthlyEmissions: 234.2,
          shoppingEmissions: 45.8,
          savedEmissions: 123.4,
          ecoProductsPurchased: 12,
          carbonGoal: 1000
        });
      } else {
        // If no user, clear data
        setCarbonData({
          totalEmissions: 0,
          monthlyEmissions: 0,
          shoppingEmissions: 0,
          savedEmissions: 0,
          ecoProductsPurchased: 0,
          carbonGoal: 1000
        });
      }
    } catch (e) {
      setError('Failed to load demo data');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Removed activities logic as UI below progress is removed

  const getProgressColor = () => {
    const percentage = (carbonData.monthlyEmissions / carbonData.carbonGoal) * 100;
    if (percentage < 50) return 'bg-green-500';
    if (percentage < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getProgressPercentage = () => {
    const goal = Number(carbonData.carbonGoal) || 0;
    if (goal <= 0) return 0;
    const pct = (Number(carbonData.monthlyEmissions) / goal) * 100;
    return Math.max(0, Math.min(pct, 100));
  };

  const formatKg = (val) => {
    const n = Number(val);
    if (Number.isNaN(n)) return '0.0';
    return n.toFixed(1);
  };

  return (
    <div className="p-4 md:p-6 bg-gray-75 min-h-screen">
      {/* Page Header */}
      <div className="max-w-6xl mx-auto mb-6 md:mb-8">
        <div className="flex items-center mb-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Carbon Footprint Tracker</h1>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <p className="text-gray-600 mb-2 md:mb-0">
            {loading ? "Loading..." : userId ? "Monitor your environmental impact and make sustainable choices" : "Track your carbon footprint and make sustainable choices"}
          </p>
          <Link 
            to="/shop" 
            className="text-green-600 hover:text-green-700 font-medium flex items-center transition-colors"
          >
            <FaArrowLeft className="mr-1" /> Continue Shopping
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">
        {/* Sign-in Gate */}
        {!userId && (
          <div className="p-8 text-center bg-white rounded-lg shadow-sm max-w-3xl">
            <div className="flex justify-center text-5xl text-gray-300 mb-4">
              <FaLeaf />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">Please sign in to view your Carbon Tracker</h3>
            <p className="text-gray-500 mb-6">You need to be logged in to track your carbon footprint</p>
            <Link 
              to="/login" 
              className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Sign In
            </Link>
          </div>
        )}

        {/* Loading / Error */}
        {userId && loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 animate-pulse">
                <div className="h-4 w-32 bg-gray-200 rounded mb-3"></div>
                <div className="h-6 w-24 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-28 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        )}
        {userId && error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl">{error}</div>
        )}

        {/* Stats Cards */}
        {userId && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Emissions</p>
                <p className="text-2xl font-bold text-gray-900">{formatKg(carbonData.monthlyEmissions)} kg</p>
                <p className="text-sm text-gray-500">CO₂ equivalent</p>
              </div>
              <div className="p-2.5 bg-red-50 border border-red-100 rounded-full">
                <FaExclamationTriangle className="text-xl text-red-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Emissions Saved</p>
                <p className="text-2xl font-bold text-green-700">{formatKg(carbonData.savedEmissions)} kg</p>
                <p className="text-sm text-gray-500">Through eco purchases</p>
              </div>
              <div className="p-2.5 bg-green-50 border border-green-100 rounded-full">
                <FaTree className="text-xl text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Eco Products</p>
                <p className="text-2xl font-bold text-green-700">{carbonData.ecoProductsPurchased}</p>
                <p className="text-sm text-gray-500">This month</p>
              </div>
              <div className="p-2.5 bg-green-50 border border-green-100 rounded-full">
                <FaRecycle className="text-xl text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Carbon Goal</p>
                <p className="text-2xl font-bold text-green-700">{formatKg(carbonData.carbonGoal)} kg</p>
                <p className="text-sm text-gray-500">Monthly target</p>
              </div>
              <div className="p-2.5 bg-green-50 border border-green-100 rounded-full">
                <FaAward className="text-xl text-green-600" />
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Progress Bar */}
        {userId && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Monthly Carbon Goal Progress</h3>
            <span className="text-sm font-medium text-gray-600">
              {formatKg(carbonData.monthlyEmissions)} / {formatKg(carbonData.carbonGoal)} kg CO₂
            </span>
          </div>
          <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div className={`absolute inset-y-0 left-0 ${getProgressColor()}`} style={{ width: `${getProgressPercentage()}%` }}></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {carbonData.monthlyEmissions < carbonData.carbonGoal 
              ? `You're ${(carbonData.carbonGoal - carbonData.monthlyEmissions).toFixed(1)} kg under your goal! 🎉`
              : `You're ${(carbonData.monthlyEmissions - carbonData.carbonGoal).toFixed(1)} kg over your goal. Consider eco-friendly alternatives.`
            }
          </p>
        </div>
        )}

        {/* Sections below progress removed as requested */}
      </div>
    </div>
  );
};

export default CarbonTracker;