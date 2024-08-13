import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png";
// import AddListingButton from './AddListingBtn';

const Auth_navbar = () => {

    return (
      <nav className="fixed top-0 z-[9999] w-full bg-white text-gray-900 p-2 border-b-2">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link to="/">
              <img src={logo} alt="Logo" className="w-34 h-10" />
            </Link>
          </div>
        </div>
      </nav>
    );
}

export default Auth_navbar
