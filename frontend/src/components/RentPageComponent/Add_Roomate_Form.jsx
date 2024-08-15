import React, { useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const AddRequirement = () => {
    const [formData, setFormData] = useState({
        user_id: localStorage.getItem("user_id"),
        title: "",
        looking_for: "Any",
        looking_for_gender: "Male",
        room_type: "1RK",
        title: "",
        looking_for: "Any",
        looking_for_gender: "Male",
        room_type: "1RK",
        highlighted_features: [],
        location: "",
        approx_rent: "",
        post: "",
        occupancy: "",
        number_of_people: "",
        amenities: [],
        listing_type: "roommates", // Default value
    });

    const [requirements, setRequirements] = useState([]);
    const [images, setImages] = useState([]);
    const fileInputRef = useRef();

    const showToast = (message, type = "error") => {
        if (type === "success") {
            toast.success(message, { position: "top-center" });
        } else {
            toast.error(message, { position: "top-center" });
        }
    };

    const highlightProperty = [
        "Working full time",
        "College student",
        "25+ age",
        "Working night shift",
        "Pure vegetarian",
    ];

    const allAmenities = [
        "WiFi",
        "Air Conditioning",
        "Heating",
        "Hot Water",
        "Refrigerator",
        "Microwave",
    ];

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        if (images.length + files.length > 3) {
            showToast("You can only upload up to 3 images in total.");
            return;
        }

        setImages((prevImages) => [...prevImages, ...files]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFeatureClick = (feature) => {
        setFormData((prevState) => {
            const highlighted_features =
                prevState.highlighted_features.includes(feature)
                    ? prevState.highlighted_features.filter(
                          (f) => f !== feature
                      )
                    : [...prevState.highlighted_features, feature];
            return { ...prevState, highlighted_features };
        });
    };

    const handleAmenityClick = (amenity) => {
        setFormData((prevState) => {
            const amenities = prevState.amenities.includes(amenity)
                ? prevState.amenities.filter((a) => a !== amenity)
                : [...prevState.amenities, amenity];
            return { ...prevState, amenities };
        });
    };

    const validateInputs = () => {
        const {
            title,
            location,
            approx_rent,
            post,
            occupancy,
            number_of_people,
            highlighted_features,
            amenities,
            looking_for_gender,
            room_type,
        } = formData;

        if (!title) {
            showToast("Title is required");
            return false;
        }
        if (!location) {
            showToast("Location is required");
            return false;
        }
        if (!approx_rent || isNaN(approx_rent)) {
            showToast("Valid approx rent amount is required");
            return false;
        }
        if (!room_type) {
            showToast("Room type is required");
            return false;
        }
        if (highlighted_features.length === 0) {
            showToast("At least one highlight is required");
            return false;
        }
        if (!post) {
            showToast("Post is required");
            return false;
        }
        if (!occupancy || isNaN(occupancy)) {
            showToast("Valid occupancy is required");
            return false;
        }
        if (!number_of_people || isNaN(number_of_people)) {
            showToast("Valid number of people is required");
            return false;
        }
        if (images.length === 0) {
            showToast("House image is required");
            return false;
        }
        if (!looking_for_gender) {
            showToast("Looking for gender is required");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;

        const formDataObj = new FormData();

        for (const key in formData) {
            if (Array.isArray(formData[key])) {
                formDataObj.append(key, JSON.stringify(formData[key]));
            } else {
                formDataObj.append(key, formData[key]);
            }
        }
        images.forEach((image, index) => {
            formDataObj.append(`photos[${index}]`, image); // Ensure correct field name
        });

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/roommates",
                formDataObj,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setRequirements((prevRequirements) => [
                ...prevRequirements,
                response.data,
            ]);
            handleCancel(); // Reset the form
            showToast("Requirement added successfully!", "success");
        } catch (error) {
            console.error("Error adding requirement:", error);
            showToast(`Failed to add requirement: ${error.message}`); // Log detailed error
        }
    };

    const handleCancel = () => {
        setFormData({
            title: "",
            looking_for: "Any",
            looking_for_gender: "Male",
            room_type: "1RK",
            highlighted_features: [],
            location: "",
            approx_rent: "",
            post: "",
            occupancy: "",
            number_of_people: "",
            amenities: [],
            listing_type: "roommates", // Default value
        });
        setImages([]);
        fileInputRef.current.value = null;
    };

    return (
        <div className="max-w-6xl mx-auto p-8 bg-white shadow-md rounded-md mt-4 relative">
            <Link to="/PostRequirementPage">
                <button
                    onClick={handleCancel}
                    className="text-gray-900 text-center text-lg w-8 h-8 border border-gray-900 rounded-full absolute right-4"
                    aria-label="Close"
                >
                    X
                </button>
            </Link>
            <div className="text-center">
                <h1 className="text-3xl font-bold">Roommate For Your Room</h1>
                <p className="text-gray-500 mt-2">
                    So that other users can contact you
                </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    <div>
                        <label className="block text-sm font-medium text-black">
                            Title
                        </label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Title"
                            className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Add Your Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <fieldset className="border p-4 rounded-md">
                        <legend className="text-base font-medium text-gray-900">
                            Looking Gender For
                        </legend>
                        <div className="mt-2 space-x-4">
                            {["Male", "Female", "Any"].map((option) => (
                                <button
                                    type="button"
                                    key={option}
                                    className={`px-4 py-2 border rounded-md text-sm font-medium ${
                                        formData.looking_for === option
                                            ? "bg-blue-500 text-white"
                                            : "hover:bg-gray-100"
                                    }`}
                                    onClick={() =>
                                        setFormData((prevData) => ({
                                            ...prevData,
                                            looking_for: option,
                                        }))
                                    }
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </fieldset>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Approx Rent
                        </label>
                        <input
                            type="text"
                            name="approx_rent"
                            value={formData.approx_rent}
                            onChange={handleInputChange}
                            className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <fieldset className="border p-4 rounded-md">
                        <legend className="text-base font-medium text-gray-900">
                            Room Type
                        </legend>
                        <div className="mt-2 space-x-4">
                            {["1RK", "1BHK", "2BHK", "3BHK"].map((option) => (
                                <button
                                    type="button"
                                    key={option}
                                    className={`px-4 py-2 border rounded-md text-sm font-medium ${
                                        formData.room_type === option
                                            ? "bg-blue-500 text-white"
                                            : "hover:bg-gray-100"
                                    }`}
                                    onClick={() =>
                                        setFormData((prevData) => ({
                                            ...prevData,
                                            room_type: option,
                                        }))
                                    }
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </fieldset>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Add Your Post
                        </label>
                        <input
                            type="text"
                            name="post"
                            value={formData.post}
                            onChange={handleInputChange}
                            className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Occupancy
                        </label>
                        <input
                            type="text"
                            name="occupancy"
                            value={formData.occupancy}
                            onChange={handleInputChange}
                            className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Number of People
                        </label>
                        <input
                            type="text"
                            name="number_of_people"
                            value={formData.number_of_people}
                            onChange={handleInputChange}
                            className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                </div>
                <div>
                    <fieldset className="border p-4 rounded-md mt-12">
                        <legend className="text-base font-medium text-gray-900">
                            Highlighted Features
                        </legend>
                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {highlightProperty.map((feature) => (
                                <button
                                    type="button"
                                    key={feature}
                                    className={`px-4 py-2 border rounded-md text-sm font-medium ${
                                        formData.highlighted_features.includes(
                                            feature
                                        )
                                            ? "bg-blue-500 text-white"
                                            : "hover:bg-gray-100"
                                    }`}
                                    onClick={() => handleFeatureClick(feature)}
                                >
                                    {feature}
                                </button>
                            ))}
                        </div>
                    </fieldset>
                </div>
                <div>
                    <fieldset className="border p-4 rounded-md mt-12">
                        <legend className="text-base font-medium text-gray-900">
                            Select Amenities
                        </legend>
                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {allAmenities.map((amenity) => (
                                <button
                                    type="button"
                                    key={amenity}
                                    className={`px-4 py-2 border rounded-md text-sm font-medium ${
                                        formData.amenities.includes(amenity)
                                            ? "bg-blue-500 text-white"
                                            : "hover:bg-gray-100"
                                    }`}
                                    onClick={() => handleAmenityClick(amenity)}
                                >
                                    {amenity}
                                </button>
                            ))}
                        </div>
                    </fieldset>
                </div>
                <div>
                    <label className="block text-sm font-medium text-black">
                        Upload Photos (up to 3)
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className="block w-full mt-1"
                    />
                    {images.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-4">
                            {images.map((image, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt={`Preview ${index}`}
                                        className="w-32 h-32 object-cover rounded-md shadow-md"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="mt-12 text-center">
                    <button
                        type="submit"
                        className="px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Submit
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddRequirement;
