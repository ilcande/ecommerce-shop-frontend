import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../styles/ProductDetail.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    axios.get(`/products/${productId}`)
      .then(response => {
        setProduct(response.data);
        setTotalPrice(parseFloat(response.data.base_price));
      })
      .catch(error => {
        console.error('Error fetching product details', error);
      });
  }, [productId]);

  const handleOptionChange = (partId, optionId, price) => {
    setSelectedOptions(prev => {
      const newSelection = { ...prev, [partId]: optionId };
      recalculatePrice(newSelection);
      return newSelection;
    });
  };

  const recalculatePrice = (selection) => {
    let newPrice = parseFloat(product.base_price);

    Object.entries(selection).forEach(([partId, optionId]) => {
      const option = product.options.find(o => o.id === parseInt(optionId));
      if (option) {
        newPrice += parseFloat(option.price);
        option.part.constraints.forEach(constraint => {
          if (constraint.constraint_option_id === parseInt(optionId)) {
            newPrice += parseFloat(constraint.constraint_option.price);
          }
        });
      }
    });

    setTotalPrice(newPrice);
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-detail-container">
      <div className="image-container">
        <img src={product.image_url} alt={product.name} className="product-image" />
      </div>
      <h1>{product.name}</h1>
      <p className="base-price">Base Price: {product.base_price} EUR</p>
      <p className="total-price">Total Price: {totalPrice.toFixed(2)} EUR</p>

      <div className="options-container">
        {product.options.map(option => (
          <div key={option.id} className="option-item">
            <label>
              <input
                type="radio"
                name={`part-${option.part_id}`}
                value={option.id}
                checked={selectedOptions[option.part_id] === option.id}
                onChange={() => handleOptionChange(option.part_id, option.id, option.price)}
                disabled={!option.is_in_stock}
              />
              <span className={`option-label ${selectedOptions[option.part_id] === option.id ? 'selected' : ''}`}>
                {option.name} (+{option.price} EUR)
              </span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
