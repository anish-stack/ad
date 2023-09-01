import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './alluser.css';
import { toast,ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0); // State to hold total pages
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
  
        if (!token) {
          toast.error("Please Login To Show User Data In Your Dashboard");
          setTimeout(() => {
            window.location = "/login"; // Redirect to login page after showing the toast
          }, 3000);
        } else {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              page: currentPage,
              limit: itemsPerPage,
            },
          };
  
          const response = await axios.get('http://localhost:4000/api/v1/users', config);
          const responseData = response.data; // Assuming the response object is { users: [], totalCount: ... }
          const filteredUsers = responseData.users.filter(user => user.role === 'user');
          console.log(filteredUsers)
          setUsers(filteredUsers);
          setTotalPages(Math.ceil(responseData.totalCount / itemsPerPage)); // Calculate total pages
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchData();
  }, [currentPage, itemsPerPage]);
  
  return (
    <div className="user-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Profile Image</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.contactNumber}</td>
              <td>
  <div
    style={{
      width: '50px', // Set the desired width
      height: '50px', // Set the desired height
      overflow: 'hidden', // Hide any overflow if the SVG is larger than the container
    }}
    dangerouslySetInnerHTML={{ __html: user.avatar }}
  />
</td>

            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default UserTable;
