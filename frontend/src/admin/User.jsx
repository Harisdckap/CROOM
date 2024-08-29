import React, { useState } from 'react';
import Userlist from './Userlist';
import Adminlist from './Adminlist';

const User = () => {
  const [activeTab, setActiveTab] = useState('userslist');

  return (
    <div className="flex-1 min-h-full bg-gray-100">
      <div className="top bg-white  flex w-full border-b">
        <div
          onClick={() => setActiveTab('userslist')}
          className={`text-center w-3/12 py-3 font-semibold cursor-pointer transition duration-300 ${
            activeTab === 'userslist'
              ? 'text-blue-950 border-b-4 border-blue-950'
              : 'text-gray-500 hover:text-blue-900'
          }`}
        >
          Users List
        </div>
        <div
          onClick={() => setActiveTab('adminslist')}
          className={`text-center w-3/12 py-3 font-semibold cursor-pointer transition duration-300 ${
            activeTab === 'adminslist'
              ? 'text-blue-950 border-b-4 border-blue-950'
              : 'text-gray-500 hover:text-blue-900'
          }`}
        >
          Admin List
        </div>
        {/* Add more tabs here if needed */}
      </div>
      <div className="bottom min-h-full bg-white  shadow-md rounded-b-lg p-4">
        {activeTab === 'userslist' && <Userlist />}
        {activeTab === 'adminslist' && <Adminlist />}
        {/* Add more tab content here if needed */}
      </div>
    </div>
  );
};

export default User;
