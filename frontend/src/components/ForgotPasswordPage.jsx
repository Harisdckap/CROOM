// src/components/ForgotPasswordPage.jsx
import React, { useState } from "react";
import { forgotPassword } from "../js/api/auth";
import img from "../assets/forgotpwd2.png";
import { RotatingLines } from 'react-loader-spinner';
import Auth_navbar from "./RentPageComponent/Auth_navbar";

function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const response = await forgotPassword({ email });
            if (response.success) {
                setMessage("Please check your email for the password reset link.");
            } else {
                setMessage("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("An error occurred. Please try again.");
        } finally {
            // setTimeout(()=> {
                setLoading(false);
            // }, 1000);
            setShowPopup(true);
        }
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="container w-full" style={{ backgroundColor: 'rgb(31, 41, 59)' }}>
            {/* loader */}
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                    <RotatingLines
                        height="98"
                        width="98"
                        color="blue"
                        wrapperStyle={{}}
                        visible={true}
                        ariaLabel='rotating-lines-loading'
                        strokeWidth="3"
                        strokeColor="blue"
                        animationDuration="0.75"
                    />
                </div>
            )}
            {/* navbar with logo */}
            <Auth_navbar />

            <div className="flex flex-col items-center">
                <div className="w-full bg-gray-100 relative top-36 rounded-md max-w-3xl p-4 flex">
                    {/* Left Side - Image Section */}
                    <div className="w-1/2 flex items-center justify-between">
                        <img
                            className="w-full h-auto"
                            src={img}
                            alt="Forgot Password"
                        />
                    </div>
                    {/* Right Side - Form Section */}
                    <div className="w-1/2 flex items-center justify-center">
                        <div className="w-full max-w-md">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Form Fields */}
                                <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Email:
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        className="block w-full p-1 border-2 rounded-2"
                                    />
                                </div>
                                {/* Submit Button */}
                                <div className="text-center">
                                    {!loading && (
                                        <button
                                            type="submit"
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Send Reset Link
                                        </button>
                                    )}
                                </div>
                            </form>
                            {/* Message Display */}
                            {showPopup && (
                                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                                    <div className="bg-white p-8 rounded-lg shadow-lg w-80">
                                        {message && (
                                            <p className="mt-4 text-green-600">{message}</p>
                                        )}
                                        <div className="text-center">
                                        <button className="mt-4 text-white bg-blue-500 px-4 py-2 rounded" onClick={closePopup}>
                                            Close
                                        </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;
