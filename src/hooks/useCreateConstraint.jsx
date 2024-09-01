import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const useCreateConstraint = () => {
  const [partId, setPartId] = useState('');
  const [optionId, setOptionId] = useState('');
  const [constraintPartId, setConstraintPartId] = useState('');
  const [constraintOptionId, setConstraintOptionId] = useState('');
  const [parts, setParts] = useState([]);
  const [partOptions, setPartOptions] = useState([]);
  const [constraintPartOptions, setConstraintPartOptions] = useState([]);

  // Fetch all parts on initial load
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

  // Fetch options based on selected part
  useEffect(() => {
    const fetchOptionsByPart = async () => {
      if (partId) {
        try {
          const response = await axios.get(`/admin/parts/${partId}/options`);
          setPartOptions(response.data);
        } catch (error) {
          console.error('Error fetching options by part:', error);
        }
      } else {
        setPartOptions([]);
      }
    };

    fetchOptionsByPart();
  }, [partId]);

  // Fetch options based on selected constraint part
  useEffect(() => {
    const fetchOptionsByConstraintPart = async () => {
      if (constraintPartId) {
        try {
          const response = await axios.get(`/admin/parts/${constraintPartId}/options`);
          setConstraintPartOptions(response.data);
        } catch (error) {
          console.error('Error fetching options by constraint part:', error);
        }
      } else {
        setConstraintPartOptions([]);
      }
    };

    fetchOptionsByConstraintPart();
  }, [constraintPartId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/admin/constraints', {
        constraint: {
          part_id: partId,
          option_id: optionId,
          constraint_part_id: constraintPartId,
          constraint_option_id: constraintOptionId,
        },
      });
      toast.success('Constraint created successfully', {
        position: 'top-center',
        autoClose: 3000,
      });
      // Reset the form fields after successful submission
      setPartId('');
      setOptionId('');
      setConstraintPartId('');
      setConstraintOptionId('');
    } catch (error) {
      console.error('Error creating constraint:', error);
      toast.error('Failed to create constraint', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  return {
    partId,
    optionId,
    constraintPartId,
    constraintOptionId,
    parts,
    partOptions,
    constraintPartOptions,
    setPartId,
    setOptionId,
    setConstraintPartId,
    setConstraintOptionId,
    handleSubmit,
  };
};

export default useCreateConstraint;
