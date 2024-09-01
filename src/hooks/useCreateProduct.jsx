import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const useCreateProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    base_price: '',
    image_url: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productWithType = { ...product, product_type: 'Bike' };

    try {
      const response = await axios.post('/admin/products', { product: productWithType });
      if (response.status === 201) {
        toast.success('Product created successfully', {
          position: 'top-center',
          autoClose: 3000,
        });
        navigate('/admin/product-configurations/new');
      }
    } catch (error) {
      console.error('There was an error creating the product!', error);
      toast.error('Failed to create product', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  return {
    product,
    handleChange,
    handleSubmit,
  };
};

export default useCreateProduct;
