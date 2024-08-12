import React from "react";

const DistrictModal = ({ isOpen, onClose, districts, onSelectDistrict }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4">Select a District</h2>
                <div className="grid grid-cols-2 gap-4">
                    {districts.map((district) => (
                        <button
                            key={district.name}
                            onClick={() => onSelectDistrict(district)}
                            className="flex items-center bg-gray-200 rounded-lg p-4 hover:bg-gray-300 transition duration-200"
                        >
                            <img
                                src={district.image}
                                alt={district.name}
                                className="w-12 h-12 rounded-full mr-4"
                            />
                            <span className="text-xl font-semibold">{district.name}</span>
                        </button>
                    ))}
                </div>
                <button
                    onClick={onClose}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default DistrictModal;
