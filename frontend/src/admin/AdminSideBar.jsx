import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';
import logo from "../assets/logo.png";


const AdminSideBar = ({ setSelectedMenuTitle }) => {
  const location = useLocation();

  const formatPath = (path) => path.replace(/([A-Z])/g, '-$1').replace(/\s+/g, '-').toLowerCase();

  const adminMenu = [
   
   
    { title: 'User Management', key: 'users', icon: <FaUsers /> },
   
    
    

    // Add more items as needed
  ];

  return (
    <div className="h-full fixed w-56 bg-blue-950 text-white overflow-y-auto">
      <Link to="/admin">
        <div className="title p-4 pt-4 text-xl font-bold cursor-pointer hover:text-primary-green">
          <img src={logo} alt="Logo" className="h-15 w-auto" />
        </div>
      </Link>
      <ul>
        {adminMenu.map((menu) => {
          const menuPath = formatPath(menu.key);
          const isActiveMenu = location.pathname.includes(menuPath);

          return (
            <li key={menu.key}>
              <div
                className={`flex items-center w-full justify-start my-1 py-2 px-4 transition-colors duration-200 rounded-md ${
                  isActiveMenu ? 'bg-white bg-opacity-10' : 'hover:bg-white hover:bg-opacity-10'
                }`}
                onClick={() => setSelectedMenuTitle(menu.title)} //update title on click
              >
                <Link to={`/admin/${menuPath}`} className="flex-1 text-center">
                  <button
                    className={`w-full flex items-center text-sm  text-left text-white  ${
                      isActiveMenu ? 'text-white text-lg font-semibold' : 'text-white text-lg font-normal'
                    }`}
                  >
                    <span className="mr-2">{menu.icon}</span>
                    {menu.title}
                  </button>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminSideBar;
