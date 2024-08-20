import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"; 
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "./ContextProvider"; 

const AppContext = createContext();

const MyContextProvider = ({ children }) => {
    const params = useParams();
    const navigate = useNavigate();
    const { auth } = useStateContext();  //getting auth token from ContextProvider
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
