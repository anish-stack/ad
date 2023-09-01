import React from 'react';
import './Support.css'; // Import your CSS stylesheet
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const SupportPage = () => {
  return (
    <div className="support-page">
      <div className="support-info">
        <div className="support-icon">
          <FaPhoneAlt />
        </div>
        <div className="support-text">
          <h2>Contact Support</h2>
          <p>
            For assistance, call our support team at <span className="support-number">+91 7217619794</span>.
          </p>
          <p>
            Or email us at <a href="support@doSomething.com">support@doSomething.com</a>.
          </p>
        </div>
      </div>
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq">
          <h3>Question: How do I add products using a product form?</h3>
          <p>To add products, access your admin dashboard, find the "Add New Product" option, and fill in product details like name, description, price, and category. Upload product images using URLs or your server. Review, submit the form, and confirm. The product will be visible on your website for customers to view and purchase.</p>
        </div>
        <div className="faq">
          <h3>Question: How To get All user Detail By one Click ?</h3>
          <p>To retrieve all user details, navigate to the "All Users" section in your admin dashboard. This section should provide a comprehensive list of registered users, including their names, contact information, and any additional details you've collected. By accessing this area, you can gain insights into your user base and manage user accounts effectively.</p>
        </div>
        <div className="faq">
          <h3>Question: How To checky My admin Detail ?</h3>
          <p>To check your admin details, navigate to the "Profile" section within your admin dashboard. In this section, you'll find comprehensive information about your admin account, including your name, contact information, role, and any other relevant details. This allows you to manage and update your admin profile as needed for effective administration.</p>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
