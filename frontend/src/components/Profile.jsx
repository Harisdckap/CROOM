import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";

const Profile = () => {
    const [user, setUser] = useState(null);
    const authToken = localStorage.getItem("auth_token");
    useEffect(()=> {
        fetchUser()
    },[]);
    const fetchUser = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/userDetail", {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            
            setUser(response.data.user); 
            console.log("==========user detail===========");
            console.log(response.data.user); 
        } catch (error) {
            console.error("Error fetching user detail:", error);
        }
    };
    

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
                            {/* profile image */}
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
                                <div className="w-28 h-10 rounded-xl bg-blue-500 text-white text-base font-semibold">
                                    <button
                                        type="submit"
                                        className="p-2 ml-6 mx-auto hover:bg-blue-400 text-center rounded-xl"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                            <form>
                                {/* username */}
                                <div className="flex justify-between items-center mb-4">
                                    <label
                                        htmlFor="username"
                                        className="block text-md font-medium text-gray-700"
                                    >
                                        User Name
                                    </label>
                                    <input
                                        type="text"
                                        className="mt-2 p-1 w-96 border-2 border-blue-200 rounded-lg dark:text-gray-200 dark:border-blue-600 dark:bg-blue-800"
                                        placeholder="First Name"
                                        id="username"
                                    />
                                </div>
                                {/* email */}
                                <div className="flex justify-between items-center mb-4">
                                    <label
                                        htmlFor="email"
                                        className="block text-md font-medium text-gray-700"
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        className="mt-2 p-1 w-96 border-2 border-blue-200 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                        placeholder="Email Address"
                                        id="email"
                                    />
                                </div>
                                {/* mobile number */}
                                <div className="flex justify-between items-center mb-4">
                                    <label
                                        htmlFor="password"
                                        className="block text-md font-medium text-gray-700"
                                    >
                                        Contact Number
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Contact Number"
                                        className="mt-2 p-1 w-96 border-2 border-blue-200 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                        id="password"
                                    />
                                </div>
                                {/* gender */}
                                <div className="flex justify-between items-center mb-4">
                                    <label
                                        htmlFor="gender"
                                        className="block text-md font-medium text-gray-700"
                                    >
                                        Gender
                                    </label>
                                    <select
                                        className="w-96 mb-2 mt-1 p-1 border-2 border-blue-200 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                        id="gender"
                                    >
                                        <option disabled value="">
                                            Select Gender
                                        </option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Profile;
