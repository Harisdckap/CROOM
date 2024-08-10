import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
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
    const authToken = localStorage.getItem("auth_token");

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        const savedImage = localStorage.getItem("profileImage");
        if (savedImage) {
            setProfileImage(savedImage);
        }
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/userDetail", {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            setUser(response.data.user);
            setFormData({
                username: response.data.user.username,
                email: response.data.user.email,
                mobile: response.data.user.mobile,
            });
        } catch (error) {
            console.error("Error fetching user detail:", error);
            setError("Unable to fetch user details. Please try again later.");
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) {
            setError("No file selected.");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImage(reader.result);
            localStorage.setItem("profileImage", reader.result);
        };

        reader.readAsDataURL(file);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handlePasswordChange = (e) => {
        const { id, value } = e.target;
        setPasswordData({ ...passwordData, [id]: value });
    };

    const validateProfileForm = () => {
        const { username, email, mobile } = formData;
        if (!username || !email || !mobile) {
            setError("All fields are required.");
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address.");
            return false;
        }
        if (!/^\d{10}$/.test(mobile)) {
            setError("Please enter a valid 10-digit mobile number.");
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateProfileForm()) return;

        const data = new FormData();
        data.append("username", formData.username);
        data.append("email", formData.email);
        data.append("mobile", formData.mobile);
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
                setError("Error updating profile: " + (error.response ? error.response.data : error.message));
            });
    };

    const validatePasswordChange = () => {
        const { existingPassword, newPassword, confirmNewPassword } = passwordData;
        if (!existingPassword || !newPassword || !confirmNewPassword) {
            alert("All password fields are required.");
            return false;
        }
        if (newPassword !== confirmNewPassword) {
            alert("New passwords do not match.");
            return false;
        }
        if (newPassword.length < 8) {
            alert("New password must be at least 8 characters long.");
            return false;
        }
        return true;
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (!validatePasswordChange()) return;

        const data = {
            current_password: passwordData.existingPassword,
            new_password: passwordData.newPassword,
            new_password_confirmation: passwordData.confirmNewPassword,
        };

        axios
            .post("http://localhost:8000/api/change-password", data, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((response) => {
                alert("Password changed successfully.");
                setShowPopup(false);
                setPasswordData({
                    existingPassword: "",
                    newPassword: "",
                    confirmNewPassword: "",
                    showExisting: false,
                    showNew: false,
                    showConfirm: false,
                });
            })
            .catch((error) => {
                alert("Error changing password: " + (error.response ? error.response.data : error.message));
            });
    };

    return (
        <div>
            <nav className="bg-gray-100 px-3 py-4">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="w-20 h-auto" />
                </div>
            </nav>
            <section className="mt-0 mx-auto dark:bg-gray-900">
                <div className="lg:w-[54%] md:w-[54%] xs:w-[54%] mx-auto flex gap-0">
                    <div className="xs:w-[54%] md:w-[54%] mx-auto mt-20 bg-gray-200 absolute top-10 shadow-2xl p-6 rounded-xl h-fit self-center dark:bg-gray-800/40">
                        <div>
                            <h1 className="lg:text-2xl md:text-xl sm:text-xl xs:text-lg font-serif font-extrabold mb-2 dark:text-white">
                                Profile
                            </h1>
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
                                <div className="pt-10 pb-5">
                                    <button
                                        className="p-2 font-semibold rounded-lg bg-gray-300 hover:bg-gray-400 hover:shadow-lg hover:font-extrabold dark:bg-gray-500 dark:text-white"
                                        onClick={() => setIsEditing(!isEditing)}
                                    >
                                        {isEditing ? "Cancel" : "Edit"}
                                    </button>
                                </div>
                            </div>
                            {error && (
                                <p className="text-red-500 text-center">{error}</p>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label
                                        className="block font-bold text-gray-700 dark:text-white"
                                        htmlFor="username"
                                    >
                                        Username:
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        className="w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="block font-bold text-gray-700 dark:text-white"
                                        htmlFor="email"
                                    >
                                        Email:
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="block font-bold text-gray-700 dark:text-white"
                                        htmlFor="mobile"
                                    >
                                        Mobile:
                                    </label>
                                    <input
                                        type="text"
                                        id="mobile"
                                        className="w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                                        value={formData.mobile}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>
                                {isEditing && (
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-700"
                                        >
                                            Save
                                        </button>
                                    </div>
                                )}
                            </form>
                            <div className="mt-4 flex justify-end">
                                <button
                                    className="text-blue-500 font-semibold"
                                    onClick={() => setShowPopup(true)}
                                >
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-[41%] mt-20"></div>
                </div>
            </section>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-8 dark:bg-gray-800">
                        <h2 className="text-xl font-bold mb-4 dark:text-white">Change Password</h2>
                        <form onSubmit={handlePasswordSubmit}>
                            <div className="mb-4">
                                <label className="block font-bold text-gray-700 dark:text-white" htmlFor="existingPassword">
                                    Existing Password:
                                </label>
                                <div className="relative">
                                    <input
                                        type={passwordData.showExisting ? "text" : "password"}
                                        id="existingPassword"
                                        className="w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                                        value={passwordData.existingPassword}
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                    <div
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                                        onClick={() => setPasswordData((prevState) => ({ ...prevState, showExisting: !prevState.showExisting }))}
                                    >
                                        {passwordData.showExisting ? (
                                            <EyeOutlined className="text-gray-400 dark:text-gray-500" />
                                        ) : (
                                            <EyeInvisibleOutlined className="text-gray-400 dark:text-gray-500" />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block font-bold text-gray-700 dark:text-white" htmlFor="newPassword">
                                    New Password:
                                </label>
                                <div className="relative">
                                    <input
                                        type={passwordData.showNew ? "text" : "password"}
                                        id="newPassword"
                                        className="w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                    <div
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                                        onClick={() => setPasswordData((prevState) => ({ ...prevState, showNew: !prevState.showNew }))}
                                    >
                                        {passwordData.showNew ? (
                                            <EyeOutlined className="text-gray-400 dark:text-gray-500" />
                                        ) : (
                                            <EyeInvisibleOutlined className="text-gray-400 dark:text-gray-500" />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block font-bold text-gray-700 dark:text-white" htmlFor="confirmNewPassword">
                                    Confirm New Password:
                                </label>
                                <div className="relative">
                                    <input
                                        type={passwordData.showConfirm ? "text" : "password"}
                                        id="confirmNewPassword"
                                        className="w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                                        value={passwordData.confirmNewPassword}
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                    <div
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                                        onClick={() => setPasswordData((prevState) => ({ ...prevState, showConfirm: !prevState.showConfirm }))}
                                    >
                                        {passwordData.showConfirm ? (
                                            <EyeOutlined className="text-gray-400 dark:text-gray-500" />
                                        ) : (
                                            <EyeInvisibleOutlined className="text-gray-400 dark:text-gray-500" />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-700"
                                >
                                    Change Password
                                </button>
                                <button
                                    type="button"
                                    className="px-4 py-2 ml-2 font-semibold text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400"
                                    onClick={() => setShowPopup(false)}
                                >
                                    Cancel
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
