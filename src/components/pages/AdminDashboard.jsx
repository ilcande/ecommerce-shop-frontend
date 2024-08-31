import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const actions = [
    { label: 'Add Product', path: '/admin/products/new' },
    { label: 'Add Part', path: '/admin/parts/new' },
    { label: 'Add Option', path: '/admin/options/new' },
    { label: 'Add Constraint', path: '/admin/constraints/new' },
    { label: 'Add Product Configuration', path: '/admin/product-configurations/new' },
  ];

  return (
    <div className="p-6">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Admin Dashboard</h1>
        <p className="text-gray-600 text-center">
          Manage your products, parts, options, and constraints from this dashboard.
        </p>
      </header>

      {/* Action Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {actions.map((action, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6">
            <h5 className="text-xl font-semibold mb-4">{action.label}</h5>
            <button
              onClick={() => navigate(action.path)}
              className="mt-2 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Go
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
