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

    // list of all saved journal entries
    // each entry has shape { id, content, wordCount, date }
    const [entries, setEntries] = useState([]);

    // progress stats for xp and streak
    const [stats, setStats] = useState(initialStats);

    // Central function to handle all page switching
    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    // Specific function used by the LandingPage's 'Confirm' button
    const goToJournal = () => {
        goToPage(7);
    };

    // Function to open an existing journal entry for editing
    const openExistingEntry = (entryId) => {
        const entry = entries.find(e => e.id === entryId);
        if (!entry) return;

        // load the content into the current draft
        setCurrentEntry(entry.content);

        // go to the OpenJournal writing screen
        goToPage(6);   // keep the same page number you already use for OpenJournal
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

        // ⭐ LEVEL UP DETECTION — ADD THIS
        if (newLevel > oldLevel) {
        setCurrentPage(7); // go to your new LevelUpPage
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
        const wordCount =
        trimmed === '' ? 0 : trimmed.split(/\s+/).length;

        const today = new Date();
        const todayKey = today.toISOString().slice(0, 10);

        // create a new entry object and store at top of list
        const newEntry = {id: Date.now(), content, wordCount, date: todayKey,};

        setEntries((prev) => [newEntry, ...prev]);

        updateStatsForSavedEntry(wordCount, todayKey);

        setCurrentEntry(content); // Update the final content
        // In a real app, this is where you'd dispatch the data to Firebase/backend
        console.log("FINAL SAVE to App State:", content.substring(0, 30) + '...');
        goToPage(2); // Go back to the Journal (Home) Page
    };

    // Resets the state for a new entry
    const startNewEntry = () => {
        // Set content to an empty string, effectively deleting the "saved" entry
        setCurrentEntry(""); 
        goToPage(6); // Navigate to the OpenJournal page
    };

    // Existing function for resuming the current draft
    const resumeCurrentEntry = () => {
        goToPage(6); // Navigate to the OpenJournal page without changing content
    };

    const renderPage = () => {
        switch(currentPage) {
            case 1:
                return <LandingPage onMoodConfirm={goToJournal} />;
            case 2:
                // JournalPage receives the two distinct action handlers
                return (
                    <JournalPage 
                        goToPage={goToPage} 
                        startNewEntry={startNewEntry}       // Passed to the "+ New Journal" button
                        resumeCurrentEntry={resumeCurrentEntry} // Passed to "Current Journal" & "Resume Last Entry"
                        entries={entries}
                        openEntry={openExistingEntry}
                    />
                ); 
            case 3:
                return (
                    <ProgressPage
                        goToPage={goToPage}
                        stats={stats}
                    />
                );
            case 4:
                return (
                    <ProfilePage
                        goToPage={goToPage}
                        stats={stats}
                    />
                );
            case 5:
                return (
                    <AllJournalsPage
                        goToPage={goToPage}
                        entries={entries}
                        openEntry={openExistingEntry}
                    />
                );
            case 6:
                // OpenJournal receives the content and the update/save handlers
                return (
                    <OpenJournal 
                        goToPage={goToPage} 
                        initialContent={currentEntry}
                        onSave={saveAndGoToJournal}
                        onContentChange={setCurrentEntry}
                    />
                );
                 case 7:
                    return (
                        <LevelUpPage 
                            level={stats.level}
                            totalXp={stats.totalXp}
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