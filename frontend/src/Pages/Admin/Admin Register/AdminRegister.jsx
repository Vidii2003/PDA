import React, { useState } from "react";
import './AdminRegister.css';
import { FaLock, FaEye, FaEyeSlash, FaEnvelope, FaUser, FaIdBadge, FaBuilding, FaKey, FaUserTie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ParticlesComponent from "../../../components/ParticlesComponent";

const AdminRegister = () => {
    const [input, setInput] = useState({
        secretKey: '',
        name: '',
        regno: '',
        department: '',
        roleType: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showSecretKey, setShowSecretKey] = useState(false);
    const [errors, setErrors] = useState({});
    const [serverMessage, setServerMessage] = useState(""); // Added state for server messages
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
        const { secretKey, name, email, password, regno, department, roleType, confirmPassword } = input;

        // Validate secret key
        const validSecretKey = "PDA_Admin*1999";
        if (secretKey !== validSecretKey) {
            isValid = false;
            errors.secretKey = "Invalid Secret Key.";
        }

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

        if (!roleType) {
            isValid = false;
            errors.roleType = "Please provide your role type.";
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

        if (password !== confirmPassword) {
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
                const response = await axios.post("http://localhost:5000/AdminRegister", {
                    name: input.name,
                    email: input.email,
                    password: input.password,
                    regno: input.regno,
                    department: input.department,
                    roleType: input.roleType
                });

                console.log(response);
                alert(JSON.stringify(response.data));

                if (response.status === 201) {
                    setServerMessage("Registration successful!");
                    setInput({ 
                        name: '', 
                        email: '', 
                        password: '', 
                        regno: '', 
                        department: '', 
                        roleType: '', 
                    });
                    alert("Registration Successful");
                    setTimeout(() => {
                        navigate("/Admin/Login");
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

    const toggleSecretKeyVisibility = () => {
        setShowSecretKey(!showSecretKey);
    };

    return (
        <div className="body">
            <ParticlesComponent />
            <div className="wrapper2">
                <div className="form-box1">
                    <form className="form" onSubmit={handleRegister}>
                        <h1>Register</h1>

                        {/* Display server message */}
                        {serverMessage && <div className="server-message">{serverMessage}</div>}

                        <div className="input-box">
                            <input
                                type={showSecretKey ? "text" : "password"}
                                name="secretKey"
                                placeholder="Secret Key"
                                value={input.secretKey}
                                onChange={handleChange}
                                required
                            />
                            <FaKey className="icon2" />
                            <span className="password-toggle" onClick={toggleSecretKeyVisibility}>
                                {showSecretKey ? <FaEye className="icon3"/> : <FaEyeSlash className="icon3"/>}
                            </span>
                            {errors.secretKey && <div className="error">{errors.secretKey}</div>}
                        </div>

                        <div className="input-box">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={input.name}
                                onChange={handleChange}
                                required
                            />
                            <FaUser className="icon2" />
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
                            <FaIdBadge className="icon2" />
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
                            <FaBuilding className="icon2" />
                            {errors.department && <div className="error">{errors.department}</div>}
                        </div>

                        <div className="input-box">
                            <input
                                type="text"
                                name="roleType"
                                placeholder="Role Type"
                                value={input.roleType}
                                onChange={handleChange}
                                required
                            />
                            <FaUserTie className="icon2" />
                            {errors.roleType && <div className="error">{errors.roleType}</div>}
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
                            <FaEnvelope className="icon2" />
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
                            <FaLock className="icon2" />
                            <span className="password-toggle" onClick={togglePasswordVisibility}>
                                {showPassword ? <FaEye className="icon3"/> : <FaEyeSlash className="icon3"/>}
                            </span>
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
                            <FaLock className="icon2" />
                            <span className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
                                {showConfirmPassword ? <FaEye className="icon3"/> : <FaEyeSlash className="icon3"/>}
                            </span>
                            {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
                        </div>

                        <button type="submit" className="btn">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminRegister;
