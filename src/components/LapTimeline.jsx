import React from "react";

const LapTimeline = ({ allLaps, activeLapIndex, selectLap }) => {
  return (
    <div className="w-full relative z-20 flex flex-col items-center select-none overflow-hidden">
      <div className="w-full h-26 sm:h-32 md:h-40 lg:h-60 relative flex items-center justify-center pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <img
            src="/chart1.png"
            alt="Racing Track Wave"
            className="w-full h-full  opacity-80"
          />
        </div>
      </div>
    </div>
  );
};

export default LapTimeline;
