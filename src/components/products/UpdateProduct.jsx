import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useUpdateProduct from '../../hooks/useUpdateProduct';

const UpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const {
    product,
    options,
    handleChange,
    handleOptionChange,
    handleUpdate
  } = useUpdateProduct(productId);

  const onSubmit = async (e) => {
    await handleUpdate(e);
    navigate('/products');
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Update Product</h1>
      <form onSubmit={onSubmit}>
        {/* Product form fields */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product_type">
            Product Type
          </label>
          <input
            type="text"
            id="product_type"
            name="product_type"
            value={product.product_type}
            readOnly
            disabled
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="base_price">
            Base Price
          </label>
          <input
            type="number"
            id="base_price"
            name="base_price"
            value={product.base_price}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image_url">
            Image URL
          </label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={product.image_url}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {options
          .filter(option => option.part.name !== 'Frame Finish') // Exclude specific options
          .map((option, index) => (
            <div key={option.id} className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Option {index + 1} - Name & Price
              </label>
              <input
                type="text"
                value={option.name}
                onChange={(e) => handleOptionChange(index, 'name', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              />
              <input
                type="number"
                value={option.price}
                onChange={(e) => handleOptionChange(index, 'price', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2">
                In Stock
              </label>
              <select
                value={option.is_in_stock ? 'true' : 'false'}
                onChange={(e) => handleOptionChange(index, 'is_in_stock', e.target.value === 'true')}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
          ))}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
