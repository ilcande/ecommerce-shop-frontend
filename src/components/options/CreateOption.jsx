import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateOption = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [partId, setPartId] = useState('');
  const [parts, setParts] = useState([]);

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const response = await axios.get('/admin/parts');
        setParts(response.data);
      } catch (error) {
        console.error('Error fetching parts:', error);
      }
    };
    fetchParts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/admin/options', {
        option: {
          name,
          price,
          part_id: partId,
        },
      });
      toast.success('Option created successfully', {
        position: 'top-center',
        autoClose: 3000,
      });
      setName('');
      setPrice('');
      setPartId('');
    } catch (error) {
      console.error('Error creating option:', error);
      toast.error('Failed to create option', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create Option</h1>
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
          <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
            Price
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="partId" className="block text-gray-700 text-sm font-bold mb-2">
            Part
          </label>
          <select
            id="partId"
            value={partId}
            onChange={(e) => setPartId(e.target.value)}
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
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Create Option
        </button>
      </form>
    </div>
  );
};

export default CreateOption;
