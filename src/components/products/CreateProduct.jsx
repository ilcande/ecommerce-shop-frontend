import React from 'react';
import useCreateProduct from '../../hooks/useCreateProduct';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const { product, handleChange, handleSubmit } = useCreateProduct();

  const navigate = useNavigate();

  const handleRedirectToProducts = () => {
    navigate('/products');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product_type">
            Product Type
          </label>
          <input
            type="text"
            id="product_type"
            name="product_type"
            value="Bike"
            disabled
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 cursor-not-allowed"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="base_price">
            Base Price
          </label>
          <input
            type="number"
            id="base_price"
            name="base_price"
            value={product.base_price}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image_url">
            Image URL
          </label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={product.image_url}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Create Product
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

export default CreateProduct;
