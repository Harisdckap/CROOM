import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import { Tooltip } from "react-tooltip";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import Auth_navbar from "./RentPageComponent/Auth_navbar";

const Profile = () => {
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
    });
    const [error, setError] = useState("");
    const authToken = localStorage.getItem("auth_token");

    useEffect(() => {
        fetchUser();
    }, []);

    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        const savedImage = localStorage.getItem("profileImage");
        if (savedImage) {
            setProfileImage(savedImage);
        }
    }, []);

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

    const fetchUser = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/userDetail",
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            setUser(response.data.user);
            console.log(response.data.user);
            
            setFormData({
                username: response.data.user.username,
                email: response.data.user.email,
                mobile: response.data.user.mobile,
            });
        } catch (error) {
            console.error("Error fetching user detail:", error);
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
    password
    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, email, mobile } = formData;
        if (!username || !email || !mobile) {
            setError("All fields are required.");
            return;
        }
        setError("");

        const data = new FormData();
        data.append("username", username);
        data.append("email", email);
        data.append("mobile", mobile);
        if (profileImage) {
            data.append("profile_photo", profileImage);
        }

        axios
            .post("http://localhost:8000/api/update-profile", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((response) => {
                alert("Profile updated successfully.");
                setIsEditing(false);
            })
            .catch((error) => {
                setError(
                    "Error updating profile: " +
                        (error.response ? error.response.data : error.message)
                );
            });
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        const { existingPassword, newPassword, confirmNewPassword } =
            passwordData;
        if (!existingPassword || !newPassword || !confirmNewPassword) {
            alert("All password fields are required.");
            return;
        }
        if (newPassword !== confirmNewPassword) {
            alert("New passwords do not match.");
            return;
        }
        if (newPassword.length < 8) {
            alert("New password must be at least 8 characters long.");
            return;
        }

        axios
            .post("http://localhost:8000/api/change-password", passwordData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((response) => {
                alert("Password changed successfully.");
                setShowPopup(false);
            })
            .catch((error) => {
                alert(
                    "Error changing password: " +
                        (error.response ? error.response.data : error.message)
                );
            });
    };

    return (
        <div>
            {/* navbar  */}
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
                                <div className="flex space-x-4">
                                    <div className="w-28 h-10 rounded-xl text-center bg-red-500 text-white text-base font-semibold">
                                        <button
                                            type="button"
                                            className="p-2 mx-auto rounded-xl"
                                            onClick={() =>
                                                setIsEditing(!isEditing)
                                            }
                                        >
                                            {isEditing ? "Cancel" : "Edit"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full">
                                <form onSubmit={handleSubmit} className="mt-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <label
                                            htmlFor="username"
                                            className=" text-md font-medium text-gray-700"
                                        >
                                            User Name
                                        </label>
                                        <input
                                            type="text"
                                            id="username"
                                            autoComplete="off"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className={`p-2 border rounded-lg w-5/6 ${
                                                isEditing
                                                    ? "border-gray-300"
                                                    : "bg-gray-100"
                                            }`}
                                        />
                                    </div>
                                    <div className="flex justify-between items-center mb-4">
                                        <label
                                            htmlFor="email"
                                            className="block text-md font-medium text-gray-700"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            autoComplete="off"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className={`p-2 border rounded-lg w-5/6 ${
                                                isEditing
                                                    ? "border-gray-300"
                                                    : "bg-gray-100"
                                            }`}
                                        />
                                    </div>
                                    <div className="flex justify-between items-center mb-4">
                                        <label
                                            htmlFor="mobile"
                                            className="block text-md font-medium text-gray-700"
                                        >
                                            Mobile
                                        </label>
                                        <input
                                            type="tel"
                                            id="mobile"
                                            autoComplete="off"
                                            value={formData.mobile}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className={`p-2 border rounded-lg w-5/6 ${
                                                isEditing
                                                    ? "border-gray-300"
                                                    : "bg-gray-100"
                                            }`}
                                        />
                                    </div>
                                </form>
                            </div>
                            <button
                                className="mb-3 text-blue-500"
                                onClick={() => setShowPopup(true)}
                            >
                                Change Password
                            </button>
                        </div>
                        {isEditing && (
                            <div className="flex justify-between items-center">
                                <button
                                    type="submit"
                                    className="w-28 h-10 rounded-xl text-center bg-blue-500 text-white text-base font-semibold"
                                >
                                    Save
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Password Change Popup */}
            {showPopup && (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white p-4 rounded-lg shadow-lg w-96">
            <h2 className="text-lg text-center font-bold mb-4">Change Password</h2>
            <form onSubmit={handlePasswordSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="existingPassword"
                        className="block text-md font-medium text-gray-700"
                    >
                        Existing Password
                    </label>
                    <input
                        type={passwordData.showExisting ? "text" : "password"}
                        id="existingPassword"
                        autoComplete="off"
                        value={passwordData.existingPassword}
                        onChange={handlePasswordChange}
                        className="p-2 border rounded-lg w-full"
                        title="Enter your existing password"
                    />
                    <button
                        type="button"
                        onClick={() =>
                            setPasswordData({
                                ...passwordData,
                                showExisting: !passwordData.showExisting,
                            })
                        }
                    >
                        <div className="relative bottom-8 left-80">
                            {passwordData.showExisting ? (
                                <EyeOutlined />
                            ) : (
                                <EyeInvisibleOutlined />
                            )}
                        </div>
                    </button>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="newPassword"
                        className="block text-md font-medium text-gray-700"
                    >
                        New Password
                    </label>
                    <input
                        type={passwordData.showNew ? "text" : "password"}
                        id="newPassword"
                        autoComplete="off"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="p-2 border rounded-lg w-full"
                        title="Enter your new password"
                    />
                    <button
                        type="button"
                        onClick={() =>
                            setPasswordData({
                                ...passwordData,
                                showNew: !passwordData.showNew,
                            })
                        }
                    >
                        <div className="relative bottom-8 left-80">
                            {passwordData.showNew ? (
                                <EyeOutlined />
                            ) : (
                                <EyeInvisibleOutlined />
                            )}
                        </div>
                    </button>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="confirmNewPassword"
                        className="block text-md font-medium text-gray-700"
                    >
                        Confirm New Password
                    </label>
                    <input
                        type={passwordData.showConfirm ? "text" : "password"}
                        id="confirmNewPassword"
                        autoComplete="off"
                        value={passwordData.confirmNewPassword}
                        onChange={handlePasswordChange}
                        className="p-2 border rounded-lg w-full"
                        title="Re-enter your new password"
                    />
                    <button
                        type="button"
                        onClick={() =>
                            setPasswordData({
                                ...passwordData,
                                showConfirm: !passwordData.showConfirm,
                            })
                        }
                    >
                        <div className="relative bottom-8 left-80">
                            {passwordData.showConfirm ? (
                                <EyeOutlined />
                            ) : (
                                <EyeInvisibleOutlined />
                            )}
                        </div>
                    </button>
                </div>
                <div className="flex justify-between mt-4">
                    <button
                        type="submit"
                        className="w-40 h-10 rounded-md text-center bg-blue-500 text-white text-base font-bold"
                    >
                        Change Password
                    </button>
                    <button
                        className="w-40 bg-red-600 rounded-md text-white text-red-500 font-bold"
                        onClick={() => setShowPopup(false)}
                    >
                        Close
                    </button>
                </div>
            </form>
        </div>
    </div>
)}
        </div>
    );
};

export default Profile;
