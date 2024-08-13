import React, { useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";


const AddRequirement = () => {
   const [formData, setFormData] = useState({
       looking_for: "Any",
       looking_for_gender: "Male",
       room_type: "1RK",
       highlighted_features: [],
       location:'',
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
   const [address_1,setaddress_1 ] = useState("")
   const [address_2,setaddress_2 ] = useState("")
   const [PIN,setPIN ] = useState("")
   const [state,setstate ] = useState("")


  const handleChangeAddress_1 = (e) =>{
   setaddress_1(e.target.value)
  }
  
  const handleChangeAddress_2 = (e) =>{
   setaddress_2(e.target.value)
    }

  const handleChangeState = (e) =>{
   setstate(e.target.value)
  }

  const handleChangePIN = (e) =>{
   setPIN(e.target.value) 
  }

   const deleteIMG = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
};


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

   const locationAdd = `${PIN} ${address_1} ${address_2} ${state}`;

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
           approx_rent,
           post,
           occupancy,
           number_of_people,
           highlighted_features,
           amenities,
           looking_for_gender,
           room_type,
       } = formData;

       if (!approx_rent) {
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
       if (!occupancy) {
           showToast("Valid occupancy is required");
           return false;
       }
       if (!number_of_people) {
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


       const locationAdd = ` ${address_1} ${address_2} ${PIN} ${state}`;
    formDataObj.append('location', locationAdd);
    // formDataObj.append('post', formData.post);

    for (const key in formData) {
        if (key !== "location") { 
            if (Array.isArray(formData[key])) {
                formDataObj.append(key, JSON.stringify(formData[key]));
            } else {
                formDataObj.append(key, formData[key]);
            }
        }
    }
     



       for(const [key , value] of formDataObj.entries()){
        console.log(key + " "  + value)
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

   
<div className="flex items-center justify-between ">
<div className="flex items-center gap-14">
                   
                   <div className="">
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
               <fieldset className="border text-center w-96 p-4 rounded-md">
                       <legend className="text-base font-medium text-gray-900">
                           Room Type
                       </legend>
                       <div className="mt-2 space-x-4">
                           {["1RK", "1BHK","2BHK","3BHK"].map((option) => (
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
          
<div className="">
                <div className="flex items-center justify-between">
                
                <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    address 1
                                </label>
                                <input
                                value={address_1}
                                onChange={handleChangeAddress_1}
                                    name="  address_1"
                                    placeholder="Address 1"
                                    className="mt-1 block px-3 w-96 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                                />
                            </div> 


<fieldset className="border text-center w-96 p-4 rounded-md">
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
            
               </div>
               <div className="flex justify-between">
    <div className="flex items-center gap-14">
    <div>
                                <label className="block mt-3 text-sm font-medium text-gray-700">
                                    address 2
                                </label>
                                <input
                                    name="  address_2"
                                    value={address_2}
                                    onChange={handleChangeAddress_2}
                                    placeholder="Address 1"
                                    className="mt-1 block px-3 min-w-96 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                                />
                            </div> 

                           
                           
    </div>
</div>
  



<div className="flex ">
<div className="flex mt-5 gap-14">
<div>
                       <label className="block text-sm font-medium text-gray-700">
                           Mobile Number
                       </label>
                       <input
                           type="tel"
                           className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm "
                       />
                   </div>  
<div>
                                <label className="block text-sm font-medium text-gray-700">
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

</div>


<div className="flex gap-14">

<div>
    <label className="block text-sm font-medium text-gray-700">
       state
    </label>
    <input
        type="text"
        onChange={handleChangeState}
        value={state}
        name="state"
        className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
    />
</div>

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
</div>
               
               <div className="flex  items-center gap-48">
               <div  className="w-1/2 tex">
                   <fieldset className="border  text-center w p-4 rounded-md mt-12">
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
                                           ? "bg-blue-500"
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
                   <fieldset className="border text-center p-4 rounded-md mt-12">
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
                   {/* <label className="block text-sm font-medium text-black">
                       Upload Photos (up to 3)
                   </label>
                   <input
                       type="file"
                       accept="image/*"
                       multiple
                       onChange={handleFileChange}
                       ref={fileInputRef}
                       className="block w-full mt-1"
    
/> */}

<div className="mt-10"> 
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
    <input type="file"
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
               <div>
                       <label className="block text-sm font-medium text-gray-700">
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
                   </div>

               <div className="mt-12 text-center">
                   <button
                       type="submit"
                       className="px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
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