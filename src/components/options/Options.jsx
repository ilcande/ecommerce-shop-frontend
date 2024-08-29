import React from 'react';
import Option from './Option';

const Options = ({ availableOptions, selectedOptions, handleOptionChange, isOptionDisabled, getAdjustedFrameFinishPrice }) => {
  return (
    <div className="options">
      {Object.entries(availableOptions).map(([partName, { partId, options }]) => (
        <div key={partId} className="mb-6">
          <h3 className="text-lg font-semibold mb-4">{partName}</h3>
          <div className="flex flex-wrap gap-2">
            {options.map(option => (
              <Option
                key={option.id}
                option={option}
                partName={partName}
                selectedOptions={selectedOptions}
                handleOptionChange={handleOptionChange}
                isOptionDisabled={isOptionDisabled}
                getAdjustedFrameFinishPrice={getAdjustedFrameFinishPrice}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Options;
