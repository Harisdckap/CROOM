import React from "react";
import { Drawer, Button } from "antd";
import Slider from "react-slick";
import { ToastContainer, toast } from "react-toastify";

// import { toast } from 'react-toastify';
const DetailsUserAdsComponents = ({ ad, open, onClose, showEditModal }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    const handleDelete = async () => {
        const token = localStorage.getItem("auth_token");
        if (!ad) return;

        try {
            const { id, listing_type } = ad;
            const response = await fetch(
                `http://127.0.0.1:8000/api/property/${listing_type}/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

           // Show Toast Notification
if (response.ok) {
    toast.success("Ad deleted successfully.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // Custom styling
        style: {
            marginTop: "10px" // Add margin-top to the toast
        }
    });
    onClose(); // Close the drawer after deletion
} else {
    toast.error("Failed to delete the ad.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // Custom styling
        style: {
            marginTop: "15px" // Add margin-top to the toast
        }
    });
}
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <Drawer
        style={{ fontFamily: 'Varela Round, sans-serif' }}
            title="Ad Details"
            width={700}
            onClose={onClose}
            open={open}
            placement="right"
            className="bg-white absolute top-14"
        >
            {ad && (
                <div className="block" style={{ fontFamily: 'Varela Round, sans-serif' }}>
                    <h3 className="text-xl font-bold gradient-text">{ad.title || ad.title || ad.pg_name}</h3>
                    <div className="relative">
                        {ad.photos && (
                            <Slider {...settings} className="fade-in">
                                {JSON.parse(ad.photos).map((photo, index) => (
                                    <div key={index} className="p-2 flex justify-center">
                                        <img
                                            src={`http://127.0.0.1:8000/storage/${photo.replace("\\/", "/")}`}
                                            alt={`Ad photo ${index}`}
                                            className="w-84 mx-auto h-80 object-cover"
                                        />
                                    </div>
                                ))}
                            </Slider>
                        )}
                    </div>
                    <div className="grid grid-flow-row-dense grid-cols-2 my-10">
                        <h3 className="text-base text-blue-color font-bold gap-2">Price:  <p className="font-normal text-black">&#x20B9;{ad.price || ad.approx_rent || ad.occupancy_amount || "Not available"}</p></h3>
                        <h3 className="text-base text-blue-color font-bold gap-2">City: <p className="font-normal text-black">{ad.address2 || ad.address2 || "Not Available"}</p></h3>
                        <h3 className="text-base text-blue-color font-bold gap-2">Room Type: <p className="font-normal text-black">{ad.room_type || ad.room_type || ad.pg_type || "Not Available"}</p></h3>
                        {ad.listing_type === "room" || ad.listing_type === "pg" ? (<h3 className="text-base text-blue-color font-bold gap-2">Contact: <p className="font-normal text-black">{ad.contact || ad.contact || ad.mobile_num || "Not Available"}</p></h3>) : ("")}
                        <h3 className="text-base text-blue-color font-bold gap-2">Gender: <p className="font-normal text-black">{ad.looking_for_gender || "Not Available"}</p></h3>
                        {ad.listing_type === "roommates" && (<h3 className="text-base text-blue-color font-bold gap-2">Number of People: <p className="font-normal text-black">{ad.number_of_people || "Not Available"}</p></h3>)}
                        <h3 className="text-base text-blue-color font-bold gap-2">Occupancy: <p className="font-normal text-black">{ad.occupancy || ad.occupancy_type || "Not Available"}</p></h3>
                        <h3 className="text-base text-blue-color font-bold gap-2">Listing Type: <p className="font-normal text-black">{ad.listing_type || "Not Available"}</p></h3>
                        <h3 className="text-base text-blue-color font-bold gap-2">Feature: <p className="font-normal text-black">{ad.highlighted_features.join(", ") || "Not Available"}</p></h3>
                        <h3 className="text-base text-blue-color font-bold gap-2">Amenities: <p className="font-normal text-black">{ad.amenities.join(", ") || ad.amenities.join(", ") || ad.amenities.join(", ") || "Not Available"}</p></h3>
                        <h3 className="text-base text-blue-color font-bold gap-2">Description: <p className="font-normal text-black">{ad.description || ad.post || ad.pg_post_content || "Not Available"}</p></h3>
                    </div>
                    <div className="my-6 flex items-center justify-center space-x-10">
                        {/* <Button style={{ fontFamily: 'Varela Round, sans-serif' }} onClick={() => showEditModal(ad)} className="primary-btn text-white">Edit</Button> */}
                        <Button style={{ fontFamily: 'Varela Round, sans-serif' }} onClick={handleDelete} className="bg-red-600 text-white">Delete</Button>
                    </div>
                </div>
            )}
              <ToastContainer />
        </Drawer>
    );
};

export default DetailsUserAdsComponents;
