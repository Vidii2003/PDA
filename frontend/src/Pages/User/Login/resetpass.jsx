import React, { useState } from "react";
import './resetpass.css';
import { FaLock, FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa"; // Add FaEnvelope for email icon
import { useNavigate } from "react-router-dom";

const ResetPass = () => {
    const [action, setAction] = useState('');
    const [input, setInput] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Use for navigation after successful form submission

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
        const { email, password, confirmPassword } = input;

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
            // Stop further validation if password is invalid
            setErrors(errors);
            return false;
        }
    
        if (!uppercaseRegEx.test(password)) {
            isValid = false;
            errors.password = "Password must contain at least one uppercase letter.";
            setErrors(errors);
            return false;
        }
    
        if (!lowercaseRegEx.test(password)) {
            isValid = false;
            errors.password = "Password must contain at least one lowercase letter.";
            setErrors(errors);
            return false;
        }
    
        if (!specialCharRegEx.test(password)) {
            isValid = false;
            errors.password = "Password must contain at least one special character.";
            setErrors(errors);
            return false;
        }
    
        if (!number.test(password)) {
            isValid = false;
            errors.password = "Password must contain at least one number.";
            setErrors(errors);
            return false;
        }
    
        if (password !== confirmPassword) {
            isValid = false;
            errors.confirmPassword = "Passwords do not match.";
            setErrors(errors);
            return false;
        }
        setErrors(errors);
        return isValid;
    };

    const handleResetPass = (e) => {
        e.preventDefault();
        if (validate()) {
            alert("Reset Password Successful!");
            setInput({
                email: '',
                password: '',
                confirmPassword: ''
            });
            setAction('');
            // Redirect to login page after successful reset
            navigate("/"); // Replace "/" with your actual login page path
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className={`wrapper ${action}`}>
            <div className="form-box pass">
                <form className="form" onSubmit={handleResetPass}>
                    <h1>Reset Password</h1>
                    <div className="input-box">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email ID"
                            value={input.email}
                            onChange={handleChange}
                            required
                        />
                        <FaEnvelope className="icon" /> {/* Email icon */}
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
                        <FaLock className="icon" /> {/* Password lock icon */}
                        <span className="password-toggle" onClick={togglePasswordVisibility}>
                            {showPassword ? <FaEye className="icon1"/> : <FaEyeSlash className="icon1"/>} {/* Toggle icon */}
                        </span>
                        <div className="password-hint">Password must be 6-10 characters long, contain at least one uppercase letter, one lowercase letter, one special character[!,@,#,$,%,^,&,*,(,)], and one number.</div>
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
                        <FaLock className="icon" /> {/* Confirm password lock icon */}
                        <span className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
                            {showConfirmPassword ? <FaEye className="icon1"/> : <FaEyeSlash className="icon1"/>} {/* Toggle icon */}
                        </span>
                        {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
                    </div>

                    <button type="submit" className="res">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPass;
