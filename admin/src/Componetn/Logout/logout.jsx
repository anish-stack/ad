import React from 'react'
import './logout.css'
import { toast,ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import Cookies from "js-cookie"

const Logout = () => {

  const handleLogout =async (e)=>{
    e.preventDefault()
    const token =localStorage.getItem('token')
    const UserName = Cookies.get("name")

    const config={
      headers:{
        Authorization: `Bearer ${token}`,
      }
    }
    

    try {
      if (!token || !UserName) {
        toast.error('You are not logged in for logout');
      } else {
      await axios.get('http://localhost:4000/api/v1/logout', config);
  
        // Remove token and username cookie upon successful logout
        localStorage.removeItem('token');
        Cookies.remove('name',{path: '/'}); // Remove the username cookie
  
        toast.success('You have been successfully logged out');
      }
    } catch (error) {
      toast.error('API Endpoint Error');
    }
  };

  return (
    <div className='logout'>
            <h2>Thanks For Your Support To manage Content
                <br/>
                We Are Looking Forward to See You Again!
            </h2>
        <button className='btn-primary' onClick={handleLogout} type="reset">Logout</button>
<ToastContainer/>
    </div>
  )
}

export default Logout