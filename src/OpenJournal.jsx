import React, { useState, useEffect, useRef } from 'react';
import './OpenJournal.css'; 

// Placeholder Icons
const HomeIcon = '🏠';
const UploadIcon = '🖼️';
const SaveIcon = '💾';
const ThemeIcon = '🎨';

// Emoji presets
const EMOJI_PRESETS = [
  { id: 'heart', emoji: '❤️', name: 'Heart' },
  { id: 'sparkle', emoji: '✨', name: 'Sparkle' },
  { id: 'star', emoji: '⭐', name: 'Star' },
  { id: 'flower', emoji: '🌸', name: 'Flower' },
  { id: 'sun', emoji: '☀️', name: 'Sun' },
  { id: 'moon', emoji: '🌙', name: 'Moon' },
  { id: 'cloud', emoji: '☁️', name: 'Cloud' },
  { id: 'rainbow', emoji: '🌈', name: 'Rainbow' },
  { id: 'butterfly', emoji: '🦋', name: 'Butterfly' },
  { id: 'unicorn', emoji: '🦄', name: 'Unicorn' },
  { id: 'crystal', emoji: '🔮', name: 'Crystal' },
  { id: 'fire', emoji: '🔥', name: 'Fire' },
  { id: 'water', emoji: '💧', name: 'Water' },
  { id: 'earth', emoji: '🌱', name: 'Earth' },
  { id: 'air', emoji: '💨', name: 'Air' },
  { id: 'music', emoji: '🎵', name: 'Music' },
  { id: 'book', emoji: '📖', name: 'Book' },
  { id: 'pen', emoji: '🖋️', name: 'Pen' },
  { id: 'key', emoji: '🔑', name: 'Key' },
  { id: 'crown', emoji: '👑', name: 'Crown' }
];

