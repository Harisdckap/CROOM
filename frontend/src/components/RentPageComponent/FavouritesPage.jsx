import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faHome, faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import "../../slider.css";

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || {});
    const [listings, setListings] = useState([]);

    useEffect(() => {
        fetchFavoriteListings();
    }, []);

    const fetchFavoriteListings = async () => {
        try {
            const favoriteIds = Object.keys(favorites).filter((id) => favorites[id]);
            if (favoriteIds.length === 0) return;

            const response = await axios.get(`http://127.0.0.1:8000/api/properties/favorites`, {
                params: { ids: favoriteIds },
            });
            setListings(response.data.data);
        } catch (error) {
            console.error("Error fetching favorite listings:", error);
        }
    };

    const toggleFavorite = (id) => {
        setFavorites((prev) => {
            const newFavorites = { ...prev, [id]: !prev[id] };
            localStorage.setItem("favorites", JSON.stringify(newFavorites));
            return newFavorites;
        });
    };

    const handleViewClick = (id, location, listingType) => {
        const trimmedLocation = location.trim();
        navigate(`/property/${btoa(id)}/${encodeURIComponent(trimmedLocation)}/${listingType}`);
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
                            onError={(e) => (e.target.src = "/path/to/fallback-image.jpg")}
                        />
                    </div>
                ))}
            </Slider>
        );
    };

    const renderListing = (listing) => {
        let photos = [];
        if (listing.photos) {
            photos = JSON.parse(listing.photos).map((photo) => photo.replace("/", "/"));
        }

        return (
            <div key={listing.id} className="border rounded-lg p-6 bg-white shadow-md ml-4 mr-4">
                <div className="relative">
                    {photos.length > 0 ? renderSlider(photos) : <p className="text-gray-500 text-center">No photo available.</p>}
                </div>
                <div className="px-2">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold gradient-text">
                            {listing.title || listing.pg_name || listing.post}
                        </h2>
                        <p className="text-green-600 flex items-center">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                            {listing.location}
                        </p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <div className="cursor-pointer text-gray-700 hover:text-red-500" onClick={() => toggleFavorite(listing.id)}>
                            <FontAwesomeIcon icon={solidHeart} className="text-xl" />
                        </div>
                        <p className="text-gray-700 flex items-center">
                            <FontAwesomeIcon icon={faHome} className="mr-2" />
                            Room Type: {listing.room_type || listing.pg_type}
                        </p>
                    </div>
                    <hr className="my-2" />
                    <div
                        className="flex justify-between items-center mt-2 cursor-pointer hover:bg-slate-300 rounded p-1"
                        onClick={() => handleViewClick(listing.id, listing.location, listing.listing_type)}
                    >
                        <div className="text-gray-700">
                            <p>
                                <span className="font-semibold">₹{listing.price || listing.occupancy_amount || listing.approx_rent}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="flex justify-center mt-6">
                <div className="container mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {listings.map(renderListing)}
                </div>
            </div>
        </div>
    );
};

export default FavoritesPage;
