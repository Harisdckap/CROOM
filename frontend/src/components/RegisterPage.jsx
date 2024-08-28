import React, { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { useNavigate, Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import img from "../assets/reg.png";
import { register } from "../js/api/auth";
import { EyeOutlined, EyeInvisibleOutlined, CheckOutlined } from "@ant-design/icons";
import Auth_navbar from "./RentPageComponent/Auth_navbar";

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        gender: "",
        mobile: "",
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");

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
                if (error.response && error.response.status === 409) {
                    setServerError(
                        error.response.data.message &&
                            "Email is already registered. Please log in."
                    );
                } else {
                    setServerError("Registration failed. Please try again.");
                }
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
            errors.mobile = "Phone must be 10 number";
        if (!data.password.trim()) errors.password = "Password is required";
        else if (data.password.length < 8 || !/[A-Z]/.test(data.password) || !/[0-9]/.test(data.password) || !/[!@#$%^&*]/.test(data.password))
            console.log(errors.password = "It is not strong password");
        if (!data.password_confirmation.trim())
            errors.password_confirmation = "Confirm Password is required";
        else if (data.password !== data.password_confirmation)
            errors.password_confirmation = "Passwords do not match";

        return errors;
    };

    // password tooltip
    useEffect(() => {
        if (formData.password && !errors.password) {
            setIsTooltipOpen(false);
        } else if (formData.password && errors.password) {
            setIsTooltipOpen(true);
        } else {
            setIsTooltipOpen(false);
        }
    }, [formData.password, errors.password]);

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
                        wrapperClass=""
                        visible={true}
                        ariaLabel="rotating-lines-loading"
                        strokeWidth="3"
                        strokeColor="blue"
                        animationDuration="0.75"
                    />
                </div>
            )}
            {/* navbar */}
            <Auth_navbar />

            <div className="main flex flex-grow items-center justify-center">
                <div className="bg-gray-100 mt-20 rounded-md max-w-3xl flex">
                    <div className="w-1/2 flex items-center justify-between">
                        <img className="w-full h-auto" src={img} alt="house" />
                    </div>
                    <div className="w-1/2 flex items-center justify-center">
                        <div className="p-4 rounded w-full max-w-md">
                            <h1 className="text-center text-2xl font-bold">
                                Create your account
                            </h1>
                            {/* servererror */}
                            {serverError && (
                                <div className="bg-red-300 rounded-sm p-1 text-center text-red-500">
                                    {serverError}
                                </div>
                            )}

                            {/* registration form */}
                            <form onSubmit={handleSubmit} autoComplete="off">
                                {/* username */}
                                <div className="mb-3">
                                    {errors.name && (
                                        <div className="text-red-500 ml-52 text-sm fixed">
                                            {errors.name}
                                        </div>
                                    )}
                                    <label
                                        htmlFor="name"
                                        className="block text-sm mt-4 font-medium text-gray-700"
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
                                        placeholder="Username"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                {/* email */}
                                <div className="mb-3">
                                    {errors.email && (
                                        <div className="text-red-500 fixed ml-60 text-sm">
                                            {errors.email}
                                        </div>
                                    )}
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
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
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
                                            <span className="ml-1">Male</span>
                                        </label>
                                        <label className="inline-flex items-center ml-4">
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
                                            <span className="ml-1">Female</span>
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
                                    {errors.mobile && (
                                        <div className="text-red-500 fixed ml-44 text-sm">
                                            {errors.mobile}
                                        </div>
                                    )}
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
                                        placeholder="Phone Number"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                    />
                                </div>
                                {/* password */}
                                <div className="mb-3 relative">
                                    {errors.password && (
                                        <div className="text-red-500 fixed ml-44 text-sm">
                                            {errors.password}
                                        </div>
                                    )}
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Password:
                                    </label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className={`mt-1 block w-full p-1 border ${
                                            errors.password
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        } rounded-md`}
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        onFocus={() => setIsTooltipOpen(true)}
                                        onBlur={() => setIsTooltipOpen(false)}
                                    />
                                    <span
                                        className="absolute top-10 right-2 transform -translate-y-1/2 cursor-pointer"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOutlined />
                                        ) : (
                                            <EyeInvisibleOutlined />
                                        )}
                                    </span>
                                    {isTooltipOpen && errors.password && (
                                        <Tooltip
                                            anchorId="password"
                                            place="right"
                                            variant="info"
                                            className="tooltip-style"
                                            isOpen={isTooltipOpen}
                                            closeOnMouseLeave={false}
                                        >
                                            <div>
                                                Password must contain:
                                                <ul className="list-disc ml-4">
                                                    <li>
                                                        At least 8 characters
                                                    </li>
                                                    <li>
                                                        At least one uppercase
                                                        letter
                                                    </li>
                                                    <li>At least one number</li>
                                                    <li>
                                                        At least one special
                                                        character
                                                    </li>
                                                </ul>
                                            </div>
                                        </Tooltip>
                                    )}
                                </div>
                                {/* confirm password */}
                                <div className="mb-3 relative">
                                    {errors.password_confirmation && (
                                        <div className="text-red-500 fixed ml-40 text-sm">
                                            {errors.password_confirmation}
                                        </div>
                                    )}
                                    <label
                                        htmlFor="password_confirmation"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Confirm Password:
                                    </label>
                                    <input
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        className={`mt-1 block w-full p-1 border ${
                                            errors.password_confirmation
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        } rounded-md`}
                                        name="password_confirmation"
                                        id="password_confirmation"
                                        placeholder="Confirm Password"
                                        value={formData.password_confirmation}
                                        onChange={handleChange}
                                    />
                                    <span
                                        className="absolute top-10 right-2 transform -translate-y-1/2 cursor-pointer"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOutlined />
                                        ) : (
                                            <EyeInvisibleOutlined />
                                        )}
                                    </span>
                                </div>
                                <button
                                    type="submit"
                                    className="inline-flex flex justify-center items-center px-4 py-2 mt-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white  primary-btn hover:bg-blue-900 focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Register
                                </button>
                                <div className="mt-4 text-center">
                                    <Link
                                        to="/login"
                                        className="text-blue-500"
                                    >
                                        Already have an account? Log in
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;