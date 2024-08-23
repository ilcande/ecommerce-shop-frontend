import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/pages/home')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleButtonClick = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="text-center p-6 max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Our Shop</h1>
        <p className="text-lg font-medium text-gray-700 mb-8">{message}</p>
        <button 
          onClick={() => handleButtonClick('/products')} 
          className="w-full max-w-xs mb-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          View Products
        </button>
        <button 
          onClick={() => handleButtonClick('/login')} 
          className="w-full max-w-xs mb-4 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Login
        </button>
        <button 
          onClick={() => handleButtonClick('/signup')} 
          className="w-full max-w-xs bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default HomePage;
