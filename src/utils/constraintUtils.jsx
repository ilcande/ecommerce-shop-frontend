export const buildConstraintsMap = (constraints) => {
  const directConstraintsMap = {};
  const reverseConstraintsMap = {};

  constraints.forEach(({ part_id, option_id, constraint_part_id, constraint_option_id }) => {
    // Build direct constraints map: option_id -> constraint part and options
    if (!directConstraintsMap[option_id]) {
      directConstraintsMap[option_id] = {};
    }

    if (!directConstraintsMap[option_id][constraint_part_id]) {
      directConstraintsMap[option_id][constraint_part_id] = new Set();
    }

    directConstraintsMap[option_id][constraint_part_id].add(constraint_option_id);

    // Build reverse constraints map: constraint_option_id -> part and options it constrains
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
  selectedOptionIds.forEach((selectedOptionId) => {
    const validConstraintsFromSelected = directConstraintsMap[selectedOptionId] || {};

    Object.entries(availableOptions).forEach(([partName, partData]) => {
      const { partId, options } = partData;

      // Skip disabling options from the same part as the selected option
      if (selectedOptions[partName] && selectedOptions[partName].id === selectedOptionId) return;

      // If there are constraints from the selected option to this part
      if (validConstraintsFromSelected[partId]) {
        const constrainedOptions = validConstraintsFromSelected[partId];
        options.forEach((option) => {
          if (constrainedOptions.has(option.id)) {
            disabledOptions.add(option.id);  // Disable constrained options
          }
        });
      }
    });
  });

  // Apply reverse constraints
  selectedOptionIds.forEach((selectedOptionId) => {
    const validConstraintsToSelected = reverseConstraintsMap[selectedOptionId] || {};

    Object.entries(availableOptions).forEach(([partName, partData]) => {
      const { partId, options } = partData;

      // If there are constraints to the selected option from this part
      if (validConstraintsToSelected[partId]) {
        const constrainedOptions = validConstraintsToSelected[partId];
        options.forEach((option) => {
          if (constrainedOptions.has(option.id)) {
            disabledOptions.add(option.id);  // Disable constrained options
          }
        });
      }
    });
  });

  return Array.from(disabledOptions);
};

