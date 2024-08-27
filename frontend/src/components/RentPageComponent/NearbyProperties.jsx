import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NearbyPropertiesCarousel = ({ nearbyProperties, handleViewClick }) => {
  const [slider, setSlider] = useState(null);

  // Settings for the slider
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false, // We will use custom arrows
    autoplay: true,
    autoplaySpeed: 10000, // Auto-slide every 3 seconds
  };

  useEffect(() => {
    // Automatically slide every 3 seconds
    const interval = setInterval(() => {
      if (slider) {
        slider.slickNext();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [slider]);

  return (
    <div className="relative p-6 bg-gray-100 rounded-lg shadow-xl mt-4">
    <h2 className="text-2xl font-semibold mb-4 gradient-text">Nearby Properties</h2>
    <Slider ref={(ref) => setSlider(ref)} {...settings} className="px-4">
      {nearbyProperties.map((nearby, index) => {
        // Parse location to extract city
        const locationData = JSON.parse(nearby.location); // Parse the JSON string
        const locationData1 = JSON.parse(locationData); // Extract city from parsed data
  
        return (
          <div key={index} className="border rounded-lg p-5 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col gap-4 mx-2">
            <h3 className="text-lg font-bold mb-2 gradient-text ">{nearby.title}</h3>
            <div className="flex items-center mb-3">
              <FontAwesomeIcon icon={faHome} className="mr-2 text-gray-600" />
              <span className="text-sm text-gray-700">
                Room Type: {nearby.room_type || nearby.pg_type}
              </span>
            </div>
            <p className="text-lg font-semibold text-green-600 mb-3">
              ₹{nearby.price || nearby.occupancy_amount || nearby.approx_rent}
            </p>
            <motion.p
              className="text-sm font-medium text-indigo-800 cursor-pointer"
              whileHover={{ x: 10 }} // Slide effect on hover
              transition={{ duration: 0.3 }}
              onClick={() => handleViewClick(nearby.id, locationData1.city, nearby.listing_type)}
            >
              View Details &rarr;
            </motion.p>
          </div>
        );
      })}
    </Slider>
    <button
      className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-400 text-white p-2 shadow-lg mt-[33px] rounded-sm"
      onClick={() => slider.slickPrev()}
    >
      <FontAwesomeIcon icon={faChevronLeft} />
    </button>
    <button
      className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-400 text-white p-2 shadow-lg mt-[33px] rounded-sm"
      onClick={() => slider.slickNext()}
    >
      <FontAwesomeIcon icon={faChevronRight} />
    </button>
  </div>
  
  );
};

export default NearbyPropertiesCarousel;
