
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOtp } from "../js/api/auth";
import img from '../assets/otp.png';
import Auth_navbar from "./RentPageComponent/Auth_navbar";
// import logo from "../assets/logo.png";

const OTPPage = () => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await verifyOtp(otp, token); // Pass OTP and token
            if (response.success) {
                navigate("/");
            } else {
                setError("Invalid OTP. Please try again.");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to verify OTP. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100" style={{ backgroundColor: 'rgb(31, 41, 59)' }}>
           {/* navbar with logo */}
           <Auth_navbar />

            <div className="main flex-grow flex items-center justify-center">
                <div className="flex max-w-3xl p-4 rounded-md bg-gray-100">
                    <div className="flex w-1/2 items-center justify-between">
                        <img src={img} className="w-full" alt="OTP Logo" />
                    </div>
                    <div className="w-1/2 flex items-center justify-between">
                        <div className="w-full max-w-md">
                            <h2 className="text-center text-2xl font-bold mb-4">Verify OTP</h2>
                            <p className="text-center text-gray-600 mb-4">Please check your email for the OTP and enter it below:</p>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="otp" className="block text-gray-700">OTP</label>
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                        id="otp"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                    {error && <div className="text-red-500 fixed text-sm mt-2">{error}</div>}
                                </div>

                                <div className="flex justify-center">
                                    <button type="submit" className="inline-flex items-center px-4 py-2 mt-6 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                        Verify OTP
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTPPage;
