import React from 'react';

const Modal = ({ isOpen, onClose, locations, onSelectLocation }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-4xl p-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Explore Locations</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                    {locations.map((location) => (
                        <div
                            key={location.name}
                            className="relative cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => onSelectLocation(location)}
                        >
                            <img src={location.image} alt={location.name} className="rounded-lg shadow-lg" />
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center text-white font-semibold">
                                {location.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Modal;
