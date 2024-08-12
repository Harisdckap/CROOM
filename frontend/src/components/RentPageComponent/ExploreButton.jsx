import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DistrictModal from "./DistrictModel"; // New District Modal
import Modal from "./LocationModel"; // Existing City Modal

// Import images correctly
import adyar from "../../assets/adyar.webp";
import alandur from "../../assets/alandur.webp";
import alwarpet from "../../assets/alwarpet.webp";
import annanagar from "../../assets/annanagar.webp";
import arumbakkam from "../../assets/arumbakkam.webp";
import mogapar from "../../assets/mogapar.webp";


// Hyderbad images

import gachibowli from "../../assets/gachibowli.webp";
import gowlidoddy from "../../assets/gowlidoddy.webp";
import hitec_city from "../../assets/hitec_city.webp";
import kondapur from "../../assets/kondapur.webp";

// Delhi images

import dwarka from "../../assets/dwarka.webp";
import laxmi_nagar from "../../assets/laxmi_nagar.webp";


// mumbai images
import bhandup_west from "../../assets/bhandup_west.webp";
import chembur from "../../assets/chembur.webp";
import andheri_east from "../../assets/andheri_east.webp";

// Import district images
import chennai from "../../assets/chennai.webp";
import hyderabad from "../../assets/hyderbad.webp";
import delhi from "../../assets/delhi.webp";
import mumbai from "../../assets/mumbai.webp";

const ExploreButton = () => {
    const navigate = useNavigate();
    const [isDistrictModalOpen, setIsDistrictModalOpen] = useState(false);
    const [isCityModalOpen, setIsCityModalOpen] = useState(false);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedLocation, setSelectedLocation] = useState(""); 

    // Districts data
    const districts = [
        { name: "Chennai", image: chennai },
        { name: "Hyderabad", image: hyderabad },
        { name: "Delhi", image: delhi },
        { name: "Mumbai", image: mumbai },
    ];

    // Cities data for each district
    const cities = {
        Chennai: [
            { name: "Adyar", image: adyar },
            { name: "Alandur", image: alandur },
            { name: "Alwarpet", image: alwarpet },
            { name: "Anna Nagar", image: annanagar },
            { name: "Arumbakkam", image: arumbakkam },
            { name: "Mogapar", image: mogapar },
        ],
        Hyderabad: [
            {name:"gachibowli",image: gachibowli},
             {name:"gowlidoddy",image: gowlidoddy},
             {name:"hitec_city",image: hitec_city},
             {name:"kondapur",image: kondapur}
        ],
        Delhi: [  
            {name: "Dwarka", image: dwarka},
            {name: "Laxmi Nagar", image: laxmi_nagar},
        ],
        Mumbai: [
            {name: "Bhandup West", image: bhandup_west},
            {name: "Chembur", image: chembur},
            {name: "Andheri East", image: andheri_east},
        ]
    };

    const handleSelectDistrict = (district) => {
        setSelectedDistrict(district.name);
        setIsDistrictModalOpen(false);
        setIsCityModalOpen(true);
    };

    const handleSelectLocation = (location) => {
        setIsCityModalOpen(false);
        setSelectedLocation(location.name); // Store selected location
        console.log(`Selected location: ${location.name}`);
        // Navigate to the room listing page with selected location params
        const url = `/property?address=${encodeURIComponent(location.name)}&p=0&t=a`;
        navigate(url);
    };

    const handleClick = () => {
        // Check if the auth token is present in localStorage
        const authToken = localStorage.getItem("auth_token");

        if (authToken) {
            // Open the district modal to select a district if auth token is present
            setIsDistrictModalOpen(true);
        } else {
            // Navigate to the login page if auth token is not present
            navigate("/login");
        }
    };

    return (
        <div>
            <button
                onClick={handleClick}
                className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-blue-600 transition duration-300"
            >
                Explore Rooms
            </button>
            {/* District Modal */}
            <DistrictModal
                isOpen={isDistrictModalOpen}
                onClose={() => setIsDistrictModalOpen(false)}
                districts={districts}
                onSelectDistrict={handleSelectDistrict}
            />
            {/* City Modal */}
            <Modal
                isOpen={isCityModalOpen}
                onClose={() => setIsCityModalOpen(false)}
                locations={cities[selectedDistrict]}
                onSelectLocation={handleSelectLocation}
            />
        </div>
    );
};

export default ExploreButton;
