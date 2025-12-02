import React, { useState, useEffect } from 'react';
import './LandingPage.css';

const LandingPage = ({ onMoodConfirm }) => {

    // State for the slider value (0 to 100)
    const [moodValue, setMoodValue] = useState(100);
    // State for the dynamic image source and mood label
    const [mood, setMood] = useState({
        imageSrc: 'great.png',
        moodLabel: 'good'
    });

    // Determines image + snap + text label
    const getMoodDetails = (value) => {
        if (value <= 25) {
            return { imageSrc: '/thunder.png', snapValue: 0, moodLabel: 'bad' };
        } else if (value > 25 && value <= 75) {
            return { imageSrc: '/better.png', snapValue: 50, moodLabel: 'okay' };
        } else {
            return { imageSrc: '/great.png', snapValue: 100, moodLabel: 'good' };
        }
    };

    // ⭐ Mood color function — OUTSIDE useEffect
    const getMoodColor = (mood) => {
        switch (mood) {
            case 'bad':
                return '#ff8fa3'; 
            case 'okay':
                return '#ffd9a0'; // gold
            case 'good':
                return '#b9f8d3'; // mint green
            default:
                return '#ffffff';
        }
    };

    // Updates mood + snaps slider
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

    const handleSliderChange = (event) => {
        setMoodValue(parseInt(event.target.value));
    };

    const handleConfirm = () => {
        onMoodConfirm(mood.moodLabel);
    };

    return (
        <div className="mobile-screen">
            <div className="landing-content">

                <p className="subheading"> ✧˖°.welcome back, fefe࣪ ✧˖°.</p>
                <h1>HOW ARE YOU FEELING TODAY?</h1>

                {/* Mood cloud image */}
                <div className="mood-indicator-area">
                    <img
                        src={mood.imageSrc}
                        alt="Mood face"
                        className="mood-face-image"
                    />
                </div>

                {/* Mood Verification Text */}
                <div className="mood-verification-text">
                    Your Forecast Today:{' '}
                    <span style={{ color: getMoodColor(mood.moodLabel) }}>
                        {mood.moodLabel.toUpperCase()}
                    </span>
                </div>

                {/* Slider */}
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

                {/* Confirm Button */}
                <button className="confirm-button" onClick={handleConfirm}>
                    C O N F I R M
                </button>

            </div>
        </div>
    );
};

export default LandingPage;
