import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



import DistrictModal from "./DistrictModel"; 



// Import district images
import chennai from "../../assets/chennai.jpg";
import Coimbatore from "../../assets/coimbatore.jpeg";
import Erode from "../../assets/erode.png";
import Dindigul from "../../assets/dindigul.jpeg";
import Madurai from "../../assets/madurai.jpg";
import Salem from "../../assets/salem.jpg";
import Thoothukudi from "../../assets/thoothukudi.jpeg";
import Tiruppur from "../../assets/tiruppur.jpeg";
import Vellore from "../../assets/vellore.jpg";
import Tirunelveli from "../../assets/tirunelveli.jpeg";
import Trichy from "../../assets/trichy.jpg";
import Thanjavur from "../../assets/thanjavur.jpg"; // Corrected the typo
import sivakasi from "../../assets/sivakasi.jpg";




const ExploreButton = () => {
    const navigate = useNavigate();
    const [isDistrictModalOpen, setIsDistrictModalOpen] = useState(false);
    const [selectedDistrict, setSelectedDistrict] = useState(null); 

    // Districts data
    const districts = [
        { name: "Chennai", image: chennai },
        { name: "Coimbatore", image: Coimbatore },
        { name: "Madurai", image: Madurai },
        { name: "Salem", image: Salem },
        { name: "Tiruppur", image: Tiruppur },
        { name: "Erode", image: Erode },
        { name: "Vellore", image: Vellore },
        { name: "Thoothukudi", image: Thoothukudi },
        { name: "Tirunelveli", image: Tirunelveli },
        { name: "Dindigul", image: Dindigul },
        { name: "Tiruchirappalli", image: Trichy },
       { name: "Thanjavur", image: Thanjavur }, 
       { name: "Sivakasi", image: sivakasi },
    ];

    const handleSelectDistrict = (district) => {
        setSelectedDistrict(district.name);
        const formattedAddress = encodeURIComponent(district.name);
        const url = `/property?address=${formattedAddress}&p=0&t=a&propertyType=all`;
        // console.log(`Navigating to: ${url}`);
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
        </div>
    );
};

export default ExploreButton;
