import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import css
import '../../styles/HomePage.css'

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

  const handleButtonClick = () => {
    navigate('/products');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black bg-opacity-85">
      <div className="text-center p-6 max-w-md w-full">
        <h1 className="text-5xl font-extrabold mb-4 text-gradient">Welcome to Our Shop</h1>
        <p className="text-lg font-light text-gradient">{message}</p>
        <button 
          onClick={handleButtonClick} 
          className="mt-6 px-4 py-2 btn-gradient">
          View Products
        </button>
      </div>
    </div>
  );
};

export default HomePage;
