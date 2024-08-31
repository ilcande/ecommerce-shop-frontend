import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateConstraint = () => {
  const [partId, setPartId] = useState('');
  const [optionId, setOptionId] = useState('');
  const [constraintPartId, setConstraintPartId] = useState('');
  const [constraintOptionId, setConstraintOptionId] = useState('');
  const [parts, setParts] = useState([]);
  const [partOptions, setPartOptions] = useState([]);
  const [constraintPartOptions, setConstraintPartOptions] = useState([]);

  // Fetch all parts and options on initial load
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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create Constraint</h1>
      <form onSubmit={handleSubmit}>
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
        <div className="mb-4">
          <label htmlFor="optionId" className="block text-gray-700 text-sm font-bold mb-2">
            Option
          </label>
          <select
            id="optionId"
            value={optionId}
            onChange={(e) => setOptionId(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select an Option</option>
            {partOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="constraintPartId" className="block text-gray-700 text-sm font-bold mb-2">
            Constraint Part
          </label>
          <select
            id="constraintPartId"
            value={constraintPartId}
            onChange={(e) => setConstraintPartId(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a Constraint Part</option>
            {parts.map((part) => (
              <option key={part.id} value={part.id}>
                {part.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="constraintOptionId" className="block text-gray-700 text-sm font-bold mb-2">
            Constraint Option
          </label>
          <select
            id="constraintOptionId"
            value={constraintOptionId}
            onChange={(e) => setConstraintOptionId(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a Constraint Option</option>
            {constraintPartOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Create Constraint
        </button>
      </form>
    </div>
  );
};

export default CreateConstraint;
