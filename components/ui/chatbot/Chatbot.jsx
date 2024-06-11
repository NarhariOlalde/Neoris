import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import TypingIndicator from './TypingIndicator';
import { useUser } from '../../../pages/context/UserContext'; 

// Importa tu icono aquí
import chatIcon from '/public/scb.jpeg'


const Chatbot = () => {
    const [expanded, setExpanded] = useState(false);
    const [inputText, setInputText] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [canSend, setCanSend] = useState(true);
    const chatHistoryRef = useRef(null);
    const latestMessageRef = useRef(null);
    const { user } = useUser(); 

    const handleToggle = () => {
        setExpanded(!expanded);
    };

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSendMessage = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        // Verificar si el mensaje no está vacío antes de enviarlo
        if (inputText.trim() === '') {
            alert('Please enter a message');
            return;
        }

        const userMessage = { sender: 'You', message: inputText };
        setChatHistory([...chatHistory, userMessage]);
        setInputText('');
        setIsTyping(true);
        setCanSend(false);

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/chat', {
                user_id: user.userId, 
                message: inputText
            });
            const chatbotResponse = { sender: 'Chatbot', message: response.data.response };
            setChatHistory((prevChatHistory) => [...prevChatHistory, chatbotResponse]);
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Error sending message, please try again.');
        } finally {
            setIsTyping(false);
            setCanSend(true);
        }
    };

    const handleChatHistory = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/chat/chathistory', {
                user_id: user.userId,
            });
            const { Previous_questions, Previous_responses } = response.data;
    
            const historyMessages = [...chatHistory]; // Copia el historial de chat existente
    
            const maxLength = Math.max(Previous_questions.length, Previous_responses.length);
    
            for (let i = 0; i < maxLength; i++) {
                if (Previous_questions[i]) {
                    historyMessages.push({
                        sender: 'You',
                        message: Previous_questions[i],
                    });
                }
                if (Previous_responses[i]) {
                    historyMessages.push({
                        sender: 'Chatbot',
                        message: Previous_responses[i],
                    });
                }
            }
    
            setChatHistory(historyMessages);
        } catch (error) {
            console.error('Error fetching chat history:', error);
            alert('Error fetching chat history, please try again.');
        }
    };
    
    

    useEffect(() => {
        if (latestMessageRef.current) {
            latestMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatHistory, isTyping]);

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                width: expanded ? '450px' : '50px',
                height: expanded ? '550px' : '50px',
                backgroundColor: expanded ? '#f0f0f0' : 'white',
                borderRadius: expanded ? '20px' : '50%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: expanded ? '#333' : 'white',
                cursor: 'pointer',
                transition: 'width 0.3s, height 0.3s, background-color 0.3s, border-radius 0.3s, color 0.3s',
                padding: '10px',
                zIndex: 10000
            }}
            onClick={!expanded ? handleToggle : undefined} // Solo permite abrir el chatbot al hacer clic en el contenedor
        >
            {/* Usar un icono cuando esté cerrado
            {!expanded && <img src={chatIcon} style={{ width: '30px', height: '30px', marginBottom: '10px' }} alt="Chatbot" />} */}

            <div
                ref={chatHistoryRef}
                style={{ display: expanded ? 'block' : 'none', marginBottom: '10px', overflowY: 'auto', flex: 1, width: '100%', padding: '10px' }}
            >
                {chatHistory.map((item, index) => (
                    <div
                        key={index}
                        ref={index === chatHistory.length - 1 ? latestMessageRef : null}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: item.sender === 'You' ? 'flex-end' : 'flex-start',
                            marginBottom: '10px',
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: item.sender === 'You' ? '#DCF8C6' : '#E5E5EA',
                                borderRadius: '10px',
                                padding: '10px',
                                maxWidth: '70%',
                            }}
                        >
                            {item.message}
                        </div>
                        <div style={{ textAlign: item.sender === 'You' ? 'right' : 'left', fontSize: '0.7rem', color: '#888', marginTop: '3px' }}>
                            {item.sender}
                        </div>
                    </div>
                ))}
                {isTyping && <TypingIndicator />}
            </div>
            {expanded && (
                <div
                    style={{ display: 'flex', alignItems: 'center', width: '100%' }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <input
                        type="text"
                        value={inputText}
                        onChange={handleInputChange}
                        placeholder="Type your message..."
                        style={{ flex: '1', padding: '5px', marginRight: '10px' }}
                        onClick={(e) => e.stopPropagation()}
                        disabled={!canSend}
                    />
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleSendMessage(e);
                        }}
                        style={{ padding: '5px 10px', borderRadius: '5px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
                        disabled={!canSend || inputText.trim() === ''}
                    >
                        Send
                    </button>
                </div>
            )}
            {expanded && (
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        handleChatHistory(); // Llama a la función handleChatHistory al hacer clic
                    }}
                    style={{ cursor: 'pointer', marginTop: '10px', color: '#007bff' }}
                >
                    Mostrar Historial del Chatbot
                </div>
            )}
            {expanded && (
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        handleToggle();
                    }}
                    style={{ cursor: 'pointer', marginTop: '10px', color: '#007bff' }}
                >
                    Cerrar
                </div>
            )}
        </div>
    );
};

export default Chatbot;
