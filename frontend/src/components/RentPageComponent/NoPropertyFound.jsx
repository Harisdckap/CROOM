import React from 'react';
import img from '../../assets/2903770.jpg';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'; // Import the icon

const NoPropertiesFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center mt-6">
      <motion.div
        className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg max-w-4xl mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="flex-shrink-0 w-full md:w-1/2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <img
            src={img}
            alt="No Properties"
            className="w-full h-full object-cover rounded-l-lg"
          />
        </motion.div>
        <div className="flex-1 p-6 text-center md:text-left">
          <h1 className="text-3xl font-bold gradient-text mb-4 flex items-center justify-center md:justify-start">
            <FaSearch className="mr-2 text-blue-900 w-5" /> 
            No Properties Found
          </h1>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find any properties matching your search.</p>
          <p className="text-gray-500 mb-6">Please add your property in this location.</p>
          <button
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors"
            onClick={() => {navigate("/PostRequirementPage")}}
          >
            Add Property
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NoPropertiesFound;
