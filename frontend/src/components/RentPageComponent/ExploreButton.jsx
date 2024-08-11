import React from "react";
import { useNavigate } from "react-router-dom";

const ExploreButton = () => {
    const navigate = useNavigate(); // Use useNavigate hook from react-router-dom
    const address = "Chennai";
    const page = 1;
    const type = "a";

    // Construct the URL with query parameters
    const url = `/property?address=${encodeURIComponent(address)}&p=${page}&t=${type}`;

    const handleClick = () => {
        // Check if the auth token is present in localStorage
        const authToken = localStorage.getItem("auth_token");

        if (authToken) {
            // Navigate to the property page if auth token is present
            navigate(url);
        } else {
            // Navigate to the login page if auth token is not present
            navigate("/login");
        }
    };

    return (
        <button
            onClick={handleClick}
            className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-blue-600 transition duration-300"
        >
            Explore Rooms
        </button>
    );
};

export default ExploreButton;
