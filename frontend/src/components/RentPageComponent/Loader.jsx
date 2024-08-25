// Loader.jsx
import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center mt-52">
            <ClipLoader color="#3498db" size={60} />
            <p className="mt-6 text-gray-600">Loading...</p>
        </div>
    );
};

export default Loader;
