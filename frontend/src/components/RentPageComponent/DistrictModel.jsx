import React from "react";
import { XCircleIcon } from '@heroicons/react/24/solid';

const DistrictModal = ({ isOpen, onClose, districts, onSelectDistrict }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 pt-8">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-3xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition duration-300"
                >
                    <XCircleIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Select a Popular City in India</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 h-96 overflow-y-scroll">
                    {districts.map((district) => (
                        <button
                            key={district.name}
                            onClick={() => onSelectDistrict(district)}
                            className="flex flex-col items-center bg-gray-100 rounded-lg p-4 shadow hover:shadow-lg transition duration-300"
                        >
                            <img
                                src={district.image}
                                alt={district.name}
                                className="w-full h-32 object-cover rounded-md mb-4 transform transition-transform duration-300 hover:scale-105"
                            />
                            <span className="text-lg font-semibold text-gray-700">{district.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DistrictModal;
