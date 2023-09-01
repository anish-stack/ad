import React, { useState, useEffect } from "react";
import "./header.css"; // Import your CSS stylesheet
import { Dna } from "react-loader-spinner";

import Welcome from "../welcome/welcome";
import NavBar from "./nav";

const Headers = () => {
  const [loading, setLoading] = useState(true); // State for loader

  useEffect(() => {
    // Simulating some asynchronous action
    setTimeout(() => {
      setLoading(false); // Hide loader after some time
    }, 3000); // Adjust the time as needed
  }, []);

  return (
    <div className="dashboard">
      {loading ? (
        <div className="loader-container">
          ;
          <Dna
  visible={true}
  height="80"
  width="80"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
/>
        </div>
      ) : (
        <div>
        <Welcome/>
        </div>
      )}
    </div>
  );
};

export default Headers;
