import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Form.css'; 

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState('user'); 
    const [errorMessage, setErrorMessage] = useState('');
    const [registerSuccessMessage, setRegisterSuccessMessage] = useState(''); 


    const resetMessages = () => {
        setErrorMessage('');
        setRegisterSuccessMessage('');
    };

    const handleRegister = async () => {
        try {
            resetMessages(); 

            // Validation
            if (!username || !password || !confirmPassword) {
                setErrorMessage('All fields are required.');
                return;
            }

            if (password !== confirmPassword) {
                setErrorMessage("Passwords don't match.");
                return;
            }

            if (username.length > 20) {
                setErrorMessage('Username cannot exceed 20 characters.');
                return;
            }

            if (password.length < 8 || password.length > 20) {
                setErrorMessage('Password must be between 8 and 20 characters.');
                return;
            }
            const response = await axios.post('http://localhost:3000/auth/register', {
                username,
                password,
                role: userType 
            });
          
            setRegisterSuccessMessage('Registration Successful');
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000); 
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="register-container">
            <h1>Register</h1>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div className="form-group">
                <label>User Type:</label>
                <div>
                    <input type="radio" id="user" name="userType" value="user" checked={userType === 'user'} onChange={() => setUserType('user')} />
                    <label htmlFor="user">User</label>
                </div>
               
                <div>
                    <p className="h6">Already have an account!{" "}
                        <span> {" "}<button><a href="/login" className="rg"> Login here !</a></button> </span> 
                    </p>
                </div>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {registerSuccessMessage && <p className="success-message">{registerSuccessMessage}</p>} {/* Display success message */}
            <button className="register-button" onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;
