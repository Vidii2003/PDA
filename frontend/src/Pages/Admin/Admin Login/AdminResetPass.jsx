import React, { useState } from "react";
import './AdminResetPass.css';
import { FaLock, FaEye, FaEyeSlash, FaEnvelope, FaKey } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminResetPass = () => {
    const [action, setAction] = useState('');
    const [input, setInput] = useState({
        secretKey: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showSecretKey, setShowSecretKey] = useState(false); // Separate state for secret key visibility
    const [errors, setErrors] = useState({});
    const correctSecretKey = "PDA_Admin*1999"; // Set your desired secret key here
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
        const { email, password, confirmPassword, secretKey } = input;
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
                secretKey: '', // Clear the secret key after successful reset
                email: '',
                password: '',
                confirmPassword: ''
            });
            setAction('');
            // Redirect to login page after successful reset
            navigate("/Admin/Login"); // Replace "/" with your actual login page path
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const toggleSecretKeyVisibility = () => {
        setShowSecretKey(!showSecretKey); // Toggle only secret key visibility
    };

    return (
        <div className={`wrapper ${action}`}>
            <div className="form-box pass">
                <form className="form" onSubmit={handleResetPass}>
                    <h1>Reset Password</h1>
                    <div className="input-box">
                        <input
                            type={showSecretKey ? "text" : "password"} // Use showSecretKey for secret key visibility
                            name="secretKey"
                            placeholder="Secret Key"
                            value={input.secretKey}
                            onChange={handleChange}
                            required
                        />
                        <FaKey className="icon" />
                        <span className="password-toggle" onClick={toggleSecretKeyVisibility}>
                            {showSecretKey ? <FaEye className="icon1"/> : <FaEyeSlash className="icon1"/>} {/* Toggle icon for secret key */}
                        </span>
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
                            type={showPassword ? "text" : "password"} // Use showPassword for password visibility
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
                            {showPassword ? <FaEye className="icon1"/> : <FaEyeSlash className="icon1"/>}
                        </span>
                        <div className="password-hint">Password must be 8-12 characters long, contain at least one uppercase letter, one lowercase letter, one special character[!,@,#,$,%,^,&,*,(,)], and one number.</div>
                        {errors.password && <div className="error">{errors.password}</div>}
                    </div>

                    <div className="input-box">
                        <input
                            type={showConfirmPassword ? "text" : "password"} // Use showConfirmPassword for confirm password visibility
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={input.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <FaLock className="icon" />
                        <span className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
                            {showConfirmPassword ? <FaEye className="icon1"/> : <FaEyeSlash className="icon1"/>}
                        </span>
                        {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
                    </div>

                    <button type="submit" className="res">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AdminResetPass;
