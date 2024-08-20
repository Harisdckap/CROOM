import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../js/api/auth";
import { googleLogin } from "../js/api/auth";
import apartmentIMG from "../assets/log3.png";
import logo from "../assets/logo.png";
import FacebookLogo from "../assets/facebook.png";
import GoogleLogo from "../assets/google.png";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

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

            if (response && response.access_token) {
                const { access_token } = response;
                const user_id = response.user_id;

                //storing the token and user_id in localStorage
                localStorage.setItem("auth_token", access_token);
                localStorage.setItem("user_id", user_id);

                // Redirect to home page
                navigate("/");
            } else {
                throw new Error("No access token received from the server");
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage(
                "Login failed. Please check your credentials and try again."
            );
        }
    };

    const handleGoogleAuth = async (e) => {
        // e.preventDefault();
        // window.location.href = "http://localhost:8000/auth/google";
        e.preventDefault();

        try {
            const response = await googleLogin();

            if (response && response.access_token) {
                const { access_token } = response;
                const user_id = response.user_id;

                //storing the token and user_id in localStorage
                localStorage.setItem("auth_token", access_token);
                localStorage.setItem("user_id", user_id);

                // Redirect to home page
                navigate("/");
            } else {
                throw new Error("No access token received from the server");
            }
        } catch (error) {
            // console.error("Login error:", error);/
            setErrorMessage(
                "Login failed. Please check your credentials and try again."
            );
        }
    };

    return (
        <div
            className=" min-h-screen flex flex-col bg-gray-100"
            style={{ backgroundColor: "rgb(31, 41, 59)" }}
        >
            {/* Navbar with Logo */}
            <nav className="bg-gray-100 px-3 py-2">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="w-30 h-10" />
                </div>
            </nav>

            {/* Main Content */}
            <div className="mt-12 w-full flex items-center justify-center">
                <div className="bg-gray-100 rounded-md flex">
                    {/* Image Section */}
                    <div className="hidden md:flex md:w-1/2 items-center justify-center">
                        <img
                            src={apartmentIMG}
                            className="max-h-96"
                            alt="Apartment"
                        />
                    </div>

                    {/* Form Section */}
                    <div className="flex items-center mt-2 mb-2 p-2 justify-between">
                        <div>
                            <h1 className="text-center text-2xl font-bold mb-4">
                                Login to your account
                            </h1>
                            <p className="text-center text-gray-500 mb-4">
                                Welcome back! Select a method to login:
                            </p>

                            <form onSubmit={handleSubmit} autoComplete="off">
                                <div className="mb-3">
                                    <label
                                        htmlFor="email"
                                        className="block text-gray-700"
                                    >
                                        Email:
                                    </label>
                                    <input
                                        type="email"
                                        className={`mt-1 block w-full p-2 border ${
                                            errorMessage
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        } rounded-md`}
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errorMessage && (
                                        <div className="text-red-500 text-sm">
                                            {errorMessage}
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3 relative">
                                    <label
                                        htmlFor="password"
                                        className="block text-gray-700"
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
                                        placeholder="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        autocomplete="off"
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

                                    {errorMessage && (
                                        <div className="text-red-500 text-sm">
                                            {errorMessage}
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3 flex items-center">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600"
                                        id="rememberMe"
                                    />
                                    <label
                                        className="ml-2 block text-gray-700"
                                        htmlFor="rememberMe"
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <div className="mb-3 flex justify-between items-center">
                                    <div>
                                        {/* Use Link component for navigation */}
                                        <Link
                                            to="/forgot-Password"
                                            className="text-blue-500 hover:underline"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none"
                                >
                                    Login
                                </button>
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
                                            onClick={handleGoogleAuth}
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
