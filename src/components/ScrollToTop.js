import React, { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <style>
        {`
          @keyframes gentlePulse {
            0%, 100% {
              opacity: 0.7;
              transform: translateY(2px) scale(1);
            }
            50% {
              opacity: 1;
              transform: translateY(2px) scale(1.05);
            }
          }
        `}
      </style>
      <button
      onClick={scrollToTop}
      className={`fixed bottom-4 right-8 w-10 h-10 flex items-center justify-center bg-gray-700 border border-gray-600 rounded-full shadow-md text-gray-300 hover:bg-gray-600 transition duration-300 transform ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-label="Scroll to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"  
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="2.5"
        style={{ 
          animation: 'gentlePulse 3s ease-in-out infinite',
          transform: 'translateY(2px)'
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 9l-7-7-7 7" 
        />
      </svg>
    </button>
    </>
  );
};

export default ScrollToTop;
