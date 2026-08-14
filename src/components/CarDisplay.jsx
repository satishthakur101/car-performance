import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Helper function to translate progress step tooltip classes based on percentage offset
 */
const getStepTranslateClass = (leftPercentageStr) => {
  if (leftPercentageStr === "0%") return "translate-x-0";
  if (leftPercentageStr === "100%") return "-translate-x-full";
  return "-translate-x-1/2";
};

/**
 * Subcomponent for Stage 1: Animated Process Stepper Line
 */
const ProcessStepperLine = ({ steps, currentStepIndex, carImage }) => {
  const activeStep = steps[currentStepIndex];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative z-10 w-full max-w-4xl md:min-h-[300px] flex flex-col items-center justify-center px-4 select-none"
    >
      {/* Active Step Card Overlay */}
      <div className="relative w-full md:h-[200px] flex items-end">
        {activeStep && (
          <motion.div
            key={activeStep.id || currentStepIndex}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ left: activeStep.left }}
            className={`absolute bottom-4 z-30 pointer-events-none ${getStepTranslateClass(
              activeStep.left
            )}`}
          >
            <div
              className="transform -skew-x-12 px-3 md:px-8 py-3 md:py-4 flex items-center justify-center min-w-[200px] md:min-w-[300px] sm:h-[120px] text-center rounded-sm"
              style={{
                backgroundImage: "url('/step.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="transform skew-x-12">
                <h4 className="text-white font-medium md:font-extrabold text-[13px] md:text-base tracking-wider uppercase">
                  {activeStep.title}
                </h4>
                <p className="text-gray-300 text-[9px] md:text-sm md:mt-1 font-normal">
                  {activeStep.description}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Red Dashed Process Progress Line */}
      <div className="relative w-full h-[60px] flex items-center">
        <div
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[7px] border-y border-dashed border-[#E10600] z-0 pointer-events-none"
          style={{
            filter: "drop-shadow(0 0 6px rgba(225, 6, 0, 0.85))",
          }}
        />

        {/* Completed Step Dots */}
        {steps.map((step, idx) => {
          if (idx >= currentStepIndex) return null;
          return (
            <div
              key={step.id || idx}
              style={{ left: step.left }}
              className={`absolute z-10 flex items-center justify-center pointer-events-none ${getStepTranslateClass(
                step.left
              )}`}
            >
              <div className="relative flex items-center justify-center w-7 h-7">
                <div className="absolute inset-0 rounded-full bg-[#E10600]/20 border border-[#E10600]/30 shadow-[0_0_12px_rgba(225,6,0,0.5)]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#E10600] shadow-[0_0_8px_#E10600]" />
              </div>
            </div>
          );
        })}

        {/* Active Mini Car Track Badge */}
        {activeStep && (
          <motion.div
            animate={{ left: activeStep.left }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className={`absolute z-20 w-10 h-10 md:w-11 md:h-11 rounded-full border-2 border-white overflow-hidden shadow-[0_0_20px_#E10600] bg-black flex items-center justify-center ring-4 ring-red-600/30 ${getStepTranslateClass(
              activeStep.left
            )}`}
          >
            <img
              src={carImage || "/car.png"}
              alt="Mini Car Badge"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

/**
 * Component managing the 5-Stage Document Timeline Execution
 */
const ProcessProgress = ({ steps, carImage, onHomeClick, onStageChange }) => {
  const [stage, setStage] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Notify parent component when stage updates
  useEffect(() => {
    if (onStageChange) onStageChange(stage);
  }, [stage, onStageChange]);

  // Stage 0 -> Stage 1 timer
  useEffect(() => {
    setStage(0);
    setCurrentStepIndex(0);

    const timer0 = setTimeout(() => {
      setStage(1);
    }, 2000);

    return () => clearTimeout(timer0);
  }, [steps]);

  // Stage 1 Step Interval Timer
  useEffect(() => {
    if (stage !== 1) return;

    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setStage(2);
          }, 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [stage, steps]);

  // Stage 2 -> Stage 3 timer
  useEffect(() => {
    if (stage !== 2) return;
    const timer2 = setTimeout(() => {
      setStage(3);
    }, 3000);
    return () => clearTimeout(timer2);
  }, [stage]);

  // Stage 3 -> Stage 4 (Thank You) timer
  useEffect(() => {
    if (stage !== 3) return;
    const timer3 = setTimeout(() => {
      setStage(4);
    }, 3000);
    return () => clearTimeout(timer3);
  }, [stage]);

  // Stage 0: Initial Car Spotlight
  if (stage === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative z-10 w-[200px] h-[200px] sm:w-[320px] sm:h-[320px] shrink-0 rounded-full overflow-hidden flex items-center justify-center"
      >
        <img
          src={carImage || "/car.png"}
          alt="Process Car"
          className="w-full h-full object-cover"
        />
      </motion.div>
    );
  }

  // Stage 1: Stepper Line
  if (stage === 1) {
    return (
      <ProcessStepperLine
        steps={steps}
        currentStepIndex={currentStepIndex}
        carImage={carImage}
      />
    );
  }

  // Stage 2: Car Circle Spotlight & Delivery Truck
  if (stage === 2) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="relative z-10 w-full max-w-4xl h-[280px] flex items-center justify-center gap-2 sm:gap-4 px-4"
      >
        <div className="w-[140px] h-[140px] sm:w-[220px] sm:h-[220px] rounded-full overflow-hidden shrink-0 flex items-center justify-center">
          <img
            src={carImage || "/car.png"}
            alt="Delivery Car"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative w-[200px] sm:w-[400px] h-auto shrink-0 flex items-center justify-center">
          <img
            src="/truck.png"
            alt="Delivery Truck"
            className="w-full h-auto object-contain"
          />
          <div className="absolute top-[42%] left-[44%] -translate-x-1/2 -translate-y-1/2 w-[45%] sm:w-[55%] h-auto flex items-center justify-center pointer-events-none">
            <img
              src="/trucktag.png"
              alt="Vehicle Delivery Tag"
              className="w-full h-auto object-contain filter drop-shadow-md"
            />
          </div>
        </div>
      </motion.div>
    );
  }

  // Stage 3: Centered Delivery Truck Spotlight
  if (stage === 3) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="relative z-10 w-full max-w-4xl h-[280px] flex items-center justify-center px-4"
      >
        <div className="relative w-[340px] sm:w-[500px] h-auto flex items-center justify-center">
          <img
            src="/truck.png"
            alt="Delivery Truck"
            className="w-full h-auto object-contain select-none"
          />
          <div className="absolute top-[42%] left-[44%] -translate-x-1/2 -translate-y-1/2 w-[55%] h-auto flex items-center justify-center pointer-events-none">
            <img
              src="/trucktag.png"
              alt="Vehicle Delivery Tag"
              className="w-full h-auto object-contain filter drop-shadow-md"
            />
          </div>
        </div>
      </motion.div>
    );
  }

  // Stage 4: THANK YOU Final Screen
  if (stage === 4) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-20 flex flex-col items-center justify-center text-center py-8 sm:px-0"
      >
        <h2 className="text-3xl md:text-5xl font-black italic tracking-widest text-white uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
          THANK YOU
        </h2>

        <motion.button
          type="button"
          onClick={onHomeClick}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="thank-you-home-btn mt-8 px-8 py-2.5 rounded-full bg-[#2A282D] border border-white/20 hover:bg-[#E10600] transition-all shadow-[0_0_15px_rgba(225,6,0,0.5)] cursor-pointer text-sm font-semibold tracking-wide"
          style={{ color: "#FFFFFF" }}
        >
          Home
        </motion.button>
      </motion.div>
    );
  }

  return null;
};

