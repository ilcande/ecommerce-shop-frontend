import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const useCreateProductConfiguration = () => {
  const [products, setProducts] = useState([]);
  const [parts, setParts] = useState([]);
  const [options, setOptions] = useState([]);
  const [configurations, setConfigurations] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedPartId, setSelectedPartId] = useState('');
  const [selectedOptionId, setSelectedOptionId] = useState('');
  const [isConfigComplete, setIsConfigComplete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch Products and Parts
    const fetchProductsAndParts = async () => {
      try {
        const productsResponse = await axios.get('/products');
        // Filter out products that have no options
        const filterProducts = productsResponse.data.filter((product) => !product.options.length)

        switch (filterProducts.length) {
          case 0:
            setProducts(productsResponse.data);
            break;
          default:
            setProducts(filterProducts);
            break;
        }

        const partsResponse = await axios.get('/admin/parts');
        setParts(partsResponse.data);
      } catch (error) {
        console.error('Error fetching products and parts:', error);
      }
    };

    fetchProductsAndParts();
  }, []);

  useEffect(() => {
    // Fetch options based on selected part
    const fetchOptionsForPart = async () => {
      if (selectedPartId) {
        try {
          const response = await axios.get(`/admin/parts/${selectedPartId}/options`);
          setOptions(response.data);
        } catch (error) {
          console.error('Error fetching options for part:', error);
        }
      } else {
        setOptions([]);
      }
    };

    fetchOptionsForPart();
  }, [selectedPartId]);

  const handleAddConfiguration = () => {
    if (selectedPartId && selectedOptionId) {
      const isDuplicate = configurations.some(
        (config) => config.part_id === selectedPartId && config.option_id === selectedOptionId
      );
      if (!isDuplicate) {
        setConfigurations([
          ...configurations,
          { part_id: selectedPartId, option_id: selectedOptionId },
        ]);
        setSelectedOptionId('');
      } else {
        toast.info('Configuration already exists', {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    } else {
      toast.info('Please select both a part and an option', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (configurations.length === 0) {
        toast.info('No configurations to submit', {
          position: 'top-center',
          autoClose: 3000,
        });
        return;
      }

      await axios.post(`/admin/products/${selectedProductId}/product_configurations/bulk_create`, { configurations });
      toast.success('Product Configurations created successfully', {
        position: 'top-center',
        autoClose: 3000,
      });
      setConfigurations([]);
      setSelectedProductId('');
      setSelectedPartId('');
      setSelectedOptionId('');

      navigate('/products');
    } catch (error) {
      console.error('Error creating product configurations:', error);
      if (error.response.status === 422) {
        toast.error('No new configurations to create. All provided configurations are duplicates.', {
          position: 'top-center',
          autoClose: 3000,
        });
        return;
      } else {
        toast.error('Failed to create product configurations', {
          position: 'top-center',
          autoClose: 3000,
        });
        return;
      }
    }
  };

  const handleCompleteConfig = () => {
    setIsConfigComplete(true);
  };

  return {
    products,
    parts,
    options,
    configurations,
    selectedProductId,
    selectedPartId,
    selectedOptionId,
    isConfigComplete,
    setSelectedProductId,
    setSelectedPartId,
    setSelectedOptionId,
    handleAddConfiguration,
    handleSubmit,
    handleCompleteConfig,
  };
};

export default useCreateProductConfiguration;
