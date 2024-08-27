import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChevronLeft, faChevronRight, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
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
    autoplaySpeed: 8000, // Auto-slide every 8 seconds
    centerMode: true, // Center the current slide
    centerPadding: '20px', // Padding on both sides of the center slide
  };

  useEffect(() => {
    // Automatically slide every 8 seconds
    const interval = setInterval(() => {
      if (slider) {
        slider.slickNext();
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [slider]);

  return (
    <div className="relative p-8 bg-gray-100 rounded-lg shadow-xl mt-4">
      <h2 className="text-3xl font-semibold mb-6 gradient-text">Nearby Properties</h2>
      <Slider ref={(ref) => setSlider(ref)} {...settings} className="px-6">
        {nearbyProperties.map((nearby, index) => {
          let locationData1 = {};
          try {
            const locationData = JSON.parse(nearby.location);
            locationData1 = JSON.parse(locationData); // Extract city from parsed data
          } catch (e) {
            console.error("Error parsing location data:", e);
          }

          return (
            <div key={index} className="border rounded-lg p-6 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col gap-6 mx-4">
              <h3 className="text-xl font-bold mb-3 gradient-text">{nearby.title}</h3>
              <div className="flex items-center mb-4">
                <FontAwesomeIcon icon={faHome} className="mr-2 text-gray-600" />
                <span className="text-base text-gray-700">
                  Room Type: {nearby.room_type || nearby.pg_type}
                </span>
              </div>
              <p className="text-xl font-semibold text-green-600 mb-4">
                ₹{nearby.price || nearby.occupancy_amount || nearby.approx_rent}
              </p>
              <div className="flex flex-col gap-2">
                <motion.p
                  className="text-base font-medium text-indigo-800 cursor-pointer"
                  whileHover={{ x: 10 }} // Slide effect on hover
                  transition={{ duration: 0.3 }}
                  onClick={() => handleViewClick(nearby.id, locationData1.city || 'Unknown City', nearby.listing_type)}
                >
                  View Details &rarr;
                </motion.p>
                <p className="text-green-600 flex items-center text-base">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                  {locationData1.district || 'Unknown District'}
                </p>
              </div>
            </div>
          );
        })}
      </Slider>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-400 text-white p-3 shadow-lg rounded-full"
        onClick={() => slider.slickPrev()}
        aria-label="Previous slide"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-400 text-white p-3 shadow-lg rounded-full"
        onClick={() => slider.slickNext()}
        aria-label="Next slide"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default NearbyPropertiesCarousel;
