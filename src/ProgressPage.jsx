import React, { useState } from 'react';
import SideNav from './SideNav';
import './ProgressPage.css';

const MenuIcon = '☰'; 

const dummyProgress = {
    xpLevel: 82,
    currentStreak: 7,
    totalEntries: 45,
    challengesCompleted: 3,
    milestoneStatus: [
        { id: 1, completed: true, date: 'Oct 1', label: 'First Steps' },
        { id: 2, completed: true, date: 'Oct 8', label: 'Weekly Warrior' },
        { id: 3, completed: false, date: 'Oct 15', label: 'Halfway Hero' },
        { id: 4, completed: false, date: 'Oct 22', label: 'Month Master' },
    ]
};

const ProgressPage = ({ goToPage }) => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(prev => !prev);
    };

    const revisitMilestoneEntry = (milestoneId) => {
        alert(`✨ Revisiting your beautiful journal entry from Milestone ${milestoneId}!`);
    };

    return (
        <div className="mobile-screen progress-screen">
            
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
                            <span className="xp-level">Level {dummyProgress.xpLevel}</span>
                        </div>
                    </div>
                    
                    {/* Animated Progress Bar */}
                    <div className="xp-bar-container">
                        <div 
                            className="xp-bar-fill" 
                            style={{ width: `${dummyProgress.xpLevel}%` }}
                        ></div>
                    </div>

                    {/* Key Metrics in Bubbles */}
                    <div className="key-metrics">
                        <p>current streak: <b>{dummyProgress.currentStreak} days 🌟</b></p>
                        <p>total entries: <b>{dummyProgress.totalEntries} pages 📖</b></p>
                        <p>challenges completed: <b>{dummyProgress.challengesCompleted} wins 🏆</b></p>
                    </div>
                </div>

                {/* 2. Achievement Path - Now Magical! */}
                <div className="milestone-path-container">
                    <h3>✨ Achievement Path ✨</h3>
                    <div className="milestone-path">
                        {dummyProgress.milestoneStatus.map((milestone) => (
                            <div 
                                key={milestone.id} 
                                className={`milestone-node ${milestone.completed ? 'completed' : 'pending'}`}
                                onClick={() => milestone.completed && revisitMilestoneEntry(milestone.id)}
                            >
                                <div className="milestone-icon">
                                    {milestone.completed ? '🌟' : '⭐'}
                                </div>
                                <p className="milestone-label">{milestone.label}</p>
                                {milestone.completed && <p className="milestone-date">{milestone.date}</p>}
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
            />
        </div>
    );
};

export default ProgressPage;