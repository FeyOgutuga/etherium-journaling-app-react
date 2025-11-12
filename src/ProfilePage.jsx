import React, { useState } from 'react';
import SideNav from './SideNav';
import './ProfilePage.css'; 

// Sparkle Menu Icon
const MenuIcon = '☰';

const ProfilePage = ({ goToPage }) => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(prev => !prev);
    };

    return (
        <div className="mobile-screen profile-screen">
            
            {/* Magical Header */}
            <header className="profile-header">
                <h2>My Profile ✨</h2>
                <button onClick={toggleNav} className="menu-button">
                    {MenuIcon}
                </button>
            </header>

            {/* Magical Main Content */}
            <main className="profile-main-content">
                
                {/* Magical Profile Picture */}
                <div className="profile-pic-container">
                    <div className="profile-pic-circle">👑</div>
                    <h3>User Name!</h3>
                </div>
                
                {/* Journaling Summary Section */}
                <div className="profile-section summary-section">
                    <h4>✨ Journaling Journey</h4>
                    <p>Total Entries: <strong>45</strong></p>
                    <p>Current Streak: <strong>7 Days</strong></p>
                    <p>XP Level: <strong>82</strong></p>
                </div>
                
                {/* Preferences/Options Section */}
                <div className="profile-section options-section">
                    <h4>🔮 Settings & Magic</h4>
                    <div className="option-item">
                        <span>Edit Profile</span>
                        <span>&gt;</span>
                    </div>
                    <div className="option-item">
                        <span>Data & Privacy</span>
                        <span>&gt;</span>
                    </div>
                    <div className="option-item">
                        <span>Notification Settings</span>
                        <span>&gt;</span>
                    </div>
                </div>

            </main>

            {/* Side Navigation */}
            <SideNav 
                isOpen={isNavOpen} 
                toggleNav={toggleNav} 
                goToPage={goToPage} 
            />
        </div>
    );
};

export default ProfilePage;