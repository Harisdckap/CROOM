import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import HomeNavBar from "../Header";
import { useNavigate } from "react-router-dom";
import "../../slider.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faHome } from "@fortawesome/free-solid-svg-icons";

const MyFavPage = () => {
    const navigate = useNavigate();
    const [favourites, setFavourites] = useState([]);
    const userId = localStorage.getItem("user_id");

    useEffect(() => {
        fetchFavourites(userId);
    }, [userId]);

    const fetchFavourites = async (userId) => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/user/${userId}/favourites`
            );
            setFavourites(response.data.data);

            console.log(response.data.data);
            
        } catch (error) {
            console.error("Error fetching favorite listings:", error);
        }
    };

    const renderSlider = (photos) => {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            className: "custom-slider",
            dotsClass: "custom-dots",
        };

        return (
            <Slider {...settings}>
                {photos.map((photo, index) => (
                    <div key={index}>
                        <img
                            src={`http://127.0.0.1:8000/storage/${photo}`}
                            alt="Property Photo"
                            className="w-full h-48 object-cover rounded-lg"
                            onError={(e) =>
                                (e.target.src = "/path/to/fallback-image.jpg")
                            }
                        />
                    </div>
                ))}
            </Slider>
        );
    };

    const handleViewClick = (id, location, type) => {
        const trimmedLocation = location.trim();
        navigate(
            `/property/${btoa(id)}/${encodeURIComponent(
                trimmedLocation
            )}/${type}`
        );
    };

    const renderListing = (listing, index) => {
        let photos = [];
        let locationData = {};
        let roomType = listing.room_type || listing.pg_type;

        if (listing.photos) {
            try {
                photos = JSON.parse(listing.photos).map((photo) =>
                    photo.replace("/", "/")
                );
            } catch (error) {
                console.error("Failed to parse photos:", error);
            }
        }

        if (listing.location) {
            try {
                const outerJson = JSON.parse(listing.location);
                locationData = JSON.parse(outerJson);
            } catch (error) {
                console.error("Failed to parse location data:", error);
            }
        }

        const city =
            (typeof locationData.city === "string" &&
                locationData.city.trim()) ||
            "Unknown City";
        const district =
            (typeof locationData.district === "string" &&
                locationData.district.trim()) ||
            "Unknown District";

        return (
            <div
                key={`${listing.id}-${index}`}
                className={`border rounded-lg p-6 bg-white shadow-md hover:bg-gray-200 ml-4 mr-4 cursor-pointer`}
                onClick={() =>
                    handleViewClick(listing.id, city, listing.listing_type)
                }
            >
                <div className="relative">
                    {photos.length > 0 ? (
                        renderSlider(photos)
                    ) : (
                        <p className="text-gray-500 text-center">
                            No photo available.
                        </p>
                    )}
                </div>
                <div className="px-2">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold gradient-text">
                            {listing.title || listing.pg_name || listing.post}
                        </h2>
                        <p className="text-green-600 flex items-center">
                            <FontAwesomeIcon
                                icon={faMapMarkerAlt}
                                className="mr-2"
                            />
                            {city}, {district}
                        </p>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between items-center mt-2 p-1">
                        <div className="text-gray-700">
                            <p>
                                <span className="font-semibold">
                                    ₹
                                    {listing.price ||
                                        listing.occupancy_amount ||
                                        listing.approx_rent}
                                </span>
                            </p>
                        </div>
                        <p className="text-gray-700 flex items-center">
                            <FontAwesomeIcon icon={faHome} className="mr-2" />
                            Room Type: {roomType}
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <HomeNavBar />

            <div className="flex flex-col items-center mt-10">
                <h1 className="text-3xl font-bold text-white mt-6">
                    My Favorites List
                </h1>
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favourites.length > 0 ? (
                        favourites.map(renderListing)
                    ) : (
                        <p className="text-center text-gray-500">
                            No favorites available.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyFavPage;
