import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "./ContextProvider";

const AppContext = createContext();

const MyContextProvider = ({ children }) => {
    const params = useParams();
    const navigate = useNavigate();
    const { auth } = useStateContext(); 
    const [userDetail, setUserDetail] = useState(null);

    useEffect(() => {
        if (auth) {
            userInfo();
        }
    }, [auth]);

    const userInfo = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/userDetail", {
                headers: {
                    Authorization: `Bearer ${auth}`
                }
            });

            setUserDetail(response.data.user);
        } catch (error) {
            console.error("Error fetching user detail:", error);
        }
    };

    return (
        <AppContext.Provider
            value={{
                userDetail,
                userInfo,
                isAdmin: () => {
                    return userDetail && (userDetail.user_type === 1 || userDetail.user_type === 2);
                }
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

const useMyContext = () => {
    const context = useContext(AppContext);

    // Ensure the context is not undefined and provides default values
    if (!context) {
        throw new Error("useMyContext must be used within a MyContextProvider");
    }

    return context;
};

export { MyContextProvider, useMyContext };
