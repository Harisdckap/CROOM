import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 cursor-pointer bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700"
      onClick={onClick}
    >
      <FaChevronLeft />
    </div>
  );
};

export const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 cursor-pointer bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700"
      onClick={onClick}
    >
      <FaChevronRight />
    </div>
  );
};
