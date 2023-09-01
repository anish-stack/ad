import React, { useState } from "react";
import "./product.css"; // Import your CSS stylesheet
import axios from "axios";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ProductUploadForm = () => {
  const [formData, setFormData] = useState({
   
    name: "",
    description: "",
    price: "",
    ratings: "",
    category: "",
    stock: "",
    numOfReviews: "",
    images: "",
            color: "",
    sizes: "",
    Cancelprice:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrls = formData.images.split(",").map(url => url.trim());

    // Update formData with the array of image URLs
    const updatedFormData = { ...formData, images: imageUrls };


    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/products/new",
        updatedFormData
      );

      if (response.status === 200) {
        // Show success toast
        toast.success("Product uploaded successfully!");

        // Log product data to console
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error uploading product:", error);
      toast.error("Error uploading product");
    }
  };

  return (
    <div className="product-upload-container">
      <h2>Product Upload Form</h2>
      <form className="product-upload-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">product name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            // required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Cancelprice">Cross price</label>
          <input
            type="text"
            id="Cancelprice"
            name="Cancelprice"
            value={formData.Cancelprice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Ratings</label>
          <input
            type="text"
            id="rating"
            name="ratings"
            value={formData.ratings}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="stocks">Stocks</label>
          <input
            type="number"
            id="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="numOfReviews">Num Of Reviews</label>
          <input
            type="number"
            id="numOfReviews"
            name="numOfReviews"
            value={formData.numOfReviews}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="images">Images (Comma-separated)</label>
          <input
            type="text"
            id="images"
            name="images"
            placeholder="Provide image URLs separated by commas"
            value={formData.images}
            onChange={handleChange}
            required
          />
        </div>
      
        <div className="form-group">
          <label htmlFor="images">Sizes</label>
          <input
            type="text"
            id="sizes"
            name="sizes"
            placeholder="Write Sizes in  S , M ,L ,Xl ,XXl "
            value={formData.sizes}
            onChange={handleChange}
            
          />
        </div>
        <div className="form-group">
          <label htmlFor="images">color</label>
          <input
            type="text"
            id="color"
            name="color"
            placeholder="Write Your Colur Name Correctely "
            value={formData.color}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-primary">
          Upload Product
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ProductUploadForm;
