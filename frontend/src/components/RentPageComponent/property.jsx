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
    faHeart,
} from "@fortawesome/free-solid-svg-icons";
import "../../slider.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoPropertiesFound from "../RentPageComponent/NoPropertyFound";
import Loader from "./Loader";
import Footer from "../../components/Footer";

const PropertyPage = () => {
    const navigate = useNavigate();
    const [listings, setListings] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("address") || "");
    const [gender, setGender] = useState(searchParams.get("gender") || "all");
    const [sortOrder, setSortOrder] = useState(
        searchParams.get("sort") || "ASC"
    );
    const [propertyType, setPropertyType] = useState(
        searchParams.get("propertyType") || "all"
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListingsWithDelay = async () => {
            setLoading(true);
            await fetchListings();
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        };

        fetchListingsWithDelay();
    }, [searchParams]);

    const fetchListings = async () => {
        try {
            const params = {
                address: searchParams.get("address") || "",
                t: searchParams.get("t") || "a",
                gender: searchParams.get("gender") || "all",
                sort: searchParams.get("sort") || sortOrder,
                propertyType: searchParams.get("propertyType") || "All",
            };

            const response = await axios.get(
                "http://127.0.0.1:8000/api/properties",
                { params }
            );
            setListings(response.data.data);
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
            propertyType: propertyType,
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

    const handlePropertyTypeChange = (type) => {
        setPropertyType(type);
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("propertyType", type);
            return newParams;
        });
    };

    const setListingType = (type) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("t", type);
            return newParams;
        });
    };

    const handleViewClick = (id, location, type) => {
        const trimmedLocation = location.trim();
        navigate(
            `/property/${btoa(id)}/${encodeURIComponent(
                trimmedLocation
            )}/${type}`
        );
    };
    const toggleFavourite = async (id, listing_type) => {
        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/${listing_type}/${id}/toggle-favourite`
            );
            if (response.data.success) {
                const newFavouriteStatus = response.data.is_favourite;
                setListings((prevListings) =>
                    prevListings.map((listing) =>
                        listing.id === id
                            ? { ...listing, is_favourite: newFavouriteStatus }
                            : listing
                    )
                );
            } else {
                console.error(
                    "Failed to toggle favourite:",
                    response.data.message
                );
            }
        } catch (error) {
            console.error("Error toggling favourite status:", error);
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

    const renderListing = (listing, index) => {
        let photos = [];
        let locationData = {};

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
                className={`border rounded-lg p-6 bg-white shadow-md ml-4 mr-4 cursor-pointer hover:bg-gray-200 transition-transform`}
                onClick={() =>
                    handleViewClick(listing.id, city, listing.listing_type)
                }
            >
                <div className="relative">
                    {/* <FontAwesomeIcon
                        icon={faHeart}
                        className={`absolute top-2 right-2 text-2xl cursor-pointer z-10 ${
                            listing.is_favourite
                                ? "text-red-500"
                                : "text-gray-100"
                        }`}
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleFavourite(listing.id, listing.listing_type);
                        }}
                    /> */}

                    {photos.length > 0 ? (
                        renderSlider(photos)
                    ) : (
                        <p className="text-gray-500 text-center">
                            No photo available.
                        </p>
                    )}
                </div>
                <div className="px-2">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold gradient-text">
                            {listing.title || listing.pg_name || listing.post}
                        </h2>
                        <p className="text-green-600 flex items-center text-sm">
                            <FontAwesomeIcon
                                icon={faMapMarkerAlt}
                                className="mr-2"
                            />
                            {district}
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
                propertyType={propertyType}
                onPropertyTypeChange={handlePropertyTypeChange}
            />

            <div className="flex justify-center mt-6">
                {loading ? (
                    <Loader />
                ) : listings.length === 0 ? (
                    <NoPropertiesFound />
                ) : (
                    <div className="container mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                        {listings.map((listing, index) =>
                            renderListing(listing, index)
                        )}
                    </div>
                )}
            </div>

            <ToastContainer />
            <Footer />
        </div>
    );
};

export default PropertyPage;
