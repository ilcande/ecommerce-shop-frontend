import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { buildConstraintsMap, getDisabledOptions } from '../../utils/constraintUtils';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [constraints, setConstraints] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [availableOptions, setAvailableOptions] = useState({});
  const [disabledOptions, setDisabledOptions] = useState(new Set());
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productResponse = await axios.get(`/products/${productId}`);
        setProduct(productResponse.data);
        setTotalPrice(parseFloat(productResponse.data.base_price));

        const partIds = [...new Set(productResponse.data.options.map(option => option.part_id))].join(',');
        const constraintsResponse = await axios.get(`/constraints?part_ids=${partIds}`);
        setConstraints(constraintsResponse.data);

        const optionsByPart = productResponse.data.options.reduce((acc, option) => {
          if (!acc[option.part_id]) {
            acc[option.part_id] = [];
          }
          acc[option.part_id].push(option);
          return acc;
        }, {});
        setAvailableOptions(optionsByPart);
      } catch (error) {
        console.error('Error fetching product details', error);
      }
    };

    fetchProductData();
  }, [productId]);

  useEffect(() => {
    const constraintsMap = buildConstraintsMap(constraints);
    const newDisabledOptions = getDisabledOptions(selectedOptions, constraintsMap, availableOptions);
    setDisabledOptions(new Set(newDisabledOptions));
  }, [selectedOptions, constraints, availableOptions]);

  const handleOptionChange = (partId, optionId) => {
    setSelectedOptions(prev => {
      const newSelection = { ...prev };

      const option = product.options.find(o => o.id === parseInt(optionId));
      if (!option) return newSelection;

      if (newSelection[partId]?.id === option.id) {
        delete newSelection[partId];
      } else {
        newSelection[partId] = option;
      }

      recalculatePrice(newSelection);
      return newSelection;
    });
  };

  const recalculatePrice = (selection) => {
    if (!product) return;

    let newPrice = parseFloat(product.base_price);

    Object.entries(selection).forEach(([partId, option]) => {
      if (option) {
        const isFrameFinish = partId === '48'; // Ensure this matches your actual part ID

        const frameTypeName = selection['44']?.name || ''; // Adjust to your frame type part ID
        const optionPrice = isFrameFinish
          ? getAdjustedFrameFinishPrice(frameTypeName, option.name)
          : parseFloat(option.price);

        newPrice += optionPrice;
      }
    });

    setTotalPrice(newPrice);
  };

  const clearSelection = () => {
    setSelectedOptions({});
    setTotalPrice(parseFloat(product.base_price));
  };

  const isOptionDisabled = (optionId) => disabledOptions.has(optionId);

  const handleAddToCart = () => {
    if (product) {
      const cartProduct = {
        id: product.id,
        name: product.name,
        base_price: product.base_price,
        image_url: product.image_url,
      };

      addToCart(cartProduct, 1, selectedOptions, totalPrice);
      toast.success('Product added to cart', {
        position: 'top-right',
        autoClose: 3000,
      });
      clearSelection();
    }
  };

  const getAdjustedFrameFinishPrice = (frameTypeName, frameFinishName) => {
    let adjustment = 0;

    const frameTypePrices = {
      'Diamond': { 'Shiny': 10, 'Matte': 15, 'Aluminium': 20, 'Carbonium': 25 },
      'Step-through': { 'Shiny': 5, 'Matte': 10, 'Aluminium': 15, 'Carbonium': 20 },
      'Cantilever': { 'Shiny': 15, 'Matte': 20, 'Aluminium': 25, 'Carbonium': 30 },
      'Recumbent': { 'Shiny': 20, 'Matte': 25, 'Aluminium': 30, 'Carbonium': 35 },
      'Monocoque': { 'Shiny': 25, 'Matte': 30, 'Aluminium': 35, 'Carbonium': 40 },
    };

    if (frameTypePrices[frameTypeName]) {
      adjustment = frameTypePrices[frameTypeName][frameFinishName] || 0;
    }

    return adjustment;
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <section className="py-10 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
          <div className="w-full lg:w-1/2">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-auto rounded-md bg-gray-200 shadow-lg mb-6"
            />
            <div className="mb-4">
              <p className="font-semibold text-sm text-gray-900">
                Total Price: {totalPrice.toFixed(2)} EUR
              </p>
            </div>
            <button
              onClick={handleAddToCart}
              className="py-2 px-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium shadow-md transition-all duration-300"
            >
              Add to Cart
            </button>
            <button
              onClick={clearSelection}
              className="py-2 px-4 w-full bg-red-600 hover:bg-red-700 text-white rounded-md font-medium shadow-md transition-all duration-300 mt-4"
            >
              Clear Selection
            </button>
          </div>

          <div className="w-full lg:w-1/2">
            <h2 className="mb-2 font-bold text-2xl leading-7 text-gray-900">
              {product.name}
            </h2>
            <h6 className="font-medium text-lg leading-6 text-gray-900 mb-6">
              {product.base_price} EUR
            </h6>

            <div className="options">
              {Object.entries(availableOptions).map(([partId, options]) => {
                const isFrameFinish = partId === '48'; // Ensure this matches your actual part ID

                return (
                  <div key={partId} className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">
                      {options[0].part.name || 'Options'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {options.map(option => {
                        const frameTypeName = selectedOptions['44']?.name || ''; // Adjust to your frame type part ID
                        const adjustedPrice = isFrameFinish
                          ? getAdjustedFrameFinishPrice(frameTypeName, option.name)
                          : parseFloat(option.price);

                        return (
                          <button
                            key={option.id}
                            onClick={() => handleOptionChange(partId, option.id)}
                            disabled={isOptionDisabled(option.id)}
                            className={`tag-pill py-2 px-4 rounded-full mb-2 mr-2 text-sm font-medium transition-all duration-300 ${
                              isOptionDisabled(option.id)
                                ? 'disabled bg-gray-300 text-gray-500'
                                : selectedOptions[partId]?.id === option.id
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-200 text-gray-900'
                            }`}
                          >
                            {option.name} (+{adjustedPrice.toFixed(2)} EUR)
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
