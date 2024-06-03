import React, { useState } from 'react';

// Historia #6
// Título: Crear página de preguntas frecuentes (FAQ) con preguntas y respuestas
const FAQPage = () => {
    const [faqs, setFaqs] = useState([
        { question: 'Question 1', answer: 'Answer 1' },
        { question: 'Question 2', answer: 'Answer 2' },
        { question: 'Question 3', answer: 'Answer 3' },
    ]);

    const handleQuestionClick = (index) => {
        setFaqs((prevFaqs) => {
            const updatedFaqs = [...prevFaqs];
            updatedFaqs[index].isOpen = !updatedFaqs[index].isOpen;
            return updatedFaqs;
        });
    };

    return (
        <div>
            <h1>FAQ Page</h1>
            {faqs.map((faq, index) => (
                <div key={index}>
                    <h3 onClick={() => handleQuestionClick(index)}>{faq.question}</h3>
                    {faq.isOpen && <p>{faq.answer}</p>}
                </div>
            ))}
        </div>
    );
};

export default FAQPage;