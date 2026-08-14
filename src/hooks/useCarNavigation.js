import { useState, useEffect } from "react";
import carData from "../data/carData";

export const useCarNavigation = () => {
  const [activeLapIndex, setActiveLapIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveLapIndex((prevIndex) => {
          if (prevIndex >= carData.length - 1) {
            return 0; 
          }
          return prevIndex + 1;
        });
      }, 10000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const toggleAutoPlay = () => {
    setIsAutoPlaying((prev) => !prev);
  };

  const handleNextLap = () => {
    setIsAutoPlaying(false);
    setActiveLapIndex((prev) => (prev >= carData.length - 1 ? 0 : prev + 1));
  };

  const handlePrevLap = () => {
    setIsAutoPlaying(false);
    setActiveLapIndex((prev) => (prev <= 0 ? carData.length - 1 : prev - 1));
  };

  const selectLap = (index) => {
    setIsAutoPlaying(false);
    if (index >= 0 && index < carData.length) {
      setActiveLapIndex(index);
    }
  };

  return {
    activeLapIndex,
    currentCar: carData[activeLapIndex],
    allLaps: carData,
    isAutoPlaying,
    toggleAutoPlay,
    handleNextLap,
    handlePrevLap,
    selectLap,
  };
};