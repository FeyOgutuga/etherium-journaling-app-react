import React, { useState, useEffect } from 'react';
import './LandingPage.css';

const LandingPage = ({ onMoodConfirm }) => {
    
    // State for the slider value (0 to 100)
    const [moodValue, setMoodValue] = useState(100); 
    // State for the dynamic image source and mood label
    const [mood, setMood] = useState({ 
        imageSrc: 'great.png',
        moodLabel: 'good' // Add mood label
    });

    // Helper function to determine mood image, snap value, and label
    const getMoodDetails = (value) => {
        if (value <= 25) {
            return { 
                imageSrc: '/thunder.png', 
                snapValue: 0, 
                moodLabel: 'bad' 
            };
        } else if (value > 25 && value <= 75) {
            return { 
                imageSrc: '/better.png', 
                snapValue: 50, 
                moodLabel: 'okay' 
            };
        } else {
            return { 
                imageSrc: '/great.png', 
                snapValue: 100, 
                moodLabel: 'good' 
            };
        }
    };

    // Effect to update image and snap slider position when moodValue changes
    useEffect(() => {
        const details = getMoodDetails(moodValue);
        setMood({ 
            imageSrc: details.imageSrc,
            moodLabel: details.moodLabel 
        });
        
        const slider = document.getElementById('moodSlider');
        if (slider) {
            slider.value = details.snapValue;
        }
    }, [moodValue]);

    // Handler for slider input change
    const handleSliderChange = (event) => {
        setMoodValue(parseInt(event.target.value));
    };

    // Handle confirm button click - pass mood to parent
    const handleConfirm = () => {
        onMoodConfirm(mood.moodLabel); // Pass the mood label to App.js
    };

    return (
        <div className="mobile-screen">
            <div className="landing-content">
                <p className="subheading"> ✧˖°.welcome back, fefe࣪ ✧˖°.</p>
                <h1>HOW ARE YOU FEELING TODAY?</h1>

                {/* Mood Indicator Area with dynamic image */}
                <div className="mood-indicator-area">
                    <img 
                        src={mood.imageSrc} 
                        alt="Mood face" 
                        className="mood-face-image"
                    />
                    {/* Optional: Show mood label */}
                    <div className="mood-label-display">
                        Current mood: <span className="mood-label-text-highlight">
                            {mood.moodLabel.toUpperCase()}
                        </span>
                    </div>
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

                {/* CONFIRM BUTTON (Calls the navigation function with mood) */}
                <button 
                    className="confirm-button" 
                    onClick={handleConfirm}
                >
                    C O N F I R M
                </button>

            </div>
        </div>
    );
};

export default LandingPage;