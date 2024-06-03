import React, { useState } from 'react';

const Chatbot = () => {
    const [expanded, setExpanded] = useState(false);
    const [inputText, setInputText] = useState('');

    const handleClick = () => {
        setExpanded(!expanded);
    };

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSendMessage = () => {
        // Handle sending message functionality here
        console.log('Message sent:', inputText);
        setInputText(''); // Clear input field after sending message
    };

    const handleInputClick = (e) => {
        e.stopPropagation(); // Prevent click event from bubbling up
    };

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                width: expanded ? '300px' : '50px',
                height: expanded ? '400px' : '50px',
                backgroundColor: expanded ? '#f0f0f0' : 'blue',
                borderRadius: expanded ? '20px' : '50%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: expanded ? '#333' : 'white',
                cursor: 'pointer',
                transition: 'width 0.3s, height 0.3s, background-color 0.3s, border-radius 0.3s, color 0.3s',
                padding: '10px',
            }}
            onClick={handleClick}
        >
            <div style={{ display: expanded ? 'block' : 'none', marginBottom: '10px' }}>
                {/* Actual chat content goes here */}
                <div>Chatbot: Hi there!</div>
            </div>
            {expanded && (
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <input
                        type="text"
                        value={inputText}
                        onChange={handleInputChange}
                        onClick={handleInputClick} 
                        placeholder="Type your message..."
                        style={{ flex: '1', padding: '5px', marginRight: '10px' }}
                    />
                    <button onClick={handleSendMessage} style={{ padding: '5px 10px', borderRadius: '5px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>Send</button>
                </div>
            )}
            <div>{expanded ? 'Close' : 'Chatbot'}</div>
        </div>
    );
};

export default Chatbot;
