import React, { useState, useRef, useEffect } from 'react';
import SideNav from './SideNav';
import './ProgressPage.css';

const MenuIcon = '☰';
const XP_PER_LEVEL = 100;

const ACHIEVEMENTS = [
  { id: 1, label: 'First Steps', xpNeeded: 20 },
  { id: 2, label: 'Weekly Warrior', xpNeeded: 70 },
  { id: 3, label: 'Halfway Hero', xpNeeded: 150 },
  { id: 4, label: 'Month Master', xpNeeded: 300 },
];

const ProgressPage = ({ goToPage, stats, userName, profilePic }) => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    
    // Use refs to track what we've already shown (won't cause re-renders)
    const shownAchievementsRef = useRef(new Set());
    const lastLevelRef = useRef(1);

    const safeStats = stats || {totalXp: 0, level: 1, currentStreak: 0, totalEntries: 0};
    const { totalXp, level, currentStreak, totalEntries } = safeStats;

    const xpIntoLevel = totalXp % XP_PER_LEVEL;
    const xpPercent = Math.round((xpIntoLevel / XP_PER_LEVEL) * 100);

    const unlockedAchievements = ACHIEVEMENTS.map((a) => ({
        ...a, 
        completed: totalXp >= a.xpNeeded
    }));

    const showGalaxyNotification = (type, title, message) => {
        const id = Date.now() + Math.random();
        const galaxyThemes = {
            success: { 
                bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                emoji: '✨'
            },
            milestone: { 
                bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 
                emoji: '🌟'
            },
            info: { 
                bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', 
                emoji: '💫'
            },
            sparkle: { 
                bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', 
                emoji: '✨'
            }
        };
        
        const theme = galaxyThemes[type] || galaxyThemes.info;
        
        setNotifications(prev => [...prev, { 
            id, 
            type, 
            title, 
            message, 
            theme,
            visible: true 
        }]);
        
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 2500);
        
        return id;
    };

    // Fixed useEffect - only shows notifications once
    useEffect(() => {
        // Check for new achievements
        unlockedAchievements.forEach(achievement => {
            if (achievement.completed && !shownAchievementsRef.current.has(achievement.id)) {
                shownAchievementsRef.current.add(achievement.id);
                
                // Show notification with a small delay
                setTimeout(() => {
                    showGalaxyNotification('success', 'Achievement Unlocked!', 
                        `${achievement.label} - ${achievement.xpNeeded} XP reached! 🏆`);
                }, 500);
            }
        });
        
        // Check for level up (only show when level actually increases)
        if (level > lastLevelRef.current && level > 1) {
            lastLevelRef.current = level;
            setTimeout(() => {
                showGalaxyNotification('sparkle', 'Level Up!', 
                    `You've reached Level ${level}! Keep shining! ⭐`);
            }, 1000);
        }
    }, [totalXp]); // Only run when totalXp changes

    const toggleNav = () => {
        setIsNavOpen(prev => !prev);
        // Optional: Remove this to prevent navigation notifications
        // showGalaxyNotification('sparkle', 'Navigation', 'Journey continues! ✨');
    };

    const revisitMilestoneEntry = (label, xpNeeded) => {
        showGalaxyNotification('milestone', `Milestone Revisited!`, 
            `Reliving ${label} achievement (${xpNeeded} XP) 🌟`);
    };

    return (
        <div className="mobile-screen progress-screen">
            
            {/* Galaxy Notifications rendered INSIDE the component - POSITIONED CENTER */}
            <div className="galaxy-notifications-container">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className="galaxy-notification"
                        style={{
                            background: notification.theme.bg,
                        }}
                    >
                        {/* Twinkling stars effect */}
                        <div className="notification-stars"></div>
                        
                        <span className="notification-emoji">
                            {notification.theme.emoji}
                        </span>
                        
                        <div className="notification-content">
                            <strong className="notification-title">
                                {notification.title}
                            </strong>
                            <span className="notification-message">
                                {notification.message}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Header with Sparkle Menu */}
            <header className="progress-header">
                <h2>My Magical Progress</h2>
                <button onClick={toggleNav} className="menu-button">
                    {MenuIcon}
                </button>
            </header>

            <main className="progress-main-content">
                
                {/* 1. Progress Overview - Now with Magic! */}
                <div className="progress-overview">
                    <div className="xp-circle">
                        <div className="xp-inner-content">
                            <p>Your Journaling Journey</p>
                            <span className="xp-level">Level {level}</span>
                            <p>{totalXp} total xp</p>
                        </div>
                    </div>
                    
                    {/* Animated Progress Bar */}
                    <div className="xp-bar-container">
                        <div 
                            className="xp-bar-fill" 
                            style={{ width: `${xpPercent}%` }}
                        ></div>
                    </div>

                    <p className="xp-bar-label">
                        {xpIntoLevel} of {XP_PER_LEVEL} xp to the next level
                    </p>

                    {/* Key Metrics in Bubbles */}
                    <div className="key-metrics">
                        <p>current streak: <b>{currentStreak} days 🌟</b></p>
                        <p>total entries: <b>{totalEntries} pages 📖</b></p>
                    </div>
                </div>

                {/* 2. Achievement Path - Now Magical! */}
                <div className="milestone-path-container">
                    <h3>✨ Achievement Path ✨</h3>
                    <div className="milestone-path">
                        {unlockedAchievements.map((milestone) => (
                            <div 
                                key={milestone.id} 
                                className={`milestone-node ${milestone.completed ? 'completed' : 'pending'}`}
                                onClick={() => milestone.completed && revisitMilestoneEntry(milestone.label, milestone.xpNeeded)}
                            >
                                <div className="milestone-icon">
                                    {milestone.completed ? '🌟' : '⭐'}
                                </div>
                                <p className="milestone-label">{milestone.label}</p>
                                <p className="milestone-date"> needs {milestone.xpNeeded} xp</p>
                            </div>
                        ))}
                    </div>
                    
                    <p className="path-guide">Tap the sparkly milestones to relive those special moments! ✨</p>
                </div>
            </main>

            <SideNav 
                isOpen={isNavOpen} 
                toggleNav={toggleNav} 
                goToPage={goToPage}
                userName={userName}
                profilePic={profilePic}
            />
        </div>
    );
};

export default ProgressPage;