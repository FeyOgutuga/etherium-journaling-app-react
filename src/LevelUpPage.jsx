import React, { useRef, useState, useEffect } from "react";
import "./LevelUpPage.css";
import SideNav from "./SideNav";
import Star from "./Star";
import { STAR_POSITIONS } from "./starPositions.js";

const XP_PER_LEVEL = 100;

function LevelUpPage({ level, totalXp = 0, goToPage }) {
  const containerRef = useRef(null);

  // Scaling
  const [scale, setScale] = useState({ x: 1, y: 1 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setScale({
      x: container.offsetWidth / 375,
      y: container.offsetHeight / 812,
    });
  }, []);

  // Navigation state
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => setIsNavOpen((prev) => !prev);

  // Toast
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (msg) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  // XP math
  const xpIntoLevel = totalXp % XP_PER_LEVEL;
  const xpPercent = Math.round((xpIntoLevel / XP_PER_LEVEL) * 100);
  const xpRemaining = XP_PER_LEVEL - xpIntoLevel;
  const nextLevel = level + 1;

  const handleStarClick = (starNum, isUnlocked) => {
    if (!isUnlocked) {
      const xpNeeded = (starNum - 1) * XP_PER_LEVEL - xpIntoLevel;
      showToast(`You need ${xpNeeded} XP to unlock this level!`);
      return;
    }
    showToast(`Level ${starNum} unlocked!`);
  };

  // ⭐ CYCLIC STAR LOGIC — THE FIX
  const STAR_COUNT = STAR_POSITIONS.length; // usually 8
  const progressIndex = (level - 1) % STAR_COUNT; 
  // ex: lvl 1 → 0, lvl 8 → 7, lvl 9 → 0, lvl 10 → 1, etc.

  return (
    <div ref={containerRef} className="mobile-screen levelup-screen fade-transition">
      
      {/* MENU BUTTON */}
      <button className="floating-menu-btn" onClick={toggleNav}>
        ☰
      </button>

      {/* TITLE */}
      <h1 className="levelup-title-top">LEVEL {level}</h1>

      {/* XP METER */}
      <div className="xp-meter-wrapper">
        <div className={`xp-meter-bar ${xpIntoLevel === 0 ? "empty" : ""}`}>
          <div 
            className={`xp-meter-fill ${xpIntoLevel === 0 ? "empty" : ""}`}
            style={{ width: `${xpPercent}%` }}
          ></div>
        </div>
      </div>

      {/* SIDE NAV */}
      <SideNav 
        isOpen={isNavOpen}
        toggleNav={toggleNav}
        goToPage={goToPage}
      />

      {/* ⭐ STARS (fully fixed) */}
     {STAR_POSITIONS.map((pos, idx) => {
    const reversedIdx = STAR_POSITIONS.length - 1 - idx;

    const isUnlocked = reversedIdx <= progressIndex;
    const isCurrent = reversedIdx === progressIndex;

    return (
      <Star
        key={idx}
        x={pos.x * scale.x}
        y={pos.y * scale.y}
        isUnlocked={isUnlocked}
        isCurrent={isCurrent}
        levelNumber={reversedIdx + 1}
        delay={idx * 0.12}
        onClick={() => handleStarClick(reversedIdx + 1, isUnlocked)}
      />
    );
  })}


      {/* TOAST */}
      <div className={`toast ${toastVisible ? "show" : ""}`}>
        {toastMsg}
      </div>

    </div>
  );
}

export default LevelUpPage;
