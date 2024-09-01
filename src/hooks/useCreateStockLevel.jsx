import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useCreateStockLevel = () => {
  const [parts, setParts] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedPartId, setSelectedPartId] = useState('');
  const [selectedOptionId, setSelectedOptionId] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [isInStock, setIsInStock] = useState(false);

  // Fetch all parts
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
    const fetchOptionsForPart = async () => {
      if (selectedPartId) {
        try {
          const response = await axios.get(`/admin/parts/${selectedPartId}/options`);
          setOptions(response.data);
        } catch (error) {
          console.error('Error fetching options for part:', error);
        }
      } else {
        setOptions([]);
      }
    };

    fetchOptionsForPart();
  }, [selectedPartId]);

  const createOrUpdateStockLevel = useCallback(async (stockLevel) => {
    try {
      // Check if stock level exists for the given option
      const response = await axios.get('/admin/stock_levels', {
        params: { option_id: stockLevel.option_id }
      });
      const existingStockLevel = response.data.find(
        (level) => level.option_id === stockLevel.option_id
      );

      if (existingStockLevel) {
        // Update existing stock level
        await axios.put(`/admin/stock_levels/${existingStockLevel.id}`, stockLevel);
      } else {
        // Create new stock level
        await axios.post('/admin/stock_levels', stockLevel);
      }
    } catch (error) {
      console.error('Error in creating/updating stock level:', error);
      throw error;
    }
  }, []);

  return {
    parts,
    options,
    selectedPartId,
    setSelectedPartId,
    selectedOptionId,
    setSelectedOptionId,
    quantity,
    setQuantity,
    isInStock,
    setIsInStock,
    createOrUpdateStockLevel
  };
};
