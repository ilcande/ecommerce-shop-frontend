import React from 'react';
import useCreatePart from '../../hooks/useCreatePart';
import { useNavigate } from 'react-router-dom';

const CreatePart = () => {
  const {
    name,
    setName,
    productType,
    setProductType,
    handleSubmit,
  } = useCreatePart();

  const navigate = useNavigate();

  const handleRedirectToProducts = () => {
    navigate('/products');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create Part</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="productType" className="block text-gray-700 text-sm font-bold mb-2">
            Product Type
          </label>
          <input
            id="productType"
            type="text"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            disabled // Disable input field as productType should always be 'Bike'
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Create Part
        </button>
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

export default CreatePart;
