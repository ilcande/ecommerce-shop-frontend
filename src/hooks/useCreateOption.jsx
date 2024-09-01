import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const useCreateOption = () => {
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
        toast.error('Failed to fetch parts', {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    };
    fetchParts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/admin/parts/${partId}/options`, {
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
      // Reset form fields
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

  return {
    name,
    setName,
    price,
    setPrice,
    partId,
    setPartId,
    parts,
    handleSubmit,
  };
};

export default useCreateOption;
