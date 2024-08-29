import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../js/api/auth";
import { googleLogin } from "../js/api/auth";
import apartmentIMG from "../assets/log3.png";
// import FacebookLogo from "../assets/facebook.png";
import GoogleLogo from "../assets/google.png";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import Auth_navbar from "./RentPageComponent/Auth_navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
                const user_type = response.user_id;

                //storing the token and user_id in localStorage
                localStorage.setItem("auth_token", access_token);
                localStorage.setItem("user_id", user_id);

                // Redirect to home page
                if (user_type == 1 || user_type == 2) {
                    navigate("/admin");
                } else navigate("/");
                
            } else {
                throw new Error(response.message || "Login failed.");
            }
        } catch (error) {
            console.error("Login error:", error);
            if (error.response && error.response.status === 404) {
                setErrorMessage("User not found. Please register.");
                toast.error("User not found. Please register.");
            } else if (error.response && error.response.status === 401) {
                setErrorMessage("Invalid credentials. Please try again.");
                toast.error("Invalid credentials. Please try again.");
            } else {
                setErrorMessage("An error occurred. Please try again.");
                toast.error("An error occurred. Please try again.");
            }
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
        <div className="min-h-screen flex flex-col bg-gray-100" style={{ backgroundColor: "rgb(31, 41, 59)" }}>
            <Auth_navbar />

            <div className="flex flex-grow items-center justify-center">
                <div className="bg-gray-100 h-auto mt-14 max-w-3xl p-4 py-14 rounded-md flex">
                    <div className="flex w-1/2 items-center justify-between">
                        <img src={apartmentIMG} className="w-full h-auto" alt="Apartment" />
                    </div>

                    {/* Form Section */}
                    <div className="flex items-center w-1/2justify-center">
                        <div className="w-full max-w-md">
                            <h1 className="text-center text-3xl font-bold">Login to your account</h1>
                            <p className="mx-8 text-xs text-gray-500">Welcome back! Please enter your details</p>

                            <form onSubmit={handleSubmit} autoComplete="off" className="mt-4">
                                {errorMessage && (
                                    <div className="bg-red-500 w-72 rounded top-10 absolute mx-6 p-1 text-center text-white text-sm">
                                        {errorMessage}
                                    </div>
                                )}

                                <div className="mt-6">
                                    <label htmlFor="email" className="block text-black text-sm font-medium">Email:</label>
                                    <input
                                        type="email"
                                        className={`mt-1 block w-11/12 h-10 px-2 border ${errorMessage ? "border-red-500" : "border-gray-300"} rounded-md`}
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="mt-2 relative">
                                    <label htmlFor="password" className="block text-sm font-medium text-black">Password:</label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className={`mt-1 block w-11/12 h-10 px-2 border ${errorMessage ? "border-red-500" : "border-gray-300"} rounded-md`}
                                        id="password"
                                        placeholder="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                    <p
                                        className="absolute top-9 right-10 cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOutlined style={{ fontSize: "16px", color: "#1F293B" }} />
                                        ) : (
                                            <EyeInvisibleOutlined style={{ fontSize: "16px", color: "#1F293B" }} />
                                        )}
                                    </p>
                                </div>
                                <div className="flex mt-4 items-center">
                                    <input type="checkbox" className="h-4 w-4 text-blue-600" id="rememberMe" />
                                    <label className="ml-2 block text-sm font-medium text-black" htmlFor="rememberMe">
                                        Remember me
                                    </label>
                                </div>
                                <div className="relative bottom-6 left-52 flex justify-between items-center">
                                    <div>
                                        <Link to="/forgot-Password" className="primary-text text-sm font-medium hover:underline">
                                            Forgot password?
                                        </Link>
                                    </div>
                                </div>
                                <div>
                                    <button type="submit" className="w-11/12 py-1 rounded cursor text-white primary-btn">
                                        Login
                                    </button>
                                </div>
                                <div className="flex gap-4 justify-center pt-4">
                                    {/* <Link className="transform transition-transform duration-200 hover:scale-110">
                                        <img className="w-6 h-6 hover:animate-tilt-shake" src={FacebookLogo} alt="Facebook Logo" />
                                    </Link> */}
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
                                <Link to="/register" className="primary-text hover:underline">
                                    Create account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default LoginPage;
