import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from "../js/api/auth";
import resetImg from "../assets/reset_password.png";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import Auth_navbar from './RentPageComponent/Auth_navbar';

function ResetPasswordPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: searchParams.get('email'),
        password: '',
        password_confirmation: '',
        token: searchParams.get('token'),
    });
    const [message, setMessage] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const closePopup = () => {
        setShowPopup(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await resetPassword(formData);
            if (response.success) {
                setMessage('Password reset successfully. Redirecting to login...');
                setShowPopup(true);
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setMessage(response.error || 'Something went wrong. Please try again.');
                setShowPopup(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
            setShowPopup(true);
        }
    };

    return (
        <div className="min-h-screen bg-gray-800">
            <Auth_navbar />
            <div className='flex relative top-36 flex-grow items-center justify-center'>
                <div className='bg-gray-100 p-4 rounded-md max-w-3xl flex'>
                    <div className="flex w-1/2 items-center justify-center">
                        <img
                            src={resetImg}
                            alt="Reset Password"
                            className="w-full h-auto"
                        />
                    </div>
                    <div className="w-1/2 p-4 flex items-center justify-center">
                        <div className="w-full max-w-md">
                            <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4 relative">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password:</label>
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        autoComplete='off'
                                    />
                                    <span
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-2 top-8 cursor-pointer"
                                    >
                                        {showNewPassword ? (
                                            <EyeOutlined
                                                style={{
                                                    fontSize: "16px",
                                                    color: "#1F293B",
                                                }}
                                            />
                                        ) : (
                                            <EyeInvisibleOutlined
                                                style={{
                                                    fontSize: "16px",
                                                    color: "#1F293B",
                                                }}
                                            />
                                        )}
                                    </span>
                                </div>
                                <div className="mb-4 relative">
                                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Confirm Password:</label>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        value={formData.password_confirmation}
                                        onChange={handleChange}
                                        autoComplete='off'
                                    />
                                    <span
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-2 top-8 cursor-pointer"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOutlined
                                                style={{
                                                    fontSize: "16px",
                                                    color: "#1F293B",
                                                }}
                                            />
                                        ) : (
                                            <EyeInvisibleOutlined
                                                style={{
                                                    fontSize: "16px",
                                                    color: "#1F293B",
                                                }}
                                            />
                                        )}
                                    </span>
                                </div>
                                <div className='text-center'>
                                    <button type="submit" className="inline-flex items-center px-4 py-2 mt-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                        Reset Password
                                    </button>
                                </div>
                            </form>
                            {/* {!showPopup && message && <p className="mt-4 text-center text-green-500">{message}</p>} */}
                        </div>
                    </div>
                </div>
            </div>
            {showPopup && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-80">
                        <p>{message}</p>
                        <div className='text-center'>
                            <button className="mt-4 text-white bg-blue-500 px-4 py-2 rounded" onClick={closePopup}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ResetPasswordPage;
