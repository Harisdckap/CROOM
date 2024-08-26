import React from "react";
import { Drawer, Button } from "antd";
import Slider from "react-slick";

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
        if (!ad) return;

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/user/${ad.user_id}/ads/${ad.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${yourAccessToken}`, // Add your JWT token if required
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                message.success('Ad deleted successfully.');
                onClose(); // Close the drawer after deletion
            } else {
                message.error('Failed to delete the ad.');
            }
        } catch (error) {
            message.error('An error occurred. Please try again.');
        }
    };
    
    return (
        <Drawer
            title="Ad Details"
            width={700}
            onClose={onClose}
            open={open}
            placement="right"
            className="bg-white absolute top-14"
        >
            {ad && (
                <div className="block">
                    <h3 className="text-xl font-bold">{ad.title || ad.title || ad.pg_name}</h3>
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
                    <h3 className="text-base text-blue-600 font-bold gap-2">Price:  <p className="font-normal text-black">&#x20B9;{ad.price || ad.occupancy_amount || ad.approx_rent || "Not available"}</p></h3>
                    <h3 className="text-base text-blue-600 font-bold gap-2">Room Type: <p className="font-normal text-black">{ad.room_type || ad.room_type || ad.pg_type || "Not Available"}</p></h3>
                    <h3 className="text-base text-blue-600 font-bold gap-2">Contact: <p className="font-normal text-black">{ad.contact || ad.contact || ad.mobile_num || "Not Available"}</p></h3>
                    <h3 className="text-base text-blue-600 font-bold gap-2">Gender: <p className="font-normal text-black">{ad.looking_for_gender || ad.looking_for_gender || ad.looking_for || "Not Available"}</p></h3>
                    <h3 className="text-base text-blue-600 font-bold gap-2">Occupancy: <p className="font-normal text-black">{ad.occupancy || ad.occupancy || ad.occupancy_type || "Not Available"}</p></h3>
                    <h3 className="text-base text-blue-600 font-bold gap-2">City: <p className="font-normal text-black">{ad.address2 || ad.address2 || "Not Available"}</p></h3>
                    <h3 className="text-base text-blue-600 font-bold gap-2">Listing Type: <p className="font-normal text-black">{ad.listing_type || ad.listing_type || ad.listing_type || "Not Available"}</p></h3>
                    <h3 className="text-base text-blue-600 font-bold gap-2">Feature: <p className="font-normal text-black">{ad.highlighted_features.join(", ") || ad.highlighted_features.join(", ") || "Not Available"}</p></h3>
                    <h3 className="text-base text-blue-600 font-bold gap-2">Amenities: <p className="font-normal text-black">{ad.amenities.join(", ") || ad.amenities.join(", ") || ad.amenities.join(", ") || "Not Available"}</p></h3>
                    <h3 className="text-base text-blue-600 font-bold gap-2">Description: <p className="font-normal text-black">{ad.description || ad.post || ad.pg_post_content || "Not Available"}</p></h3>
                    </div>
                    <div className="my-6 flex items-end justify-end space-x-10">
                    <Button onClick={showEditModal} className="bg-blue-700 text-white">Edit</Button>
                    <Button onClick={handleDelete} className="bg-red-600 text-white">Delete</Button>
                    </div>
                </div>
            )}
        </Drawer>
    );
};

export default DetailsUserAdsComponents;


