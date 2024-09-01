import React from 'react';
import useCreateProductConfiguration from '../../hooks/useCreateProductConfiguration';
import { useNavigate } from 'react-router-dom';

const CreateProductConfiguration = () => {
  const {
    products,
    parts,
    options,
    configurations,
    selectedProductId,
    selectedPartId,
    selectedOptionId,
    isConfigComplete,
    setSelectedProductId,
    setSelectedPartId,
    setSelectedOptionId,
    handleAddConfiguration,
    handleSubmit,
    handleCompleteConfig,
  } = useCreateProductConfiguration();

  const navigate = useNavigate();

  const handleRedirectToProducts = () => {
    navigate('/products');
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
            >
              Add to Configuration
            </button>
            <button
              type="button"
              onClick={handleCompleteConfig}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-6"
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Create Product Configurations
          </button>
        )}
        <button
          type="button"
          onClick={handleRedirectToProducts}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Go to Products
        </button>
      </form>
    </div>
  );
};

export default CreateProductConfiguration;
