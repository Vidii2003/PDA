import React, { useState } from "react";
import './AdminLogin.css';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaKey } from "react-icons/fa";
import { MdSendToMobile } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ParticlesComponent from "../../../components/ParticlesComponent";

const AdminLogin = () => {
    const [action, setAction] = useState('');
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        email: '',
        password: '',
        secretKey: '' // State for secret key
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); // Use for navigation after successful form submission

    const correctSecretKey = "PDA_Admin*1999"; // Set your desired secret key here

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value
        }));
    };

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };

    const validate = () => {
        let isValid = true;
        let errors = {};
        const { email, password, secretKey } = input;

        if (secretKey !== correctSecretKey) {
            isValid = false;
            errors.secretKey = "Incorrect secret key.";
        }

        if (!validateEmail(email)) {
            isValid = false;
            errors.email = "Please provide a valid email address.";
        }

        const minLength = 8;
        const maxLength = 12;
        const uppercaseRegEx = /[A-Z]/;
        const lowercaseRegEx = /[a-z]/;
        const specialCharRegEx = /[!,@,#,$,%,^,&,*,(,)]/;
        const number = /[0-9]/;

        if (password.length < minLength || password.length > maxLength) {
            isValid = false;
            errors.password = `Password must be between ${minLength} and ${maxLength} characters long.`;
        }

        if (!uppercaseRegEx.test(password)) {
            isValid = false;
            errors.password = "Password must contain at least one uppercase letter.";
        }

        if (!lowercaseRegEx.test(password)) {
            isValid = false;
            errors.password = "Password must contain at least one lowercase letter.";
        }

        if (!specialCharRegEx.test(password)) {
            isValid = false;
            errors.password = "Password must contain at least one special character.";
        }

        if (!number.test(password)) {
            isValid = false;
            errors.password = "Password must contain at least one number.";
        }

        setErrors(errors);
        return isValid;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await axios.post('http://localhost:5000/AdminLogin', {
                    email: input.email,
                    password: input.password,
                });

                if (response.data.message === "Admin login successful") {
                    alert("Login Successful!");
                    // Clear input fields
                    setInput({
                        email: '',
                        password: '',
                        secretKey: '' // Clear the secret key after successful login
                    });
                    navigate("/Admin/Dashboard"); // Navigate to dashboard after successful login
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    alert(error.response.data.message); // Show error message from server
                } else {
                    alert("Server error, please try again later.");
                }
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="body">
        <div className={`wrapper ${action}`}>
            <div className="form-box login">
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            name="secretKey"
                            placeholder="Secret Key"
                            value={input.secretKey}
                            onChange={handleChange}
                            required
                        />
                        <FaKey className="icon" />
                        {errors.secretKey && <div className="error">{errors.secretKey}</div>}
                    </div>
                    <div className="input-box">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email ID"
                            value={input.email}
                            onChange={handleChange}
                            required
                        />
                        <FaEnvelope className="icon" />
                        {errors.email && <div className="error">{errors.email}</div>}
                    </div>
                    <div className="input-box">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            name="password"
                            value={input.password}
                            onChange={handleChange}
                            minLength="8"
                            maxLength="12"
                            required
                        />
                        <FaLock className="icon" />
                        <span className="password-toggle" onClick={togglePasswordVisibility}>
                            {showPassword ? <FaEye className="icon1" /> : <FaEyeSlash className="icon1" />}
                        </span>
                        <div className="password-hint">
                            Password must be 8-12 characters long, contain at least one uppercase letter, one lowercase letter, one special character[!,@,#,$,%,^,&,*,(,)], and one number.
                        </div>
                        {errors.password && <div className="error">{errors.password}</div>}
                    </div>

                    <div className="remember-forgot">
                        <Link to="/Admin/ResetPassword" className="pr">Forgot Password?</Link>
                    </div>

                    <button type="submit" className="btn">
                        <MdSendToMobile className="ph" />
                        Login
                    </button>

                    <div className="register-link">
                        <p>Don't have an account? <Link to="/Admin/Register">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
};

export default AdminLogin;
