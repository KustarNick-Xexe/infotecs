import { useState, useEffect } from 'react';
const messages = ['пинаем сервер...', 'ищем пользователей...', 'ждем данные...'];

const Loader = () => {
    const [currentMessage, setCurrentMessage] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentMessage((prevMessage) => 
                prevMessage < messages.length - 1 ? prevMessage + 1 : 0
            );
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return <div>{messages[currentMessage]}</div>;
};

export default Loader;
