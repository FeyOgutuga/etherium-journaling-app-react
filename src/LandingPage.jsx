import React, { useState, useEffect } from 'react';
import './LandingPage.css';

// Component accepts onMoodConfirm prop for navigation to the Journal Page
const LandingPage = ({ onMoodConfirm }) => {
    
    // State for the slider value (0 to 100)
    const [moodValue, setMoodValue] = useState(100); 
    // State for the dynamic image source
    const [mood, setMood] = useState({ 
        imageSrc: 'great.png', // Default to good
    });

    // Helper function to determine mood image and snap value
    const getMoodDetails = (value) => {
        if (value <= 25) {
            return { imageSrc: '/thunder.png', snapValue: 0 };
        } else if (value > 25 && value <= 75) {
            return { imageSrc: '/better.png', snapValue: 50 };
        } else {
            return { imageSrc: '/great.png', snapValue: 100 };
        }
    };

    // Effect to update image and snap slider position when moodValue changes
    useEffect(() => {
        const details = getMoodDetails(moodValue);
        setMood({ imageSrc: details.imageSrc });
        
        const slider = document.getElementById('moodSlider');
        if (slider) {
            slider.value = details.snapValue;
        }

    }, [moodValue]);

    // Handler for slider input change
    const handleSliderChange = (event) => {
        setMoodValue(parseInt(event.target.value));
    };


    return (
        <div className="mobile-screen">
            <div className="landing-content">
                
                <h1>HOW ARE YOU FEELING TODAY?</h1>

                {/* Mood Indicator Area with dynamic image */}
                <div 
                    className="mood-indicator-area" 
                >
                    <img 
                        src={mood.imageSrc} 
                        alt="Mood face" 
                        className="mood-face-image"
                    />
                </div>
                
                <div className="mood-selector-slider">
                    
                    <input 
                        type="range" 
                        id="moodSlider" 
                        min="0" 
                        max="100" 
                        value={moodValue}
                        step="1"
                        onChange={handleSliderChange}
                    />

                    <div className="mood-options">
                        <span className="mood-label-text">BAD</span>
                        <span className="mood-label-text">OKAY</span>
                        <span className="mood-label-text">GOOD</span>
                    </div>
                </div>

                {/* CONFIRM BUTTON (Calls the navigation function) */}
                <button 
                    className="confirm-button" 
                    onClick={onMoodConfirm} // This switches the page state in App.jsx
                >
                    Confirm
                </button>

            </div>
        </div>
    );
};

export default LandingPage;