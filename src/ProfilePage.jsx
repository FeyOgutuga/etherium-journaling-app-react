import React, { useState } from 'react';
import SideNav from './SideNav';
import './ProfilePage.css'; 

// Sparkle Menu Icon
const MenuIcon = '☰';

const ProfilePage = ({ goToPage, stats }) => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);
    // Load from localStorage or use default
    const [userName, setUserName] = useState(() => {
        return localStorage.getItem('userName') || 'User Name!';
    });
    const [profilePic, setProfilePic] = useState(() => {
        return localStorage.getItem('profilePic') || '👑';
    });
    const [showPicPicker, setShowPicPicker] = useState(false);
    const [tempUserName, setTempUserName] = useState(userName);

    // Profile picture options
    const PROFILE_PICS = [
        { emoji: '👑', name: 'Crown' },
        { emoji: '👸', name: 'Princess' },
        { emoji: '🤴', name: 'Prince' },
        { emoji: '🧚', name: 'Fairy' },
        { emoji: '🧙‍♀️', name: 'Wizard' },
        { emoji: '🦄', name: 'Unicorn' },
        { emoji: '✨', name: 'Sparkle' },
        { emoji: '🌟', name: 'Star' },
        { emoji: '💫', name: 'Dizzy' },
        { emoji: '🌸', name: 'Flower' },
        { emoji: '🐱', name: 'Cat' },
        { emoji: '🐶', name: 'Dog' },
        { emoji: '🦊', name: 'Fox' },
        { emoji: '🐰', name: 'Rabbit' },
        { emoji: '🦋', name: 'Butterfly' },
        { emoji: '🧜‍♀️', name: 'Mermaid' },
        { emoji: '🌙', name: 'Moon' },
        { emoji: '☀️', name: 'Sun' },
        { emoji: '🌈', name: 'Rainbow' },
        { emoji: '🔥', name: 'Fire' }
    ];

    const toggleNav = () => {
        setIsNavOpen(prev => !prev);
    };

    const startEditingName = () => {
        setTempUserName(userName);
        setIsEditingName(true);
    };

    const saveUserName = () => {
        if (tempUserName.trim() !== '') {
            const newName = tempUserName.trim();
            setUserName(newName);
            // Save to localStorage
            localStorage.setItem('userName', newName);
            showCuteNotification('success', 'Name Updated!', `Hello ${newName}! ✨`);
        }
        setIsEditingName(false);
    };

    const cancelEditingName = () => {
        setIsEditingName(false);
    };

    const selectProfilePic = (pic) => {
        setProfilePic(pic.emoji);
        setShowPicPicker(false);
        // Save to localStorage
        localStorage.setItem('profilePic', pic.emoji);
        localStorage.setItem('profilePicName', pic.name);
        showCuteNotification('success', 'Profile Updated!', `Profile picture changed to ${pic.name}! ${pic.emoji}`);
    };

    const showCuteNotification = (type, title, message) => {
        const miniGalaxy = {
            success: { bg: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)', emoji: '✨' },
            error: { bg: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)', emoji: '🌠' },
            info: { bg: 'linear-gradient(135deg, #00c6fb 0%, #005bea 100%)', emoji: '💫' },
            saving: { bg: 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)', emoji: '🪐' }
        };
        
        const theme = miniGalaxy[type] || miniGalaxy.info;
        
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 10px;
                left: 50%;
                transform: translateX(-50%);
                background: ${theme.bg};
                color: white;
                padding: 8px 16px;
                border-radius: 16px;
                box-shadow: 
                    0 3px 12px rgba(0, 0, 0, 0.25),
                    0 0 10px rgba(255, 255, 255, 0.15) inset;
                z-index: 9999;
                font-family: 'Segoe UI', Tahoma, sans-serif;
                font-size: 12px;
                display: flex;
                align-items: center;
                gap: 8px;
                animation: miniFloat 2s ease-in-out;
                max-width: 250px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                backdrop-filter: blur(5px);
            ">
                <span style="
                    font-size: 16px;
                    animation: spinSlow 4s linear infinite;
                ">${theme.emoji}</span>
                
                <div style="text-align: left;">
                    <strong style="font-size: 13px; display: block;">${title}</strong>
                    <span style="font-size: 10px; opacity: 0.9; display: block;">${message}</span>
                </div>
            </div>
        `;
        
        // Add animation styles
        if (!document.querySelector('#profile-notification-styles')) {
            const style = document.createElement('style');
            style.id = 'profile-notification-styles';
            style.textContent = `
                @keyframes miniFloat {
                    0% { 
                        opacity: 0; 
                        transform: translateX(-50%) translateY(-15px);
                    }
                    20% { 
                        opacity: 1; 
                        transform: translateX(-50%) translateY(0);
                    }
                    80% { 
                        opacity: 1; 
                        transform: translateX(-50%) translateY(0);
                    }
                    100% { 
                        opacity: 0; 
                        transform: translateX(-50%) translateY(-15px);
                    }
                }
                
                @keyframes spinSlow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 2000);
        
        return notification;
    };

    const safeStats = stats || {
        totalXp: 0,
        level: 1,
        totalEntries: 0,
        currentStreak: 0,
    };

    const { totalXp, level, totalEntries, currentStreak } = safeStats;

    return (
        <div className="mobile-screen profile-screen">
            
            {/* Profile Picture Picker Overlay */}
            {showPicPicker && (
                <div className="profile-pic-picker-overlay">
                    <div className="profile-pic-picker">
                        <div className="picker-header">
                            <h3>✨ Choose Your Avatar ✨</h3>
                            <button 
                                className="close-picker-btn"
                                onClick={() => setShowPicPicker(false)}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="profile-pic-grid">
                            {PROFILE_PICS.map((pic, index) => (
                                <button
                                    key={index}
                                    className="profile-pic-option"
                                    onClick={() => selectProfilePic(pic)}
                                    title={pic.name}
                                >
                                    {pic.emoji}
                                </button>
                            ))}
                        </div>
                        <p className="picker-instruction">Click an emoji to set as your profile picture!</p>
                    </div>
                </div>
            )}

            {/* Name Editor Overlay */}
            {isEditingName && (
                <div className="name-editor-overlay">
                    <div className="name-editor">
                        <h3>✨ Edit Your Name ✨</h3>
                        <input
                            type="text"
                            value={tempUserName}
                            onChange={(e) => setTempUserName(e.target.value)}
                            className="name-input"
                            placeholder="Enter your name..."
                            maxLength="20"
                            autoFocus
                        />
                        <div className="editor-buttons">
                            <button 
                                className="cancel-btn"
                                onClick={cancelEditingName}
                            >
                                Cancel
                            </button>
                            <button 
                                className="save-btn"
                                onClick={saveUserName}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Magical Header */}
            <header className="profile-header">
                <h2>My Profile ✨</h2>
                <button onClick={toggleNav} className="menu-button">
                    {MenuIcon}
                </button>
            </header>

            {/* Magical Main Content */}
            <main className="profile-main-content">
                
                {/* Magical Profile Picture - Now Clickable! */}
                <div className="profile-pic-container">
                    <div className="profile-pic-circle">👑</div>
                    <h3>User Name!</h3>
                </div>
                
                {/* Journaling Summary Section */}
                <div className="profile-section summary-section">
                    <h4>✨ Journaling Journey</h4>
                    <p>Total Entries: <strong>{totalEntries}</strong></p>
                    <p>Current Streak: <strong>{currentStreak}</strong></p>
                    <p>XP Level: <strong>{level}</strong></p>
                    <p>Total xp: <strong>{totalXp}</strong></p>
                </div>
                
                {/* Preferences/Options Section */}
                <div className="profile-section options-section">
                    <h4>🔮 Settings & Magic</h4>
                    <div 
                        className="option-item"
                        onClick={() => setShowPicPicker(true)}
                    >
                        <span>Change Profile Picture</span>
                        <span>&gt;</span>
                    </div>
                    <div 
                        className="option-item"
                        onClick={startEditingName}
                    >
                        <span>Edit Display Name</span>
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
                userName={userName}  // Pass the current username
                profilePic={profilePic}  // Pass the current profile picture
            />
        </div>
    );
};

export default ProfilePage;