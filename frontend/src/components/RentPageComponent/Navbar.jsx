import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
    MagnifyingGlassIcon,
    HomeIcon,
    UsersIcon,
    BuildingOfficeIcon,
    CurrencyDollarIcon
} from "@heroicons/react/24/outline";


const Navbar = ({ search, onSearchChange, onSearchSubmit, gender, onGenderChange, setListingType }) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const currentType = queryParams.get('t') || 'a'; 


    const handleTypeClick = (type) => {
        setListingType(type);
    };

    // const handleBudgetApply = (min, max) => {
    //     const queryString = new URLSearchParams({
    //         address: 'Chennai',
    //         p: 0,
    //         t: currentType,
    //     }).toString();
    //     // Update the URL or submit the form based on your requirements
    //     window.location.search = queryString;
    // };

    return (
        <div className="w-full bg-white mx-auto flex items-center justify-between pt-16 mt-2 pb-2 px-4">
            <div className="flex items-center space-x-6">
                <NavLink
                    to="?address=Chennai&p=1&t=a"
                    onClick={() => handleTypeClick('a')}
                    className={({ isActive }) =>
                        `flex items-center font-medium ${
                            currentType === 'a' ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                        }`
                    }
                >
                    <HomeIcon className="h-6 w-6 mr-1" />
                    All Listings
                </NavLink>
                <NavLink
                    to="?address=Chennai&p=1&t=r"
                    onClick={() => handleTypeClick('r')}
                    className={({ isActive }) =>
                        `flex items-center font-medium ${
                            currentType === 'r' ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                        }`
                    }
                >
                    <HomeIcon className="h-6 w-6 mr-1" />
                    Rooms
                </NavLink>
                <NavLink
                    to="?address=Chennai&p=1&t=rm"
                    onClick={() => handleTypeClick('rm')}
                    className={({ isActive }) =>
                        `flex items-center font-medium ${
                            currentType === 'rm' ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                        }`
                    }
                >
                    <UsersIcon className="h-6 w-6 mr-1" />
                    Roommates
                </NavLink>
                <NavLink
                    to="?address=Chennai&p=1&t=pg"
                    onClick={() => handleTypeClick('pg')}
                    className={({ isActive }) =>
                        `flex items-center font-medium ${
                            currentType === 'pg' ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                        }`
                    }
                >
                    <BuildingOfficeIcon className="h-6 w-6 mr-1" />
                    PG
                </NavLink>
              
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSearchSubmit(search);
                }}
                className="flex items-center space-x-4"
            >
                <div className="relative w-full">
                    <input
                        type="text"
                        value={search}
                        onChange={onSearchChange}
                        placeholder="Chennai..."
                        className="border border-gray-300 rounded-full py-2 pl-10 pr-4 w-full focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>

                <div className="relative inline-block">
                    <select
                        value={gender}
                        onChange={onGenderChange}
                        className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg leading-tight focus:outline-none focus:border-gray-600"
                    >
                        <option value="all">All</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg
                            className="h-4 w-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>
                {/* <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center font-medium text-gray-700 hover:text-blue-600"
                >
                    <CurrencyDollarIcon className="h-6 w-6 mr-1" />
                    Budget
                </button> */}
            </form>

   
        </div>
    );
};

export default Navbar;
