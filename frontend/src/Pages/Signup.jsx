import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import axios from 'axios';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const result = await axios.post("http://localhost:5000/register", { name, email, password });
            console.log(result);

            // Check if the response is successful
            if (result.status === 201) {
                navigate("/login"); // Navigate to login on successful registration
            }
        } catch (err) {
            console.error(err); // Log the error for debugging

            // Check if the error response is available
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message); // Display the server error message
            } else {
                setError("Registration failed. Please try again."); // Generic error message
            }
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2><center>Sign Up</center></h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name">
                            <strong>Name</strong>
                        </label>
                        <input 
                            type="text" 
                            placeholder='Enter Name' 
                            autoComplete='off' 
                            name='name' 
                            className='form-control rounded-0'
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input 
                            type="email" 
                            placeholder='Enter Email' 
                            autoComplete='off' 
                            name='email' 
                            className='form-control rounded-0' 
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input 
                            type="password" 
                            placeholder='Enter Password' 
                            name='password' 
                            className='form-control rounded-0' 
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Sign Up
                    </button>
                </form>
                <p>Already have an account?</p>
                <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;
