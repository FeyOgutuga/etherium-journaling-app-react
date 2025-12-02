import React, { useState, useEffect } from 'react';
import SideNav from './SideNav';
import './JournalPage.css'; 

const MenuIcon = '☰';

// Mood-based prompts database
const MOOD_PROMPTS = {
    bad: [
        "What's weighing on your heart today? 🌧️",
        "Write about what's making you feel this way... it's okay to let it out.",
        "What's one small thing that could make today a little better?",
        "Describe a comforting memory that helps when you're feeling down.",
        "What would you tell a friend who's feeling this way? 💌",
        "Is there something you need to release or let go of today?",
        "What's your favorite way to practice self-care when you're not feeling great?",
        "Write about a time you overcame a difficult feeling.",
        "What does your heart need to hear right now?",
        "Imagine a hug in words - what would it feel like?"
    ],
    okay: [
        "What's been on your mind lately? 🤔",
        "Describe something small that made you smile today.",
        "What are you looking forward to this week?",
        "Write about a recent 'okay' moment and how it felt.",
        "Is there something you'd like to improve or change?",
        "What's helping you maintain balance right now? ⚖️",
        "How can you make today a little more special?",
        "What's one thing you're curious about exploring?",
        "Describe your ideal 'just okay' day.",
        "What's a small win you've had recently?"
    ],
    good: [
        "What's making you feel amazing today? ✨",
        "Write about something you're grateful for right now!",
        "Describe a recent win or accomplishment! 🏆",
        "What positive energy do you want to carry forward?",
        "How can you share this good mood with someone else?",
        "What's bringing you joy or excitement lately?",
        "Celebrate something good that happened recently! 🎉",
        "What are you proud of yourself for?",
        "Describe a moment that made your heart feel full.",
        "What's something beautiful you noticed today?"
    ]
};

const JournalPage = ({ goToPage, startNewEntry, startNewEntryWithPrompt, resumeCurrentEntry, entries, openEntry, userName, profilePic, userMood = 'good' }) => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [showPrompts, setShowPrompts] = useState(true);
    const [prompts, setPrompts] = useState([]);

    const toggleNav = () => {
        setIsNavOpen(prev => !prev);
    };

    // Get random prompts for the current mood
    const getRandomPrompts = () => {
        const allPrompts = MOOD_PROMPTS[userMood] || MOOD_PROMPTS.good;
        // Shuffle and take 3 random prompts
        const shuffled = [...allPrompts].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
    };

    // Initialize prompts on component mount and when mood changes
    useEffect(() => {
        setPrompts(getRandomPrompts());
    }, [userMood]);

    // Refresh prompts
    const refreshPrompts = () => {
        setPrompts(getRandomPrompts());
    };

    // Get mood emoji and color
    const getMoodDetails = () => {
        switch(userMood) {
            case 'bad': return { emoji: '🌧️', color: '#667eea', label: 'Not Great' };
            case 'okay': return { emoji: '🤔', color: '#4facfe', label: 'Okay' };
            case 'good': return { emoji: '✨', color: '#fa709a', label: 'Great!' };
            default: return { emoji: '✨', color: '#fa709a', label: 'Great!' };
        }
    };

    const moodDetails = getMoodDetails();

    return (
        <div className="mobile-screen journal-screen">
            
            {/* Header with Sparkle Menu */}
            <header className="journal-header">
                <h2>My Journal</h2>
                <button onClick={toggleNav} className="menu-button">
                    {MenuIcon}
                </button>
            </header>

            {/* Main Content Area */}
            <main className="journal-main-content">
                
                {/* Mood Indicator Banner */}
                <div className="mood-banner" style={{ background: `linear-gradient(135deg, ${moodDetails.color}20, rgba(255, 217, 61, 0.2))` }}>
                    <div className="mood-banner-content">
                        <span className="mood-emoji">{moodDetails.emoji}</span>
                        <span className="mood-text">
                            Today's Mood: <strong>{moodDetails.label}</strong>
                        </span>
                        <button 
                            className="refresh-prompts-btn"
                            onClick={refreshPrompts}
                            title="Get new prompts"
                        >
                            🔄
                        </button>
                    </div>
                </div>

                {/* Journaling Action Blocks */}
                <div className="journal-actions-row">
                    {/* 1. CURRENT JOURNAL */}
                    <button 
                        className="journal-action-button primary-action"
                        onClick={resumeCurrentEntry}
                    >
                        <span className="button-title">Current Journal</span>
                        <span className="button-explanation">Continue your ongoing story and reflections</span>
                    </button>
                    
                    {/* 2. + NEW JOURNAL */}
                    <button 
                        className="journal-action-button primary-action"
                        onClick={startNewEntry}
                    >
                        <span className="button-title">New Journal</span>
                        <span className="button-explanation">Start a fresh magical entry</span>
                    </button>
                </div>
                
                {/* Mood-Based Prompts Section */}
                {showPrompts && (
                    <div className="prompts-section">
                        <div className="prompts-header">
                            <h3>✨ {userMood.charAt(0).toUpperCase() + userMood.slice(1)} Mood Prompts ✨</h3>
                            <p>Need inspiration? Try one of these:</p>
                        </div>
                        
                        <div className="prompts-list">
                            {prompts.map((prompt, index) => (
                                <div 
                                    key={index}
                                    className="prompt-card"
                                    onClick={() => startNewEntryWithPrompt(prompt)}
                                >
                                    <div className="prompt-emoji">
                                        {index === 0 ? '📝' : index === 1 ? '💭' : '✨'}
                                    </div>
                                    <div className="prompt-text">{prompt}</div>
                                    <div className="prompt-arrow">→</div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="prompts-footer">
                            <button 
                                className="prompts-toggle-btn"
                                onClick={() => setShowPrompts(false)}
                            >
                                Hide Prompts
                            </button>
                            <button 
                                className="prompts-refresh-btn"
                                onClick={refreshPrompts}
                            >
                                🔄 New Ideas
                            </button>
                        </div>
                    </div>
                )}

                {!showPrompts && (
                    <button 
                        className="show-prompts-btn"
                        onClick={() => setShowPrompts(true)}
                    >
                        ✨ Show Mood Prompts
                    </button>
                )}

                {/* 3. Resume Last Entry */}
                <button 
                    className="journal-action-button secondary-action"
                    onClick={resumeCurrentEntry}
                >
                    <span className="button-title">Resume Last Entry</span>
                    <span className="button-explanation">Quickly return to your recent writing adventure</span>
                </button>

                {/* 4. All Journals */}
                <button
                    className="journal-action-button secondary-action"
                    onClick={() => goToPage(5)}
                >
                    <span className="button-title">All Journals</span>
                    <span className="button-explanation">Tap to view all your past entries</span>
                </button>
            </main>

            {/* Side Navigation */}
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

export default JournalPage;