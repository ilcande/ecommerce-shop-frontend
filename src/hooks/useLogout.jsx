import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useLogout = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    const token = localStorage.getItem('adminToken');
    if (admin && token) {
      setIsAdmin(true);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.delete('/users/sign_out');
      const { message } = response.data;
      localStorage.removeItem('admin');
      localStorage.removeItem('adminToken');
      toast.success(message);
      setIsAdmin(false);
      navigate('/');
    } catch (error) {
      toast.error('Error logging out: ' + error.response.data.error);
    }
  };

  return { isAdmin, handleLogout };
};

export default useLogout;
