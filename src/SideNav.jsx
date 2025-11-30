import React from 'react';
import './SideNav.css'; 

// Placeholder icons 
const HomeIcon = '🏠';
const ProgressIcon = '⭐';
const ProfileIcon = '👤';
const SettingsIcon = '⚙️';

// Component accepts goToPage prop for navigation and toggleNav to open/close
const SideNav = ({ isOpen, toggleNav, goToPage }) => {
    
    // Function to handle navigation click
    const handleNavClick = (pageNumber) => {
        // Page IDs: 2=Journal(Home), 3=Progress, 4=Profile (Future), 5=Settings (Future)
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
                    <div className="profile-circle"></div> 
                    <p>User Name</p>
                </div>
                
                <ul className="nav-links">
                    <li><a onClick={() => handleNavClick(7)}>{HomeIcon} Home</a></li> 
                    <li><a onClick={() => handleNavClick(2)}>{HomeIcon} Journal</a></li> 
                    <li><a onClick={() => handleNavClick(3)}>{ProgressIcon} My Progress</a></li> 
                    <li><a onClick={() => handleNavClick(4)}>{ProfileIcon} Profile</a></li> 
                    <li><a onClick={() => handleNavClick(5)}>{SettingsIcon} Settings</a></li> 

                </ul>
            </nav>
        </div>
    );
};

export default SideNav;