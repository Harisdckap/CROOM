import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import logo from "../assets/logo.png";
import img from "../assets/reg.png";
import { register } from "../js/api/auth";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        gender: "",
        mobile: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setLoading(true);
            try {
                const response = await register(formData);
                // console.log("Registration response:", response);

                if (response && response.access_token) {
                    const { access_token, user_id } = response;
                    const now = new Date();
                    const expirationTime = now.getTime() + 24 * 60 * 60 * 1000;
                    localStorage.setItem("auth_token", access_token);
                    localStorage.setItem(
                        "auth_token_expiration",
                        expirationTime
                    );
                    localStorage.setItem("user_id", user_id);

                    setTimeout(() => {
                        setLoading(false);
                        navigate("/verifyotp");
                    }, 3000);
                } else {
                    throw new Error("No access token received from the server");
                }
            } catch (error) {
                console.error("Registration error:", error);
                alert("Registration failed. Please try again.");
                setLoading(false);
            }
        } else {
            console.log("Failed to submit the form due to errors.");
        }
    };

    const validateForm = (data) => {
        const errors = {};

        if (!data.name.trim()) errors.name = "Username is required";
        if (!data.email.trim()) errors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(data.email))
            errors.email = "Email is invalid";
        if (!data.gender) errors.gender = "Gender is required";
        if (!data.mobile.trim()) errors.mobile = "Phone number is required";
        else if (data.mobile.length !== 10)
            errors.mobile = "Phone number must be 10 digits";
        if (!data.password.trim()) errors.password = "Password is required";
        else if (data.password.length < 8)
            errors.password = "Password must be at least 8 characters long";

        return errors;
    };

    return (
        <div
            className="min-h-screen"
            style={{ backgroundColor: "rgb(31, 41, 59)" }}
        >
            {/* loader */}
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                   <RotatingLines
                        height="98"
                        width="98"
                        color="blue"
                        wrapperStyle={{}}
                        // secondaryColor="#93C5FD"
                        wrapperClass=""
                        visible={true}
                        ariaLabel='rotating-lines-loading'
                        strokeWidth="3"
                        strokeColor="blue"
                        animationDuration="0.75"
                    />
                </div>
            )}
            {/* navbar */}
            <nav className="w-full bg-gray-100 px-3 py-2">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="w-30 h-10" />
                </div>
            </nav>
            <div className="main flex flex-grow items-center justify-center">
                <div className="bg-gray-100 mt-3 mb-3 rounded-md w-3xl flex">
                    <div className="w-1/2 flex items-center justify-between">
                        <img className="w-full h-auto" src={img} alt="house" />
                    </div>
                    <div className="w-1/2 flex items-center justify-center">
                        <div className="p-4 rounded w-full max-w-md">
                            <h1 className="text-center text-2xl font-bold mb-4">
                                Create your account
                            </h1>
                            {/* registration form */}
                            <form onSubmit={handleSubmit} autoComplete="off">
                                {/* username */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Username:
                                    </label>
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full p-1 border ${
                                            errors.name
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        } rounded-md`}
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && (
                                        <div className="text-red-500 text-sm">
                                            {errors.name}
                                        </div>
                                    )}
                                </div>
                                {/* email */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Email:
                                    </label>
                                    <input
                                        type="email"
                                        className={`mt-1 block w-full p-1 border ${
                                            errors.email
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        } rounded-md`}
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && (
                                        <div className="text-red-500 text-sm">
                                            {errors.email}
                                        </div>
                                    )}
                                </div>
                                {/* gender */}
                                <fieldset className="mb-3 flex items-center gap-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Gender:
                                    </label>
                                    <div className="">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                className={`form-radio ${
                                                    errors.gender
                                                        ? "text-red-500"
                                                        : ""
                                                }`}
                                                name="gender"
                                                value="male"
                                                checked={
                                                    formData.gender === "male"
                                                }
                                                onChange={handleChange}
                                            />
                                            <span className="ml-2">Male</span>
                                        </label>
                                        <label className="inline-flex items-center ml-6">
                                            <input
                                                type="radio"
                                                className={`form-radio ${
                                                    errors.gender
                                                        ? "text-red-500"
                                                        : ""
                                                }`}
                                                name="gender"
                                                value="female"
                                                checked={
                                                    formData.gender === "female"
                                                }
                                                onChange={handleChange}
                                            />
                                            <span className="ml-2">Female</span>
                                        </label>
                                    </div>
                                    {errors.gender && (
                                        <div className="text-red-500 text-sm">
                                            {errors.gender}
                                        </div>
                                    )}
                                </fieldset>
                                {/* phone number */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="mobile"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Phone Number:
                                    </label>
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full p-1 border ${
                                            errors.mobile
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        } rounded-md`}
                                        name="mobile"
                                        id="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                    />
                                    {errors.mobile && (
                                        <div className="text-red-500 text-sm">
                                            {errors.mobile}
                                        </div>
                                    )}
                                </div>
                                {/* password */}
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
                                        className={`mt-1 block w-full p-1 border ${
                                            errors.password
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        } rounded-md`}
                                        name="password"
                                        id="password"
                                        placeholder="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                    <p
                                        className="absolute top-8 right-3 cursor-pointer"
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
                                    {errors.password && (
                                        <div className="text-red-500 text-sm">
                                            {errors.password}
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4">
                                    {!loading && (
                                        <button
                                            type="submit"
                                            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
                                        >
                                            Register
                                        </button>
                                    )}
                                </div>
                            </form>
                            {/* ----- */}
                            <div className="text-center mt-3">
                                <p className="text-sm">
                                    Already have an account?{" "}
                                    <Link
                                        to="/login"
                                        className="text-blue-500 hover:underline"
                                    >
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
