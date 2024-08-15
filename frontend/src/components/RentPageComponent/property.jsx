import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import Navbar from "./Navbar";
import HomeNavBar from "../Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMapMarkerAlt,
    faHome,
    faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import "../../slider.css";

const PropertyPage = () => {
    const navigate = useNavigate();
    const [listings, setListings] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("address") || "");
    const [gender, setGender] = useState(searchParams.get("gender") || "all");
    const [sortOrder, setSortOrder] = useState(
        searchParams.get("sort") || "ASC"
    );

    useEffect(() => {
        fetchListings();
    }, [searchParams]);

    const fetchListings = async () => {
        try {
            const params = {
                address: searchParams.get("address") || "",
                t: searchParams.get("t") || "a",
                gender: searchParams.get("gender") || "all",
                sort: searchParams.get("sort") || sortOrder,
            };
            const response = await axios.get(
                "http://127.0.0.1:8000/api/properties",
                { params }
            );
    
            setListings([]); // Clear previous listings
            setListings(response.data.data); // Set new listings
            console.log("properties:", response.data.data);
            console.log("listings:", response.data.listings);
            console.log("roommates:", response.data.roommates);
            console.log("pg:", response.data.pg_listings);


        } catch (error) {
            console.error("Error fetching listings:", error);
        }
    };
    

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("gender", event.target.value);
            return newParams;
        });
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setSearchParams({
            address: search,
            t: searchParams.get("t") || "a",
            gender: gender,
            sort: sortOrder,
        });
    };

    const handleSortChange = (order) => {
        setSortOrder(order);
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("sort", order);
            return newParams;
        });
    };

    const setListingType = (type) => {
        setSearchParams({
            address: searchParams.get("address") || "",
            t: type,
            gender: gender,
            sort: sortOrder,
        });
    };

    const handleViewClick = (id, location, listingType) => {
        const trimmedLocation = location.trim();
        navigate(
            `/property/${btoa(id)}/${encodeURIComponent(
                trimmedLocation
            )}/${listingType}`
        );
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
    const renderListing = (listing) => {
        let photos = [];
        let locationData = {};
    
        // Handle photos parsing
        if (listing.photos) {
            try {
                photos = JSON.parse(listing.photos).map(photo => photo.replace("/", "/"));
            } catch (error) {
                console.error("Failed to parse photos:", error);
            }
        }
    
        // Handle location parsing
        if (listing.location) {
            try {
                const outerJson = JSON.parse(listing.location); // Parse the outer JSON string
                locationData = JSON.parse(outerJson); // Parse the inner JSON string
                // console.log(locationData);
            } catch (error) {
                console.error("Failed to parse location data:", error);
            }
        }
    
        // Access and log individual properties with default values
        const city = (typeof locationData.city === 'string' && locationData.city.trim()) || "Unknown City";
        const district = (typeof locationData.district === 'string' && locationData.district.trim()) || "Unknown District";
    
        // console.log("City:", city);
        // console.log("District:", district);
    
        return (
            <div
            key={listing.id}
            className="border rounded-lg p-6 bg-white shadow-md ml-4 mr-4 cursor-pointer hover:bg-gray-200"
            onClick={() => handleViewClick(listing.id, city, listing.listing_type)}
        >
        
                <div className="relative">
                    {photos.length > 0 ? renderSlider(photos) : <p className="text-gray-500 text-center">No photo available.</p>}
                </div>
                <div className="px-2">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold gradient-text">{listing.title || listing.pg_name || listing.post}</h2>
                        <p className="text-green-600 flex items-center">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                            {city}, {district}
                        </p>
                    </div>
                    <hr className="my-2" />
                    <div
                        className="flex justify-between items-center mt-2  p-1"
                    >
                        <div className="text-gray-700">
                            <p><span className="font-semibold">₹{listing.price || listing.occupancy_amount || listing.approx_rent}</span></p>
                        </div>
                        <p className="text-gray-700 flex items-center">
                            <FontAwesomeIcon icon={faHome} className="mr-2" />
                            Room Type: {listing.room_type || listing.pg_type}
                        </p>
                    </div>
                </div>
            </div>
        );
    };
    
    
    
    
    
    
    

    return (
        <div>
            <HomeNavBar />
            <Navbar
                search={search}
                onSearchChange={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
                gender={gender}
                onGenderChange={handleGenderChange}
                setListingType={setListingType}
                onSortChange={handleSortChange}
            />
            <div className="flex justify-center mt-6">
                <div className="container mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {listings.map(renderListing)}
                </div>
            </div>
        </div>
    );
};

export default PropertyPage;
