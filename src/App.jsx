import React, { useState } from 'react';
import LandingPage from './LandingPage';
import JournalPage from './JournalPage';
import ProgressPage from './ProgressPage';
import ProfilePage from './ProfilePage';
import OpenJournal from './OpenJournal';


function App() {
    const [currentPage, setCurrentPage] = useState(1); 
    // Centralized state for the current journal entry content
    const [currentEntry, setCurrentEntry] = useState("Draft started at " + new Date().toLocaleTimeString());

    // Central function to handle all page switching
    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    // Specific function used by the LandingPage's 'Confirm' button
    const goToJournal = () => {
        goToPage(2);
    };

    // Function to handle saving and navigation from the OpenJournal page
    const saveAndGoToJournal = (content) => {
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
                    />
                ); 
            case 3:
                return <ProgressPage goToPage={goToPage} />;
            case 4:
                return <ProfilePage goToPage={goToPage} />;
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