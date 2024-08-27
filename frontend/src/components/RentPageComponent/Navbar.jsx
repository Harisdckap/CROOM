import React from "react";
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
    propertyType,
    onPropertyTypeChange,
}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const currentType = queryParams.get("t") || "a";
    const currentSortOrder = queryParams.get("sort") || "ASC";
    const address = decodeURIComponent(queryParams.get("address") || "");
    
    const handleTypeClick = (type) => {
        setListingType(type);
        updateQueryParams({
            address: address,
            t: type,
            sort: currentSortOrder,
            propertyType: propertyType,
        });
    };

    const handleSortChange = (e) => {
        const order = e.target.value;
        onSortChange(order);
        updateQueryParams({
            address: address,
            t: currentType,
            sort: order,
            propertyType: propertyType,
        });
    };

    const handlePropertyTypeChange = (e) => {
        onPropertyTypeChange(e.target.value);
        updateQueryParams({
            address: address,
            t: currentType,
            sort: currentSortOrder,
            propertyType: e.target.value,
        });
    };

    const updateQueryParams = (params) => {
        const newParams = new URLSearchParams(params).toString();
        navigate(`?${newParams}`);
    };

    return (
        <div className="w-full h-32 bg-white mx-auto flex items-center justify-between pt-16 px-4">
            <div className="flex items-center space-x-6">
                <NavLink
                    to={`?address=${encodeURIComponent(
                        search || "chennai"
                    )}&p=0&t=a&sort=${currentSortOrder}&propertyType=${propertyType}`}
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
                    to={`?address=${encodeURIComponent(
                        search || "chennai"
                    )}&p=0&t=r&sort=ASC&propertyType=${propertyType}`}
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
                    to={`?address=${encodeURIComponent(
                        search || "chennai"
                    )}&p=0&t=rm&sort=ASC&propertyType=${propertyType}`}
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
                    to={`?address=${encodeURIComponent(
                        search || "chennai"
                    )}&p=0&t=pg&sort=ASC&propertyType=${propertyType}`}
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
                {/* Other NavLinks */}
            </div>

            <form
                onSubmit={onSearchSubmit}
                className="flex items-center space-x-4 w-full max-w-xl"
            >
                <div className="relative w-full">
                    <input
                        type="text"
                        value={search}
                        onChange={onSearchChange}
                        placeholder="Enter a location..."
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
                        <option value="all">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div className="relative inline-block">
                    <select
                        onChange={handleSortChange}
                        value={currentSortOrder}
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

                {/* Property Type Filter */}
                <div className="relative inline-block">
                    <select
                        value={propertyType}
                        onChange={handlePropertyTypeChange}
                        className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:border-gray-600"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath fill='gray' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                            backgroundPosition: "right 12px center",
                            backgroundRepeat: "no-repeat",
                        }}
                    >
                        <option value="all">All Type</option>
                        <option value="1RK">1RK</option>
                        <option value="1BHK">1BHK</option>
                        <option value="2BHK">2BHK</option>
                        <option value="3BHK">3BHK</option>
                    </select>
                </div>
            </form>
        </div>
    );
};

export default Navbar;
