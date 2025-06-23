import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const MobileLogin = () => {
    const [uName, setUName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (uName === 'Ankani' && password === '902571') {
            navigate('/dashboard')
        }
    };

    return (
        <div className="mobile-login-body">
            <div className="login-container">
                <h2>Login</h2>
                <form >
                    <input type="text" placeholder="Username" required value={uName} onChange={(e) => setUName(e.target.value)} />
                    <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" onClick={(e) => handleSubmit(e)}>Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default MobileLogin;
