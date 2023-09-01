import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './adminProfile.css';

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const id = Cookies.get('id');
  const token = localStorage.getItem('token');
  console.log("admin token", token);

  useEffect(() => {
    if (id) {
     
      

      axios.get(`http://localhost:4000/api/v1/user/id/${id}`)
        .then((response) => {
          setUserDetails(response.data.data);
          console.log("User details:", response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    } else {
      setTimeout(() => {
        window.location = "/login"; 
      }, 3000);
      alert("Please Login First To See Your Profile");
      console.log("Redirecting to login...");
    }
  }, [token, id]);

  if (!userDetails) {
    return <p>Loading...</p>;
  }

  return (
    
    <div className="profile-container">
      <div className="profile-image">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(userDetails.avatar)}`}
        alt="User Avatar"
        width="50"
        height="50"
      />      </div>
      <div className="profile-info">
        <h2>{userDetails.name}</h2>
        <p>Email: {userDetails.email}</p>
        <p>Role: {userDetails.role}</p>
        <p>Date of Join: {userDetails.dateOfJoin}</p>
        <p>Contact: {userDetails.contactNumber}</p>
      </div>
      <div className="profile-buttons">
        <button className="update-button">Update</button>
        <button className="logout-button">Logout</button>
      </div>
      <div>
        <p  ></p>
      </div>
    </div>

  );
};

export default Profile;
