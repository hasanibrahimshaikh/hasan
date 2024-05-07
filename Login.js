import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Form.css'; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [userType, setUserType] = useState('user');
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    const handleLogin = async () => {
        try {
            const selectedRole = document.querySelector('input[name="userType"]:checked');
            if (!selectedRole) {
                setErrorMessage('Please select a role.');
                return;
            }

            const role = selectedRole.value;

            const response = await axios.post('http://localhost:3000/auth/login', {
                username,
                password,
                role
            });

            const { token } = response.data;
            const message = response.data.message;

            
            localStorage.setItem('token', token);
            sessionStorage.setItem('loginMessage', message);
            sessionStorage.setItem("Data", JSON.stringify(response.data));
       
            setToken(token);
            
            if (role === 'admin') {
                window.location.href = '/admin';
            } else {
                window.location.href = '/homepage';
            }

            alert('Login Successful');
        } catch (error) {
            console.error('Login error:', error);
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="userType" id="user" value="user" checked={userType === 'user'} onChange={() => setUserType('user')} />
                <label className="form-check-label" htmlFor="user">Login as User</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="userType" id="admin" value="admin" checked={userType === 'admin'} onChange={() => setUserType('admin')} />
                <label className="form-check-label" htmlFor="admin">Login as Admin</label>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div>
                <p className="h6">Don't have an account!{" "}
                    <span> {" "}<button><a href="/register" className="rg"> Register here !</a> </button></span> </p>
            </div>
            <button className="login-button" onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
