import React, { useState } from "react";
import {newlogo} from "../../../assets";
import "./Dashboard.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faCalendarAlt, faSignOutAlt, faHome, faEdit, faSyncAlt } from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("user-details");
  const [isEditing, setIsEditing] = useState(false);

  // User Details state
  const [userDetails, setUserDetails] = useState({
    Register_Number: "2021506120",
    Name: "Vidya",
    Department_Name: "Information Technology",
    Email_ID: "gkpsheela2003@gmail.com",
  });

  // Event Details state
  const [eventsRegistered, setEventsRegistered] = useState([
    { id: 1, title: "Event 1", description: "Description for Event 1" },
    { id: 2, title: "Event 2", description: "Description for Event 2" },
    { id: 3, title: "Event 3", description: "Description for Event 3" },
  ]);

  const handleEdit = () => {
    setIsEditing(true); 
  };

  const handleUpdate = () => {
    alert("User details updated successfully!");
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setUserDetails((prev) => ({ ...prev, [field]: value }));
  };

  const renderTable = (data, isEvent = false) => {
    return Object.keys(data).map((key) => (
      <tr key={key}>
        <th>{key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}</th> {/* Replacing underscores with spaces */}
        <td>
          {isEditing && !isEvent  ? (
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
            <a href="#" id="a" onClick={() => setActiveSection("events")}>
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span className="nav-item">Events Registered</span>
            </a>
          </li>
          <li>
            <a href="/" id="a" className="logout">
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
        <h1 className="user-name">{userDetails.Name}</h1> {/* Dynamically showing the user's name */}
      </div>

        <div className="section-content">
          {activeSection === "user-details" && (
            <div id="user-details">
              <h2 className="text-center">User Details</h2>
              <div className="container mt-5" style={{ maxWidth: "1000px" }}>
                <table className="table-bordered border-primary" style={{ maxWidth: "500px" }}>
                  <tbody>{renderTable(userDetails)}</tbody>
                </table>
                
              </div>
              <div className="button-container mt-3">
                  {!isEditing ? (
                    <button className="btn btn-primary" onClick={handleEdit}>
                      <FontAwesomeIcon icon={faEdit} />
                      Edit
                    </button>
                  ) : (
                    <button className="btn btn-success" onClick={handleUpdate}>
                      <FontAwesomeIcon icon={faSyncAlt} />
                      Update
                    </button>
                  )}
                </div>
            </div>
          )}

          {activeSection === "events" && (
            <div id="events">
              <h2 className="text-center">Events Registered</h2>
              <div className="container mt-5 event-container">
                {eventsRegistered.map((event) => (
                  <div key={event.id} className="event-box">
                    <h4>{event.title}</h4>
                    <p>{event.description}</p>
                    <button className="btn btn-primary">View Event</button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}

export default Dashboard;