// Theme presets
const THEME_PRESETS = [
  { id: 'default', name: 'Default', bg: 'url("IMG_0802.PNG")', textColor: '#ffffff' },
  { id: 'sunset', name: 'Sunset', bg: 'linear-gradient(135deg, #ff6b6b 0%, #ff9e6b 50%, #ffd93d 100%)', textColor: '#ffffff' },
  { id: 'ocean', name: 'Ocean', bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', textColor: '#ffffff' },
  { id: 'forest', name: 'Forest', bg: 'linear-gradient(135deg, #0ba360 0%, #3cba92 100%)', textColor: '#ffffff' },
  { id: 'galaxy', name: 'Galaxy', bg: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', textColor: '#ffffff' },
  { id: 'cottoncandy', name: 'Cotton Candy', bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', textColor: '#333333' },
  { id: 'lavender', name: 'Lavender', bg: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', textColor: '#333333' },
  { id: 'midnight', name: 'Midnight', bg: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)', textColor: '#ffffff' },
  { id: 'rosegold', name: 'Rose Gold', bg: 'linear-gradient(135deg, #ffafbd 0%, #ffc3a0 100%)', textColor: '#333333' },
  { id: 'aurora', name: 'Aurora', bg: 'linear-gradient(135deg, #00dbde 0%, #fc00ff 100%)', textColor: '#ffffff' }
];

const OpenJournal = ({ 
    goToPage, 
    initialContent, 
    initialImages = [], 
    initialEmojis = [], // ADD THIS
    onSave, 
    onContentChange, 
    onImagesChange,
    onEmojisChange // ADD THIS
}) => {
    const [isSaving, setIsSaving] = useState(false);
    const [uploadedImages, setUploadedImages] = useState(initialImages);
    const [draggedImage, setDraggedImage] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showThemePicker, setShowThemePicker] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState(THEME_PRESETS[0]);
    const [emojiStickers, setEmojiStickers] = useState(initialEmojis); // Use initialEmojis
    const [draggedEmoji, setDraggedEmoji] = useState(null);
    const fileInputRef = useRef(null);

    // Update parent component when images change
    useEffect(() => {
        if (onImagesChange) {
            onImagesChange(uploadedImages);
        }
    }, [uploadedImages, onImagesChange]);

    // NEW: Update parent component when emojis change
    useEffect(() => {
        if (onEmojisChange) {
            onEmojisChange(emojiStickers);
        }
    }, [emojiStickers, onEmojisChange]);

    // Function to show cute notifications
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
        if (!document.querySelector('#mini-galaxy-styles')) {
            const style = document.createElement('style');
            style.id = 'mini-galaxy-styles';
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
        
        // Remove notification after animation
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 2000);
        
        return notification;
    };

    useEffect(() => {
        const autoSaveTimer = setTimeout(() => {
            if (initialContent.length > 0) {
                setIsSaving(true);
                console.log(`Auto-saving entry: "${initialContent.substring(0, 30)}..."`);
                
                // Show cute autosave notification
                showCuteNotification('saving', 'Auto-saving', 'Your thoughts are being saved...');
                
                setTimeout(() => {
                    setIsSaving(false);
                }, 1000); 
            }
        }, 3000); 
        return () => clearTimeout(autoSaveTimer);
    }, [initialContent]);

    const handleTextareaChange = (e) => {
        onContentChange(e.target.value); 
    };

    const handleFinalSave = () => {
        setIsSaving(true);
        
        // Show saving notification
        showCuteNotification('saving', 'Saving...', 'Preserving your memories...');
        
        // Save the content (images are already in state and will be saved by parent)
        onSave(initialContent);
        
        // Show success and navigate after delay
        setTimeout(() => {
            setIsSaving(false);
            showCuteNotification('success', 'Saved!', `Journal entry with ${uploadedImages.length} image(s) and ${emojiStickers.length} emoji(s) secured! ✨`);            
            setTimeout(() => {
                goToPage(2); // Navigate back to Journal Page
            }, 1000);
        }, 1000);
    };

    // Handle image upload
    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        
        if (files.length === 0) return;
        
        let validImages = 0;
        
        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                validImages++;
                const reader = new FileReader();
                
                reader.onload = (e) => {
                    const newImage = {
                        id: Date.now() + Math.random(),
                        src: e.target.result,
                        name: file.name,
                        size: file.size,
                        position: { x: 50, y: 50 } // Default position
                    };
                    
                    setUploadedImages(prev => [...prev, newImage]);
                    
                    // Show success notification for each image
                    if (validImages === 1) {
                        showCuteNotification('success', 'Photo Added!', 'Image uploaded successfully! 📸');
                    }
                };
                
                reader.readAsDataURL(file);
            } else {
                showCuteNotification('error', 'Oops!', 'Please select image files only! 🖼️');
            }
        });
        
        if (validImages > 1) {
            setTimeout(() => {
                showCuteNotification('success', 'Photos Added!', `${validImages} images uploaded! 🎉`);
            }, 300);
        }
        
        event.target.value = '';
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const removeImage = (imageId) => {
        setUploadedImages(prev => prev.filter(img => img.id !== imageId));
        showCuteNotification('info', 'Removed', 'Photo removed from journal 📤');
    };

    // Emoji functions
    const addEmojiSticker = (emojiObj) => {
        const newEmoji = {
            id: Date.now() + Math.random(),
            emoji: emojiObj.emoji,
            name: emojiObj.name,
            position: { x: 50, y: 50 }, // Default position
            size: 40 // Default size
        };
        
        setEmojiStickers(prev => [...prev, newEmoji]);
        setShowEmojiPicker(false);
        showCuteNotification('success', 'Sticker Added!', `${emojiObj.name} sticker placed! ${emojiObj.emoji}`);
    };

    const removeEmojiSticker = (emojiId) => {
        setEmojiStickers(prev => prev.filter(emoji => emoji.id !== emojiId));
    };

    // Theme functions
    const selectTheme = (theme) => {
        setSelectedTheme(theme);
        setShowThemePicker(false);
        showCuteNotification('info', 'Theme Applied!', `${theme.name} theme activated! 🎨`);
    };

    // Drag and drop functions for images
    const handleImageDragStart = (e, imageId) => {
        setDraggedImage(imageId);
        e.dataTransfer.setData('text/plain', `image-${imageId}`);
        e.currentTarget.style.opacity = '0.4';
    };

    const handleImageDragEnd = (e) => {
        e.currentTarget.style.opacity = '1';
        setDraggedImage(null);
    };

    // Drag and drop functions for emojis
    const handleEmojiDragStart = (e, emojiId) => {
        setDraggedEmoji(emojiId);
        e.dataTransfer.setData('text/plain', `emoji-${emojiId}`);
        e.currentTarget.style.opacity = '0.4';
    };

    const handleEmojiDragEnd = (e) => {
        e.currentTarget.style.opacity = '1';
        setDraggedEmoji(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        
        const writingCanvas = e.currentTarget;
        const rect = writingCanvas.getBoundingClientRect();
        
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        if (draggedImage) {
            // Update image position
            setUploadedImages(prev => 
                prev.map(img => 
                    img.id === draggedImage 
                        ? { ...img, position: { x, y } }
                        : img
                )
            );
        } else if (draggedEmoji) {
            // Update emoji position
            setEmojiStickers(prev => 
                prev.map(emoji => 
                    emoji.id === draggedEmoji 
                        ? { ...emoji, position: { x, y } }
                        : emoji
                )
            );
        }
    };

    return (
        <div className="mobile-screen journal-writing-screen">
            
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                multiple
                style={{ display: 'none' }}
            />
            
            <header className="writing-toolbar">
                <button 
                    onClick={() => goToPage(2)}
                    className="toolbar-button home-button"
                >
                    {HomeIcon} Home
                </button>

                <div className="customization-tools">
                    {/* Emoji Picker Button */}
                    <button 
                        onClick={() => {
                            setShowEmojiPicker(!showEmojiPicker);
                            setShowThemePicker(false);
                        }}
                        className="toolbar-button emoji-button"
                    >
                        😊 Emoji
                    </button>
                    
                    <button 
                        onClick={triggerFileInput}
                        className="toolbar-button upload-button"
                    >
                        {UploadIcon} Upload
                    </button>
                    
                    {/* Theme Picker Button */}
                    <button 
                        onClick={() => {
                            setShowThemePicker(!showThemePicker);
                            setShowEmojiPicker(false);
                        }}
                        className="toolbar-button theme-button"
                    >
                        {ThemeIcon} Theme
                    </button>
                </div>

                <button 
                    onClick={handleFinalSave}
                    className={`toolbar-button save-button ${isSaving ? 'saving' : ''}`}
                    disabled={isSaving}
                >
                    {isSaving ? 'Saving...' : `${SaveIcon} Save`}
                </button>
            </header>

            {/* Emoji Picker Overlay - HORIZONTAL SCROLLABLE */}
            {showEmojiPicker && (
                <div className="emoji-picker-overlay">
                    <div className="emoji-picker">
                        <div className="emoji-picker-header">
                            <h3>✨ Emoji Stickers ✨</h3>
                            <button 
                                className="close-picker-btn"
                                onClick={() => setShowEmojiPicker(false)}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="emoji-horizontal-scroll">
                            {EMOJI_PRESETS.map(emoji => (
                                <button
                                    key={emoji.id}
                                    className="emoji-option"
                                    onClick={() => addEmojiSticker(emoji)}
                                    title={emoji.name}
                                >
                                    {emoji.emoji}
                                </button>
                            ))}
                        </div>
                        <p className="emoji-instruction">Scroll sideways to see more emojis! 👉</p>
                    </div>
                </div>
            )}

            {/* Theme Picker Overlay */}
            {showThemePicker && (
                <div className="theme-picker-overlay">
                    <div className="theme-picker">
                        <div className="theme-picker-header">
                            <h3>🎨 Theme Selector 🎨</h3>
                            <button 
                                className="close-picker-btn"
                                onClick={() => setShowThemePicker(false)}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="theme-grid">
                            {THEME_PRESETS.map(theme => (
                                <button
                                    key={theme.id}
                                    className="theme-option"
                                    onClick={() => selectTheme(theme)}
                                    style={{ background: theme.bg }}
                                    title={theme.name}
                                >
                                    <span className="theme-name">{theme.name}</span>
                                </button>
                            ))}
                        </div>
                        <p className="theme-instruction">Click a theme to apply it!</p>
                    </div>
                </div>
            )}

            {/* Writing Canvas with current theme applied */}
            <main 
                className="writing-canvas"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                style={{ 
                    background: selectedTheme.bg,
                    color: selectedTheme.textColor
                }}
            >
                <textarea
                    placeholder="Start writing here..."
                    value={initialContent}
                    onChange={handleTextareaChange}
                    className="journal-textarea"
                    style={{ color: selectedTheme.textColor }}
                />
                
                {/* Uploaded Images */}
                {uploadedImages.map(image => (
                    <div
                        key={image.id}
                        className="image-item draggable"
                        style={{
                            position: 'absolute',
                            left: `${image.position.x}%`,
                            top: `${image.position.y}%`,
                            transform: 'translate(-50%, -50%)',
                            zIndex: 10
                        }}
                        draggable
                        onDragStart={(e) => handleImageDragStart(e, image.id)}
                        onDragEnd={handleImageDragEnd}
                    >
                        <img 
                            src={image.src} 
                            alt="Uploaded" 
                            className="uploaded-image" 
                            draggable="false"
                        />
                        <button 
                            onClick={() => removeImage(image.id)}
                            className="remove-image-btn"
                        >
                            ✕
                        </button>
                    </div>
                ))}
                
                {/* Emoji Stickers */}
                {emojiStickers.map(sticker => (
                    <div
                        key={sticker.id}
                        className="emoji-sticker draggable"
                        style={{
                            position: 'absolute',
                            left: `${sticker.position.x}%`,
                            top: `${sticker.position.y}%`,
                            transform: 'translate(-50%, -50%)',
                            fontSize: `${sticker.size}px`,
                            zIndex: 11
                        }}
                        draggable
                        onDragStart={(e) => handleEmojiDragStart(e, sticker.id)}
                        onDragEnd={handleEmojiDragEnd}
                    >
                        {sticker.emoji}
                        <button 
                            onClick={() => removeEmojiSticker(sticker.id)}
                            className="remove-emoji-btn"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </main>

            {isSaving && <div className="autosave-feedback">Autosaving...</div>}
        </div>
    );
};

export default OpenJournal;