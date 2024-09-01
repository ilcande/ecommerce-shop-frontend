import React from 'react';
import useCreateConstraint from '../../hooks/useCreateConstraint';
import { useNavigate } from 'react-router-dom';

const CreateConstraint = () => {
  const {
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
  } = useCreateConstraint();

  const navigate = useNavigate();

  const handleRedirectToProducts = () => {
    navigate('/products');
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

export default CreateConstraint;
