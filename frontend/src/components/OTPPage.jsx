
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOtp } from "../js/api/auth";
import img from '../assets/otp.png';
import logo from "../assets/logo.png";
import OtpInput from 'react-otp-input';

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
            <nav className="bg-gray-100 px-3 py-4">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="w-20 h-auto" />
                </div>
            </nav>
            <div className="main flex-grow flex items-center justify-between">
                <div className="flex mx-auto rounded-md bg-gray-100">
                    <div className="hidden md:flex items-center justify-between">
                        <img src={img} alt="OTP Logo" />
                    </div>
                    <div className="md:w-1/2 flex items-center justify-between">
                        <div className="w-full max-w-md">
                            <h2 className="text-center text-2xl font-bold mb-4">Verify OTP</h2>
                            <p className="text-center text-gray-600 mb-4">Please check your email for the OTP and enter it below:</p>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4 ml-16" >

                                    <OtpInput
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={4}
                                        renderSeparator={<span className="ml-2 mr-2">-</span>}
                                        renderInput={(props) => <input {...props}

                                        />}
                                        inputStyle={{
                                            width: '3rem',

                                            color: '#1a202c',
                                            width: '4rem', /* w-16 */
                                            height: '4rem', /* h-16 */
                                            display: 'flex', /* flex */
                                            flexDirection: 'column', /* flex-col */
                                            alignItems: 'center', /* items-center */
                                            justifyContent: 'center', /* justify-center */
                                            textAlign: 'center', /* text-center */
                                            paddingLeft: '1.25rem', /* px-5 */
                                            paddingRight: '1.25rem', /* px-5 */
                                            outline: 'none', /* outline-none */
                                            borderRadius: '0.75rem', /* rounded-xl */
                                            border: '1px solid #E5E7EB', /* border border-gray-200 */
                                            fontSize: '1.125rem', /* text-lg */
                                            backgroundColor: '#FFFFFF',
                                        }}
                                        focusStyle={{
                                            border: '1px solid #3182ce',
                                            outline: 'none',
                                            boxShadow: '0 0 0 1px #3182ce'
                                        }}
                                    />

                                </div>
                                {error && <div className="text-red-500 ml-24 text-sm mt-14 fixed">{error}</div>}
                                <div className="flex justify-center">
                                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
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
