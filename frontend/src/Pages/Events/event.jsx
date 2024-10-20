import React, { useState } from "react";
import './event.css'; // Assuming you have the CSS file for styling
import { FaUsers, FaUser, FaIdBadge, FaCalendarAlt, FaBuilding, FaPhone, FaEnvelope, FaSortDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Import Axios
import ParticlesComponent from "../../components/ParticlesComponent";
const Event = () => {
    const [input, setInput] = useState({
        teamName: '',
        teamLeaderName: '',
        regNo: '',
        year: '',
        department: '',
        phoneNumber: '',
        email: '',
        participant2: {
            name: '',
            regNo: '',
            year: '',
            department: '',
            phoneNumber: '',
            email: ''
        },
        participant3: {
            name: '',
            regNo: '',
            year: '',
            department: '',
            phoneNumber: '',
            email: ''
        },
        participant4: {
            name: '',
            regNo: '',
            year: '',
            department: '',
            phoneNumber: '',
            email: ''
        }
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleWhatsAppClick = () => {
        window.open('https://chat.whatsapp.com/IJ2a2WyhAkeI4vmjF9i9VU', '_blank');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [participant, field] = name.split('.');
        if (participant && field) {
            setInput((prevInput) => ({
                ...prevInput,
                [participant]: {
                    ...prevInput[participant],
                    [field]: value
                }
            }));
        } else {
            setInput((prevInput) => ({
                ...prevInput,
                [name]: value
            }));
        }
    };

    const validate = () => {
        let isValid = true;
        let errors = {};

        // Validate team details
        if (!input.teamName) {
            isValid = false;
            errors.teamName = "Please provide the team name.";
        }
        if (!input.teamLeaderName) {
            isValid = false;
            errors.teamLeaderName = "Please provide the team leader's name.";
        }
        if (!input.regNo) {
            isValid = false;
            errors.regNo = "Please provide the register number.";
        }
        if (!input.year) {
            isValid = false;
            errors.year = "Please select the year.";
        }
        if (!input.department) {
            isValid = false;
            errors.department = "Please provide the department.";
        }
        if (!input.phoneNumber) {
            isValid = false;
            errors.phoneNumber = "Please provide the phone number.";
        }
        if (!input.email) {
            isValid = false;
            errors.email = "Please provide the email.";
        }

        // Validate participants 2 and 3
        ['participant2', 'participant3'].forEach((participant) => {
            const p = input[participant];
            if (!p.name || !p.regNo || !p.year || !p.department || !p.phoneNumber || !p.email) {
                isValid = false;
                errors[participant] = "All fields for this participant are required.";
                if (!p.name) errors[`${participant}.name`] = "Please provide the participant's name.";
                if (!p.regNo) errors[`${participant}.regNo`] = "Please provide the participant's register number.";
                if (!p.year) errors[`${participant}.year`] = "Please provide the participant's year.";
                if (!p.department) errors[`${participant}.department`] = "Please provide the participant's department.";
                if (!p.phoneNumber) errors[`${participant}.phoneNumber`] = "Please provide the participant's phone number.";
                if (!p.email) errors[`${participant}.email`] = "Please provide the participant's email.";
            }
        });

        // Validate participant 4 only if the name is provided
        const p4 = input.participant4;
        if (p4.name.trim() !== "") { // Check if the name is not just whitespace
            if (!p4.regNo || !p4.year || !p4.department || !p4.phoneNumber || !p4.email) {
                isValid = false;
                errors.participant4 = "All fields for participant 4 are required if a name is provided.";
                if (!p4.regNo) errors['participant4.regNo'] = "Please provide the participant 4's register number.";
                if (!p4.year) errors['participant4.year'] = "Please provide the participant 4's year.";
                if (!p4.department) errors['participant4.department'] = "Please provide the participant 4's department.";
                if (!p4.phoneNumber) errors['participant4.phoneNumber'] = "Please provide the participant 4's phone number.";
                if (!p4.email) errors['participant4.email'] = "Please provide the participant 4's email.";
            }
        }

        setErrors(errors);
        return isValid;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                // Send the input data to the backend API
                const response = await axios.post('http://localhost:5000/EventRegister', input);
                alert(response.data.message); // Show success message
                // Resetting inputs
                setInput({
                    teamName: '',
                    teamLeaderName: '',
                    regNo: '',
                    year: '',
                    department: '',
                    phoneNumber: '',
                    email: '',
                    participant2: { name: '', regNo: '', year: '', department: '', phoneNumber: '', email: '' },
                    participant3: { name: '', regNo: '', year: '', department: '', phoneNumber: '', email: '' },
                    participant4: { name: '', regNo: '', year: '', department: '', phoneNumber: '', email: '' }
                });
                navigate("/"); // Redirect to another page after successful registration
            } catch (error) {
                console.error("Registration failed:", error); // Log any error
                alert("Registration failed. Please try again.");
            }
        }
    };
    

    return (
        <div className="body">
            <ParticlesComponent/>
        <div className="wrapper5">
            <div className="form-box5">
                <form className="form" onSubmit={handleRegister}>
                    <h1 className="evh1">Event Registration</h1>

                    {/* Team Details */}
                    <div className="input-box">
                        <input
                            type="text"
                            name="teamName"
                            placeholder="Team Name"
                            value={input.teamName}
                            onChange={handleChange}
                            required
                        />
                        <FaUsers className="icon2" />
                        {errors.teamName && <div className="error">{errors.teamName}</div>}
                    </div>

                    <div className="input-box">
                        <input
                            type="text"
                            name="teamLeaderName"
                            placeholder="Team Leader Name"
                            value={input.teamLeaderName}
                            onChange={handleChange}
                            required
                        />
                        <FaUser className="icon2" />
                        {errors.teamLeaderName && <div className="error">{errors.teamLeaderName}</div>}
                    </div>

                    <div className="input-box">
                        <input
                            type="text"
                            name="regNo"
                            placeholder="Register Number"
                            value={input.regNo}
                            onChange={handleChange}
                            required
                        />
                        <FaIdBadge className="icon2" />
                        {errors.regNo && <div className="error">{errors.regNo}</div>}
                    </div>

                    {/* Year Select Box */}
                    <div className="input-box">
                        <select
                            className="title"
                            name="year"
                            value={input.year}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select the Year</option>
                            <option value="2nd Year">Grey Tag (2nd Year)</option>
                            <option value="3rd Year">Purple Tag (3rd Year)</option>
                        </select>
                        <FaSortDown className="icon3"/>
                        <FaCalendarAlt className="icon2" />
                        {errors.year && <div className="error">{errors.year}</div>}
                    </div>

                    {/* Department Select Box */}
                    <div className="input-box">
                        <select
                            className="title"
                            name="department"
                            value={input.department}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Choose the Department</option>
                            <option value="Aerospace Engineering">Aerospace Engineering</option>
                            <option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science</option>
                            <option value="Automobile Engineering">Automobile Engineering</option>
                            <option value="Computer Science Engineering">Computer Science Engineering</option>
                            <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
                            <option value="Electronics and Instrumentation Engineering">Electronics and Instrumentation Engineering</option>
                            <option value="Information Technology">Information Technology</option>
                            <option value="Production Technology">Production Technology</option>
                            <option value="Robotics & Automation">Robotics & Automation</option>
                            <option value="Rubber and Plastics Technology">Rubber and Plastics Technology</option>
                        </select>
                        <FaSortDown className="icon3"/>
                        <FaBuilding className="icon2" />
                        {errors.department && <div className="error">{errors.department}</div>}
                    </div>

                    <div className="input-box">
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={input.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                        <FaPhone className="icon2" />
                        {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
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

                    {/* Participant 2 */}
                    <h2>Participant 2</h2>
                    <div className="input-box">
                        <input
                            type="text"
                            name="participant2.name"
                            placeholder="Name"
                            value={input.participant2.name}
                            onChange={handleChange}
                            required
                        />
                        <FaUser className="icon2" />
                    </div>

                    <div className="input-box">
                        <input
                            type="text"
                            name="participant2.regNo"
                            placeholder="Register Number"
                            value={input.participant2.regNo}
                            onChange={handleChange}
                            required
                        />
                        <FaIdBadge className="icon2" />
                    </div>

                    <div className="input-box">
                        <select
                            className="title"
                            name="participant2.year"
                            value={input.participant2.year}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select the Year</option>
                            <option value="2nd Year">Grey Tag (2nd Year)</option>
                            <option value="3rd Year">Purple Tag (3rd Year)</option>
                        </select>
                        <FaSortDown className="icon3"/>
                        <FaCalendarAlt className="icon2" />
                    </div>

                    {/* Participant 2 Department Select Box */}
                    <div className="input-box">
                        <select
                            className="title"
                            name="participant2.department"
                            value={input.participant2.department}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Choose the Department</option>
                            <option value="Aerospace Engineering">Aerospace Engineering</option>
                            <option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science</option>
                            <option value="Automobile Engineering">Automobile Engineering</option>
                            <option value="Computer Science Engineering">Computer Science Engineering</option>
                            <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
                            <option value="Electronics and Instrumentation Engineering">Electronics and Instrumentation Engineering</option>
                            <option value="Information Technology">Information Technology</option>
                            <option value="Production Technology">Production Technology</option>
                            <option value="Robotics & Automation">Robotics & Automation</option>
                            <option value="Rubber and Plastics Technology">Rubber and Plastics Technology</option>
                        </select>
                        <FaSortDown className="icon3"/>
                        <FaBuilding className="icon2" />
                    </div>

                    <div className="input-box">
                        <input
                            type="text"
                            name="participant2.phoneNumber"
                            placeholder="Phone Number"
                            value={input.participant2.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                        <FaPhone className="icon2" />
                    </div>

                    <div className="input-box">
                        <input
                            type="email"
                            name="participant2.email"
                            placeholder="Email ID"
                            value={input.participant2.email}
                            onChange={handleChange}
                            required
                        />
                        <FaEnvelope className="icon2" />
                    </div>

                    {/* Participant 3 */}
                    <h2>Participant 3</h2>
                    <div className="input-box">
                        <input
                            type="text"
                            name="participant3.name"
                            placeholder="Name"
                            value={input.participant3.name}
                            onChange={handleChange}
                            required
                        />
                        <FaUser className="icon2" />
                    </div>

                    <div className="input-box">
                        <input
                            type="text"
                            name="participant3.regNo"
                            placeholder="Register Number"
                            value={input.participant3.regNo}
                            onChange={handleChange}
                            required
                        />
                        <FaIdBadge className="icon2" />
                    </div>

                    <div className="input-box">
                        <select
                            className="title"
                            name="participant3.year"
                            value={input.participant3.year}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select the Year</option>
                            <option value="2nd Year">Grey Tag (2nd Year)</option>
                            <option value="3rd Year">Purple Tag (3rd Year)</option>
                        </select>
                        <FaSortDown className="icon3"/>
                        <FaCalendarAlt className="icon2" />
                    </div>

                    {/* Participant 3 Department Select Box */}
                    <div className="input-box">
                        <select
                            className="title"
                            name="participant3.department"
                            value={input.participant3.department}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Choose the Department</option>
                            <option value="Aerospace Engineering">Aerospace Engineering</option>
                            <option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science</option>
                            <option value="Automobile Engineering">Automobile Engineering</option>
                            <option value="Computer Science Engineering">Computer Science Engineering</option>
                            <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
                            <option value="Electronics and Instrumentation Engineering">Electronics and Instrumentation Engineering</option>
                            <option value="Information Technology">Information Technology</option>
                            <option value="Production Technology">Production Technology</option>
                            <option value="Robotics & Automation">Robotics & Automation</option>
                            <option value="Rubber and Plastics Technology">Rubber and Plastics Technology</option>
                        </select>
                        <FaSortDown className="icon3"/>
                        <FaBuilding className="icon2" />
                    </div>

                    <div className="input-box">
                        <input
                            type="text"
                            name="participant3.phoneNumber"
                            placeholder="Phone Number"
                            value={input.participant3.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                        <FaPhone className="icon2" />
                    </div>

                    <div className="input-box">
                        <input
                            type="email"
                            name="participant3.email"
                            placeholder="Email ID"
                            value={input.participant3.email}
                            onChange={handleChange}
                            required
                        />
                        <FaEnvelope className="icon2" />
                    </div>

                    {/* Participant 4 */}
                    <h2>Participant 4</h2>
                    <div className="input-box">
                        <input
                            type="text"
                            name="participant4.name"
                            placeholder="Name"
                            value={input.participant4.name}
                            onChange={handleChange}
                        />
                        <FaUser className="icon2" />
                    </div>

                    <div className="input-box">
                        <input
                            type="text"
                            name="participant4.regNo"
                            placeholder="Register Number"
                            value={input.participant4.regNo}
                            onChange={handleChange}
                        />
                        <FaIdBadge className="icon2" />
                    </div>

                    <div className="input-box">
                        <select
                            className="title"
                            name="participant4.year"
                            value={input.participant4.year}
                            onChange={handleChange}
                        >
                            <option value="">Select the Year</option>
                            <option value="2nd Year">Grey Tag (2nd Year)</option>
                            <option value="3rd Year">Purple Tag (3rd Year)</option>
                        </select>
                        <FaSortDown className="icon3"/>
                        <FaCalendarAlt className="icon2" />
                    </div>

                    {/* Participant 4 Department Select Box */}
                    <div className="input-box">
                        <select
                            className="title"
                            name="participant4.department"
                            value={input.participant4.department}
                            onChange={handleChange}
                        >
                            <option value="">Choose the Department</option>
                            <option value="Aerospace Engineering">Aerospace Engineering</option>
                            <option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science</option>
                            <option value="Automobile Engineering">Automobile Engineering</option>
                            <option value="Computer Science Engineering">Computer Science Engineering</option>
                            <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
                            <option value="Electronics and Instrumentation Engineering">Electronics and Instrumentation Engineering</option>
                            <option value="Information Technology">Information Technology</option>
                            <option value="Production Technology">Production Technology</option>
                            <option value="Robotics & Automation">Robotics & Automation</option>
                            <option value="Rubber and Plastics Technology">Rubber and Plastics Technology</option>
                        </select>
                        <FaSortDown className="icon3"/>
                        <FaBuilding className="icon2" />
                    </div>

                    <div className="input-box">
                        <input
                            type="text"
                            name="participant4.phoneNumber"
                            placeholder="Phone Number"
                            value={input.participant4.phoneNumber}
                            onChange={handleChange}
                        />
                        <FaPhone className="icon2" />
                    </div>

                    <div className="input-box">
                        <input
                            type="email"
                            name="participant4.email"
                            placeholder="Email ID"
                            value={input.participant4.email}
                            onChange={handleChange}
                        />
                        <FaEnvelope className="icon2" />
                    </div>
                    <button type="button" onClick={handleWhatsAppClick} className="res6">
                        <i className="fab fa-whatsapp whatsapp-icon"></i> Join our WhatsApp group
                    </button>
                    <button type="submit" className="res5">Register</button>
                </form>
            </div>
        </div>
        </div>
    );
};

export default Event;
