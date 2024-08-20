import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStateContext } from './context/ContextProvider';

const ProtectedRoute = ({ children }) => {
    const { auth } = useStateContext();

    if (auth) {
        //preventing navigation to login page by rendering nothing/the current page
        return null; 
    }

    return children;
};

export default ProtectedRoute;
