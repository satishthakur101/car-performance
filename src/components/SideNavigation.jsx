import React, { useState } from "react";
import Tooltip from "./Tooltip";

/**
 * Navigation items config for left & right arc navigation bars
 */
const LEFT_NAV_ITEMS = [
  {
    id: "speed",
    label: "Speed",
    offsetClass: "translate-x-[50px]",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "home",
    label: "Home",
    offsetClass: "translate-x-0",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    id: "price",
    label: "Price",
    offsetClass: "translate-x-[50px]",
    icon: <span className="text-lg font-bold">₹</span>,
  },
];

const RIGHT_NAV_ITEMS = [
  {
    id: "chat",
    label: "Chat",
    offsetClass: "-translate-x-[50px]",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
  },
  {
    id: "files",
    label: "Explore timeline",
    offsetClass: "translate-x-0",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    id: "security",
    label: "Security",
    offsetClass: "-translate-x-[50px]",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
  },
];

/**
 * SideNavigation Component
 * Renders curved arc navigation controls for desktop & a clean mobile drawer.
 */
const SideNavigation = ({
  onHomeClick,
  onDocumentClick,
  onSpeedClick,
  activeTab,
  setActiveTab,
  isAutoPlaying,
  onExploreTimeline,
}) => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [hasClickedHome, setHasClickedHome] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation Trigger Handlers
  const handleHomeClick = (e) => {
    if (e?.stopPropagation) e.stopPropagation();
    setHasClickedHome(true);
    if (onHomeClick) onHomeClick();
    if (setActiveTab) setActiveTab("home");
    setMobileMenuOpen(false);
  };

  const handleSpeedClick = (e) => {
    if (e?.stopPropagation) e.stopPropagation();
    if (onSpeedClick) onSpeedClick();
    if (setActiveTab) setActiveTab("speed");
    setMobileMenuOpen(false);
  };

  const handleTabClick = (tabId, e) => {
    if (e?.stopPropagation) e.stopPropagation();
    if (setActiveTab) setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  const handleExploreClick = (e) => {
    if (e?.stopPropagation) e.stopPropagation();
    if (onDocumentClick) {
      onDocumentClick();
    } else if (onExploreTimeline) {
      onExploreTimeline();
    }
    if (setActiveTab) setActiveTab("files");
    setMobileMenuOpen(false);
  };

  // Helper to resolve active state for buttons
  const isItemActive = (itemId) => {
    if (itemId === "files" && isAutoPlaying) return true;
    return activeTab === itemId || hoveredButton === itemId;
  };

  // Helper to resolve dynamic Home tooltip message
  const getHomeTooltipText = () => {
    if (hoveredButton === "home") return "Home";
    if (hoveredButton !== null) return null;
    if (!hasClickedHome && (!activeTab || activeTab === "home")) {
      return "Click for Home";
    }
    return null;
  };

  return (
    <>
      {/* ========================================== */}
      {/* 1. LEFT ARC NAVIGATION (DESKTOP)           */}
      {/* ========================================== */}
      <aside className="hidden lg:flex absolute left-[40px] top-1/2 -translate-y-1/2 z-30 select-none">
        {/* Decorative Dashed Arc Graphic */}
        <div className="absolute left-[-100px] top-1/2 -translate-y-1/2 w-[320px] h-[200px] pointer-events-none z-0">
          <img
            src="/Line2.png"
            alt="Left Arc Background Line"
            className="w-full h-full object-contain"
            style={{ filter: "drop-shadow(0 0 10px rgba(225, 6, 0, 0.3))" }}
          />
        </div>

        <div className="relative flex flex-col items-center gap-10 ml-16 z-10">
          {LEFT_NAV_ITEMS.map((item) => {
            const isActive = isItemActive(item.id);

            let clickHandler = () => handleTabClick(item.id);
            if (item.id === "speed") clickHandler = handleSpeedClick;
            if (item.id === "home") clickHandler = handleHomeClick;

            const tooltipText =
              item.id === "home" ? getHomeTooltipText() : item.label;

            return (
              <div
                key={item.id}
                className={`transform transition-transform duration-300 ${item.offsetClass}`}
                onMouseEnter={() => setHoveredButton(item.id)}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <Tooltip
                  text={tooltipText}
                  side="right"
                  forceVisible={
                    item.id === "home" &&
                    !hasClickedHome &&
                    hoveredButton === null
                  }
                >
                  <button
                    type="button"
                    onClick={clickHandler}
                    aria-label={item.label}
                    className={`left-arc-btn flex items-center justify-center cursor-pointer ${
                      isActive ? "active-btn" : ""
                    }`}
                  >
                    {item.icon}
                  </button>
                </Tooltip>
              </div>
            );
          })}
        </div>
      </aside>

      {/* ========================================== */}
      {/* 2. RIGHT ARC NAVIGATION (DESKTOP)          */}
      {/* ========================================== */}
      <aside className="hidden lg:flex absolute right-[40px] top-1/2 -translate-y-1/2 z-30 select-none">
        {/* Decorative Dashed Arc Graphic */}
        <div className="absolute right-[-100px] top-1/2 -translate-y-1/2 w-[320px] h-[200px] pointer-events-none z-0">
          <img
            src="/Line1.png"
            alt="Right Arc Background Line"
            className="w-full h-full object-contain"
            style={{ filter: "drop-shadow(0 0 10px rgba(225, 6, 0, 0.3))" }}
          />
        </div>

        <div className="relative flex flex-col items-center gap-10 mr-16 z-10">
          {RIGHT_NAV_ITEMS.map((item) => {
            const isActive = isItemActive(item.id);

            let clickHandler = () => handleTabClick(item.id);
            if (item.id === "files") clickHandler = handleExploreClick;

            const tooltipText =
              item.id === "files"
                ? isAutoPlaying
                  ? "Pause timeline"
                  : "Explore timeline"
                : item.label;

            return (
              <div
                key={item.id}
                className={`transform transition-transform duration-300 ${item.offsetClass}`}
                onMouseEnter={() => setHoveredButton(item.id)}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <Tooltip text={tooltipText} side="left">
                  <button
                    type="button"
                    onClick={clickHandler}
                    aria-label={item.label}
                    className={`right-arc-btn flex items-center justify-center cursor-pointer ${
                      isActive ? "active-btn" : ""
                    }`}
                  >
                    {item.icon}
                  </button>
                </Tooltip>
              </div>
            );
          })}
        </div>
      </aside>

      {/* ========================================== */}
      {/* 3. MOBILE NAVIGATION DRAWER                */}
      {/* ========================================== */}
      <div className="lg:hidden fixed top-[105px] right-5 z-[60]">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-11 h-11 rounded-full flex items-center justify-center bg-black/60 backdrop-blur-md border border-white/20 text-white shadow-lg hover:bg-black/80 transition-all active:scale-95 cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeWidth="2" d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeWidth="2" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-[160px] right-5 z-[55] w-[190px]">
          <div className="rounded-2xl border border-white/15 bg-[#151515]/95 backdrop-blur-xl shadow-2xl p-3 flex flex-col gap-1">
            <button
              type="button"
              onClick={handleHomeClick}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-white text-sm hover:bg-white/10 transition cursor-pointer"
            >
              <span className="w-5 flex justify-center">🏠</span>
              <span>Home</span>
            </button>

            <button
              type="button"
              onClick={handleSpeedClick}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-white text-sm hover:bg-white/10 transition cursor-pointer"
            >
              <span className="w-5 flex justify-center">⚡</span>
              <span>Speed</span>
            </button>

            <button
              type="button"
              onClick={handleExploreClick}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-white text-sm hover:bg-white/10 transition cursor-pointer"
            >
              <span className="w-5 flex justify-center">📄</span>
              <span>Explore Timeline</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SideNavigation;