import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products', error);
      });
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="products-container">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <div className="image-container">
            <img src={product.image_url} alt={product.name} className="product-image" />
          </div>
          <h2 className="product-name">{product.name}</h2>
          <p className="base-price">
            Base Price: <span className="price-highlight">{product.base_price} EUR</span>
          </p>
          <button 
            onClick={() => handleProductClick(product.id)}
            className="cta-button">
            Configure this {product.product_type}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
