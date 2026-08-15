import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SideNavigation from "../components/SideNavigation";
import CarDisplay from "../components/CarDisplay";
import LapTimeline from "../components/LapTimeline";
import { useCarNavigation } from "../hooks/useCarNavigation";

const Home = () => {
  const [theme, setTheme] = useState("dark");
  const [activeTab, setActiveTab] = useState("speed");
  const [processStage, setProcessStage] = useState(0);

  const {
    activeLapIndex,
    currentCar,
    allLaps,
    isAutoPlaying,
    toggleAutoPlay,
    selectLap,
    handlePrevLap,
    handleNextLap,
  } = useCarNavigation();

  useEffect(() => {
    selectLap(0);
  }, []);

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light-theme");
      document.body.classList.add("light-theme");
    } else {
      document.documentElement.classList.remove("light-theme");
      document.body.classList.remove("light-theme");
    }
  }, [theme]);

  const handleHomeClick = () => {
    setActiveTab("home");
    selectLap(1);
  };

  const handleSpeedClick = () => {
    setActiveTab("speed");
    selectLap(0);
  };

  const handleDocumentClick = () => {
    setActiveTab("files");
    setProcessStage(0);
    selectLap(2);
  };

  const showBackground =
    activeLapIndex === 2 ? processStage > 0 : activeLapIndex !== 0;
  const showShadow = activeLapIndex === 2 ? processStage === 0 : true;

  return (
    <div
      className="min-h-screen w-full flex flex-col justify-between relative overflow-x-hidden select-none transition-colors duration-400"
      style={{
        backgroundColor: theme === "light" ? "#F4F4F6" : "var(--bg-color)",
        color: "var(--text-primary)",
        ...(showBackground
          ? {
              backgroundImage: "url('/bg1.png'), url('/bg2.png'), url('/bg3.png')",
              backgroundPosition: "center center, center center, center center",
              backgroundRepeat: "no-repeat, no-repeat, no-repeat",
            }
          : {}),
      }}
    >
      {showShadow && (
        <div
          className="absolute top-0 left-0 right-0 sm:h-[55%] h-[70%] pointer-events-none z-0 transition-opacity duration-400"
          style={{
            backgroundImage: "url('/bgshadow.png')",
            backgroundSize: "auto 100%",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
            opacity: "var(--bg-shadow-opacity, 1)",
          }}
        />
      )}

      <Header theme={theme} setTheme={setTheme} onBackClick={handlePrevLap} />

      <main className="flex-1 flex items-center justify-center relative z-10 my-auto py-2">
        <SideNavigation
          onHomeClick={handleHomeClick}
          onDocumentClick={handleDocumentClick}
          onSpeedClick={handleSpeedClick}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isAutoPlaying={isAutoPlaying}
          onExploreTimeline={toggleAutoPlay}
        />

        <div className="w-full flex items-center justify-center px-0 lg:px-12">
          <div className="relative flex items-center justify-center w-full max-w-6xl">
            <CarDisplay
              currentCar={currentCar}
              onNext={handleNextLap}
              onHomeClick={handleHomeClick}
              onStageChange={setProcessStage}
            />
          </div>
        </div>
      </main>

      <footer className="w-full z-10">
        <LapTimeline
          allLaps={allLaps}
          activeLapIndex={activeLapIndex}
          selectLap={selectLap}
        />
      </footer>
    </div>
  );
};

export default Home;