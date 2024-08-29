import React from 'react';
import { useParams } from 'react-router-dom';
import { getAdjustedFrameFinishPrice } from '../../utils/priceUtils';
import useProductDetail from '../../hooks/useProductDetail';
import Options from '../../components/options/Options';

const ProductDetail = () => {
  const { productId } = useParams();
  const {
    product,
    selectedOptions,
    totalPrice,
    availableOptions,
    handleOptionChange,
    handleAddToCart,
    clearSelection,
    isOptionDisabled,
  } = useProductDetail(productId);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <section className="py-10 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
          <div className="w-full lg:w-1/2">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-auto rounded-md bg-gray-200 shadow-lg mb-6"
            />
            <div className="mb-4">
              <p className="font-semibold text-sm text-gray-900">
                Total Price: {totalPrice.toFixed(2)} EUR
              </p>
            </div>
            <button
              onClick={handleAddToCart}
              className="py-2 px-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium shadow-md transition-all duration-300"
            >
              Add to Cart
            </button>
            <button
              onClick={clearSelection}
              className="py-2 px-4 w-full bg-red-600 hover:bg-red-700 text-white rounded-md font-medium shadow-md transition-all duration-300 mt-4"
            >
              Clear Selection
            </button>
          </div>

          <div className="w-full lg:w-1/2">
            <h2 className="mb-2 font-bold text-2xl leading-7 text-gray-900">
              {product.name}
            </h2>
            <h6 className="font-medium text-lg leading-6 text-gray-900 mb-6">
              {product.base_price} EUR
            </h6>

            <Options
              availableOptions={availableOptions}
              selectedOptions={selectedOptions}
              handleOptionChange={handleOptionChange}
              isOptionDisabled={isOptionDisabled}
              getAdjustedFrameFinishPrice={getAdjustedFrameFinishPrice}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
