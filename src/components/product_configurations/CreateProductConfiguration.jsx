import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateProductConfiguration = () => {
  const [products, setProducts] = useState([]);
  const [parts, setParts] = useState([]);
  const [options, setOptions] = useState([]);
  const [configurations, setConfigurations] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedPartId, setSelectedPartId] = useState('');
  const [selectedOptionId, setSelectedOptionId] = useState('');
  const [isConfigComplete, setIsConfigComplete] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch Products and Parts
    const fetchProductsAndParts = async () => {
      try {
        const productsResponse = await axios.get('/products');
        const filterProducts = productsResponse.data.filter((product) => !product.options.length);
        setProducts(filterProducts);

        const partsResponse = await axios.get('/admin/parts');
        setParts(partsResponse.data);
      } catch (error) {
        console.error('Error fetching products and parts:', error);
      }
    };

    fetchProductsAndParts();
  }, []);

  useEffect(() => {
    // Fetch options based on selected part
    const fetchOptionsForPart = async () => {
      if (selectedPartId) {
        try {
          const response = await axios.get(`/admin/parts/${selectedPartId}/options`);
          setOptions(response.data);
        } catch (error) {
          console.error('Error fetching options for part:', error);
        }
      } else {
        setOptions([]);
      }
    };

    fetchOptionsForPart();
  }, [selectedPartId]);

  const handleAddConfiguration = () => {
    if (selectedPartId && selectedOptionId) {
      // Check if the configuration already exists
      const isDuplicate = configurations.some(
        (config) => config.part_id === selectedPartId && config.option_id === selectedOptionId
      );
      if (!isDuplicate) {
        setConfigurations([
          ...configurations,
          { part_id: selectedPartId, option_id: selectedOptionId },
        ]);
        setSelectedOptionId('');
      } else {
        toast.info('Configuration already exists', {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    } else {
      // Show toast if the required fields are not selected
      toast.info('Please select both a part and an option', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if configurations are empty
      if (configurations.length === 0) {
        toast.info('No configurations to submit', {
          position: 'top-center',
          autoClose: 3000,
        });
        return;
      }

      await axios.post(`/admin/products/${selectedProductId}/product_configurations/bulk_create`, { configurations });
      toast.success('Product Configurations created successfully', {
        position: 'top-center',
        autoClose: 3000,
      });
      setConfigurations([]);
      setSelectedProductId('');
      setSelectedPartId('');
      setSelectedOptionId('');

      // Redirect to the product page
      navigate('/products');
    } catch (error) {
      console.error('Error creating product configurations:', error);
      toast.error('Failed to create product configurations', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  const handleCompleteConfig = () => {
    setIsConfigComplete(true);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create Product Configuration</h1>
      <form onSubmit={handleSubmit}>
        {!isConfigComplete && (
          <>
            <div className="mb-4">
              <label htmlFor="product" className="block text-gray-700 text-sm font-bold mb-2">
                Product
              </label>
              <select
                id="product"
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select a Product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="part" className="block text-gray-700 text-sm font-bold mb-2">
                Part
              </label>
              <select
                id="part"
                value={selectedPartId}
                onChange={(e) => setSelectedPartId(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select a Part</option>
                {parts.map((part) => (
                  <option key={part.id} value={part.id}>
                    {part.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="option" className="block text-gray-700 text-sm font-bold mb-2">
                Option
              </label>
              <select
                id="option"
                value={selectedOptionId}
                onChange={(e) => setSelectedOptionId(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select an Option</option>
                {options.filter((option) => option.is_in_stock).map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={handleAddConfiguration}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
            >
              Add to Configuration
            </button>
            <button
              type="button"
              onClick={handleCompleteConfig}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-6"
            >
              Close Configuration
            </button>
          </>
        )}
        <ul className="mb-4">
          {configurations.map((config, index) => (
            <li key={index} className="flex justify-between p-2 border-b border-gray-200">
              <span>Part ID: {config.part_id}</span>
              <span>Option ID: {config.option_id}</span>
            </li>
          ))}
        </ul>
        {isConfigComplete && (
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Product Configurations
          </button>
        )}
      </form>
    </div>
  );
};

export default CreateProductConfiguration;
