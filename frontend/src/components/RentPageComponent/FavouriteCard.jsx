
import React from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faHome, faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import "../../slider.css";

const FavoriteCard = ({ item, onToggleFavorite, isFavorite }) => {
    const renderSlider = (photos) => {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            className: "custom-slider",
            dotsClass: "custom-dots",
        };

        return (
            <Slider {...settings}>
                {photos.map((photo, index) => (
                    <div key={index}>
                        <img
                            src={`http://127.0.0.1:8000/storage/${photo}`}
                            alt="Item Photo"
                            className="w-full h-48 object-cover rounded-lg"
                            onError={(e) => (e.target.src = "/path/to/fallback-image.jpg")}
                        />
                    </div>
                ))}
            </Slider>
        );
    };

    let photos = [];
    if (item.photos) {
        photos = JSON.parse(item.photos).map((photo) => photo.replace("/", "/"));
    }

    return (
        <div key={item.id} className="border rounded-lg p-6 bg-white shadow-md ml-4 mr-4">
            <div className="relative">
                {photos.length > 0 ? renderSlider(photos) : <p className="text-gray-500 text-center">No photo available.</p>}
            </div>
            <div className="px-2">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold gradient-text">{item.title || item.name || item.pg_name}</h2>
                    <p className="text-green-600 flex items-center">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                        {item.location}
                    </p>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <div
                        className="cursor-pointer text-gray-700 hover:text-red-500"
                        onClick={() => onToggleFavorite(item.id)}
                    >
                        <FontAwesomeIcon
                            icon={isFavorite ? solidHeart : regularHeart}
                            className="text-xl"
                        />
                    </div>
                    <p className="text-gray-700 flex items-center">
                        <FontAwesomeIcon icon={faHome} className="mr-2" />
                        Type: {item.room_type || item.pg_type}
                    </p>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between items-center mt-2">
                    <div className="text-gray-700">
                        <p>
                            <span className="font-semibold">
                                ₹{item.price || item.rent}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FavoriteCard;
