import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const useCreatePart = () => {
  const [name, setName] = useState('');
  const [productType, setProductType] = useState('Bike');
  const navigate = useNavigate();

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
      // Reset state
      setName('');
      setProductType('Bike');
      navigate('/admin/options/new');
    } catch (error) {
      console.error('Error creating part:', error);
      toast.error('Failed to create part', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  return {
    name,
    setName,
    productType,
    setProductType,
    handleSubmit,
  };
};

export default useCreatePart;
