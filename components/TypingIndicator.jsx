import React, { useEffect } from 'react';

const TypingIndicator = () => {
    useEffect(() => {
        // Definir la animación como una cadena de texto
        const blinkAnimation = `@keyframes blink {
            0% { opacity: 0.2; }
            20% { opacity: 1; }
            100% { opacity: 0.2; }
        }`;

        // Agregar la animación al estilo global
        const globalStyle = document.createElement('style');
        globalStyle.innerHTML = blinkAnimation;
        document.head.appendChild(globalStyle);

        // Limpieza para eliminar el estilo cuando el componente se desmonte
        return () => {
            document.head.removeChild(globalStyle);
        };
    }, []);

    return (
        <div style={styles.typingIndicator}>
            <div style={styles.bubble}></div>
            <div style={styles.bubble}></div>
            <div style={styles.bubble}></div>
        </div>
    );
};

const styles = {
    typingIndicator: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '30px',
        marginBottom: '5px',
    },
    bubble: {
        width: '8px',
        height: '8px',
        margin: '0 2px',
        backgroundColor: '#ccc',
        borderRadius: '50%',
        animation: 'blink 1.4s infinite both', // Utilizar el nombre de la animación aquí
    },
};

export default TypingIndicator;
