import React, { useState, useEffect } from "react";
import axios from "axios";
import "./modify.css";
import {Link} from "react-router-dom"
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // Number of products to display per page
  useEffect(() => {
    // Fetch products from the API when the component mounts
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/products");
      if (Array.isArray(response.data.data)) {
        setProducts(response.data.data);
        console.log(response.data.data);
        response.data.data.forEach((product) => {
          console.log("Product ID:", product._id);
        });
      } else {
        console.error(
          "API response does not contain an array of products:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const token = localStorage.getItem("token");
  const handleDelete = async (productId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/products/${productId}`,
        config
      );
      console.log("Delete Response:", response);
      if (response.status === 200) {
        // Product deleted successfully, you can update the UI or fetch products again
        fetchProducts();
        console.log("Product deleted:", response);
        console.log("Product delete successful");
      } else {
        console.error("Error deleting product:", response);
        alert("Error deleting product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    }
  };


  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="main">
      <div className="product-list">
        {currentProducts.map((product, index) => (
          <div className="product-card" key={index}>
            <img src={product.images[0]} alt={product.name} />
            <h3>product id: {product._id}</h3>

            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: Rs{product.price}</p>
            <p>Rating: {product.ratings}</p>
            <p>Category: {product.category}</p>
            <p>Stock: {product.stock}</p>
            <p>Number of Reviews: {product.numOfReviews}</p>
            <p>Colors: {product.colors.join(", ")}</p>

            {/* Displaying Sizes */}
            <p>Sizes: {product.sizes.join(", ")}</p>
            <button
              className="delete-btn"
              onClick={() => handleDelete(product._id)}
            >
              Delete
            </button>
          <Link to ="/edit-products" > <button className="edit-btn" >
              Edit
            </button>
            </Link>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentProducts.length < productsPerPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
