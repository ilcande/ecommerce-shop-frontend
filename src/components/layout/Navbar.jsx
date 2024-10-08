import React from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import CartSidebar from '../cart/CartSidebar';
import useLogout from '../../hooks/useLogout';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const { isAdmin, handleLogout } = useLogout();
  const navigation = [
    { name: 'Products', href: '/products', key: 'products' },
    isAdmin && { name: 'Admin Dashboard', href: '/admin/dashboard', key: 'admin-dashboard' },
  ];

  return (
    <Disclosure as="nav" className="bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="inline-flex items-center justify-center p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon className="hidden h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item, index) => (
                  <Link
                    key={index}
                    to={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/* Right side with Cart and Logout */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <CartSidebar />
            {isAdmin && (
              <button
                onClick={handleLogout}
                className="ml-4 px-3 py-2 text-sm font-medium text-gray-800 hover:text-gray-600 focus:outline-none"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item, index) => (
            <DisclosureButton
              key={index}
              as={Link}
              to={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-200 text-gray-800' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
          <div className="flex items-center">
            <DisclosureButton className="relative block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900">
              <ShoppingCartIcon className="h-6 w-6 inline-block" aria-hidden="true" />
            </DisclosureButton>
            {isAdmin && (
              <DisclosureButton
                onClick={handleLogout}
                className="ml-4 px-3 py-2 text-base font-medium text-gray-800 hover:text-gray-600"
              >
                Logout
              </DisclosureButton>
            )}
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
