import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    base_price: '',
    image_url: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add product_type directly here
    const productWithType = { ...product, product_type: 'Bike' };

    try {
      const response = await axios.post('/admin/products', { product: productWithType });
      if (response.status === 201) {
        toast.success('Product created successfully', {
          position: 'top-center',
          autoClose: 3000,
        });
        navigate('/admin/product-configurations/new');
      }
    } catch (error) {
      console.error('There was an error creating the product!', error);
      toast.error('Failed to create product', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