/**
 * Reusable Telemetry Stat List Component
 */
const TelemetryStatList = ({ stats, isRightSide = false }) => {
  const offsets = isRightSide
    ? ["-translate-x-5", "translate-x-0", "-translate-x-5"]
    : ["translate-x-5", "translate-x-0", "translate-x-5"];

  const itemVariant = {
    hidden: { opacity: 0, x: isRightSide ? 20 : -20, y: 10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.4, ease: "easeOut" },
    }),
  };

  return (
    <div
      className={`sm:w-[180px] flex flex-col justify-between h-[280px] z-20 py-2 ${
        isRightSide ? "text-left" : "text-right"
      }`}
    >
      {stats.map(
        (stat, index) =>
          stat.value && (
            <motion.div
              key={`${isRightSide ? "right" : "left"}-${index}`}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={itemVariant}
              className={`flex flex-col ${
                isRightSide ? "items-start" : "items-end"
              } transform transition-transform duration-300 ${offsets[index]}`}
            >
              <span className="text-[16px] sm:text-3xl tracking-tight text-white leading-none">
                {stat.value}
              </span>
              <span className="sm:text-[11px] text-[9px] uppercase font-medium text-gray-400">
                {stat.label}
              </span>
            </motion.div>
          )
      )}
    </div>
  );
};

