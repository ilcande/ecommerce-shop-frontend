export const buildConstraintsMap = (constraints) => {
  const directConstraintsMap = {};
  const reverseConstraintsMap = {};

  constraints.forEach(({ part_id, option_id, constraint_part_id, constraint_option_id }) => {
    // Build direct constraints map
    if (!directConstraintsMap[option_id]) {
      directConstraintsMap[option_id] = {};
    }

    if (!directConstraintsMap[option_id][constraint_part_id]) {
      directConstraintsMap[option_id][constraint_part_id] = new Set();
    }

    directConstraintsMap[option_id][constraint_part_id].add(constraint_option_id);

    // Build reverse constraints map
    if (!reverseConstraintsMap[constraint_option_id]) {
      reverseConstraintsMap[constraint_option_id] = {};
    }

    if (!reverseConstraintsMap[constraint_option_id][part_id]) {
      reverseConstraintsMap[constraint_option_id][part_id] = new Set();
    }

    reverseConstraintsMap[constraint_option_id][part_id].add(option_id);
  });

  return { directConstraintsMap, reverseConstraintsMap };
};

export const getDisabledOptions = (selectedOptions, constraintsMap, availableOptions) => {
  const { directConstraintsMap, reverseConstraintsMap } = constraintsMap;
  const disabledOptions = new Set();

  // Convert selectedOptions from option objects to their IDs
  const selectedOptionIds = Object.values(selectedOptions).map(option => option.id);

  // Disable options based on direct constraints
  Object.entries(selectedOptions).forEach(([selectedPartName, selectedOption]) => {
    const selectedOptionId = selectedOption.id;

    // Find the options for the selected part name
    const selectedPartOptions = availableOptions[selectedPartName]?.options || [];

    // Disable other options of the same part
    selectedPartOptions.forEach((option) => {
      if (option.id !== selectedOptionId) {
        disabledOptions.add(option.id);
      }
    });

    // Apply direct constraints
    const validConstraintsFromSelected = directConstraintsMap[selectedOptionId] || {};

    Object.entries(availableOptions).forEach(([partName, partData]) => {
      if (partName === selectedPartName) return; // Skip the same part

      const { options } = partData;
      if (validConstraintsFromSelected[partData.partId]) {
        options.forEach((option) => {
          if (!validConstraintsFromSelected[partData.partId].has(option.id)) {
            disabledOptions.add(option.id);
          }
        });
      }
    });
  });

  // Apply reverse constraints
  selectedOptionIds.forEach(selectedOptionId => {
    const validConstraintsToSelected = reverseConstraintsMap[selectedOptionId] || {};

    Object.entries(availableOptions).forEach(([partName, partData]) => {
      const { partId, options } = partData;
      if (validConstraintsToSelected[partId]) {
        options.forEach((option) => {
          if (!validConstraintsToSelected[partId].has(option.id)) {
            disabledOptions.add(option.id);
          }
        });
      }
    });
  });

  return Array.from(disabledOptions);
};





