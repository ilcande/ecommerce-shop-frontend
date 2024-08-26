import axios from 'axios';

export const addToCart = async (productId, selections) => {
  try {
    await axios.post('/cart', {
      product_id: productId,
      quantity: 1, // default quantity, can be adjusted
      selections: selections
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};
