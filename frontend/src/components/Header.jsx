import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";
import AddListingButton from './AddListingBtn';

const Header = () => {
  const [accountOpen, setAccountOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const toggleAccount = () => setAccountOpen(!accountOpen);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    setIsLoggedIn(!!token);
  }, []);

  const onLogout = async () => {
    const token = localStorage.getItem('auth_token');

    if (token) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/logout', {}, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          localStorage.removeItem('auth_token');
          setIsLoggedIn(false);
          navigate('/login');
        } else {
          console.error('Logout failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
};

  return (
    <nav className="fixed top-0 z-[9999] w-full bg-white text-gray-900 p-2 border-b-2">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-10">
          <Link to="/">
          <img src={logo} alt="Logo" className="w-34 h-10" />
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            {isLoggedIn ? (
              <>
                <button onClick={toggleAccount} className="flex items-center">
                  <FaUser className="mr-1" />
                  My Account
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {accountOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
                    <Link to="/profile">
                    <a href="#" className="block px-4 py-2">Profile</a>
                    </Link>
                    <Link to="/my-ads">
                    <a href="#" className="block px-4 py-2">My Ads</a>
                    </Link>
                    <button onClick={onLogout} className="block px-4 py-2 w-full text-left">
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex space-x-1">
                <Link to="/register" className="text-blue-500 hover:underline">
                  Register /
                </Link>
                <Link to="/login" className="text-blue-500 hover:underline">
                  Login
                </Link>
              </div>
            )}
          </div>
          {/* Add Listing Button */}
          <AddListingButton />
        </div>
      </div>
    </nav>
  );
};

export default Header;
