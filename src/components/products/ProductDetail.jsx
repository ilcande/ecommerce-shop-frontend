import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    axios
      .get(`/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setTotalPrice(parseFloat(response.data.base_price));
      })
      .catch((error) => {
        console.error('Error fetching product details', error);
      });
  }, [productId]);

  const handleOptionChange = (partId, optionId, price) => {
    setSelectedOptions((prev) => {
      const newSelection = { ...prev, [partId]: optionId };
      recalculatePrice(newSelection);
      return newSelection;
    });
  };

  const recalculatePrice = (selection) => {
    let newPrice = parseFloat(product.base_price);

    Object.entries(selection).forEach(([partId, optionId]) => {
      const option = product.options.find((o) => o.id === parseInt(optionId));
      if (option) {
        newPrice += parseFloat(option.price);
      }
    });

    setTotalPrice(newPrice);
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <section className="py-10 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
          {/* Product Image and Price/Button */}
          <div className="w-full lg:w-1/2">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-auto rounded-md bg-gray-200 shadow-lg mb-6"
            />
            {/* Total Price */}
            <div className="mb-4">
              <p className="font-semibold text-sm text-gray-900">
                Total Price: {totalPrice.toFixed(2)} EUR
              </p>
            </div>
            {/* Add to Cart Button */}
            <button className="py-2 px-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium shadow-md transition-all duration-300">
              Add to Cart
            </button>
          </div>

          {/* Product Details and Options */}
          <div className="w-full lg:w-1/2">
            {/* Product Title and Base Price */}
            <h2 className="mb-2 font-bold text-2xl leading-7 text-gray-900">
              {product.name}
            </h2>
            <h6 className="font-medium text-lg leading-6 text-gray-900 mb-6">
              {product.base_price} EUR
            </h6>

            {/* Options Selection */}
            <div className="options">
              {product.options.map((option) => (
                <div key={option.id} className="option-item mb-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`part-${option.part_id}`}
                      value={option.id}
                      checked={selectedOptions[option.part_id] === option.id}
                      onChange={() =>
                        handleOptionChange(option.part_id, option.id, option.price)
                      }
                      disabled={!option.is_in_stock}
                      className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <span
                      className={`ml-3 text-sm font-medium ${
                        selectedOptions[option.part_id] === option.id
                          ? 'text-indigo-600'
                          : 'text-gray-900'
                      }`}
                    >
                      {option.name} (+{option.price} EUR)
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
