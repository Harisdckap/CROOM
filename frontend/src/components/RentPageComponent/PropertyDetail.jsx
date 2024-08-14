
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
    FaMapMarkerAlt,
    FaDollarSign,
    FaBed,
    FaPhoneAlt,
    FaTag,
    FaUser,
    FaStar,
    FaComments,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeNavBar from "../Header";
import { CustomNextArrow, CustomPrevArrow } from "./ArrowComponent";

const PropertyDetail = () => {
    const { id, location, listingType } = useParams();
    const [property, setProperty] = useState(null);

    useEffect(() => {
        fetchProperty();
    }, [id, location, listingType]);

    const fetchProperty = async () => {
        try {
            const cleanLocation = location.trim();
            const encodedId = encodeURIComponent(id);
            const encodedLocation = encodeURIComponent(cleanLocation);
            const encodedListingType = encodeURIComponent(listingType);

            const response = await axios.get(
                `http://127.0.0.1:8000/api/property/${encodedId}/${encodedLocation}/${encodedListingType}`
            );
            setProperty(response.data.data);
        } catch (error) {
            console.error("Error fetching property:", error);
        }
    };

    let locationData = {};

    if (property && property.location) {
        try {
            // Parse the location JSON string
            const OuterData = JSON.parse(property.location);
            locationData = JSON.parse(OuterData);
        } catch (error) {
            console.error("Failed to parse location data:", error);
            property.location = "Unknown Location"; // Fallback in case of parsing error
        }
    }

    const city = (typeof locationData.city === 'string' && locationData.city.trim()) || "Unknown City";
    const district = (typeof locationData.district === 'string' && locationData.district.trim()) || "Unknown District";

    if (!property) {
        return <p>Loading property details...</p>;
    }

    const renderPropertyDetails = (type) => {
        switch (type) {
            case "room":
                return (
                    <>
                        <DetailItem
                            icon={<FaBed />}
                            label="Rooms"
                            value={property.room_type}
                        />
                        <DetailItem
                            icon={<FaPhoneAlt />}
                            label="Contact"
                            value={property.contact}
                        />
                        <DetailItem
                            icon={<FaMapMarkerAlt />}
                            label="Location"
                            value={city}
                        />
                        <DetailItem
                            icon={<FaDollarSign />}
                            label="Price"
                            value={`₹${property.price}`}
                        />
                        <DetailItem
                            icon={<FaStar />}
                            label="Occupancy"
                            value={property.occupancy}
                        />
                        <DetailItem
                            icon={<FaUser />}
                            label="Looking For"
                            value={property.looking_for_gender}
                        />
                    </>
                );
            case "roommates":
                return (
                    <>
                        <DetailItem
                            icon={<FaMapMarkerAlt />}
                            label="Location"
                            value={property.location}
                        />
                        <DetailItem
                            icon={<FaUser />}
                            label="Looking For Gender"
                            value={property.looking_for_gender}
                        />
                        <DetailItem
                            icon={<FaDollarSign />}
                            label="Approx Rent"
                            value={`₹${property.approx_rent}`}
                        />
                        <DetailItem
                            icon={<FaTag />}
                            label="Room Type"
                            value={property.room_type}
                        />
                        <DetailItem
                            icon={<FaStar />}
                            label="Occupancy Exists"
                            value={property.occupancy}
                        />
                        <DetailItem
                            icon={<FaTag />}
                            label="Number of People"
                            value={property.number_of_people}
                        />
                    </>
                );
            case "pg":
                return (
                    <>
                        <DetailItem
                            icon={<FaTag />}
                            label="PG Type"
                            value={property.pg_type}
                        />
                        <DetailItem
                            icon={<FaTag />}
                            label="Looking For Gender"
                            value={property.looking_for_gender}
                        />
                        <DetailItem
                            icon={<FaPhoneAlt />}
                            label="Mobile Number"
                            value={property.mobile_num}
                        />
                        <DetailItem
                            icon={<FaMapMarkerAlt />}
                            label="Location"
                            value={property.location}
                        />
                        <DetailItem
                            icon={<FaStar />}
                            label="Occupancy Type"
                            value={property.occupancy_type}
                        />
                        <DetailItem
                            icon={<FaDollarSign />}
                            label="Occupancy Amount"
                            value={`₹${property.occupancy_amount}`}
                        />
                    </>
                );
            default:
                return <p>Details not available for this type.</p>;
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
    };
    const photos = property.photos
        ? JSON.parse(property.photos).map((photo) => photo.replace("\\/", "/"))
        : [];

    return (
        <div>
            <HomeNavBar />
            <motion.div
                className="container mx-auto p-6 bg-white shadow-lg pt-24"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <motion.div
                        className="col-span-1 mb-6 lg:mb-0"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {photos.length > 0 ? (
                            <Slider {...settings}>
                                {photos.map((photo, index) => (
                                    <div
                                        key={index}
                                        className="w-full h-80 flex justify-center items-center object-cover"
                                    >
                                        <img
                                            src={`http://127.0.0.1:8000/storage/${photo}`}
                                            alt={`Property Photo ${index + 1}`}
                                            className="w-full h-full object-cover rounded-lg shadow-lg"
                                            onError={(e) =>
                                                (e.target.src =
                                                    "/path/to/fallback-image.jpg")
                                            }
                                        />
                                    </div>
                                ))}
                            </Slider>
                        ) : (
                            <p className="text-gray-500 text-center">
                                No photo available.
                            </p>
                        )}

                        {/* Buttons Section */}
                        <div className="mt-3 flex gap-4">
                            <motion.a
                                href={`tel:${property.contact}`}
                                className="bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Link to="/PlanPage" className="flex gap-1">
                                    <FaPhoneAlt className="text-lg" />
                                    Call
                                </Link>
                            </motion.a>
                            <motion.button
                                className="bg-green-500 text-white px-2 py-1 flex rounded-lg items-center gap-2 hover:bg-green-600"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Link to="/PlanPage" className="flex gap-1">
                                    <FaComments className="text-lg" />
                                    Chat
                                </Link>
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Details Section */}
                    <motion.div
                        className="col-span-1"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl font-extrabold mb-4 text-gray-800 gradient-text">
                            {property.title || property.pg_name}
                        </h1>

                        <div className="grid  gap-4 text-gray-800">
                            {/* Render specific property details */}
                            {renderPropertyDetails(property.listing_type)}

                            {/* Conditionally render Highlighted Features and Amenities */}
                            {["room", "roommates", "pg"].includes(
                                property.listing_type
                            ) && (
                                <>
                                    {/* Highlighted Features Section */}
                                    <div className="mt-6 p-4 bg-gray-300 rounded-lg shadow-md col-span-2">
                                        <h3 className="text-2xl font-semibold mb-4  gradient-text">
                                            Highlighted Features
                                        </h3>
                                        {Array.isArray(
                                            property.highlighted_features
                                        ) &&
                                        property.highlighted_features.length >
                                            0 ? (
                                            <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5">
                                                {property.highlighted_features.map(
                                                    (feature, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-start"
                                                        >
                                                            <FaStar className="mr-2 text-yellow-500" />
                                                            {feature}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        ) : (
                                            <p className="text-gray-500">
                                                No highlighted features
                                                available.
                                            </p>
                                        )}
                                    </div>

                                    {/* Amenities Section */}
                                    <div className="mt-6 p-4 bg-gray-300 rounded-lg shadow-md col-span-2">
                                        <h3 className="text-2xl font-semibold mb-4  gradient-text">
                                            Amenities
                                        </h3>
                                        {Array.isArray(property.amenities) &&
                                        property.amenities.length > 0 ? (
                                            <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5">
                                                {property.amenities.map(
                                                    (amenity, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-start"
                                                        >
                                                            <FaStar className="mr-2 text-green-500" />
                                                            {amenity}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        ) : (
                                            <p className="text-gray-500">
                                                No amenities available.
                                            </p>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Description Section */}
                        <div className="mt-6 p-4 bg-gray-300 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800 gradient-text">
                                Description
                            </h2>
                            <p className="text-gray-700">
                                {property.description ||
                                    property.pg_post_content ||
                                    property.post}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-center mb-4">
        <div className="text-blue-700 text-2xl mr-4">{icon}</div>
        <div>
            <h4 className="text-lg font-semibold text-gray-800">{label}</h4>
            <p className="text-gray-700">{value}</p>
        </div>
    </div>
);

export default PropertyDetail;
