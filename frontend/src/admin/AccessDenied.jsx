import React from 'react';

const AccessDenied = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Access Denied</h1>
        <p className="text-gray-700 mb-4">
          You are not authorized to access this page.
        </p>
        <p className="text-gray-700">
          Please contact the administrator if you believe this is an error, or{' '}
          <a href="/" className="text-blue-500 hover:underline">
            return to the homepage
          </a>.
        </p>
      </div>
    </div>
  );
};

export default AccessDenied;

