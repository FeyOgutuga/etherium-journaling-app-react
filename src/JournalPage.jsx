import React, { useState } from 'react';
import SideNav from './SideNav';
import './JournalPage.css'; 

// Sparkle Menu Icon 
const MenuIcon = '☰';

const JournalPage = ({ goToPage, startNewEntry, resumeCurrentEntry }) => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(prev => !prev);
    };

    return (
        <div className="mobile-screen journal-screen">
            
            {/* 1. Header with Sparkle Menu */}
            <header className="journal-header">
                <h2>My Journal</h2>
                <button onClick={toggleNav} className="menu-button">
                    {MenuIcon}
                </button>
            </header>

            {/* 2. Main Content Area */}
            <main className="journal-main-content">
                
                {/* Journaling Action Blocks - Now Magical! */}
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
                
                {/* 3. Resume Last Entry */}
                <button 
                    className="journal-action-button secondary-action"
                    onClick={resumeCurrentEntry}
                >
                    <span className="button-title">Resume Last Entry</span>
                    <span className="button-explanation">Quickly return to your recent writing adventure</span>
                </button>

                {/* Beautiful Placeholder */}
                <div className="journal-placeholder">
                    <p>✨ Your past entries & magical prompts will appear here...</p>
                </div>
            </main>

            {/* 3. Side Navigation Component */}
            <SideNav 
                isOpen={isNavOpen} 
                toggleNav={toggleNav} 
                goToPage={goToPage} 
            />
        </div>
    );
};

export default JournalPage;