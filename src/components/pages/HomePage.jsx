import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/pages/home')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-black bg-opacity-85">
      <div className="text-center p-6  max-w-md w-full">
        <h1 className="text-5xl font-extrabold mb-4 text-gradient">Welcome to Our Shop</h1>
        <p className="text-lg font-light text-gradient">{message}</p>
      </div>
    </div>
  );
};

export default HomePage;
