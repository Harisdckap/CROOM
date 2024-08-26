import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../js/api/auth";
import apartmentIMG from "../assets/log3.png";
// import logo from "../assets/logo.png";
import FacebookLogo from "../assets/facebook.png";
import GoogleLogo from "../assets/google.png";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import Auth_navbar from "./RentPageComponent/Auth_navbar";

function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await login(formData);

            if (response && response.success) {
                if (response.access_token) {
                    const { access_token } = response;

                    // Store the token in localStorage
                    localStorage.setItem("auth_token", access_token);

                    // Redirect to home page
                    navigate("/");
                }
            } else {
                throw new Error(response.message || "Login failed.");
            }
        } catch (error) {
            console.error("Login error:", error);

            if (error.response && error.response.status === 404) {
                setErrorMessage("User not found. Please register.");
            } else if (error.response && error.response.status === 401) {
                setErrorMessage("Invalid credentials. Please try again.");
            } else {
                setErrorMessage("An error occurred. Please try again.");
            }
        }
    };

    return (
        <div
            className="min-h-screen flex flex-col bg-gray-100"
            style={{ backgroundColor: "rgb(31, 41, 59)" }}
        >
            {/* Navbar with Logo */}
            <Auth_navbar />

            {/* Main Content */}
            <div className="flex flex-grow items-center justify-center">
                <div className="bg-gray-100 h-auto mt-14 max-w-3xl p-4 rounded-md flex">
                    {/* Image Section */}
                    <div className="flex w-1/2 items-center justify-between">
                        <img
                            src={apartmentIMG}
                            className="w-full h-auto"
                            alt="Apartment"
                        />
                    </div>

                    {/* Form Section */}
                    <div className="flex items-center w-1/2 items-center justify-center">
                        <div className="w-full max-w-md">
                            <h1 className="text-center text-2xl font-bold mb-4">
                                Login to your account
                            </h1>
                            <p className="text-center text-gray-500 mb-4">
                                Welcome back! Select a method to login:
                            </p>

                            <form onSubmit={handleSubmit} autoComplete="off">
                                {errorMessage && (
                                    <div className="bg-red-300 rounded-sm p-1 text-center text-red-500 mb-4 relative text-sm">
                                        {errorMessage}
                                    </div>
                                )}

                                <div className="mb-3">
                                    <label
                                        htmlFor="email"
                                        className="block text-gray-700 text-sm font-medium"
                                    >
                                        Email:
                                    </label>
                                    <input
                                        type="email"
                                        className={`mt-1 block w-full p-1 border ${
                                            errorMessage
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        } rounded-md`}
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="mb-3 relative">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Password:
                                    </label>
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        className={`mt-1 block w-full p-2 border ${
                                            errorMessage
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        } rounded-md`}
                                        id="password"
                                        placeholder="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                    <p
                                        className="absolute top-9 right-3 cursor-pointer"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        id="eye"
                                    >
                                        {showPassword ? (
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
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600"
                                        id="rememberMe"
                                    />
                                    <label
                                        className="ml-2 block text-sm font-medium text-gray-700"
                                        htmlFor="rememberMe"
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <div className="relative bottom-6 left-52 flex justify-between items-center">
                                    <div>
                                        {/* Use Link component for navigation */}
                                        <Link
                                            to="/forgot-Password"
                                            className="text-blue-500 text-sm font-medium hover:underline"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 mt-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Login
                                    </button>
                                </div>
                                <div className="flex gap-4 justify-center pt-4">
                                    <Link className="transform transition-transform duration-200 hover:scale-110">
                                        <img
                                            className="w-10 h-10 hover:animate-tilt-shake"
                                            src={FacebookLogo}
                                            alt="Facebook Logo"
                                        />
                                    </Link>
                                    <Link className="transform transition-transform duration-200 hover:scale-110">
                                        <img
                                            className="w-10 h-10 hover:animate-tilt-shake"
                                            src={GoogleLogo}
                                            alt="Google Logo"
                                        />
                                    </Link>
                                </div>
                            </form>
                            <p className="mt-4 text-center">
                                Don't have an account?{" "}
                                <Link
                                    to="/register"
                                    className="text-blue-500 hover:underline"
                                >
                                    Create account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
