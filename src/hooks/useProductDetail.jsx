import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import { buildConstraintsMap, getDisabledOptions } from '../utils/constraintUtils';
import { getAdjustedFrameFinishPrice } from '../utils/priceUtils';
import 'react-toastify/dist/ReactToastify.css';

const useProductDetail = (productId) => {
  const [product, setProduct] = useState(null);
  const [constraints, setConstraints] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [availableOptions, setAvailableOptions] = useState({});
  const [disabledOptions, setDisabledOptions] = useState(new Set());
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productResponse = await axios.get(`/products/${productId}`);
        setProduct(productResponse.data);
        setTotalPrice(parseFloat(productResponse.data.base_price));

        const partIds = [...new Set(productResponse.data.options.map(option => option.part_id))].join(',');
        const constraintsResponse = await axios.get(`/constraints?part_ids=${partIds}`);
        setConstraints(constraintsResponse.data);

        const optionsByPart = productResponse.data.options
          .filter(option => option.is_in_stock) // Filter out options that are out of stock
          .reduce((acc, option) => {
            const partId = option.part_id;
            const partName = option.part.name;
          
            if (!acc[partName]) {
              acc[partName] = {
                partId: partId,
                options: [],
              };
            }
            acc[partName].options.push(option);
            return acc;
          }, {});
        
        setAvailableOptions(optionsByPart);
      } catch (error) {
        console.error('Error fetching product details', error);
      }
    };

    fetchProductData();
  }, [productId]);

  useEffect(() => {
    const constraintsMap = buildConstraintsMap(constraints);
    const newDisabledOptions = getDisabledOptions(selectedOptions, constraintsMap, availableOptions);
    setDisabledOptions(new Set(newDisabledOptions));
  }, [selectedOptions, constraints, availableOptions]);

  const handleAddToCart = () => {
    if (product) {
      const cartProduct = {
        id: product.id,
        name: product.name,
        base_price: product.base_price,
        image_url: product.image_url,
      };

      addToCart(cartProduct, 1, selectedOptions, totalPrice);
      toast.success('Product added to cart', {
        position: 'top-right',
        autoClose: 3000,
      });
      clearSelection();
    }
  };

  const handleOptionChange = (partName, optionId) => {
    setSelectedOptions(prev => {
      const newSelection = { ...prev };
      const option = product.options.find(o => o.id === parseInt(optionId));
  
      if (!option) return newSelection;
  
      if (newSelection[partName]?.id === option.id) {
        delete newSelection[partName];
      } else {
        newSelection[partName] = option;
      }
  
      recalculatePrice(newSelection);
      return newSelection;
    });
  };

  const recalculatePrice = (selection) => {
    if (!product) return;
  
    let newPrice = parseFloat(product.base_price);
    const frameTypeName = selection['Frame']?.name;
  
    Object.entries(selection).forEach(([partName, option]) => {
      if (option) {
        const optionPrice = partName === 'Frame Finish'
          ? getAdjustedFrameFinishPrice(frameTypeName, option.name)
          : parseFloat(option.price);
  
        newPrice += optionPrice;
      }
    });
  
    setTotalPrice(newPrice);
  };

  const clearSelection = () => {
    setSelectedOptions({});
    setTotalPrice(parseFloat(product.base_price));
  };

  const isOptionDisabled = (optionId) => disabledOptions.has(optionId);

  return {
    product,
    selectedOptions,
    totalPrice,
    availableOptions,
    handleOptionChange,
    handleAddToCart,
    clearSelection,
    isOptionDisabled,
    recalculatePrice
  };
};

export default useProductDetail;
