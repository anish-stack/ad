import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLoginForm from "./Componetn/auth/login";
import NavBar from "./Componetn/header/nav";
import Welcome from "./Componetn/welcome/welcome";
import ProductUploadForm from "./Componetn/product/productUpload";
import React, { useState } from "react";

import ProductManagement from "./Componetn/modify/productMangement";
import SupportPage from "./Componetn/customerSupport/Support";
import UserTable from "./Componetn/users/allUsers";
import Logout from "./Componetn/Logout/logout";
import Profile from "./Componetn/profile/adminProfile";
import ProductList from "./Componetn/modify/producList";
import Edit from "./Componetn/edit/edit";
import AllOrders from "./Componetn/allorders/allOrder";
import AdminRester from "./Componetn/auth/register";
import AdminRegister from "./Componetn/auth/register";



function App() {
 

  return (
    <Router>
      <NavBar />
   
      <Routes>
        <Route path="/Login" element={<AdminLoginForm />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/products" element={<ProductUploadForm />} />
        <Route
          path="/modify-products"
          element={<ProductList/>}
        />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/get-users" element={<UserTable />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/edit-products" element={<Edit />} />
                <Route path="/orders" element={<AllOrders />} />
                <Route path ="/Register" element={<AdminRegister/>} />
                
                
      </Routes>
    </Router>
  );
}

export default App;
