import React, { useState } from "react";
import './Register.css'; // Assuming you'll style it similar to your reset password form
import { FaLock, FaEye, FaEyeSlash, FaEnvelope, FaUser, FaIdBadge, FaBuilding } from "react-icons/fa"; // Icons for each field
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';
import ParticlesComponent from "../../../components/ParticlesComponent";
const Register = () => {
    const [input, setInput] = useState({
        name: '',
        regno: '',
        department: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [serverMessage, setServerMessage] = useState(""); // To handle backend responses
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
        const { name, regno, department, email, password, confirmPassword } = input;

        if (!name) {
            isValid = false;
            errors.name = "Please provide your name.";
        }

        if (!regno) {
            isValid = false;
            errors.regno = "Please provide your register number.";
        }

        if (!department) {
            isValid = false;
            errors.department = "Please provide your department.";
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

        if (password.trim() !== confirmPassword.trim()) {
            isValid = false;
            errors.confirmPassword = "Passwords do not match.";
        }
        

        setErrors(errors);
        return isValid;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        
        if (validate()) {
            try {
                
                const response = await axios.post("http://localhost:5000/register", {
                    name: input.name,
                    regno: input.regno,
                    department: input.department,
                    email: input.email,
                    password: input.password,
                    confirmPassword: input.confirmPassword
                });
    
                console.log(response);  // Log response here
                alert(JSON.stringify(response.data)); // Ensure response data is alerted
    
                if (response.status === 201) {
                    setServerMessage("Registration successful!");
                    setInput({ name: '', regno: '', department: '', email: '', password: '', confirmPassword: '' });
                    alert("Registration Successful");
                    setTimeout(() => {
                        navigate("/");
                    }, 2000);
                }
            } catch (err) {
                if (err.response && err.response.data && err.response.data.message) {
                    setServerMessage(err.response.data.message);
                } else {
                    setServerMessage("Server error, please try again later.");
                }
            }
        }
    };
    
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    
    return (
        <div className="body">
             <ParticlesComponent/>
        <div className="wrapper1">
           
            <div className="form-box">
                <form className="form" onSubmit={handleRegister}>
                    <h1>Register</h1>

                    <div className="input-box">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={input.name}
                            onChange={handleChange}
                            required
                        />
                        <FaUser className="icon2" /> {/* Name icon */}
                        {errors.name && <div className="error">{errors.name}</div>}
                    </div>

                    <div className="input-box">
                        <input
                            type="text"
                            name="regno"
                            placeholder="Register Number"
                            value={input.regno}
                            onChange={handleChange}
                            required
                        />
                        <FaIdBadge className="icon2" /> {/* Register number icon */}
                        {errors.regno && <div className="error">{errors.regno}</div>}
                    </div>

                    <div className="input-box">
                        <input
                            type="text"
                            name="department"
                            placeholder="Department"
                            value={input.department}
                            onChange={handleChange}
                            required
                        />
                        <FaBuilding className="icon2" /> {/* Department icon */}
                        {errors.department && <div className="error">{errors.department}</div>}
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
                        <FaEnvelope className="icon2" /> {/* Email icon */}
                        {errors.email && <div className="error">{errors.email}</div>}
                    </div>

                    <div className="input-box">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            name="password"
                            value={input.password}
                            onChange={handleChange}
                            required
                        />
                        <FaLock className="icon2" /> {/* Password lock icon */}
                        <span className="password-toggle" onClick={togglePasswordVisibility}>
                            {showPassword ? <FaEye className="icon3"/> : <FaEyeSlash className="icon3"/>} {/* Toggle icon */}
                        </span>
                        <div className="password-hint">Password must be 8-12 characters long, contain at least one uppercase letter, one lowercase letter, one special character [!,@,#,$,%,^,&,*,(,)], and one number.</div>
                        {errors.password && <div className="error">{errors.password}</div>}
                    </div>

                    <div className="input-box">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={input.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <FaLock className="icon2" /> {/* Confirm password lock icon */}
                        <span className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
                            {showConfirmPassword ? <FaEye className="icon3"/> : <FaEyeSlash className="icon3"/>} {/* Toggle icon */}
                        </span>
                        {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
                    </div>

                    <button type="submit" className="res">Register</button>

                    {serverMessage && <div className="server-message">{serverMessage}</div>}
                </form>
            </div>
        </div>
        </div>
    );
};

export default Register;
