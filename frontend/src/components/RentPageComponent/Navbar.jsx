import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
    MagnifyingGlassIcon,
    HomeIcon,
    UsersIcon,
    BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

const Navbar = ({
    search,
    onSearchChange,
    onSearchSubmit,
    gender,
    onGenderChange,
    setListingType,
    onSortChange,
}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const currentType = queryParams.get("t") || "a";
    const currentSortOrder = queryParams.get("sort") || "ASC";

    const [sortOrder, setSortOrder] = useState(currentSortOrder);

    const updateQueryParams = (params) => {
        const updatedParams = new URLSearchParams(location.search);
        Object.keys(params).forEach((key) => {
            if (params[key] !== undefined && params[key] !== null) {
                updatedParams.set(key, params[key]);
            } else {
                updatedParams.delete(key);
            }
        });
        navigate({ search: updatedParams.toString() });
    };

    const handleTypeClick = (type) => {
        setListingType(type);
        updateQueryParams({
            address: "Chennai",
            p: 0,
            t: type,
            sort: sortOrder,
        });
    };

    const handleSortChange = (e) => {
        const order = e.target.value;
        setSortOrder(order);
        onSortChange(order);
    };

    return (
        <div className="w-full h-32 bg-white mx-auto flex items-center justify-between pt-16 px-4">
            <div className="flex items-center space-x-6">
                <NavLink
                    to="?address=Chennai&p=0&t=a&sort=ASC"
                    onClick={() => handleTypeClick("a")}
                    className={({ isActive }) =>
                        `flex items-center font-medium ${
                            currentType === "a"
                                ? "text-blue-600"
                                : "text-gray-700 hover:text-blue-600"
                        }`
                    }
                >
                    <HomeIcon className="h-6 w-6 mr-1" />
                    All Listings
                </NavLink>
                <NavLink
                    to="?address=Chennai&p=0&t=r&sort=ASC"
                    onClick={() => handleTypeClick("r")}
                    className={({ isActive }) =>
                        `flex items-center font-medium ${
                            currentType === "r"
                                ? "text-blue-600"
                                : "text-gray-700 hover:text-blue-600"
                        }`
                    }
                >
                    <HomeIcon className="h-6 w-6 mr-1" />
                    Rooms
                </NavLink>
                <NavLink
                    to="?address=Chennai&p=0&t=rm&sort=ASC"
                    onClick={() => handleTypeClick("rm")}
                    className={({ isActive }) =>
                        `flex items-center font-medium ${
                            currentType === "rm"
                                ? "text-blue-600"
                                : "text-gray-700 hover:text-blue-600"
                        }`
                    }
                >
                    <UsersIcon className="h-6 w-6 mr-1" />
                    Roommates
                </NavLink>
                <NavLink
                    to="?address=Chennai&p=0&t=pg&sort=ASC"
                    onClick={() => handleTypeClick("pg")}
                    className={({ isActive }) =>
                        `flex items-center font-medium ${
                            currentType === "pg"
                                ? "text-blue-600"
                                : "text-gray-700 hover:text-blue-600"
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
                className="flex items-center space-x-4 w-full max-w-xl"
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
                        className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:border-gray-600"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath fill='gray' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                            backgroundPosition: "right 12px center",
                            backgroundRepeat: "no-repeat",
                        }}
                    >
                        <option value="all">All</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div className="relative inline-block">
                    <select
                        onChange={handleSortChange}
                        value={sortOrder}
                        className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:border-gray-600"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath fill='gray' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                            backgroundPosition: "right 12px center",
                            backgroundRepeat: "no-repeat",
                        }}
                    >
                        <option value="ASC">Low to High</option>
                        <option value="DESC">High to Low</option>
                        <option value="NEWEST">Newest First</option>
                    </select>
                </div>
            </form>
        </div>
    );
};

export default Navbar;
