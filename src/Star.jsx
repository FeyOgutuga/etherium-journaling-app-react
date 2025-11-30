import React from "react";
import "./Star.css";

function Star({ x, y, isUnlocked, isCurrent, onClick, delay }) {
  return (
    <div
      className={`level-star star-animate ${isUnlocked ? "unlocked" : "locked"} ${isCurrent ? "current" : ""}`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        animationDelay: `${delay}s`
      }}
      onClick={onClick}
    >
      <img src="/click_stars.png" alt="star" />
    </div>
  );
}

export default Star;
