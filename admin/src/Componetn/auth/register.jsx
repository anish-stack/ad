import React, { useState } from 'react';
import './adminRegister.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

;

const AdminRegister = () => {
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !contact || !email || !role || !password || !confirmpassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmpassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/v1/register', {
        name,
        contact,
        email,
        role,
        password,
        confirmpassword,
      });

      console.log(response)
      if (response.status === 201) {
        toast.success('Registration successful please confirm your email address');
    
      }
    } catch (error) {
      console.error('Registration failed:', error.response);
      toast.error('Registration failed: ' + (error.response?.data?.message || 'An error occurred'));
    }
  };

  return (
    <div className="login-container-admin">
      <h2>Admin Register</h2>
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
     
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="Name">Name</label>
          <input
            type="Name"
            id="Name"
            name="Name"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
     
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">contact</label>
          <input
            type="number"
            id="contact"
            name="contact"
            placeholder="Enter your contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
     
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
     
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">confirm password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your confirm password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
     
          />
        </div>
        <div className="form-group">
          <label htmlFor="roll">Role</label>
          <input
            type="text"
            id="Role"
            name="Role"
            placeholder="Enter your Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
     
          />
        </div>
        
        <button type="submit" className="btn-primary">
          Register
        </button>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default AdminRegister;
