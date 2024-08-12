import { useContext } from "react";
import { createContext, useState } from "react";

const StateContext = createContext({
    auth: null,
    setAuth: () =>{},
})
export const ContextProvider = ({children}) => {

    const [auth, _setAuth] = useState(localStorage.getItem('auth_token'));
    
    const setAuth = (auth) => {
        _setAuth(auth)
        if(auth.token){
        // console.log(auth,"ok");

            localStorage.setItem('auth_token',auth.token);
        }
        else{
            localStorage.removeItem('auth_token');
        }
    }
    return(
        <StateContext.Provider value={{ 
            auth,
            setAuth,
         }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)