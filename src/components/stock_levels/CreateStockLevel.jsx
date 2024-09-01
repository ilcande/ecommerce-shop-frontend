import React from 'react';
import { useCreateStockLevel } from '../../hooks/useCreateStockLevel';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateStockLevel = () => {
  const {
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
  } = useCreateStockLevel();

  const navigate = useNavigate();

  const handleRedirectToProducts = () => {
    navigate('/products');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOrUpdateStockLevel({ option_id: selectedOptionId, quantity, is_in_stock: isInStock });
      setSelectedPartId('');
      setSelectedOptionId('');
      setQuantity(0);
      setIsInStock(false);
      toast.success('Stock level saved successfully!', { autoClose: 2000 });
    } catch (error) {
      console.error('Error saving stock level:', error);
      toast.error('Error saving stock level. Please try again.', { autoClose: 2000 });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add or Update Stock Level</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="part" className="block text-gray-700">
            Part
          </label>
          <select
            id="part"
            value={selectedPartId}
            onChange={(e) => setSelectedPartId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select a Part</option>
            {parts.map((part) => (
              <option key={part.id} value={part.id}>
                {part.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="option" className="block text-gray-700">
            Option
          </label>
          <select
            id="option"
            value={selectedOptionId}
            onChange={(e) => setSelectedOptionId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select an Option</option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="quantity" className="block text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
            required
            min="0"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isInStock"
            checked={isInStock}
            onChange={(e) => setIsInStock(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="isInStock" className="text-gray-700">
            In Stock
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleRedirectToProducts}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Go to Products
        </button>
      </form>
    </div>
  );
};

export default CreateStockLevel;
