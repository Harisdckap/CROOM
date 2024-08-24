
import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import countryDataJSON from '../RentPageComponent/country JSON/countries+states.json'

// import "./Roommate.css";

const Add_PG = () => {
    const [pg_type, setPgType] = useState("Both");
    const [mobile_num, setMobileNum] = useState(null);
    const [pg_name, setPgName] = useState("");
    const [occupancy_type, setOccupancyType] = useState("");
    const [occupancy_amount, setOccupancyAmount] = useState("");
    const [images, setImages] = useState([]);
    const [highlighted_features, sethighlighted_features] = useState([]);
    const [amenities, setAmenities] = useState([]);
    const [pg_post_content, setPgPostContent] = useState("");
    const fileInputRef = useRef(null);

    // const navigate = useNavigate();
    const [address_1, setaddress_1] = useState("");
    const [address_2, setaddress_2] = useState("");
    const [PIN, setPIN] = useState("");
    const [state, setstate] = useState("");
    const [countryData, setcountryData] = useState();

    const handleChangeAddress_1 = (e) => {
        setaddress_1(e.target.value.trim());
    };

    const handleChangeAddress_2 = (e) => {
        setaddress_2(e.target.value.trim());
    };

    const handleChangeState = (e) => {
        setstate(e.target.value.trim());
    };

    const handleChangeCuntry = (e) => {
        setcountryData(e.target.value.trim());
    };

    const handleChangePIN = (e) => {
        setPIN(e.target.value.trim());
    };

    const allHighlightedFeatures = [
        "Attached Bathroom",
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


    const handleFeatureClick = (feature) => {
        sethighlighted_features((prevFeatures) =>
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

    const deleteIMG = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
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

           if (!occupancy_type) {
            showToastMessage(
                "Please select an occupancy type and provide a valid amount"
            );
            return false;
        }
           if (!address_1) {
            showToastMessage("address_1 is required");
            return false;
        }
        if (!address_2) {
            showToastMessage("address_2 is required");
            return false;
        }

        if (!mobile_num) {
            showToastMessage("Valid Mobile Number is required");
            return false;
        }
        if (!PIN) {
            showToastMessage("PIN number is required");
            return false;
        }
        if (!state) {
            showToastMessage("state is required");
            return false;
        }
        if (!countryData) {
            showToastMessage("country is required");
            return false;
        }
        if (highlighted_features.length == 0) {
            showToastMessage("highlighted_features atleast 1 is required");
            return false;
        }
        if (amenities.length == 0) {
            showToastMessage("amenities atleast 1 is required");
            return false;
        }

           if (images.length === 0) {
               showToastMessage("Please upload at least 1 photo of your room");
               return false;
           }
           if (images.length > 3) {
            showToast("You can upload a maximum of 3 images");
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

        const address_1_Value = address_1.split(",");
        const addres_2_Value = address_2.split(",");

        const doorNoValue = address_1_Value[0];
        const streetValue = address_1_Value[1];
        const areaValue = address_1_Value[2];

        // console.log(address_1_Value)
        // console.log("door no :"+ doorNoValue + " "+" streetValue :"+streetValue +" "+"area : "+areaValue)

        const cityValue = addres_2_Value[0];
        const districtValue = addres_2_Value[1];

        const formData = new FormData();
        formData.append("user_id", localStorage.getItem("user_id"));
        formData.append("pg_type", pg_type);
        formData.append("mobile_num", mobile_num);
        formData.append("pg_name", pg_name);
        formData.append("occupancy_type", occupancy_type);
        formData.append("occupancy_amount", occupancy_amount);
        formData.append("pg_post_content", pg_post_content);

        formData.append(
            "location",
            JSON.stringify({
                doorNo: doorNoValue,
                street: streetValue,
                area: areaValue,
                city: cityValue,
                district: districtValue,
                state: state,
                county: countryData,
                pin: PIN,
            })
        );

        formData.append(
            "highlighted_features",
            JSON.stringify(highlighted_features)
        );
        formData.append("amenities", JSON.stringify(amenities));
        images.forEach((image, index) => {
            formData.append(`photos[${index}]`, image);
        });

        //   for (const [key, value] of formDataObj.entries()) {
        //     for (const [key, value] of formData.entries()) {
        //     if (key === "location") {
        //         console.log("Location:", value);
        //     }
        // }

        for (let [key, value] of formData.entries()) {
            console.log(key + " " + value);
        }

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
        setPgType("Both");
        setMobileNum("");
        setPgName("");
        setLocation("");
        setOccupancyType("");
        setOccupancyAmount("");
        setImages([]);
        sethighlighted_features([]);
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

            <div className="">
                <div>
                    <div className="flex m-0 justify-between">
                        <div className="flex  m-0 items-center gap-14">
                            <div className="mt-0">
                                <label className="block text-sm font-medium text-gray-700">
                                    PG Name
                                </label>
                                <input
                                    value={pg_name}
                                    onChange={(e) => setPgName(e.target.value.trim())}
                                    type="text"
                                    placeholder="PG Name"
                                    className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                                />
                            </div>

                            <div className="mt-0 relative">
                                <label className="block text-sm font-medium text-gray-700">{`Amount for ${occupancy_type} Occupancy`}</label>
                                <input
                                    value={occupancy_amount}
                                    onChange={(e) =>
                                        setOccupancyAmount(e.target.value.trim())
                                    }
                                    type="number"
                                    placeholder="Amount"
                                    className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                                />
                                <span className="absolute top-8 right-8">
                                    {countryData&& countryDataJSON.find((c)=>c.name == countryData)?.currency_symbol}
                                </span>
                            </div>
                        </div>
                        <fieldset className="border text-center w-96 p-4 rounded-md">
                            <legend className="text-base font-medium text-gray-900">
                                PG Type
                            </legend>
                            <div className="flex gap-4 mt-2">
                                {["Boys", "Girls", "Both"].map((option) => (
                                    <button
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
                    </div>
                </div>

                <div className="flex mt-0 justify-between">
                    <div className="flex items-center gap-14">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                address 1
                            </label>
                            <input
                                value={address_1}
                                onChange={handleChangeAddress_1}
                                name="  address_1"
                                placeholder="example( door no , street , area )"
                                className="mt-1 block px-3 w-96 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                            />
                        </div>
                    </div>
                    <fieldset className="border text-center w-96 p-4 rounded-md">
                        <legend className="text-base font-medium text-gray-900">
                            Occupancy
                        </legend>
                        <div className="mt-2 space-x-4">
                            {["Bacheler", "Family"].map((option) => (
                                <button
                                    type="button"
                                    key={option}
                                    className={`px-4 py-2 border rounded-md text-sm font-medium ${
                                        occupancy_type === option
                                            ? "bg-blue-500 text-white"
                                            : "hover:bg-gray-100"
                                    }`}
                                    onClick={() => setOccupancyType(option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </fieldset>
                </div>

                {/*                  
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
               </div>          */}

                {/* PG Address */}

                <div className="flex justify-between">
                    <div className="flex items-center gap-14">
                        <div>
                            <label className="block mt-3 text-sm font-medium text-gray-700">
                                address 2
                            </label>
                            <input
                                name="address_2"
                                placeholder="example( city , district )"
                                value={address_2}
                                onChange={handleChangeAddress_2}
                                className="mt-1 block px-3 min-w-96 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex ">
                    <div className="flex mt-5 gap-14">
                    <div>
                            <label className="block text-sm font-medium text-gray-700">
                                contact
                            </label>
                            <input
                                value={mobile_num}
                                onChange={(e) => setMobileNum(e.target.value)}
                                type="number"
                                placeholder="Mobile Number"
                                className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm "
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                PIN code
                            </label>
                            <input
                                value={PIN}
                                onChange={handleChangePIN}
                                type="number"
                                name="pincode"
                                placeholder="PIN code"
                                className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                            />
                        </div>
                       
                    </div>
                </div>

                <div className="flex gap-14">
                    <div className="mt-5">
                        <label className="block text-sm font-medium text-gray-700">
                            state
                        </label>
                        <select
                            value={state}
                            onChange={handleChangeState}
                            name="state"
                            placeholder="state"
                            className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                            disabled = {!countryData}
                        >
                            <option value="">
                                select state
                            </option>
                            {countryData && 
                            countryDataJSON.find((c)=>c.name == countryData)
                            ?.states.map((s)=>(
                                <option value={s.name} key={s.name}>{s.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-5">
                        <label className="block text-sm font-medium text-gray-700">
                            country
                        </label>
                        <select
                            value={countryData}
                            onChange={handleChangeCuntry}
                            name="cuntry"
                            placeholder="cuntry"
                            className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                        >
                            <option value="">select country</option>
                            {countryDataJSON.map((c)=>(
                                <option value={c.name} key={c.name}>{c.name+c.emoji}</option>
                            ))}
                            
                        </select>
                    </div>
                </div>

                <div className="flex  items-center gap-48">
                    <div className="w-1/2">
                        <fieldset className="border text-center w-96 p-4 rounded-md">
                            <legend className="text-base font-medium text-gray-900">
                                Highlighted Features
                            </legend>
                            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {allHighlightedFeatures.map((feature) => (
                                    <button
                                        type="button"
                                        key={feature}
                                        className={`px-4 py-2 border rounded-md text-sm font-medium ${
                                            highlighted_features.includes(
                                                feature
                                            )
                                                ? "bg-blue-500 bg-blue-500 text-white"
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
                        <fieldset className="border text-center w-full p-4 rounded-md">
                            <legend className="text-base font-medium text-gray-900">
                                Amenities
                            </legend>
                            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {allAmenities.map((amenity) => (
                                    <button
                                        type="button"
                                        key={amenity}
                                        className={`px-4 py-2 border rounded-md text-sm font-medium$ ${
                                            amenities.includes(amenity)
                                                ? "bg-blue-500 bg-blue-500 text-white"
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
                    <label className="block text-sm font-medium text-black">
                        Upload Photos (up to 3)
                    </label>

                    <label
                        htmlFor="uploadFile1"
                        className="bg-white text-gray-500 font-semibold text-base rounded max-w-sm h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
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

                    {images.length > 0 && (
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
                    )}
                </div>
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700">
                        PG Post Content
                    </label>
                    <textarea
                        value={pg_post_content}
                        onChange={(e) => setPgPostContent(e.target.value.trim())}
                        className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm w-full h-32"
                    />
                </div>
                {/* Buttons */}

                <div className="mt-12 text-center">
                    <button
                        onClick={handleSubmit}
                        className="px-8 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Add PG
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Add_PG;