import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import AddListingButton from "./AddListingBtn";
import UserAdsComponent from "./UserAdsComponent";

const Header = () => {
    const [accountOpen, setAccountOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleAccount = () => setAccountOpen(!accountOpen);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        setIsLoggedIn(!!token);
    }, []);

    const onLogout = async () => {
        const token = localStorage.getItem("auth_token");

        if (token) {
            try {
                const response = await axios.post(
                    "http://127.0.0.1:8000/api/logout",
                    {},
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status === 200) {
                    localStorage.removeItem("auth_token");
                    setIsLoggedIn(false);
                    navigate("/login");
                } else {
                    console.error("Logout failed");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };

    const handleMyAdsClick = () => {
        setDrawerOpen(true);
        setAccountOpen(false);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
        setAccountOpen(true);
    };

    return (
        <nav className="fixed top-0 z-[9999] w-full bg-white text-gray-900 p-2 border-b-2">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/">
                    <img src={logo} alt="Logo" className="w-34 h-10" />
                </Link>

                {/* Hamburger Icon for Mobile */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu}>
                        {menuOpen ? (
                            <FaTimes className="text-2xl text-blue-500" />
                        ) : (
                            <FaBars className="text-2xl text-blue-500" />
                        )}
                    </button>
                </div>

                {/* Menu Items */}
                <div className={`md:flex items-center space-x-4 ${menuOpen ? "block" : "hidden"} md:block`}>
                    <div className="relative">
                        {isLoggedIn ? (
                            <>
                                <button
                                    onClick={toggleAccount}
                                    className="text-blue-500 flex items-center"
                                >
                                    <FaUser className="mr-1 text-blue-500" />
                                    My Account
                                    <svg
                                        className="w-4 h-4 ml-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                {accountOpen && (
                                    <div className="absolute -left-4 top-8 w-40 text-center bg-slate-100 p-2 shadow-md text-black rounded">
                                        <Link to="/profile">
                                            <a
                                                href="#"
                                                className="block hover:bg-blue-300 rounded p-2"
                                            >
                                                Profile
                                            </a>
                                        </Link>
                                        <button
                                            onClick={handleMyAdsClick}
                                            className="block text-center hover:bg-blue-300 rounded p-2 w-full text-left"
                                        >
                                            My Ads
                                        </button>
                                        <Link to="/my-fav">
                                            <a
                                                href="#"
                                                className="block hover:bg-blue-300 rounded p-2"
                                            >
                                                My Favourite
                                            </a>
                                        </Link>
                                        <button
                                            onClick={onLogout}
                                            className="block text-center hover:bg-blue-300 rounded p-2 w-full text-left"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex space-x-1">
                                <Link
                                    to="/register"
                                    className="text-blue-500 hover:underline"
                                >
                                    Register
                                </Link>
                                <Link
                                    to="/login"
                                    className="text-blue-500 hover:underline"
                                >
                                    Login
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Add Listing Button */}
                    <AddListingButton />
                </div>
            </div>

            <UserAdsComponent drawerOpen={drawerOpen} closeDrawer={closeDrawer} />
        </nav>
    );
};

export default Header;
