

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import {
    FaBold,
    FaItalic,
    FaUnderline,
    FaAlignLeft,
    FaAlignRight,
    FaSmile,
} from "react-icons/fa";

import countryDataJSON from "../RentPageComponent/country JSON/countries+states.json";

const AddRequirement = () => {
    const [formData, setFormData] = useState({
        user_id: localStorage.getItem("user_id"),
        title: "",
        looking_for: "Any",
        looking_for_gender: "Male",
        room_type: "1RK",
        highlighted_features: [],
        location: {},
        approx_rent: "",
        occupancy: "Family",
        number_of_people: "",
        amenities: [],
        listing_type: "roommates",
    });

    const [requirements, setRequirements] = useState([]);
    const [images, setImages] = useState([]);
    const fileInputRef = useRef();
    const [address_1, setaddress_1] = useState("");
    const [address_2, setaddress_2] = useState("");
    const [PIN, setPIN] = useState("");
    const [state, setstate] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");

    // navigate
    const navigate = useNavigate();

    // Descripton fucture
    const [text, setText] = useState("");
    const [format, setFormat] = useState({
        bold: false,
        italic: false,
        underline: false,
        alignLeft: false,
        alignRight: false,
    });
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleFormat = (type) => {
        setFormat((prevFormat) => ({
            ...prevFormat,
            [type]: !prevFormat[type],
        }));
    };

    const formatClasses = () => {
        let classes = "border p-2 w-full ";
        if (format.bold) classes += "font-bold ";
        if (format.italic) classes += "italic ";
        if (format.underline) classes += "underline ";
        if (format.alignLeft) classes += "text-left ";
        if (format.alignRight) classes += "text-right ";
        return classes;
    };

    const onEmojiClick = (emojiObject) => {
        setText((prevText) => prevText + emojiObject.emoji);
    };

    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
    };

    const handleChangeAddress_1 = (e) => {
        setaddress_1(e.target.value);
    };

    const handleChangeAddress_2 = (e) => {
        setaddress_2(e.target.value);
    };

    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
    };

    const handleChangePIN = (e) => {
        setPIN(e.target.value);
    };

    const deleteIMG = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
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
          "Fridge",
          "Kitchen",
        "Air Condition",
        "Washing_machine",
    ];

    const locationAdd = `${PIN} ${address_1} ${address_2} ${state}`;

    const handleFileChange = (e) => {
        requirements;
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
            approx_rent,
            post,
            occupancy,
            number_of_people,
            highlighted_features,
            amenities,
            looking_for,
            room_type,
        } = formData;
    
        if (!title) {
            showToast("Title is required");
            return false;
        }
        if (!number_of_people) {
            showToast("Valid number of people is required");
            return false;
        }
        if (!address_1) {
            showToast("address_1 is required");
            return false;
        }
        if (!address_2) {
            showToast("address_2 is required");
            return false;
        }
        if (!address_2) {
            showToast("address_2 is required");
            return false;
        }
        if (!PIN) {
            showToast("PIN is required");
            return false;
        }
        // if (!selectedState) {
        //     showToast("state is required");
        //     return false;
        // }

        if (!occupancy) {
            showToast("Valid occupancy is required");
            return false;
        }
        if (!approx_rent) {
            showToast("Valid approx rent amount is required");
            return false;
        }
        if (!looking_for) {
            showToast("Looking for is required");
            return false;
        }
        if (highlighted_features.length == 0) {
            showToast("At least one highlight is required");
            return false;
        }
        if (amenities.length == 0) {
            showToast("At least one amenities is required");
            return false;
        }
        if (images.length == 0) {
            showToast("House image is required");
            return false;
        }
        if (!text) {
            showToast("post for is required");
            return false;
        }
    
        return true;
    };

    const address_1_Value = address_1.split(",");
    const address_2_Value = address_2.split(",");

    
    const doorNoValue = address_1_Value[0];
    const streetValue = address_1_Value[1];
    const areaValue = address_1_Value[2];

    const cityValue = address_2_Value[0];
    const districtValue = address_2_Value[1];

    const showToast = (message, type = "error") => {
        
        // Show the toast message
        if (type === "success") {
            toast.success(message, { position: "top-center" });
              // Navigate immediately
        navigate(`/property?address=${districtValue || "chennai"}&p=0&t=rm&sort=ASC&propertyType=all`);
        } else {
            toast.error(message, { position: "top-center" });
        }
    };
    
  


    

   const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateInputs()) return;

    const formDataObj = new FormData();


    if (address_1_Value.length < 3 || address_2_Value.length < 2) {
        showToast("Invalid address format.", "error");
        return;
    }


    const formattedFormData = {
        user_id: localStorage.getItem("user_id"), 
        title: formData.title, 
        looking_for: "room",
        listing_type: formData.listing_type, 
        room_type: formData.room_type, 
        approx_rent: formData.approx_rent, 
        post:text,
        looking_for_gender:formData.looking_for, 
        occupancy: formData.occupancy, 
        number_of_people: formData.number_of_people,
        location: JSON.stringify({
            doorNo: doorNoValue,
            street: streetValue,
            area: areaValue,
            city: cityValue,
            district: districtValue,
            pin: PIN,
            state: selectedState,
            country: selectedCountry,
        }),
        highlighted_features: JSON.stringify(formData.highlighted_features),
        amenities: JSON.stringify(formData.amenities),
    };
 

    Object.keys(formattedFormData).forEach((key) => {
        formDataObj.append(key, formattedFormData[key]);
    });

    images.forEach((image, index) => {
        console.log(index)
        formDataObj.append(`photos[${index}]`, image);
    });

    


    for(let [key,value] of formDataObj.entries()){
        console.log(key + "  "+value)
    }


    try {
        const response = await axios.post(
            "http://127.0.0.1:8000/api/roommates",
            formDataObj,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },        );
        setRequirements((prevRequirements) => [
            ...prevRequirements,
            response.data,
        ]);
        handleCancel(); // Reset the form
        showToast("Requirement added successfully!", "success");
    } catch (error) {
        console.error("Error adding requirement:", error);
        showToast(`Failed to add requirement: ${error.response?.data?.message || error.message}`, "error");
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
                <div className="flex mt-6 justify-between">
                    <div className="">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="block text-sm font-medium text-black">
                                    Title
                                </label>
                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Title"
                                    className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black">
                                    Number of People
                                </label>
                                <input
                                    type="number"
                                    name="number_of_people"
                                    placeholder="No people"
                                    value={formData.number_of_people}
                                    onChange={handleInputChange}
                                    className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-black">
                                Address 1
                            </label>
                            <input
                                value={address_1}
                                onChange={handleChangeAddress_1}
                                style={{ width: "472px" }}
                                name="address_1"
                                placeholder="example( door no , street , area )"
                                className="mt-1 block px-3 w-96 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block mt-3 text-sm font-medium text-black">
                                Address 2
                            </label>
                            <input
                                name="  address_2"
                                value={address_2}
                                style={{ width: "472px" }}
                                onChange={handleChangeAddress_2}
                                placeholder="example( city , district )"
                                className="mt-1 block px-3 min-w-96 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                            />
                        </div>

                        <div className="flex mt-4 justify-between">
                            <div>
                                <label className="block text-sm font-medium text-black">
                                    Contact
                                </label>
                                <input
                                    type="tel"
                                    placeholder="Mobile Number"
                                    className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm "
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-black">
                                    PIN code
                                </label>
                                <input
                                    name="pincode"
                                    onChange={handleChangePIN}
                                    value={PIN}
                                    placeholder="PIN code"
                                    className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex mt-4 gap-14">
                            <div className="">
                                <label className="block text-sm font-medium text-black">
                                    State
                                </label>
                                <select
                                    value={selectedState}
                                    onChange={handleStateChange}
                                    style={{ width: "208px" }}
                                    className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                                    disabled={!selectedCountry} // Disable state dropdown if no country is selected
                                >
                                    <option disabled>Select a state</option>

                                    {selectedCountry &&
                                        countryDataJSON
                                            .find(
                                                (country) =>
                                                    country.name ===
                                                    selectedCountry
                                            ) // Find the selected country
                                            ?.states.map((state) => (
                                                <option
                                                    key={state.code}
                                                    value={state.name}
                                                >
                                                    {state.name}
                                                </option>
                                            ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-black">
                                    Country
                                </label>
                                <select
                                    value={selectedCountry}
                                    style={{ width: "208px" }}
                                    onChange={handleCountryChange}
                                    className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                                >
                                    <option value="" disabled>
                                        Select a country
                                    </option>
                                    {countryDataJSON.map((country) => (
                                        <option
                                            key={country.region_id}
                                            value={country.name}
                                        >
                                            {country.name + " " + country.emoji}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex mt-4 justify-between">
                            <div className="relative">
                                <label className="block text-sm font-medium text-black">
                                    Approx Rent
                                </label>
                                <input
                                    type="number"
                                    name="approx_rent"
                                    placeholder="approx_rent"
                                    value={formData.approx_rent}
                                    onChange={handleInputChange}
                                    className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                                />
                                {selectedCountry && (
                                    <span className="absolute top-8 right-8">
                                        {countryDataJSON.find(
                                            (cn) => cn.name === selectedCountry
                                        )?.currency_symbol || "Currency Symbol"}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-black">
                                    Occupancy
                                </label>
                                <input
                                    type="number"
                                    placeholder="Occupancy"
                                    name="occupancy"
                                    value={formData.occupancy}
                                    onChange={handleInputChange}
                                    className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <fieldset className="border text-center mt-2 w-96 p-4 rounded-md">
                            <legend className="text-base font-medium text-gray-900">
                                Room Type
                            </legend>
                            <div className="space-x-4">
                                {["1RK", "1BHK", "2BHK", "3BHK"].map(
                                    (option) => (
                                        <button
                                            type="button"
                                            key={option}
                                            className={`px-4 py-2 border rounded-md text-sm font-medium ${
                                                formData.room_type === option
                                                    ? "primary-btn text-white"
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
                                    )
                                )}
                            </div>
                        </fieldset>

                        <fieldset className="border mt-2 text-center w-96 p-4 rounded-md">
                            <legend className="text-base font-medium text-gray-900">
                                Looking For Gender 
                            </legend>
                            <div className="mt-2 space-x-4">
                                {["Male", "Female", "Any"].map((option) => (
                                    <button
                                        type="button"
                                        key={option}
                                        className={`px-4 py-2 border rounded-md text-sm font-medium ${
                                            formData.looking_for === option
                                                ? "primary-btn text-white"
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
                </div>

                <div className="flex bg-red items-center  gap-48">
                    <div className="w-1/2">
                        <fieldset className="border  text-center w p-4 rounded-md mt-4">
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
                                                ? "primary-btn "
                                                : "hover:bg-gray-100"
                                        }`}
                                        onClick={() =>
                                            handleFeatureClick(feature)
                                        }
                                    >
                                        {feature}
                                    </button>
                                ))}
                            </div>
                        </fieldset>
                    </div>
                    <div className="w-1/2">
                        <fieldset className="border text-center p-4 rounded-md mt-4">
                            <legend className="text-base font-medium text-gray-900">
                                 Amenities
                            </legend>
                            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {allAmenities.map((amenity) => (
                                    <button
                                        type="button"
                                        key={amenity}
                                        className={`px-4 py-2 border rounded-md text-sm font-medium ${
                                            formData.amenities.includes(amenity)
                                                ? "primary-btn text-white"
                                                : "hover:bg-gray-100"
                                        }`}
                                        onClick={() =>
                                            handleAmenityClick(amenity)
                                        }
                                    >
                                        {amenity}
                                    </button>
                                ))}
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-black">
                            Upload Photos (up to 3)
                        </label>
                        <label
                            htmlFor="uploadFile1"
                            className="bg-white text-gray-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-11 mb-2 fill-gray-500"
                                viewBox="0 0 32 32"
                            >
                                <path
                                    d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                                    data-original="#000000"
                                />
                                <path
                                    d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                                    data-original="#000000"
                                />
                            </svg>
                            Upload file
                            <input
                                type="file"
                                id="uploadFile1"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}
                                ref={fileInputRef}
                                className="hidden"
                            />
                            <p className="text-xs font-medium text-gray-400 mt-2">
                                PNG, JPG, SVG, WEBP, and GIF are Allowed.
                            </p>
                        </label>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-4">
                        {images.map((image, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Preview ${index}`}
                                    className="w-32 h-32 object-cover rounded-md shadow-md"
                                />
                                <span
                                    onClick={() => deleteIMG(index)}
                                    className="absolute top-1 right-1 text-white bg-red-600 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                                >
                                    X
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                {/* <div>
                    <label className="block text-sm font-medium text-black">
                        Add Your Post
                    </label>
                    <textarea
                        name="post"
                        value={formData.post}
                        onChange={handleInputChange}
                        placeholder="Description"
                        className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm sm:text-sm"
                        rows={4}
                    />
                </div> */}

                <div className="mt-4 relative">
                    <h4 className="">Description</h4>
                    <div className="mb-2">
                        <button
                            type="button"
                            onClick={() => handleFormat("bold")}
                            className={`p-2 ${
                                format.bold ? "bg-gray-200" : ""
                            }`}
                        >
                            <FaBold />
                        </button>
                        <button
                            type="button"
                            onClick={() => handleFormat("italic")}
                            className={`p-2 ${
                                format.italic ? "bg-gray-200" : ""
                            }`}
                        >
                            <FaItalic />
                        </button>
                        <button
                            type="button"
                            onClick={() => handleFormat("underline")}
                            className={`p-2 ${
                                format.underline ? "bg-gray-200" : ""
                            }`}
                        >
                            <FaUnderline />
                        </button>
                        <button
                            type="button"
                            onClick={() => handleFormat("alignLeft")}
                            className={`p-2 ${
                                format.alignLeft ? "bg-gray-200" : ""
                            }`}
                        >
                            <FaAlignLeft />
                        </button>
                        <button
                            type="button"
                            onClick={() => handleFormat("alignRight")}
                            className={`p-2 ${
                                format.alignRight ? "bg-gray-200" : ""
                            }`}
                        >
                            <FaAlignRight />
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            className="p-2 "
                        >
                            <FaSmile />
                        </button>
                    </div>
                    {showEmojiPicker && (
                        <div className="absolute bottom-44">
                            <EmojiPicker onEmojiClick={onEmojiClick} />
                        </div>
                    )}

                    <textarea
                        name="description"
                        value={formData.post}
                        onChange={(e) => setText(e.target.value)}
                        className={formatClasses()}
                        placeholder="Type your text here..."
                        rows="4"
                    />
                </div>

                <div className="mt-4 text-center">
                    <button
                        type="submit"
                        className="px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm primary-btn "
                    >
                        Add Roomate
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddRequirement;