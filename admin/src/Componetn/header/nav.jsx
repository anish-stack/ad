import React from 'react'
import { Link } from "react-router-dom";
import "./header.css"; // Import your CSS stylesheet

import {
    FaUser,

    FaHome,
    FaCog,
    FaBox,
    FaEdit,
    FaUsers,
    FaSignInAlt,
    FaPhoneAlt,
  } from "react-icons/fa";
const NavBar = () => {
  return (
    <div>

<header>
            <div className="dashboard-heading">
              <h2>Dashboard</h2>
            </div>

            <nav>
              <ul>
                <li>
                  <FaHome className="icon" />
                  <Link to="/welcome" className="nav-item">
                    Home
                  </Link>
                </li>
                <li>
                  <FaUser className="icon" />
                  <Link className="nav-item" to="/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <FaBox className="icon" />
                  <Link className="nav-item" to="/products">
                   New Products
                  </Link>
                </li>
                <li>
                  <FaEdit className="icon" />
                  <Link className="nav-item" to="/modify-products">
                   All Products
                  </Link>
                </li>
                <li>
                  <FaCog className="icon" />
                  <Link className="nav-item" to="/orders">
                   All Orders
                  </Link>
                </li>
                <li>
                  <FaEdit className="icon" />
                  <Link className="nav-item" to="/edit-products">
                   Edit Products
                  </Link>
                </li>
                <li>
                  <FaUsers className="icon" />
                  <Link className="nav-item" to="/get-users">
                    Get All Users
                  </Link>
                </li>
                <li>
                  <FaUser className="icon" />
                  <Link className="nav-item" to="/Login">
                    Login
                  </Link>
                </li>
                <li>
                  <FaPhoneAlt className="icon" />
                  <Link className="nav-item" to="/support">
                    Customer Support
                  </Link>
                </li>
                <li>
                  <FaSignInAlt className="icon" />
                  <Link className="nav-item" to="/Register">
                    Register
                  </Link>
                </li>
                <li>
                  <FaSignInAlt className="icon" />
                  <Link className="nav-item" to="/logout">
                    Logout
                  </Link>
                </li>
              </ul>
            </nav>
          </header>

    </div>
  )
}

export default NavBar