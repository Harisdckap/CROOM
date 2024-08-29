import React from 'react';
import underconstructionimage from "../assets/Underconstruction.png";

const UnderConstruction = () => {
    return (
        <div className="bg-gray-100 flex items-center justify-center pt-40 pb-36">
            <div className="text-center">
                <img 
                    src={underconstructionimage}
                    alt="Under Construction" 
                    className="w-52 mx-auto mb-8"
                />
                <h1 className="text-4xl font-bold mb-4">We're Working on Something New!</h1>
                <p className="text-lg text-gray-600">
                    Our site is currently under construction. Stay tuned for something amazing!
                </p>
            </div>
        </div>
    );
};

export default UnderConstruction;
