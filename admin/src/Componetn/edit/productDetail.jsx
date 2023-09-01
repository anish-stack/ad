import React, { useState, useEffect } from 'react';
import './productetail.css';
import axios from 'axios'
const ProductDetail = ({ productId, editMode, setEditedProduct }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);
console.log(productId )
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/products/${productId}`);
      setProduct(response.data.product);
    }
    catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleFieldEdit = (field, value) => {
    setEditedProduct((prevEditedProduct) => ({
      ...prevEditedProduct,
      [field]: value,
    }));
  };

  return (
    <div className='product-detail'>
      {product ? (
        <div className='product-content'>
          <img src={product.images} alt={product.name} />
          <h3>{product.name}</h3>
          <p contentEditable={editMode} onBlur={(e) => handleFieldEdit('description', e.target.innerText)}>
            {product.description}
          </p>
          <p contentEditable={editMode} onBlur={(e) => handleFieldEdit('price', e.target.innerText)}>
            Price: Rs{product.price}
          </p>
          <p contentEditable={editMode} onBlur={(e) => handleFieldEdit('ratings', e.target.innerText)}>
            Rating: {product.ratings}
          </p>
          <p contentEditable={editMode} onBlur={(e) => handleFieldEdit('category', e.target.innerText)}>
            Category: {product.category}
          </p>
          <p contentEditable={editMode} onBlur={(e) => handleFieldEdit('stock', e.target.innerText)}>
            Stock: {product.stock}
          </p>
          <p contentEditable={editMode} onBlur={(e) => handleFieldEdit('numOfReviews', e.target.innerText)}>
            Number of Reviews: {product.numOfReviews}
          </p>
        </div>
      ) : (
        <p>Loading product...</p>
      )}
    </div>
  );
};

export default ProductDetail;
