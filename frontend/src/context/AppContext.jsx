import React, { createContext, useContext, useEffect, useState } from "react";
// import axiosClient from "../axios-client";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AppContext = createContext();

const MyContextProvider = ({ children }) => {
    const params = useParams();
    const navigate = useNavigate();
    const [userDetail, setUserDetail] = useState(null);

    useEffect(() => {
        userInfo();
    }, []);

    const userInfo = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/userDetail", {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            
            setUserDetail(response.data.user); 
            // console.log(response.data.user); 
        } catch (error) {
            console.error("Error fetching user detail:", error);
        }
    };

    return (
        <AppContext.Provider
            value={{
                userDetail,
                userInfo,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

const useMyContext = () => {
    return useContext(AppContext);
};

export { MyContextProvider, useMyContext };
