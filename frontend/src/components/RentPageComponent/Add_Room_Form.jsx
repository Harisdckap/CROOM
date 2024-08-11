import React, { useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const AddRoomForm = () => {
    const [formData, setFormData] = useState({
        user_id: localStorage.getItem('user_id'),
        title: "",
        location: "",
        price: "",
        room_type: "1RK",
        contact: "",
        looking_for_gender: "any",
        looking_for: "Roommate",
        occupancy: "Single Occupancy",
        photos: [],
        highlighted_features: [],
        amenities: [],
        description: "",
        listing_type: "room",
    });

    const [images, setImages] = useState([]);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const allHighlightedFeatures = [
        "Attached washroom",
        "Balcony",
        "Air conditioning",
        "Swimming pool",
        "Gym",
        "Parking",
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
            setMessage('You can only upload up to 3 images in total.');
            return;
        }

        setImages(prevImages => [...prevImages, ...files]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
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

    const showToast = (message, type = "error") => {
        if (type === "success") {
            toast.success(message, { position: "top-center" });
        } else {
            toast.error(message, { position: "top-center" });
        }
    };

    const validateInputs = () => {
        if (!formData.title) {
            showToast("Title is required");
            return false;
        }
        if (!formData.location) {
            showToast("Location is required");
            return false;
        }

        if (!formData.price || isNaN(formData.price)) {
            showToast("Valid rent amount is required");
            return false;
        }

        if (!formData.room_type) {
            showToast("Room type is required");
            return false;
        }

        if (!formData.contact) {
            showToast("Contact is required");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateInputs()) return;
    
        const uploadData = new FormData();
    
        // Convert arrays to JSON strings
        const formattedFormData = {
            ...formData,
            highlighted_features: JSON.stringify(formData.highlighted_features),
            amenities: JSON.stringify(formData.amenities),
        };
    
        Object.keys(formattedFormData).forEach((key) => {
            uploadData.append(key, formattedFormData[key]);
        });
    
        images.forEach((image, index) => {
            uploadData.append(`photos[${index}]`, image); // Ensure correct field name
        });
    
        //log the FormData entries to verify images are being appended correctly
        for (let pair of uploadData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
    
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/listings",
                uploadData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            setMessage("Room added successfully!");
            setFormData({
                title: "",
                location: "",
                price: "",
                room_type: "1RK",
                contact: "",
                looking_for_gender: "any",
                looking_for: "Roommate",
                occupancy: "Single Occupancy",
                photos: [],
                highlighted_features: [],
                amenities: [],
                description: "",
                listing_type: "room",
            });
            setImages([]);
            if (fileInputRef.current) fileInputRef.current.value = "";
            // Navigate to the image display route
        } catch (error) {
            console.error(
                "There was an error adding the room:",
                error.response.data
            );
            setMessage("There was an error adding the room.");
        }
    };
    

    return (
        <div className="max-w-6xl mx-auto p-8 bg-white rounded-md shadow-md mt-4">
            <div className="absolute top-6 right-[3.5rem]">
                <Link to="/PostRequirementPage">
                    <button
                        className="text-gray-900 text-center text-lg w-8 h-8 border border-gray-900 rounded-full absolute right-4"
                        aria-label="Close"
                    >
                        X
                    </button>
                </Link>
            </div>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Add Room</h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-black">
                            Title
                        </label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Title"
                            className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black">
                            Location
                        </label>
                        <input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Location"
                            className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black">
                            Price
                        </label>
                        <input
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Price"
                            className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black">
                            Room Type
                        </label>
                        <select
                            name="room_type"
                            value={formData.room_type}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm sm:text-sm"
                        >
                            <option value="1RK">1RK</option>
                            <option value="1BHK">1BHK</option>
                            <option value="2BHK">2BHK</option>
                            <option value="3BHK">3BHK</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black">
                            Contact
                        </label>
                        <input
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            placeholder="Contact Number"
                            className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black">
                            Looking For
                        </label>
                        <select
                            name="looking_for"
                            value={formData.looking_for}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm sm:text-sm"
                        >
                            <option value="Roommate">Roommate</option>
                            <option value="Tenant">Tenant</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black">
                            Looking For Gender
                        </label>
                        <select
                            name="looking_for_gender"
                            value={formData.looking_for_gender}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm sm:text-sm"
                        >
                            <option value="any">Any</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black">
                            Occupancy
                        </label>
                        <select
                            name="occupancy"
                            value={formData.occupancy}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm sm:text-sm"
                        >
                            <option value="Single Occupancy">
                                Single Occupancy
                            </option>
                            <option value="Double Occupancy">
                                Double Occupancy
                            </option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-black">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm sm:text-sm"
                        rows={4}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-black">
                        Highlighted Features
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {allHighlightedFeatures.map((feature) => (
                            <button
                                key={feature}
                                type="button"
                                onClick={() =>
                                    handleFeatureClick(feature)
                                }
                                className={`py-2 px-3 rounded-md ${
                                    formData.highlighted_features.includes(
                                        feature
                                    )
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200"
                                }`}
                            >
                                {feature}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-black">
                        Amenities
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {allAmenities.map((amenity) => (
                            <button
                                key={amenity}
                                type="button"
                                onClick={() =>
                                    handleAmenityClick(amenity)
                                }
                                className={`py-2 px-3 rounded-md ${
                                    formData.amenities.includes(
                                        amenity
                                    )
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-200"
                                }`}
                            >
                                {amenity}
                            </button>
                        ))}
                    </div>
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
                <div>
                    <button
                        type="submit"
                        className="w-full py-3 px-6 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
                    >
                        Add Room
                    </button>
                </div>
            </form>
            {message && (
                <p className="text-center mt-4 text-red-600">{message}</p>
            )}
            <ToastContainer />
        </div>
    );
};

export default AddRoomForm;
