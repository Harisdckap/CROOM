import axios from "axios";
// import Cookies from 'js-cookie';

// // Retrieve CSRF token from meta tag
// const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

// // Set CSRF token in Axios headers
// axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

// API base URL
const API_URL = "http://127.0.0.1:8000/api";

export const register = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/register`, data);
        return response.data;
    } catch (error) {
        console.error(
            "Register Error:",
            error.response ? error.response.data : error.message
        );
        throw error;
    }
};

export const googleLogin = async () => {
    try {
        // const response = await axios.get("http://localhost:8000/auth/google");
        window.location.href = "http://localhost:8000/auth/google";
        return response;
    } catch (error) {
        console.error(
            "Google login Error:",
            error.response ? error.response.data : error.message
        );
        throw error;
    }
};

export const login = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/login`, data);
        return response.data;
    } catch (error) {
        console.error(
            "Login Error:",
            error.response ? error.response.data : error.message
        );
        throw error;
    }
};

export const verifyOtp = async (otp) => {
    try {
        const response = await axios.post(`${API_URL}/verify-otp`, { otp });
        return response.data;
    } catch (error) {
        console.error("OTP verification error:", error.response.data);
        throw error.response.data;
    }
};

export const getUserDetails = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/details`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(
            "Get User Details Error:",
            error.response ? error.response.data : error.message
        );
        throw error;
    }
};

// forgotPassword

export const forgotPassword = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/forgot-password`, data);
        return response.data;
    } catch (error) {
        console.error("Error in forgotPassword:", error);
        throw error;
    }
};

export const resetPassword = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/reset-password`, data);
        return response.data;
    } catch (error) {
        console.error("Error in resetPassword:", error);
        throw error;
    }
};

// Rents houses crud api

// Fetch listings
export const fetchListings = async () => {
    try {
        const response = await axios.get(`${API_URL}/listings`);
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching listings:", error);
    }
};

// Create a new listing
export const createListing = async (listingData) => {
    try {
        const response = await axios.post(`${API_URL}/listings`, listingData);
        console.log(response.data);
    } catch (error) {
        console.error("Error creating listing:", error);
    }
};

// Fetch a specific listing
export const fetchListing = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/listings/${id}`);
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching listing:", error);
    }
};

// Update a listing
export const updateListing = async (id, listingData) => {
    try {
        const response = await axios.put(
            `${API_URL}/listings/${id}`,
            listingData
        );
        console.log(response.data);
    } catch (error) {
        console.error("Error updating listing:", error);
    }
};

// Delete a listing
export const deleteListing = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/listings/${id}`);
        console.log(response.data);
    } catch (error) {
        console.error("Error deleting listing:", error);
    }
};
