import React, { useState } from 'react';
import { FaLeaf, FaExclamationTriangle, FaTree } from 'react-icons/fa';

const CarbonIndicator = ({ 
  productName, 
  carbonSavings = 0, 
  carbonEmissions = 0, 
  isEcoFriendly = false, 
  size = 'sm',
  showLabel = true 
}) => {
  // Calculate net carbon impact
  const netImpact = carbonSavings - carbonEmissions;
  
  // Determine display style based on impact
  const getImpactStyle = () => {
    if (netImpact > 0) {
      return {
        bgColor: 'bg-green-100',
        textColor: 'text-green-700',
        borderColor: 'border-green-200',
        icon: FaLeaf,
        iconColor: 'text-green-600'
      };
    } else if (netImpact < 0) {
      return {
        bgColor: 'bg-red-100',
        textColor: 'text-red-700',
        borderColor: 'border-red-200',
        icon: FaExclamationTriangle,
        iconColor: 'text-red-600'
      };
    } else {
      return {
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-700',
        borderColor: 'border-gray-200',
        icon: FaTree,
        iconColor: 'text-gray-600'
      };
    }
  };

  // Get carbon data based on product name (simplified for demo)
  const getCarbonData = () => {
    const name = productName.toLowerCase();
    
    // Eco-friendly products with carbon savings
    if (name.includes('bamboo')) {
      return { savings: 2.1, emissions: 0.3, isEco: true };
    }
    if (name.includes('organic') || name.includes('cotton')) {
      return { savings: 1.8, emissions: 0.4, isEco: true };
    }
    if (name.includes('solar')) {
      return { savings: 15.2, emissions: 2.1, isEco: true };
    }
    if (name.includes('hemp')) {
      return { savings: 3.5, emissions: 0.8, isEco: true };
    }
    if (name.includes('cork')) {
      return { savings: 4.2, emissions: 0.9, isEco: true };
    }
    if (name.includes('recycled')) {
      return { savings: 1.2, emissions: 0.2, isEco: true };
    }
    if (name.includes('reusable') || name.includes('water bottle')) {
      return { savings: 8.5, emissions: 1.2, isEco: true };
    }
    if (name.includes('led')) {
      return { savings: 12.0, emissions: 1.5, isEco: true };
    }
    
    // Regular products with minimal or no savings
    if (name.includes('plastic')) {
      return { savings: 0, emissions: 2.8, isEco: false };
    }
    if (name.includes('synthetic')) {
      return { savings: 0, emissions: 5.2, isEco: false };
    }
    
    // Default for eco-friendly looking products
    if (name.includes('eco') || name.includes('green') || name.includes('sustainable')) {
      return { savings: 2.0, emissions: 0.5, isEco: true };
    }
    
    // Default neutral product
    return { savings: 0.5, emissions: 1.0, isEco: false };
  };

  // Use provided data or calculate from product name
  const carbonData = getCarbonData();
  const actualSavings = carbonSavings || carbonData.savings;
  const actualEmissions = carbonEmissions || carbonData.emissions;
  const actualIsEco = isEcoFriendly || carbonData.isEco;
  const actualNetImpact = actualSavings - actualEmissions;
  
  const style = getImpactStyle();
  const IconComponent = style.icon;

  // Size configurations
  const sizeConfig = {
    xs: {
      container: 'px-1 py-0.5 text-xs',
      icon: 'text-xs',
      text: 'text-xs'
    },
    sm: {
      container: 'px-2 py-1 text-xs',
      icon: 'text-sm',
      text: 'text-xs'
    },
    md: {
      container: 'px-3 py-1.5 text-sm',
      icon: 'text-base',
      text: 'text-sm'
    },
    lg: {
      container: 'px-4 py-2 text-base',
      icon: 'text-lg',
      text: 'text-base'
    }
  };

  const currentSize = sizeConfig[size] || sizeConfig.sm;

  // Don't render if no significant impact
  if (Math.abs(actualNetImpact) < 0.1) {
    return null;
  }

  return (
    <div className={`inline-flex items-center rounded-full border ${style.bgColor} ${style.borderColor} ${currentSize.container} font-medium ${style.textColor}`}>
      <IconComponent className={`mr-1 ${style.iconColor} ${currentSize.icon}`} />
      <span className={currentSize.text}>
        {actualNetImpact > 0 ? (
          <>
            {showLabel && <span className="mr-1">Saves</span>}
            <span className="font-bold">{actualNetImpact.toFixed(1)}kg</span>
            <span className="ml-1">CO₂</span>
          </>
        ) : (
          <>
            {showLabel && <span className="mr-1">+</span>}
            <span className="font-bold">{Math.abs(actualNetImpact).toFixed(1)}kg</span>
            <span className="ml-1">CO₂</span>
          </>
        )}
      </span>
    </div>
  );
};

