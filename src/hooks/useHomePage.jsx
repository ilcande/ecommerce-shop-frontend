import { useEffect, useState } from 'react';
import axios from 'axios';

const useHomePage = () => {
  const [message, setMessage] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    axios.get('/pages/home')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });

    const admin = localStorage.getItem('admin');
    const token = localStorage.getItem('adminToken');
    if (admin && token) {
      setIsAdminLoggedIn(true);
    }
  }, []);

  return { message, isAdminLoggedIn };
};



export default useHomePage;
