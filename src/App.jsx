import React, { useState } from 'react';
import LandingPage from './LandingPage';
import JournalPage from './JournalPage';
import ProgressPage from './ProgressPage';
import ProfilePage from './ProfilePage';
import OpenJournal from './OpenJournal';
import AllJournalsPage from './AllJournalsPage';
import LevelUpPage from './LevelUpPage';

const XP_PER_LEVEL = 100;

const initialStats = {
  totalXp: 0,
  level: 1,
  totalEntries: 0,
  totalWords: 0,
  currentStreak: 0,
  lastEntryDate: null,
};

function App() {
    const [currentPage, setCurrentPage] = useState(1); 
    // Centralized state for the current journal entry content
    const [currentEntry, setCurrentEntry] = useState("Draft started at " + new Date().toLocaleTimeString());
    // State for uploaded images in current entry
    const [currentImages, setCurrentImages] = useState([]);
    // State for emoji stickers in current entry
    const [currentEmojis, setCurrentEmojis] = useState([]);

    // list of all saved journal entries
    const [entries, setEntries] = useState([]);

    // progress stats for xp and streak
    const [stats, setStats] = useState(initialStats);

    // User profile state
    const [userName, setUserName] = useState(() => localStorage.getItem('userName') || 'User Name!');
    const [profilePic, setProfilePic] = useState(() => localStorage.getItem('profilePic') || '👑');
    
    // Mood state - tracks current user mood
    const [userMood, setUserMood] = useState('good'); // default mood
    
    // Function to update userName and save to localStorage
    const updateUserName = (newName) => { 
        setUserName(newName); 
        localStorage.setItem('userName', newName); 
    };

    // Function to update profilePic and save to localStorage
    const updateProfilePic = (newPic) => { 
        setProfilePic(newPic); 
        localStorage.setItem('profilePic', newPic); 
    };

    // Central function to handle all page switching
    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    // Updated function used by LandingPage - now accepts mood
    const goToJournal = (mood = 'good') => {
        setUserMood(mood); // Save the selected mood
        goToPage(2); // Go to JournalPage (not LevelUpPage)
    };

    // Function to open an existing journal entry for editing
    const openExistingEntry = (entryId) => {
        const entry = entries.find(e => e.id === entryId);
        if (!entry) return;

        // load the content into the current draft
        setCurrentEntry(entry.content);
        // load the images into current images
        setCurrentImages(entry.images || []);
        // load the emojis
        setCurrentEmojis(entry.emojis || []);

        // go to the OpenJournal writing screen
        goToPage(6);
    };

    // helper to update stats when a journal is saved
    const updateStatsForSavedEntry = (wordCount, todayKey) => {
    setStats((prev) => {
        const baseXp = 10;
        const wordXp = Math.min(30, Math.floor(wordCount / 20));

        let streak = prev.currentStreak;

        if (!prev.lastEntryDate) {
        streak = 1;
        } else {
        const last = prev.lastEntryDate;

        if (last !== todayKey) {
            const todayDate = new Date(todayKey);
            const yesterdayDate = new Date(todayDate);
            yesterdayDate.setDate(todayDate.getDate() - 1);
            const yesterdayKey = yesterdayDate.toISOString().slice(0, 10);

            if (last === yesterdayKey) {
            streak = prev.currentStreak + 1;
            } else {
            streak = 1;
            }
        }
        }

        const streakXp = streak > 1 ? 15 : 0;
        const gainedXp = baseXp + wordXp + streakXp;

        const newTotalXp = prev.totalXp + gainedXp;

        const oldLevel = prev.level;
        const newLevel = 1 + Math.floor(newTotalXp / XP_PER_LEVEL);

        // ⭐ LEVEL UP DETECTION
        if (newLevel > oldLevel) {
        setCurrentPage(7); // go to LevelUpPage
        }

        return {
        ...prev,
        totalXp: newTotalXp,
        level: newLevel,
        totalEntries: prev.totalEntries + 1,
        totalWords: prev.totalWords + wordCount,
        currentStreak: streak,
        lastEntryDate: todayKey,
        };
    });
    };

    // Function to handle saving and navigation from the OpenJournal page
    const saveAndGoToJournal = (content) => {
        const trimmed = content.trim();
        const wordCount = trimmed === '' ? 0 : trimmed.split(/\s+/).length;

        const today = new Date();
        const todayKey = today.toISOString().slice(0, 10);

        // create a new entry object and store at top of list
        const newEntry = {
            id: Date.now(), 
            content, 
            wordCount, 
            date: todayKey,
            images: [...currentImages], // Save images with entry
            emojis: [...currentEmojis]  // Save emojis with entry
        };

        setEntries((prev) => [newEntry, ...prev]);

        updateStatsForSavedEntry(wordCount, todayKey);

        setCurrentEntry(content); // Update the final content
        // Reset images and emojis after saving
        setCurrentImages([]);
        setCurrentEmojis([]);
        
        // In a real app, this is where you'd dispatch the data to Firebase/backend
        console.log("FINAL SAVE to App State:", {
            content: content.substring(0, 30) + '...',
            images: currentImages.length,
            emojis: currentEmojis.length,
            totalWords: wordCount
        });
        goToPage(2); // Go back to the Journal (Home) Page
    };

    // Function to update images from OpenJournal
    const updateEntryImages = (images) => {
        setCurrentImages(images);
    };

    // Function to update emojis from OpenJournal
    const updateEntryEmojis = (emojis) => {
        setCurrentEmojis(emojis);
    };

    // Resets the state for a new entry
    const startNewEntry = () => {
        // Set content to an empty string, effectively deleting the "saved" entry
        setCurrentEntry(""); 
        // Reset images and emojis
        setCurrentImages([]);
        setCurrentEmojis([]);
        goToPage(6); // Navigate to the OpenJournal page
    };

    // Start a new entry with a specific prompt
    const startNewEntryWithPrompt = (prompt = '') => {
        // Set content to include the prompt
        setCurrentEntry(prompt ? `${prompt}\n\n` : "");
        // Reset images and emojis
        setCurrentImages([]);
        setCurrentEmojis([]);
        goToPage(6); // Navigate to the OpenJournal page
    };

    // Existing function for resuming the current draft
    const resumeCurrentEntry = () => {
        goToPage(6); // Navigate to the OpenJournal page without changing content
    };

    const renderPage = () => {
        switch(currentPage) {
            case 1:
                // LandingPage now passes mood to goToJournal
                return <LandingPage onMoodConfirm={goToJournal} />;
            case 2:
                // JournalPage now receives userMood
                return (
                    <JournalPage 
                        goToPage={goToPage} 
                        startNewEntry={startNewEntry}
                        startNewEntryWithPrompt={startNewEntryWithPrompt}
                        resumeCurrentEntry={resumeCurrentEntry}
                        entries={entries}
                        openEntry={openExistingEntry}
                        userName={userName}
                        profilePic={profilePic}
                        userMood={userMood} // Pass current mood
                    />
                ); 
            case 3:
                return (
                    <ProgressPage
                        goToPage={goToPage}
                        stats={stats}
                        userName={userName}
                        profilePic={profilePic}
                    />
                );
            case 4:
                return (
                    <ProfilePage
                        goToPage={goToPage}
                        stats={stats}
                        userName={userName}
                        profilePic={profilePic}
                        updateUserName={updateUserName}
                        updateProfilePic={updateProfilePic}
                    />
                );
            case 5:
                return (
                    <AllJournalsPage
                        goToPage={goToPage}
                        entries={entries}
                        openEntry={openExistingEntry}
                        userName={userName}
                        profilePic={profilePic}
                    />
                );
            case 6:
                return (
                    <OpenJournal 
                        goToPage={goToPage} 
                        initialContent={currentEntry}
                        initialImages={currentImages}
                        initialEmojis={currentEmojis}
                        onSave={saveAndGoToJournal}
                        onContentChange={setCurrentEntry}
                        onImagesChange={updateEntryImages}
                        onEmojisChange={updateEntryEmojis}
                        userName={userName}
                        profilePic={profilePic}
                    />
                );
                 case 7:
                    return (
                        <LevelUpPage 
                            level={2}
                            totalXp={0}
                            goToPage={goToPage}
                        />
                    );  
            default:
                return <LandingPage onMoodConfirm={goToJournal} />;
        }
    };

    return (
        <>
            {renderPage()}
        </>
    );
}

export default App;