/**
 * Main CarDisplay Component
 */
const CarDisplay = ({ currentCar, onNext, onHomeClick, onStageChange }) => {
  if (!currentCar) return null;

  const leftStats = [
    {
      label: "Top Speed",
      value: currentCar.stats?.speed || currentCar.stats?.topSpeed,
    },
    { label: "Power (HP)", value: currentCar.stats?.power },
    { label: "Torque", value: currentCar.stats?.torque },
  ];

  const rightStats = [
    {
      label: "0-100 KM/H",
      value: currentCar.stats?.time || currentCar.stats?.zeroToHundred,
    },
    {
      label: "Oil Change",
      value: currentCar.stats?.distance || currentCar.stats?.oilChange,
    },
    { label: "Range", value: currentCar.stats?.range },
  ];

  return (
    <div className="relative stat-number w-full max-w-5xl mx-auto flex flex-col items-center justify-center sm:min-h-[420px] select-none text-white px-0 sm:px-2">
      <div className="absolute inset-0 bg-radial gradient pointer-events-none opacity-50"></div>

      <AnimatePresence mode="wait">
        <div
          key={currentCar.id}
          className="relative w-full flex items-center justify-center gap-0 sm:gap-8"
        >
          {/* Left Telemetry Stats */}
          {currentCar.stats ? (
            <TelemetryStatList stats={leftStats} isRightSide={false} />
          ) : (
            <div className="w-[140px] sm:w-[180px]" />
          )}

          {/* Center Showcase: Process Stepper vs Car Spotlight */}
          {currentCar.processSteps ? (
            <ProcessProgress
              steps={currentCar.processSteps}
              carImage={currentCar.image}
              onHomeClick={onHomeClick}
              onStageChange={onStageChange}
            />
          ) : currentCar.image ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="relative z-10 w-[200px] h-[200px] sm:w-[320px] sm:h-[320px] shrink-0 rounded-full overflow-hidden flex items-center justify-center"
            >
              <img
                src={currentCar.image}
                alt={currentCar.type || "Visual"}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ) : null}

          {/* Right Telemetry Stats */}
          {currentCar.stats ? (
            <TelemetryStatList stats={rightStats} isRightSide={true} />
          ) : (
            <div className="w-[140px] sm:w-[180px]" />
          )}
        </div>
      </AnimatePresence>

      {/* Tooltip Card Trigger */}
      {currentCar.tooltip && (
        <motion.button
          type="button"
          onClick={onNext}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 z-30 px-6 py-2 rounded-full bg-[#232124]/90 border border-white/20 backdrop-blur-md text-center hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer"
        >
          <p className="text-xs font-semibold text-white">
            {currentCar.tooltip.title}
          </p>
          {currentCar.tooltip.description && (
            <p className="text-[10px] text-gray-400 mt-0.5">
              {currentCar.tooltip.description}
            </p>
          )}
        </motion.button>
      )}

      {/* Optional Thank You Text overlay */}
      {currentCar.type === "thankyou" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-20 text-center mt-6"
        >
          <h2 className="text-4xl font-extrabold italic tracking-wider text-white">
            THANK YOU
          </h2>
          {currentCar.subtitle && (
            <p className="text-xs text-gray-400 mt-2">{currentCar.subtitle}</p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default CarDisplay;
