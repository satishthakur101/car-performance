import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tooltip from "./Tooltip";

const LEFT_NAV_ITEMS = [
  {
    id: "speed",
    label: "Speed",
    offsetClass: "translate-x-[50px]",
    icon: (
      <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    mobileIcon: (
      <svg className="w-3.5 h-3.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "home",
    label: "Home",
    offsetClass: "translate-x-0",
    icon: (
      <svg className="w-6 h-6 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
    mobileIcon: (
      <svg className="w-3.5 h-3.5 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    id: "price",
    label: "Price",
    offsetClass: "translate-x-[50px]",
    icon: <span className="text-lg font-bold pointer-events-none">₹</span>,
    mobileIcon: <span className="text-xs font-bold pointer-events-none">₹</span>,
  },
];

const RIGHT_NAV_ITEMS = [
  {
    id: "chat",
    label: "Chat",
    offsetClass: "-translate-x-[50px]",
    icon: (
      <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
    mobileIcon: (
      <svg className="w-3.5 h-3.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    mobileIcon: (
      <svg className="w-3.5 h-3.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
    mobileIcon: (
      <svg className="w-3.5 h-3.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

  const handleHomeClick = (e) => {
    e?.stopPropagation?.();
    setHasClickedHome(true);
    if (typeof onHomeClick === "function") onHomeClick();
    if (typeof setActiveTab === "function") setActiveTab("home");
    setMobileMenuOpen(false);
  };

  const handleSpeedClick = (e) => {
    e?.stopPropagation?.();
    if (typeof onSpeedClick === "function") onSpeedClick();
    if (typeof setActiveTab === "function") setActiveTab("speed");
    setMobileMenuOpen(false);
  };

  const handleTabClick = (tabId, e) => {
    e?.stopPropagation?.();
    if (typeof setActiveTab === "function") setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  const handleExploreClick = (e) => {
    e?.stopPropagation?.();
    if (typeof onDocumentClick === "function") {
      onDocumentClick();
    } else if (typeof onExploreTimeline === "function") {
      onExploreTimeline();
    }
    if (typeof setActiveTab === "function") setActiveTab("files");
    setMobileMenuOpen(false);
  };

  const isBtnActive = (itemId) => {
    if (itemId === "files" && isAutoPlaying) return true;
    return activeTab === itemId || hoveredButton === itemId;
  };

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
      <aside className="hidden lg:flex absolute left-[40px] top-1/2 -translate-y-1/2 z-30 select-none">
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
            const isActive = isBtnActive(item.id);

            let clickHandler = (e) => handleTabClick(item.id, e);
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
      <aside className="hidden lg:flex absolute right-[40px] top-1/2 -translate-y-1/2 z-30 select-none">
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
            const isActive = isBtnActive(item.id);

            let clickHandler = (e) => handleTabClick(item.id, e);
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
      <div className="lg:hidden fixed top-8 right-27 z-[99999]">
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg transition-all active:scale-95 cursor-pointer border"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--btn-border-top)",
            color: "var(--text-primary)",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.35)",
          }}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeWidth="2" d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg className="w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeWidth="2" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav 
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, y: -60, x: -10 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -60, x: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="lg:hidden fixed left-0 top-[190px] z-[99998] select-none pl-1 pr-1.5 py-2.5 rounded-r-2xl bg-[#121214]/90 backdrop-blur-md border-y border-r border-white/15 shadow-[0_5px_20px_rgba(0,0,0,0.8)]"
          >
            <div className="flex flex-col items-center gap-2.5">
              <button
                type="button"
                onClick={handleHomeClick}
                className={`left-arc-btn !w-8 !h-8 flex items-center justify-center cursor-pointer active:scale-95 transition-all ${
                  isBtnActive("home") 
                    ? "active-btn ring-2 ring-[#E10600]/50" 
                    : "border-white/20"
                }`}
                aria-label="Home"
              >
                <svg className="w-3.5 h-3.5 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleSpeedClick}
                className={`left-arc-btn w-8! h-8! flex items-center justify-center cursor-pointer active:scale-95 transition-transform ${
                  isBtnActive("speed") ? "active-btn" : ""
                }`}
                style={{ color: isBtnActive("speed") ? "#fff" : "var(--text-primary)" }}
                aria-label="Speed"
              >
                <svg className="w-3.5 h-3.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => handleTabClick("price", e)}
                className={`left-arc-btn !w-8 !h-8 flex items-center justify-center cursor-pointer active:scale-95 transition-transform ${
                  isBtnActive("price") ? "active-btn" : ""
                }`}
                style={{ color: isBtnActive("price") ? "#fff" : "var(--text-primary)" }}
                aria-label="Price"
              >
                <span className="text-xs font-bold pointer-events-none">₹</span>
              </button>
              <button
                type="button"
                onClick={handleExploreClick}
                className={`right-arc-btn !w-8 !h-8 flex items-center justify-center cursor-pointer active:scale-95 transition-transform ${
                  isBtnActive("files") ? "active-btn" : ""
                }`}
                aria-label="Explore Timeline"
              >
                <svg className="w-3.5 h-3.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => handleTabClick("security", e)}
                className={`right-arc-btn !w-8 !h-8 flex items-center justify-center cursor-pointer active:scale-95 transition-transform ${
                  isBtnActive("security") ? "active-btn" : ""
                }`}
                style={{ color: "var(--text-primary)" }}
                aria-label="Security"
              >
                <svg className="w-3.5 h-3.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default SideNavigation;