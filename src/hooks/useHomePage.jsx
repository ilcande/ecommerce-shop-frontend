import { useEffect, useState } from 'react';
import axios from 'axios';

const useHomePage = () => {
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

  return { message };
};

export default useHomePage;
