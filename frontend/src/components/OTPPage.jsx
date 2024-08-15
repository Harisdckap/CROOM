
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOtp } from "../js/api/auth";
import img from '../assets/otp.png';
<<<<<<< HEAD
import Auth_navbar from "./RentPageComponent/Auth_navbar";
// import logo from "../assets/logo.png";
=======
import logo from "../assets/logo.png";
import OtpInput from 'react-otp-input';
>>>>>>> 79382a85fe44040c0f6a78df305bd65558c30cb6

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
<<<<<<< HEAD
           {/* navbar with logo */}
           <Auth_navbar />

            <div className="main flex-grow flex items-center justify-center">
                <div className="flex max-w-3xl p-4 rounded-md bg-gray-100">
                    <div className="flex w-1/2 items-center justify-between">
                        <img src={img} className="w-full" alt="OTP Logo" />
=======
            <nav className="bg-gray-100 px-3 py-4">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="w-20 h-auto" />
                </div>
            </nav>
            <div className="main flex-grow flex items-center justify-between">
                <div className="flex mx-auto rounded-md bg-gray-100">
                    <div className="hidden md:flex items-center justify-between">
                        <img src={img} alt="OTP Logo" />
>>>>>>> 79382a85fe44040c0f6a78df305bd65558c30cb6
                    </div>
                    <div className="w-1/2 flex items-center justify-between">
                        <div className="w-full max-w-md">
                            <h2 className="text-center text-2xl font-bold mb-4">Verify OTP</h2>
                            <p className="text-center text-gray-600 mb-4">Please check your email for the OTP and enter it below:</p>

                            <form onSubmit={handleSubmit}>
<<<<<<< HEAD
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
=======
                                <div className="mb-4 ml-16" >
>>>>>>> 79382a85fe44040c0f6a78df305bd65558c30cb6

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