// Badge variant for smaller spaces
export const CarbonBadge = ({ productName, size = 'xs', ...props }) => {
  return (
    <CarbonIndicator 
      productName={productName}
      size={size}
      showLabel={false}
      {...props}
    />
  );
};

// Detailed variant with tooltip
export const CarbonIndicatorDetailed = ({ productName, ...props }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const carbonData = productName ? (() => {
    const name = productName.toLowerCase();
    if (name.includes('bamboo')) return { savings: 2.1, emissions: 0.3, material: 'Bamboo', benefit: 'Fast-growing, carbon-absorbing material' };
    if (name.includes('solar')) return { savings: 15.2, emissions: 2.1, material: 'Solar Technology', benefit: 'Renewable energy reduces grid dependency' };
    if (name.includes('organic')) return { savings: 1.8, emissions: 0.4, material: 'Organic Materials', benefit: 'No synthetic pesticides or fertilizers' };
    return { savings: 1.0, emissions: 0.5, material: 'Eco-friendly', benefit: 'Sustainable production methods' };
  })() : { savings: 0, emissions: 0 };

  const netImpact = carbonData.savings - carbonData.emissions;
  const isPositive = netImpact > 0;
  const isNegative = netImpact < 0;
  const ThemedIcon = isPositive ? FaLeaf : isNegative ? FaExclamationTriangle : FaTree;
  const titleColor = isPositive ? 'text-green-300' : isNegative ? 'text-red-300' : 'text-gray-300';
  const borderColor = isPositive ? 'border-green-600' : isNegative ? 'border-red-600' : 'border-gray-600';

  return (
    <div
      className="relative inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 rounded-full cursor-help"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      tabIndex={0}
      aria-label="Carbon impact details"
    >
      <CarbonIndicator productName={productName} size="sm" {...props} />

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
          <div className={`transform transition duration-150 ease-out origin-bottom opacity-100 scale-100`}>
            <div className={`bg-gray-900 text-white text-xs rounded-xl px-3.5 py-3 w-64 shadow-xl border ${borderColor}`}>
              <div className="flex items-center mb-2">
                <ThemedIcon className={`${titleColor} mr-2`} />
                <span className={`font-semibold ${titleColor}`}>Environmental impact</span>
              </div>
              <div className="text-gray-300 mb-2">
                <div className="font-medium text-gray-100">{carbonData.material}</div>
                <div className="text-gray-300">{carbonData.benefit}</div>
              </div>
              <div className="border-t border-gray-700 pt-2 space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-300">Carbon saved:</span>
                  <span className="text-green-400 font-semibold">{carbonData.savings.toFixed(1)} kg CO₂</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Production cost:</span>
                  <span className="text-orange-400 font-semibold">{carbonData.emissions.toFixed(1)} kg CO₂</span>
                </div>
                <div className="flex justify-between font-bold border-t border-gray-700 pt-2 mt-1">
                  <span>Net impact:</span>
                  <span className={isPositive ? 'text-green-400' : isNegative ? 'text-red-400' : 'text-gray-200'}>
                    {isPositive ? '-' : isNegative ? '+' : ''}{Math.abs(netImpact).toFixed(1)} kg CO₂
                  </span>
                </div>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarbonIndicator;