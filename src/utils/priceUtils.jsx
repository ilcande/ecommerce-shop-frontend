// src/utils/priceUtils.js
export const getAdjustedFrameFinishPrice = (frameTypeName, frameFinishName) => {
  const frameTypePrices = {
    'Diamond': { 'Shiny': 10, 'Matte': 15, 'Aluminium': 20, 'Carbonium': 25 },
    'Step-through': { 'Shiny': 5, 'Matte': 10, 'Aluminium': 15, 'Carbonium': 20 },
    'Cantilever': { 'Shiny': 15, 'Matte': 20, 'Aluminium': 25, 'Carbonium': 30 },
    'Recumbent': { 'Shiny': 20, 'Matte': 25, 'Aluminium': 30, 'Carbonium': 35 },
    'Monocoque': { 'Shiny': 25, 'Matte': 30, 'Aluminium': 35, 'Carbonium': 40 },
  };

  return frameTypePrices[frameTypeName]?.[frameFinishName] || 0;
};
