import React from "react";

const HeaderActionButton = ({ onClick, title, children, active = false }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    aria-label={title}
    className="w-10 h-10 rounded-full border flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
    style={{
      backgroundColor: "var(--bg-light)",
      borderColor: "var(--border-color-15)",
      color: active ? "#FFFFFF" : "var(--text-primary)",
    }}
  >
    {children}
  </button>
);

/**
 * Header Theme Toggle Control (Sun / Moon Switch)
 */
const ThemeToggleSwitch = ({ theme, setTheme }) => {
  return (
    <div
      className="flex items-center backdrop-blur-md p-1 rounded-full border select-none"
      style={{
        backgroundColor: "var(--bg-light)",
        borderColor: "var(--border-color-15)",
      }}
    >
      {/* Light Mode Switch */}
      <button
        type="button"
        onClick={() => setTheme("light")}
        title="Light Mode"
        aria-label="Light Mode"
        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
          theme === "light" ? "shadow-md scale-105" : ""
        }`}
        style={{
          backgroundColor: theme === "light" ? "#E10600" : "transparent",
          color: theme === "light" ? "#FFFFFF" : "var(--text-secondary-50)",
        }}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
          />
        </svg>
      </button>

      {/* Dark Mode Switch */}
      <button
        type="button"
        onClick={() => setTheme("dark")}
        title="Dark Mode"
        aria-label="Dark Mode"
        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
          theme === "dark" ? "shadow-md scale-105" : ""
        }`}
        style={{
          backgroundColor: theme === "dark" ? "#E10600" : "transparent",
          color: theme === "dark" ? "#FFFFFF" : "var(--text-secondary-50)",
        }}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </button>
    </div>
  );
};

/**
 * Header Component
 * Top branding bar, theme controls, back navigation, & showcase hero title.
 */
const Header = ({ theme, setTheme, onBackClick }) => {
  return (
    <header className="w-full px-[27px] pt-3 z-10 relative select-none">
      {/* Top Utility Bar */}
      <div className="w-full h-[78px] flex items-center justify-between">
        {/* Brand Logo */}
        <div className="text-xl sm:text-2xl font-black italic tracking-wider flex items-center gap-1">
          <img
            src="./logo.png"
            alt="NextCar Logo"
            className="h-auto max-h-10 object-contain drop-shadow-sm"
          />
        </div>

        {/* Theme Toggle Pill */}
        <div className="flex items-center gap-3">
          <ThemeToggleSwitch theme={theme} setTheme={setTheme} />
        </div>
      </div>

      {/* Action Sub-Bar */}
      <div className="flex items-center justify-between sm:mt-4 mt-0">
        {/* Back / Previous Lap Button */}
        <HeaderActionButton onClick={onBackClick} title="Previous Lap">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </HeaderActionButton>

        {/* Quick Action Icons */}
        <div className="flex items-center gap-3">
          {/* Download Action */}
          <HeaderActionButton title="Download Report">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </HeaderActionButton>

          {/* Share Action */}
          <HeaderActionButton title="Share Showcase">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 100-5.658 3 3 0 000 5.658zm0 11.658a3 3 0 100-5.658 3 3 0 000 5.658z"
              />
            </svg>
          </HeaderActionButton>

          {/* Red Confirm Badge */}
          <button
            type="button"
            title="Confirmed"
            className="w-10 h-10 rounded-full bg-[#E10600] flex items-center justify-center text-white shadow-[0_0_12px_rgba(225,6,0,0.6)] cursor-pointer active:scale-95 transition-transform"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Showcase Hero Title */}
      <div className="text-center mt-4">
        <h1
          className="font-['Shrikhand'] text-[32px] sm:text-[40px] leading-[39px] italic uppercase tracking-[1%]"
          style={{ color: "var(--text-primary)" }}
        >
          ENGINEERED FOR <span className="text-[#E10600]">PASSION</span>
        </h1>
        <div className="flex flex-col items-center">
          <p className="text-[16px] font-sf-pro font-medium text-gray-300 leading-[39px] tracking-[1%]">
            Precision. Power. Performance.
          </p>
          <span className="block w-[50px] h-[4px] rounded-full bg-[#BF0405]" />
        </div>
      </div>
    </header>
  );
};

export default Header;
