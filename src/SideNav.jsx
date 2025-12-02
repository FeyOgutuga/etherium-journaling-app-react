import React from 'react';
import './SideNav.css'; 

// Placeholder icons 
const HomeIcon = '🏠';
const JournalIcon = '📖';
const ProgressIcon = '⭐';
const ProfileIcon = '👤';
const SettingsIcon = '⚙️';

// Update the component to accept username and profilePic props
const SideNav = ({ isOpen, toggleNav, goToPage, userName = 'User Name', profilePic = '👑' }) => {
    
    // Function to handle navigation click
    const handleNavClick = (pageNumber) => {
        goToPage(pageNumber); 
        toggleNav(); // Close the drawer after clicking
    };

    return (
        <div className={`side-nav ${isOpen ? 'open' : ''}`}>
            {/* Dark Overlay/Backdrop */}
            <div className="backdrop" onClick={toggleNav}></div>
            
            {/* The actual Drawer Menu */}
            <nav className="nav-drawer">
                <div className="nav-profile-header">
                    <div className="profile-circle">{profilePic}</div> 
                    <p>{userName}</p>
                </div>
                
                <ul className="nav-links">
                    <li><a onClick={() => handleNavClick(7)}>{HomeIcon} Home</a></li> 
                    <li><a onClick={() => handleNavClick(2)}>{JournalIcon} Journal</a></li> 
                    <li><a onClick={() => handleNavClick(3)}>{ProgressIcon} My Progress</a></li> 
                    <li><a onClick={() => handleNavClick(4)}>{ProfileIcon} Profile</a></li> 
                    <li><a onClick={() => handleNavClick(5)}>{SettingsIcon} Settings</a></li> 
                </ul>
            </nav>
        </div>
    );
};

export default SideNav;