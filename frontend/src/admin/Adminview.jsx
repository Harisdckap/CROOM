import React, { useEffect, useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import axios from "axios";

import AdminSideBar from "./AdminSideBar";

import Navbar from "./Navbar";

import User from "./User";

const AdminView = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(true);

    useEffect(() => {
        const checkAdminAccess = async () => {
            const authToken = localStorage.getItem("auth_token");
            if (authToken) {
                try {
                    const response = await axios.get(
                        "http://127.0.0.1:8000/api/userDetail",
                        {
                            headers: {
                                Authorization: `Bearer ${authToken}`,
                            },
                        }
                    );
                    if (response.data.user.user_type == 1) {
                        setIsAdmin(true);
                    } else {
                        navigate("/access-denied");
                    }
                } catch (error) {
                    // console.error("Error verifying admin role:", error);
                    // navigate("/access-denied");
                }
            } else {
                navigate("/access-denied");
            }
        };

        checkAdminAccess();
    }, [navigate]);

    if (!isAdmin) {
        return null; //or a loading spinner while checking
    }

    return (
        <>
            <div className="h-full flex-1">
                <div>
                    <AdminSideBar />
                </div>

                <div className="flex-1  ml-56">
                    <Navbar />
                    <div className="maincontent h-full  bg-adminbg flex-1 ">
                        <Routes>
                            <Route path="/" element={<User />} />

                            <Route path="/users/*" element={<User />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminView;
