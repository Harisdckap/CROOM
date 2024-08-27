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
import SocialShare from "./ShareBtn";
import Footer from "../../components/Footer";
// import MapComponent from "./MapComponet";

// Amenities and Features Images
import wifi from "../../assets/wifi.png";
import fridge from "../../assets/fridge.png";
import air_conditioner from "../../assets/air_conditioner.png";
import kitchen from "../../assets/kitchen.png";
import washingMachine from "../../assets/washing_machine.png";
import swiming_pool from "../../assets/swiming_pool.jpeg";
import balcony from "../../assets/balcony.png";
import parking from "../../assets/parking.png";
import gym from "../../assets/gym.jpg";
import bathroom from "../../assets/bathroom.png";
import working_full_time from "../../assets/working_full_time.png";
import College_student from "../../assets/college_student.jpg";
import pure_vegetarian from "../../assets/pure_vegetarian.jpg";
import working_night_shift from "../../assets/working_night_shift.webp";
import men from "../../assets/men.jpg";

const PropertyDetail = () => {
    const { id, location, listingType } = useParams();
    const [property, setProperty] = useState(null);
    const [nearbyProperties, setNearbyProperties] = useState([]);
    const [LocationData, setLocationData] = useState({});
    const [coordinates, setCoordinates] = useState({
        latitude: null,
        longitude: null,
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/property/${id}/${encodeURIComponent(
                        location.trim()
                    )}/${listingType}`
                );
                setProperty(response.data.data);
            } catch (error) {
                console.error("Error fetching property:", error);
            }
        };

        fetchProperty();
    }, [id, location, listingType]);

    useEffect(() => {
        if (property && property.location) {
            try {
                const innerparse = JSON.parse(property.location);
                const locationData = JSON.parse(innerparse);
                setLocationData(locationData);
                // console.log("Parsed Location Data:", locationData);
            } catch (error) {
                console.error("Failed to parse location data:", error);
                setLocationData({ city: "Unknown Location", district: "" });
            }
        }
    }, [property]);

    console.log(LocationData);

    useEffect(() => {
        const fetchGeolocation = async () => {
            try {
                const { doorNo, street, area, city, state, pinCode, county } =
                    LocationData;
                const location_name = `${doorNo || ""} ${street || ""}, ${
                    area || ""
                }, ${city || ""}, ${state || ""} ${pinCode || ""}, ${
                    county || ""
                }`;
                //   console.log(location_name);

                const apiKey = "4910c63061b247788f30a03631e1acbf";
                const geoapifyUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
                    location_name
                )}&apiKey=${apiKey}`;

                const response = await axios.get(geoapifyUrl);
                if (
                    response.data.features &&
                    response.data.features.length > 0
                ) {
                    const { lat, lon } = response.data.features[0].properties;
                    setCoordinates({ latitude: lat, longitude: lon });
                    fetchNearbyProperties(lat, lon);
                    // console.log(lat,lon);
                } else {
                    setError("No geolocation data found for the address.");
                }
            } catch (error) {
                setError("Error fetching geolocation data.");
                console.error("Geoapify Error:", error);
            }
        };

        const fetchNearbyProperties = async (latitude, longitude) => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/nearby-properties/${property.listing_type}/${property.id}`,
                    { params: { latitude, longitude } }
                );
                setNearbyProperties(response.data.data);
            } catch (error) {
                console.error("Error fetching nearby properties:", error);
                setError("Error fetching nearby properties.");
            }
        };

        if (property && LocationData) {
            fetchGeolocation();
        }
    }, [property, LocationData]);

    if (!property) {
        return <p>Loading property details...</p>;
    }

    const amenitiesImages = {
        WiFi: wifi,
        "Air Condition": air_conditioner,
        Fridge: fridge,
        Kitchen: kitchen,
        Washing_machine: washingMachine,
    };

    const featuresImages = {
        "Attached Bathroom": bathroom,
        Balcony: balcony,
        "Swimming pool": swiming_pool,
        Gym: gym,
        Parking: parking,
        "Working full time": working_full_time,
        "College student": College_student,
        "25+ age": men,
        "Working night shift": working_night_shift,
        "Pure vegetarian": pure_vegetarian,
    };

    const city =
        (typeof LocationData.city === "string" && LocationData.city.trim()) ||
        "Unknown City";
    const district =
        (typeof LocationData.district === "string" &&
            LocationData.district.trim()) ||
        "Unknown District";
    const area =
        (typeof LocationData.area === "string" && LocationData.area.trim()) ||
        "Unknown District";
    const street =
        (typeof LocationData.street === "string" &&
            LocationData.street.trim()) ||
        "Unknown Street";
    const doorNo =
        (typeof LocationData.doorNo === "string" &&
            LocationData.doorNo.trim()) ||
        "Unknown Door No";
    const state =
        (typeof LocationData.state === "string" && LocationData.state.trim()) ||
        "Unknown State";
    const pinCode =
        (typeof LocationData.pin === "string" && LocationData.pin.trim()) ||
        "000000";
    const country =
        (typeof LocationData.country === "string" &&
            LocationData.country.trim()) ||
        "Unknown Country";

    if (!property) {
        return <p>Loading property details...</p>;
    }

    const location_name =
        `${doorNo} ${street}, ${area}, ${city}, ${state} ${pinCode}, ${country}`.replace(
            /\s+/g,
            "+"
        );
    const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.8720495500934!2d80.20954641474961!3d13.082680990772045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267d37b24a4a3%3A0x736c6116d63b1a8f!2s${location_name}%2C%20India!5e0!3m2!1sen!2sin!4v1624340128653!5m2!1sen!2sin`;

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
                            value={`${city},${district}`}
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
                            value={`${city},${district}`}
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
                            icon={<FaUser />}
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
                            value={`${city}, ${district}`}
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
                        {mapUrl && (
                            <motion.iframe
                                src={mapUrl}
                                width="100%"
                                height="500"
                                className="rounded-lg mt-4 shadow-lg"
                                allowFullScreen
                                title="Property Location"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                            ></motion.iframe>
                        )}
                        <div className="social-share mt-6">
                            <SocialShare
                                url={`http://localhost:3000/property/${property.id}`}
                                title={property.title}
                            />
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
                                    <div className="mt-6 p-6 bg-white rounded-lg shadow-lg border border-gray-200 col-span-2">
                                        <h3 className="text-2xl font-bold mb-6 text-gray-800 gradient-text">
                                            Highlighted Features
                                        </h3>
                                        {Array.isArray(
                                            property.highlighted_features
                                        ) &&
                                        property.highlighted_features.length >
                                            0 ? (
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                                                {property.highlighted_features.map(
                                                    (feature, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-center space-x-3 p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition duration-200"
                                                        >
                                                            <img
                                                                src={
                                                                    featuresImages[
                                                                        feature
                                                                    ]
                                                                }
                                                                alt={feature}
                                                                className="w-8 h-8"
                                                            />
                                                            <span className="text-lg font-medium">
                                                                {feature}
                                                            </span>
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
                                    <div className="mt-6 p-6 bg-white rounded-lg shadow-lg border border-gray-200 col-span-2">
                                        <h3 className="text-2xl font-bold mb-6 text-gray-800 gradient-text">
                                            Amenities
                                        </h3>
                                        {Array.isArray(property.amenities) &&
                                        property.amenities.length > 0 ? (
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                                                {property.amenities.map(
                                                    (amenity, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-center space-x-3 p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition duration-200"
                                                        >
                                                            {amenitiesImages[
                                                                amenity
                                                            ] && (
                                                                <img
                                                                    src={
                                                                        amenitiesImages[
                                                                            amenity
                                                                        ]
                                                                    }
                                                                    alt={
                                                                        amenity
                                                                    }
                                                                    className="w-8 h-8"
                                                                />
                                                            )}
                                                            <span className="text-lg font-medium">
                                                                {amenity}
                                                            </span>
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
                        <div className="mt-6 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800 gradient-text">
                                Description
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                {property.description ||
                                    property.pg_post_content ||
                                    property.post ||
                                    "No description available."}
                            </p>
                        </div>
                    </motion.div>
                    {/* NearMe Location */}
                    {/* <div className="nearby-properties">
                        <h2>Nearby Properties</h2>
                        {nearbyProperties.length ? (
                            <ul>
                                {nearbyProperties.map((nearby, index) => (
                                    <li key={index}>
                                        <Link
                                            to={`/property/${
                                                nearby.id
                                            }/${encodeURIComponent(
                                                nearby.location
                                            )}/${nearby.listing_type}`}
                                        >
                                            <h3>{nearby.title}</h3>
                                            <p>{nearby.description}</p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No nearby properties found.</p>
                        )}
                    </div> */}
                </div>{" "}
            </motion.div>
            <Footer />
        </div>
    );
};

// Helper component to render each detail item
const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-center mb-2">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-500 mr-4">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-lg font-semibold text-gray-800">{value}</p>
        </div>
    </div>
);
export default PropertyDetail;
