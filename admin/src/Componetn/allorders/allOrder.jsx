import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./allorder.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllOrders = () => {
  const [Allorder, setAllOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [totalPages, setTotalPages] = useState(0);
  const [orderIdInput, setOrderIdInput] = useState(""); // State to hold the input order ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

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

          const response = await axios.get(
            "http://localhost:4000/api/v1/admin/orders",
            config
          );
          const responseData = response.data; // Assuming the response object is { order: [], totalCount: ... }
          setAllOrders(responseData);
          console.log(responseData);
          const totalAmount = responseData.totalAmount;
          responseData.order.forEach((order) => {
            console.log("Shipping Info:", order.shippingInfo);
            console.log("Address:", order.shippingInfo.address);
            console.log("City:", order.shippingInfo.city);
            console.log("Country:", order.shippingInfo.country);

            if (order.userInfo.length > 0) {
              const userId = order.userInfo[0].userId;
            }
          });
          localStorage.setItem("Total Delivered Amount", totalAmount);
          responseData.order.forEach((order) => {
            const orderId = ("Order ID:", order._id);
          });

          const startIndex = (currentPage - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          const ordersForCurrentPage = responseData.order.slice(
            startIndex,
            endIndex
          );

          setAllOrders(ordersForCurrentPage);
          setTotalPages(Math.ceil(responseData.order.length / itemsPerPage));
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]);

  const handleChange = async (orderId) => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.patch(
          `http://localhost:4000/api/v1/changeStatus/${orderId}`,
          {
            status: "Delivered", // Set the new status here
          },
          config
        );
        console.log(response.userinfo);
        // Assuming you're using the updated Allorder state, you might want to update the order status in your state as well
        const updatedOrders = Allorder.map((order) => {
          if (order._id === orderId) {
            if (response.data.message === "Order status changed successfully") {
              // Show a toast message for successful status change
              toast.success("Order status changed successfully");

              // Refresh the window after successful status change
              setTimeout(() => {
                alert("Order Update");
              }, 500);
              window.location.reload();
            } else {
              // Show a toast message for the delivered order
              console.log("This order is already delivered");
            }
          }
          return order;
        });

        setAllOrders(updatedOrders);
      } catch (error) {
        alert(
          "Error changing status: An error occurred while changing the status"
        );
      }
    }
  };

  return (
    <div className="order-container">
      <h2>All Orders</h2>
      <th>
        Page {currentPage} of {totalPages}
      </th>
      <input
        type="text"
        value={orderIdInput}
        onChange={(e) => setOrderIdInput(e.target.value)}
        placeholder="Enter Order ID"
      />
      <button
        className="changeSautst"
        onClick={() => handleChange(orderIdInput)}
      >
        Change Status
      </button>
      <table className="order-table">
        <thead>
          <tr>
            <th>Userid</th>
            <th>order id</th>

            <th>Order Date</th>
            <th>Items</th>
            <th>Items Price</th>
            <th>Shipping Price</th>
            <th>Tax Price</th>
            <th>Total Price</th>
            <th>Order Status</th>
          </tr>
        </thead>
        <tbody>
          {Allorder.map((order, index) => (
            <tr key={index}>
 <td>{order.userInfo.length > 0 ? order.userInfo[0].userId : 'N/A'}</td>
              <td>{order._id}</td>
              <td>{order.createdAt}</td>
              <td>
                <ul>
                  {order.orderItems.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      Name: {item.name}, Price: {item.price}, Quantity:{" "}
                      {item.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td>{order.itemsPrice}</td>
              <td>{order.shippingPrice}</td>
              <td>{order.taxPrice}</td>
              <td>{order.totalPrice}</td>

              <td>{order.orderStatus}</td>
              <div></div>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="order-pagination">
        <button
          className="order-pagination-btn"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <button
          className="order-pagination-btn"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllOrders;
