import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Form.css';

const Logout = () => {
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3000/auth/logout');

            localStorage.removeItem('token');

            window.alert('Logout Successful');

            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className="logout">
            <h1>Thank You For Visiting Us.....</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
