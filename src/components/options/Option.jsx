import React from 'react';

const Option = ({ option, partName, selectedOptions, handleOptionChange, isOptionDisabled, getAdjustedFrameFinishPrice }) => {
  // Calculate the adjusted price for frame finish options
  const optionPrice =
    partName === 'Frame Finish' && selectedOptions['Frame']
      ? getAdjustedFrameFinishPrice(selectedOptions['Frame'].name, option.name)
      : parseFloat(option.price);

  return (
    <button
      key={option.id}
      onClick={() => handleOptionChange(partName, option.id)}
      disabled={isOptionDisabled(option.id)}
      className={`tag-pill py-2 px-4 rounded-full mb-2 mr-2 text-sm font-medium transition-all duration-300 ${
        isOptionDisabled(option.id)
          ? 'disabled bg-gray-300 text-gray-500'
          : selectedOptions[partName]?.id === option.id
          ? 'bg-indigo-600 text-white'
          : 'bg-gray-200 text-gray-900'
      }`}
    >
      {option.name} ({optionPrice.toFixed(2)} EUR)
    </button>
  );
};

export default Option;
