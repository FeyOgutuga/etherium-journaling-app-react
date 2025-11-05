import React, { useState } from 'react';
import SideNav from './SideNav';
import './JournalPage.css'; 

// Placeholder Menu Icon 
const MenuIcon = '☰';

// Destructure the new handler functions from the props 
const JournalPage = ({ goToPage, startNewEntry, resumeCurrentEntry }) => {
    // State to manage the open/close status of the Side Navigation
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(prev => !prev);
    };

    // REMOVED old goToWritingCanvas function since buttons now call specific handlers

    return (
        <div className="mobile-screen journal-screen">
            
            {/* 1. Header with Menu Icon */}
            <header className="journal-header">
                <h2>Journal</h2> {/* Centered Page Title */}
                <button onClick={toggleNav} className="menu-button">
                    {MenuIcon}
                </button>
            </header>

            {/* 2. Main Content Area */}
            <main className="journal-main-content">
                
                {/* Journaling Action Blocks matching the wireframe layout */}
                
                <div className="journal-actions-row">
                    {/* 1. CURRENT JOURNAL (RESUMES DRAFT) */}
                    <button 
                        className="journal-action-button primary-action"
                        onClick={resumeCurrentEntry} // This now correctly calls App.jsx resumeCurrentEntry()
                    >
                        <span className="button-title">Current Journal</span>
                        <span className="button-explanation">Your ongoing draft</span>
                    </button>
                    
                    {/* 2. + NEW JOURNAL (STARTS FRESH) */}
                    <button 
                        className="journal-action-button primary-action"
                        onClick={startNewEntry} // This now correctly calls App.jsx startNewEntry()
                    >
                        <span className="button-title">+ New Journal</span>
                        <span className="button-explanation">Start a fresh entry</span>
                    </button>
                </div>
                
                {/* 3. Resume Last Entry (Functionally identical to Current Journal for now) */}
                <button 
                    className="journal-action-button secondary-action"
                    onClick={resumeCurrentEntry}
                >
                    <span className="button-title">Resume last entry</span>
                    <span className="button-explanation">Quickly return to what you were writing</span>
                </button>

                {/* Placeholder for remaining content space */}
                <div className="journal-placeholder">
                    <p>Past Entries & Prompts will appear here...</p>
                </div>
            </main>

            {/* 3. Side Navigation Component - Passes the central navigation function */}
            <SideNav 
                isOpen={isNavOpen} 
                toggleNav={toggleNav} 
                goToPage={goToPage} 
            />
        </div>
    );
};

export default JournalPage;