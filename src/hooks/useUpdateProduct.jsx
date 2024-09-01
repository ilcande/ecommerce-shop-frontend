import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const useUpdateProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [options, setOptions] = useState([]);
  const [changedOptions, setChangedOptions] = useState(new Set()); // Track changed options

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`/products/${productId}`);
        const { data } = response;
        setProduct({
          name: data.name,
          product_type: data.product_type,
          base_price: data.base_price,
          image_url: data.image_url,
        });
        setOptions(data.options || []);
      } catch (error) {
        console.error('Error fetching product details', error);
      }
    };

    fetchProductData();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
    setChangedOptions(prev => new Set(prev.add(newOptions[index].id)));
  };

  const handleProductUpdate = async () => {
    try {
      await axios.patch(`/admin/products/${productId}`, {
        product: { ...product },
      });
      toast.success('Product updated successfully', {
        position: 'top-center',
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error updating product', error);
      toast.error('Failed to update product', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  const handleOptionsUpdate = async () => {
    try {
      const updateRequests = options
        .filter(option => changedOptions.has(option.id)) // Only include changed options
        .map(option => {
          return axios.patch(`/admin/parts/${option.part_id}/options/${option.id}`, {
            option: {
              name: option.name,
              price: option.price,
              is_in_stock: option.is_in_stock,
            }
          });
        });

      await Promise.all(updateRequests);
      toast.success('Options updated successfully', {
        position: 'top-center',
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error updating options', error);
      toast.error('Failed to update options', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await handleProductUpdate();
    await handleOptionsUpdate();
  };

  return {
    product,
    options,
    changedOptions,
    handleChange,
    handleOptionChange,
    handleUpdate
  };
};

export default useUpdateProduct;
