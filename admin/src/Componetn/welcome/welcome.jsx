import React from 'react'
import "../header/header.css"

import {
    FaMoneyBill,
    FaUser,
    FaCogs,
    FaCheckCircle,

  } from "react-icons/fa";
  


const Welcome = () => {
  const AmountDone = localStorage.getItem("Total Delivered Amount")
  return (
<div>

<div className="widgets">
            <div className="widget">
              <div className="widget-icon">
                <FaMoneyBill />
              </div>
              <h3>Money</h3>
              <p>Your account balance: {AmountDone}</p>
            </div>
            <div className="widget">
              <div className="widget-icon">
                <FaUser />
              </div>
              <h3>User</h3>
              <p>Welcome</p>
            </div>
            <div className="widget">
              <div className="widget-icon">
                <FaCogs />
              </div>
              <h3>Processing</h3>
              <p>Processing: 8 tasks</p>
            </div>
            <div className="widget">
              <div className="widget-icon">
                <FaCheckCircle />
              </div>
              <h3>Payments</h3>
              <p>Payments Done: 30</p>
            </div>
          </div>
          

</div> )
}

export default Welcome