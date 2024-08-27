
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import Auth_navbar from "./RentPageComponent/Auth_navbar";

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        mobile: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [passwordData, setPasswordData] = useState({
        existingPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        showExisting: false,
        showNew: false,
        showConfirm: false,
    });
    const [error, setError] = useState("");

    const user_id = localStorage.getItem("user_id");
    const [profileImage, setProfileImage] = useState(null);

    const authToken = localStorage.getItem("auth_token");
    const tokenExpiration = parseInt(localStorage.getItem("auth_token_expiration"), 10);

    useEffect(() => {
        if (isTokenExpired()) {
            navigate("/login");
            return;
        }

        fetchUserData();
    }, []);

    useEffect(() => {
        const savedImage = localStorage.getItem("profileImage");
        if (savedImage) {
            setProfileImage(savedImage);
        }
    }, []);

    const fetchUserData = async () => {
        if (isTokenExpired()) {
            navigate("/login");
            toast.error("Token expired. Please log in again.");
            return;
        }

        try {
            const response = await axios.get("http://127.0.0.1:8000/api/userDetail", {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            setUser(response.data.user);
            setFormData({
                username: response.data.user.name,
                email: response.data.user.email,
                mobile: response.data.user.mobile,
            });
        } catch (error) {
            toast.error("Failed to fetch user data:", error);
        }
    };

    const isTokenExpired = () => {
        const now = Math.floor(Date.now() / 1000);
        return now > tokenExpiration;
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImage(reader.result);
            localStorage.setItem("profileImage", reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handlePasswordChange = (e) => {
        const { id, value } = e.target;
        setPasswordData({ ...passwordData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, mobile } = formData;
        if (!username || !email || !mobile) {
            toast.error("All fields are required.");
            return;
        }
        setError("");

        const data = new FormData();
        data.append("name", username);
        data.append("email", email);
        data.append("mobile", mobile);
        if (profileImage) {
            data.append("profile_photo", profileImage);
        }

        try {
            await axios.post("http://localhost:8000/api/update-profile", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${authToken}`,
                },
            });
            toast.success("Profile updated successfully.");
            setIsEditing(false);
        } catch (error) {
            toast.error("Error updating profile: " + (error.response ? error.response.data.message : error.message));
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        const { existingPassword, newPassword, confirmNewPassword } = passwordData;
        if (!existingPassword || !newPassword || !confirmNewPassword) {
            toast.error("All password fields are required.");
            return;
        }
        if (newPassword !== confirmNewPassword) {
            toast.error("New passwords do not match.");
            return;
        }
        if (newPassword.length < 8) {
            toast.error("New password must be at least 8 characters long.");
            return;
        }

        const formData = new FormData();
        formData.append("existingPassword", existingPassword);
        formData.append("newPassword", newPassword);
        formData.append("newPassword_confirmation", confirmNewPassword);

        try {
            await axios.post(`http://localhost:8000/api/change-password/${user_id}`, formData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            toast.success("Password changed successfully.");
            setShowPopup(false);
        } catch (error) {
            toast.error("Error changing password: " + (error.response ? error.response.data.message : error.message));
        }
    };

    return (
        <div>
            <Auth_navbar />

            <section className="mt-0 mx-auto dark:bg-gray-900">
                <div className="w-1/2 mx-auto flex gap-0">
                    <div className="w-1/2 mx-auto mt-16 bg-gray-200 absolute top-10 shadow-2xl p-6 rounded-xl h-fit self-center dark:bg-gray-800/40">
                        <div>
                            <h1 className="lg:text-2xl md:text-xl sm:text-xl xs:text-lg font-serif font-extrabold mb-2 dark:text-white">
                                Profile
                            </h1>
                            <div className="flex align-center justify-center">
                                {error && (
                                    <p className="text-red-600 w-60 flex align-center justify-center text-center rounded-md fixed bg-red-300 mb-4">
                                        {error}
                                    </p>
                                )}
                            </div>
                            <div className="flex justify-between items-center">
                                <div
                                    className="w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat"
                                    style={{
                                        backgroundImage: `url(${
                                            profileImage ||
                                            "https://mighty.tools/mockmind-api/content/cartoon/32.jpg"
                                        })`,
                                    }}
                                >
                                    <div className="bg-white/90 rounded-full w-6 h-6 text-center ml-24 mt-28">
                                        <input
                                            type="file"
                                            name="profile"
                                            id="upload_profile"
                                            hidden
                                            onChange={handleImageUpload}
                                            required
                                        />
                                        <label htmlFor="upload_profile">
                                            <svg
                                                data-slot="icon"
                                                className="w-6 h-5 text-blue-700"
                                                fill="none"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                                                ></path>
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                                                ></path>
                                            </svg>
                                        </label>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        type="button"
                                        className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        onClick={() => setIsEditing(!isEditing)}
                                    >
                                        {isEditing ? "Cancel" : "Edit"}
                                    </button>
                                    {isEditing && (
                                        <button
                                            type="submit"
                                            className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            onClick={handleSubmit}
                                        >
                                            Save
                                        </button>
                                    )}
                                </div>
                            </div>
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-4"
                            >
                                <label htmlFor="username">
                                    Username
                                    <input
                                        type="text"
                                        id="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="block w-full mt-1 p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                                    />
                                </label>
                                <label htmlFor="email">
                                    Email
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="block w-full mt-1 p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                                    />
                                </label>
                                <label htmlFor="mobile">
                                    Mobile
                                    <input
                                        type="text"
                                        id="mobile"
                                        value={formData.mobile}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="block w-full mt-1 p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                                    />
                                </label>
        
            <ToastContainer />
                            </form>
                            <button
                                type="button"
                                className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                onClick={() => setShowPopup(true)}
                            >
                                Change Password
                            </button>
                            {showPopup && (
                                <div className="fixed inset-0 flex items-center justify-center">
                                    <div className="bg-white  p-6 rounded-lg shadow-lg dark:bg-gray-800">
                                        <h2 className="text-lg font-semibold mb-4 dark:text-white">
                                            Change Password
                                        </h2>
                                        <form onSubmit={handlePasswordSubmit}>
                                            <div className="mb-4">
                                                <label
                                                    htmlFor="existingPassword"
                                                    className="block text-sm font-medium dark:text-white"
                                                >
                                                    Existing Password
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type={passwordData.showExisting ? "text" : "password"}
                                                        id="existingPassword"
                                                        value={passwordData.existingPassword}
                                                        onChange={handlePasswordChange}
                                                        className="block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                                                        required
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setPasswordData({
                                                            ...passwordData,
                                                            showExisting: !passwordData.showExisting
                                                        })}
                                                        className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
                                                    >
                                                        {passwordData.showExisting ? (
                                                            <EyeOutlined />
                                                        ) : (
                                                            <EyeInvisibleOutlined />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    htmlFor="newPassword"
                                                    className="block text-sm font-medium dark:text-white"
                                                >
                                                    New Password
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type={passwordData.showNew ? "text" : "password"}
                                                        id="newPassword"
                                                        value={passwordData.newPassword}
                                                        onChange={handlePasswordChange}
                                                        className="block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                                                        required
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setPasswordData({
                                                            ...passwordData,
                                                            showNew: !passwordData.showNew
                                                        })}
                                                        className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
                                                    >
                                                        {passwordData.showNew ? (
                                                            <EyeOutlined />
                                                        ) : (
                                                            <EyeInvisibleOutlined />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    htmlFor="confirmNewPassword"
                                                    className="block text-sm font-medium dark:text-white"
                                                >
                                                    Confirm New Password
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type={passwordData.showConfirm ? "text" : "password"}
                                                        id="confirmNewPassword"
                                                        value={passwordData.confirmNewPassword}
                                                        onChange={handlePasswordChange}
                                                        className="block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                                                        required
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setPasswordData({
                                                            ...passwordData,
                                                            showConfirm: !passwordData.showConfirm
                                                        })}
                                                        className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
                                                    >
                                                        {passwordData.showConfirm ? (
                                                            <EyeOutlined />
                                                        ) : (
                                                            <EyeInvisibleOutlined />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPopup(false)}
                                                    className="px-4 py-2 bg-gray-200 rounded-lg dark:bg-gray-600 dark:text-white"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                                                >
                                                    Change Password
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Profile;
