import React, { useState } from 'react';
const Tooltip = ({ children, text, side = 'right', forceVisible = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const shouldShow = text && (forceVisible || isHovered);
  const sideClasses = {  right: 'left-full ml-3', left: 'right-full mr-3'
  };

  return (
    <div 
      className="relative inline-flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {shouldShow && (
        <div className={`absolute top-1/2 -translate-y-1/2 ${sideClasses[side]} whitespace-nowrap z-50 pointer-events-none transition-all duration-200`}>
          <div className="tooltip-container relative px-5 py-2 flex items-center justify-center text-white text-xs font-semibold tracking-wide overflow-hidden">
            <div 
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat -z-10 ${
                side === 'left' ? 'scale-x-[-1]' : ''
              }`}
              style={{
                backgroundImage: "url('/bg-tool.png')",
              }}
            />
            <span style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", color: "#FFFFFF" }}>
              {text}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;