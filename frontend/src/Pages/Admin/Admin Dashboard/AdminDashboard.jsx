import React, { useState, useEffect } from "react";
import { newlogo } from "../../../assets";
import "./AdminDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdCard,
  faCalendarAlt,
  faSignOutAlt,
  faHome,
  faEdit,
  faSyncAlt,
  faUserPlus,
  faTrashAlt,
  faFileExcel,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ParticlesComponent from "../../../components/ParticlesComponent";

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("user-details");
  const [isEditing, setIsEditing] = useState(false);
  const [adminDetails, setAdminDetails] = useState({});
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [eventUsers, setEventUsers] = useState([]);

  // Fetch admin details from your server
  useEffect(() => {
    const fetchAdminDetails = async () => {
      const response = await axios.get("http://localhost:5000/adminDetails"); // Adjust this endpoint as necessary
      setAdminDetails(response.data);
    };

    fetchAdminDetails();
  }, []);

  // Fetch registered users from MongoDB
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:5000/RegisteredUsersDisplay");
      setRegisteredUsers(response.data);
    };
    fetchUsers();
  }, []);

  // Fetch registered users for the event
  useEffect(() => {
    const fetchEventUsers = async () => {
      const response = await axios.get("http://localhost:5000/eventRegistrations");
      setEventUsers(response.data); // Assuming this returns an array of registered event users
    };

    fetchEventUsers();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    // Send updated admin details to the server
    await axios.put(`http://localhost:5000/admin/${adminDetails.id}`, adminDetails);
    alert("Admin details updated successfully!");
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setAdminDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleDeleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    setRegisteredUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const exportToCSV = () => {
    const csvRows = [
      ["Register Number", "Name", "Department", "Email"], // CSV Headers
    ];

    registeredUsers.forEach((user) => {
      csvRows.push([user.registerNumber, user.name, user.department, user.email]);
    });

    const csvString = csvRows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "registered_users.csv");
    a.click();
  };

  const exportEventUsersToCSV = () => {
    const csvRows = [
      [
        "Team Name",
        "Team Leader Name",
        "Register Number",
        "Year",
        "Department",
        "Phone Number",
        "Email",
        "Participants",
      ], // CSV Headers
    ];

    eventUsers.forEach((eventUser) => {
      const participants = [
        eventUser.participant2?.name,
        eventUser.participant3?.name,
        eventUser.participant4?.name,
      ]
        .filter(Boolean) // Remove undefined values
        .join("; "); // Join participants with a semicolon for better readability

      csvRows.push([
        eventUser.teamName,
        eventUser.teamLeaderName,
        eventUser.regNo,
        eventUser.year,
        eventUser.department,
        eventUser.phoneNumber,
        eventUser.email,
        participants,
      ]);
    });

    const csvString = csvRows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "event_registered_users.csv");
    a.click();
  };

  const renderTable = (data) => {
    return Object.keys(data).map((key) => (
      <tr key={key}>
        <th>{key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")}</th>
        <td>
          {isEditing ? (
            <input
              type="text"
              value={data[key]}
              onChange={(e) => handleChange(key, e.target.value)}
            />
          ) : (
            data[key]
          )}
        </td>
      </tr>
    ));
  };

  return (
    <div className="body">
      <ParticlesComponent />
      <div className="container">
        <nav className="Navi">
          <ul className="ul">
            <li className="li1">
              <a href="/" id="a">
                <FontAwesomeIcon icon={faHome} />
                <span className="nav-item">Back to Home</span>
              </a>
            </li>
            <li className="li">
              <a href="#" id="a" onClick={() => setActiveSection("user-details")}>
                <FontAwesomeIcon icon={faIdCard} />
                <span className="nav-item">User Details</span>
              </a>
            </li>
            <li>
              <a href="#" id="a" onClick={() => setActiveSection("registered-users")}>
                <FontAwesomeIcon icon={faUserPlus} />
                <span className="nav-item">Registered Users</span>
              </a>
            </li>
            <li>
              <a href="#" id="a" onClick={() => setActiveSection("events")}>
                <FontAwesomeIcon icon={faCalendarAlt} />
                <span className="nav-item">Events</span>
              </a>
            </li>
            <li>
              <a href="/Admin/Login" id="a" className="logout">
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span className="nav-item">Log out</span>
              </a>
            </li>
          </ul>
        </nav>

        <section className="main">
          <div className="main-top">
            <a href="#" id="a">
              <img src={newlogo} alt="Logo" className="custom-logo" />
            </a>
            <h1 className="user-name">{adminDetails.Name}</h1>
          </div>

          <div className="section-content">
            {activeSection === "user-details" && (
              <div id="user-details">
                <h2 className="text-center">Admin Details</h2>
                <div className="custom-table-container">
                  <table className="custom-table">
                    <tbody>{renderTable(adminDetails)}</tbody>
                  </table>
                </div>
              </div>
            )}

            {activeSection === "registered-users" && (
              <div id="registered-users">
                <h2 className="text-center">Registered Users</h2>
                <div className="custom-table-container">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Register Number</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Email ID</th>
                        {/* <th>Action</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {registeredUsers.map((user) => (
                        <tr key={user.id}>
                          <td>{user.regno}</td>
                          <td>{user.name}</td>
                          <td>{user.department}</td>
                          <td>{user.email}</td>
                          {/* <td>
                            <button className="btn btn-danger" onClick={() => handleDeleteUser(user.id)}>
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button className="export" onClick={exportToCSV}>
                  <FontAwesomeIcon icon={faFileExcel} />
                  Export to Excel
                </button>
              </div>
            )}

            {activeSection === "events" && (
              <div id="events">
                <h2 className="text-center">Registered Users for Event</h2>
                <div className="custom-table-container">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Team Name</th>
                        <th>Team Leader Name</th>
                        <th>Register Number</th>
                        <th>Year</th>
                        <th>Department</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Participants</th>
                      </tr>
                    </thead>
                    <tbody>
                      {eventUsers.map((eventUser) => (
                        <tr key={eventUser.id}>
                          <td>{eventUser.teamName}</td>
                          <td>{eventUser.teamLeaderName}</td>
                          <td>{eventUser.regNo}</td>
                          <td>{eventUser.year}</td>
                          <td>{eventUser.department}</td>
                          <td>{eventUser.phoneNumber}</td>
                          <td>{eventUser.email}</td>
                          <td>
                            {[
                              eventUser.participant2?.name,
                              eventUser.participant3?.name,
                              eventUser.participant4?.name,
                            ]
                              .filter(Boolean)
                              .join("; ")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button className="export" onClick={exportEventUsersToCSV}>
                  <FontAwesomeIcon icon={faFileExcel} />
                  Export Event Users to Excel
                </button>
              </div>
            )}
          </div>
{/*
          {isEditing && (
            <button className="btn" onClick={handleUpdate}>
              Save Changes
            </button>
          )}*/}
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;
