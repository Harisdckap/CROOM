import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import "./Roomate.css";

const Add_PG = () => {
    const [pg_type, setPgType] = useState("");
    const [looking_for_gender, setLookingForGender] = useState("Both");
    const [mobile_num, setMobileNum] = useState("");
    const [pg_name, setPgName] = useState("");
    const [location, setLocation] = useState("");
    const [occupancy_type, setOccupancyType] = useState("");
    const [occupancy_amount, setOccupancyAmount] = useState("");
    const [images, setImages] = useState([]);
    const [highlighted_features, setHighlightedFeatures] = useState([]);
    const [amenities, setAmenities] = useState([]);
    const [pg_post_content, setPgPostContent] = useState("");
    const fileInputRef = useRef(null);

    const allHighlightedFeatures = [
        "Furnished",
        "Attached Bathroom",
        "Balcony",
        "Parking",
    ];
    const allAmenities = [
        "WiFi",
        "Air Conditioning",
        "Laundry Facilities",
        "Hot Water",
        "Refrigerator",
        "Kitchen",
    ];

    const handleFeatureClick = (feature) => {
        setHighlightedFeatures((prevFeatures) =>
            prevFeatures.includes(feature)
                ? prevFeatures.filter((f) => f !== feature)
                : [...prevFeatures, feature]
        );
    };

    const handleAmenityClick = (amenity) => {
        setAmenities((prevAmenities) =>
            prevAmenities.includes(amenity)
                ? prevAmenities.filter((a) => a !== amenity)
                : [...prevAmenities, amenity]
        );
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        if (images.length + files.length > 3) {
            showToastMessage("You can only upload up to 3 images in total.");
            return;
        }

        setImages((prevImages) => [...prevImages, ...files]);
    };

    const showToastMessage = (message) => {
        toast.error(message, { position: "top-center" });
    };

    const validateInputs = () => {
        if (!pg_name) {
            showToastMessage("PG name is required");
            return false;
        }

        if (!mobile_num || isNaN(mobile_num)) {
            showToastMessage("Valid Mobile Number is required");
            return false;
        }

        if (!location) {
            showToastMessage("PG address is required");
            return false;
        }

        if (!occupancy_type || !occupancy_amount || isNaN(occupancy_amount)) {
            showToastMessage(
                "Please select an occupancy type and provide a valid amount"
            );
            return false;
        }

        if (images.length === 0) {
            showToastMessage("Please upload at least 1 photo of your room");
            return false;
        }

        if (!pg_post_content) {
            showToastMessage("PG post content is required");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;

        const formData = new FormData();
        formData.append("user_id", localStorage.getItem("user_id"));
        formData.append("pg_type", pg_type);
        formData.append("looking_for_gender", looking_for_gender);
        formData.append("mobile_num", mobile_num);
        formData.append("pg_name", pg_name);
        formData.append("location", location);
        formData.append("occupancy_type", occupancy_type);
        formData.append("occupancy_amount", occupancy_amount);
        formData.append("pg_post_content", pg_post_content);
        formData.append(
            "highlighted_features",
            JSON.stringify(highlighted_features)
        );
        formData.append("amenities", JSON.stringify(amenities));
        images.forEach((image, index) => {
            formData.append(`photos[${index}]`, image);
        });

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/pg_listings",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            toast.success("Form submitted successfully", {
                position: "top-center",
            });
            console.log(response.data);
        } catch (error) {
            console.error(
                "Error details:",
                error.response?.data || error.message || error
            );
            toast.error("Error submitting form", { position: "top-center" });
        }
    };

    const handleCancel = () => {
        setPgType("");
        setLookingForGender("Both");
        setMobileNum("");
        setPgName("");
        setLocation("");
        setOccupancyType("");
        setOccupancyAmount("");
        setImages([]);
        setHighlightedFeatures([]);
        setAmenities([]);
        setPgPostContent("");
    };

    return (
        <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-md mt-4">
            <div className="absolute top-6 right-[3.5rem]">
                <Link to="/PostRequirementPage">
                    <button
                        onClick={handleCancel}
                        className="text-gray-900 text-center text-lg w-8 h-8 border border-gray-900 rounded-full absolute right-4"
                        aria-label="Close"
                    >
                        X
                    </button>
                </Link>
            </div>
            <div className="text-center">
                <h1 className="text-3xl font-bold">Add your PG</h1>
                <p className="text-gray-500 mt-2">
                    We are over a thousand tenants for you!
                </p>
            </div>
            <div className="space-y-6 mt-8">
                {/* Mobile Number */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Mobile Number
                        </label>
                        <input
                            value={mobile_num}
                            onChange={(e) => setMobileNum(e.target.value)}
                            type="tel"
                            className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm w-full"
                        />
                    </div>
                    {/* PG Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            PG Name
                        </label>
                        <input
                            value={pg_name}
                            onChange={(e) => setPgName(e.target.value)}
                            type="text"
                            className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm w-full"
                        />
                    </div>
                </div>
                {/* PG Address */}
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700">
                        PG Address
                    </label>
                    <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        type="text"
                        className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm w-full"
                    />
                </div>
                {/* PG Type */}
                <fieldset className="border p-4 rounded-md">
                    <legend className="text-base font-medium text-gray-900">
                        looking_for_gender
                    </legend>
                    <div className="flex gap-4 mt-2">
                        {["Boys", "Girls", "Both"].map((option) => (
                            <button
                                key={option}
                                className={`px-4 py-2 border rounded-md text-sm font-medium ${
                                    looking_for_gender === option
                                        ? "bg-blue-500 text-white"
                                        : "hover:bg-gray-100"
                                }`}
                                onClick={() => setLookingForGender(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </fieldset>
                <fieldset className="border p-4 rounded-md">
                    <legend className="text-base font-medium text-gray-900">
                        Pg Type
                    </legend>
                    <div className="mt-2 space-x-4">
                        {["1RK", "1BHK", "2BHK", "3BHK"].map((option) => (
                            <button
                                type="button"
                                key={option}
                                className={`px-4 py-2 border rounded-md text-sm font-medium ${
                                    pg_type === option
                                        ? "bg-blue-500 text-white"
                                        : "hover:bg-gray-100"
                                }`}
                                onClick={() => setPgType(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </fieldset>
                {/* Occupancy */}
                <fieldset className="border p-4 rounded-md">
                    <legend className="text-base font-medium text-gray-900">
                        Occupancy
                    </legend>
                    <div className="flex gap-4 mt-2">
                        {["Single", "Double", "Triple"].map((option) => (
                            <div key={option} className="flex items-center">
                                <input
                                    id={`occupancy-${option}`}
                                    name="occupancy"
                                    type="radio"
                                    value={option}
                                    checked={occupancy_type === option}
                                    onChange={(e) =>
                                        setOccupancyType(e.target.value)
                                    }
                                    className="h-4 w-4 text-indigo-600 border-gray-300"
                                />
                                <label
                                    htmlFor={`occupancy-${option}`}
                                    className="ml-2 block text-sm font-medium text-gray-700"
                                >
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">{`Amount for ${occupancy_type} Occupancy`}</label>
                        <input
                            value={occupancy_amount}
                            onChange={(e) => setOccupancyAmount(e.target.value)}
                            type="number"
                            className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm w-full"
                        />
                    </div>
                </fieldset>
                {/* Highlighted Features */}
                <fieldset className="border p-4 rounded-md">
                    <legend className="text-base font-medium text-gray-900">
                        Highlighted Features
                    </legend>
                    <div className="flex gap-4 mt-2">
                        {allHighlightedFeatures.map((feature) => (
                            <div key={feature} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={feature}
                                    checked={highlighted_features.includes(
                                        feature
                                    )}
                                    onChange={() => handleFeatureClick(feature)}
                                    className="h-4 w-4 text-indigo-600 border-gray-300"
                                />
                                <label className="ml-2 block text-sm font-medium text-gray-700">
                                    {feature}
                                </label>
                            </div>
                        ))}
                    </div>
                </fieldset>
                {/* Amenities */}
                <fieldset className="border p-4 rounded-md">
                    <legend className="text-base font-medium text-gray-900">
                        Amenities
                    </legend>
                    <div className="flex gap-4 mt-2">
                        {allAmenities.map((amenity) => (
                            <div key={amenity} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={amenity}
                                    checked={amenities.includes(amenity)}
                                    onChange={() => handleAmenityClick(amenity)}
                                    className="h-4 w-4 text-indigo-600 border-gray-300"
                                />
                                <label className="ml-2 block text-sm font-medium text-gray-700">
                                    {amenity}
                                </label>
                            </div>
                        ))}
                    </div>
                </fieldset>
                {/* PG Post Content */}
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700">
                        PG Post Content
                    </label>
                    <textarea
                        value={pg_post_content}
                        onChange={(e) => setPgPostContent(e.target.value)}
                        className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm w-full h-32"
                    />
                </div>
                {/* Image Upload */}
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700">
                        Upload Images
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className="mt-2"
                    />
                    <div className="flex gap-4 mt-2">
                        {images.map((image, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Preview ${index}`}
                                    className="h-32 w-32 object-cover"
                                />
                                <button
                                    onClick={() => {
                                        setImages((prevImages) =>
                                            prevImages.filter(
                                                (_, i) => i !== index
                                            )
                                        );
                                    }}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Buttons */}
                <div className="flex justify-between mt-6">
                    <button onClick={handleCancel}className="px-4 py-2 bg-gray-500 text-white rounded-md">
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Submit
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Add_PG;
