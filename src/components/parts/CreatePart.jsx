import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatePart = () => {
  const [name, setName] = useState('');
  const [productType, setProductType] = useState('Bike');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/admin/parts', {
        part: {
          name,
          product_type: productType,
        },
      });
      toast.success('Part created successfully', {
        position: 'top-center',
        autoClose: 3000,
      });
      setName('');
      setProductType('Bike');
    } catch (error) {
      console.error('Error creating part:', error);
      toast.error('Failed to create part', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
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
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Create Part
        </button>
      </form>
    </div>
  );
};

export default CreatePart;
