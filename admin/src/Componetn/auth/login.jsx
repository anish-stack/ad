import React, { useState, useEffect } from 'react';
import './AdminLoginForm.css'; // Import your CSS stylesheet
import axios from "axios"
import Cookies from "js-cookie"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

const clearLocalStorageAndCookies = () => {
  localStorage.removeItem('token');
  Cookies.remove('name');
  Cookies.remove('email');
};

const AdminLoginForm = () => {
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleTokenExpiration = () => {
    const token = localStorage.getItem('token');
    const tokenExpirationTime = localStorage.getItem('tokenExpiration');

    if (token && tokenExpirationTime) {
      const currentTime = new Date().getTime();
      if (currentTime > parseInt(tokenExpirationTime, 10)) {
        // Token has expired, clear localStorage and cookies
        clearLocalStorageAndCookies();
        toast.error('Session expired. Please log in again.');
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(handleTokenExpiration, 60000); // 60000 ms = 1 minute

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/v1/loginUserTest', {
   
        email: email.trim(), // Trim spaces
        password,
      });

      if (response.status === 200) {
        const userRole = response.data.login.role;
        const userName = response.data.login.name;
        const id = response.data.login._id;

        if (userRole === 'admin') {
          const token = response.data.token;
          if (token) {
            const expirationTime = new Date().getTime() + 20 * 60 * 1000; // 20 minutes from now
            localStorage.setItem('token', token);
            localStorage.setItem('tokenExpiration', expirationTime.toString());
            Cookies.set('name', userName);
            Cookies.set('id', id);
            Cookies.set('contact-number', contact);

            toast.success('Admin Login successful!');
          }
        } else {
          toast.error('User is not authorized to log in as admin.');
        }
      }
    } catch (error) {
      console.error('Login failed:', error.response);
      toast.error('Login failed: ' + (error.response?.data?.message || 'An error occurred'));
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-primary">
          Login
        </button>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default AdminLoginForm;
