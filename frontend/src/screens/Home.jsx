import React from 'react'
import { useState } from 'react';

export const Home = ({ user, onLogout }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleLogout = () => {
        onLogout();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() !== '') {
            const newMessage = {
                text: message,
                timestamp: new Date().toLocaleString(),
            };
            setMessages([...messages, newMessage]);
            setMessage('');
        }
    };

    return (
        <div className='container mt-3'>
            <h2>Welcome, {user.name}!</h2>
            <p>Email: {user.email}</p>
            <p>Mobile Number: {user.mobilenumber}</p>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>

            <h3>Leave a Message</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        rows="3"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write your message here..."
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            <h3>Messages</h3>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg.text} - {msg.timestamp}</li>
                ))}
            </ul>
        </div>
    )
}
