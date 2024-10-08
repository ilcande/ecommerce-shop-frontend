import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon, ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CartSidebar() {
  const [open, setOpen] = useState(false);
  const { cart, getCartItemCount, removeFromCart, clearCart } = useCart();
  const navigate  = useNavigate();

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => {
    const price = item.totalPrice || 0;
    const quantity = item.quantity || 1;
    return total + (price * quantity);
  }, 0);

  const handleRemoveItem = (cartItemId) => {
    removeFromCart(cartItemId);
  };

  const handleCheckout = async () => {
    try {
      await axios.post('/checkout', { cart_items: cart });
  
      setOpen(false);
      clearCart();
      navigate('/products');
      toast.success('Checkout successful!', { autoClose: 3000 });
    } catch (error) {
      console.error('Error during checkout:', error);
      
      // Handle axios errors correctly
      if (error.response) {
        // The request was made and the server responded with a status code outside the range of 2xx
        toast.error('Error during checkout. Please try again.');
      } else if (error.request) {
        // The request was made but no response was received
        toast.error('Error during checkout. Please try again.');
      }
    }
  };
  

  return (
    <>
      {/* Button to open cart */}
      <button
        onClick={() => setOpen(true)}
        className="relative rounded-full p-1 text-gray-400 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
        {getCartItemCount() > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-medium text-white bg-red-500 rounded-full">
            {getCartItemCount()}
          </span>
        )}
      </button>

      {/* Slide-out cart panel */}
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul className="-my-6 divide-y divide-gray-200">
                          {cart.map((item, index) => (
                            <li key={index} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  alt={item.product.imageAlt || 'Product Image'}
                                  src={item.product.image_url || 'https://via.placeholder.com/150'}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a href={item.product.href}>{item.product.name}</a>
                                    </h3>
                                    <p className="ml-4">${item.totalPrice.toFixed(2)}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">{item.product.color}</p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">Qty {item.quantity || 1}</p>
                                  <div className="flex items-center">
                                    <button
                                      type="button"
                                      className="font-medium text-red-600 hover:text-red-500"
                                      onClick={() => handleRemoveItem(item.id)}
                                    >
                                      <TrashIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Footer Section */}
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>${subtotal.toFixed(2)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                      <button
                        onClick={handleCheckout}
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Checkout
                      </button>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{' '}
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
