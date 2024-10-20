import React, { useState } from "react";
import './Login.css';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdSendToMobile } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import axios from 'axios'; // Import Axios
import ParticlesComponent from "../../../components/ParticlesComponent";

const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(''); // State to hold server errors
    const navigate = useNavigate();

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
        const { email, password } = input;

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
                const response = await axios.post("http://localhost:5000/login", {
                    email: input.email,
                    password: input.password
                });

                // Check if the response contains a success message
                if (response.data.message === "Login successful") {
                    alert("Login Successful");
                    navigate("/"); // Navigate to the Event page on successful login
                } else {
                    setError("Login failed. Please check your credentials.");
                }
            } catch (err) {
                console.error(err); // Log the error for debugging
                if (err.response && err.response.data && err.response.data.message) {
                    setError(err.response.data.message); // Display the server error message
                } else {
                    setError("An error occurred. Please try again."); // Generic error message
                }
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="body">
            <ParticlesComponent />
            <div className="wrapper">
                <div className="form-box login">
                    <form onSubmit={handleLogin}>
                        <h1>Login</h1>
                        {error && <div className="error">{error}</div>} {/* Display error message */}
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
                            <Link to="/ResetPassword" className="pr">Forgot Password?</Link>
                        </div>
                        <button type="submit" className="btn">
                            <MdSendToMobile className="ph" />
                            Login
                        </button>
                        <div className="register-link">
                            <p>Don't have an account? <Link to="/Register">Register</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
