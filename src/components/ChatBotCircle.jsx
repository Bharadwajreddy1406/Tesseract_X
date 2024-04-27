import React from 'react';
import { NavLink } from 'react-router-dom';

const ChatBotCircle = () => {
    return (
        <NavLink to="/interview" className="chat-bot-circle shadow-lg bg-teal-200  p-5 rounded-lg">
            Mock Interviews
        </NavLink>
    );
};

export default ChatBotCircle;