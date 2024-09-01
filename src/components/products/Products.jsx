import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'; // Import icons for update and delete
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    const token = localStorage.getItem('adminToken');
    if (admin && token) {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    axios.get('/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products', error);
        toast.error('Error fetching products', { position: 'top-center', autoClose: 3000 });
      });
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`/admin/products/${productId}`);
      setProducts(products.filter(product => product.id !== productId)); // Remove deleted product from state
      toast.success('Product deleted successfully', { position: 'top-center', autoClose: 3000 });
    } catch (error) {
      console.error('Error deleting product', error);
      toast.error('Error deleting product', { position: 'top-center', autoClose: 3000 });
    }
  };

  const handleUpdateRedirect = async (productId) => {
    navigate(`/admin/products/${productId}/edit`);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>

        <div className="mt-6 grid gap-x-6 gap-y-10 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map(product => (
            <div key={product.id} className="group relative">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <button
                      onClick={() => handleProductClick(product.id)}
                      className="focus:outline-none"
                    >
                      {product.name}
                    </button>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.product_type}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.base_price} EUR</p>
              </div>
              <button
                onClick={() => handleProductClick(product.id)}
                className="mt-2 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Configure this {product.product_type}
              </button>

              {isAdmin && (
                <div className="mt-6 flex space-x-4 justify-between">
                  <button
                    onClick={() => handleUpdateRedirect(product.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <PencilIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
