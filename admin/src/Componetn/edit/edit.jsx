import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./edit.css"
const ProductForm = () => {
  const [productId, setProductId] = useState(''); // Set the product ID
  const [newPrice, setNewPrice] = useState('');
  const [name, setNewname] = useState('');
  const [rating, setRating] = useState('');
  const [stocks, setStocks] = useState('');
  // const [newPrice, setNewPrice] = useState('');
  // const [newPrice, setNewPrice] = useState('');
  // const [newPrice, setNewPrice] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/products/${productId}`,
        {
          price: parseInt(newPrice),
          name: name, // Update the name
          rating: parseFloat(rating), // Update the rating
          stock: parseInt(stocks), // Update the stock
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log('Product updated:', response.data);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  

  return (
    <form className='container-edit' onSubmit={handleSubmit}>
      <h1>Edit Product By Product ID</h1>
      <label>
  Product ID:
  <input
  className='edit'
    type="text"
    value={productId}
    onChange={(e) => setProductId(e.target.value)}
  />
</label>
    <label>
      New Name:
      <input
      className="edit"
        type="text"
        value={name}
        onChange={(e) => setNewname(e.target.value)}
      />
    </label>
    <label>
      New Rating:
      <input
      className="edit"
        type="text"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
    </label>
    <label>
      New Stock:
      <input
      className="edit"
        type="text"
        value={stocks}
        onChange={(e) => setStocks(e.target.value)}
      />
    </label>
    <label>
      New Price:
      <input
      className="edit"
        type="text"
        value={newPrice}
        onChange={(e) => setNewPrice(e.target.value)}
      />
    </label>
    <button className='edit-btn' type="submit">Update Product</button>
  </form>
  
  );
};

export default ProductForm;
