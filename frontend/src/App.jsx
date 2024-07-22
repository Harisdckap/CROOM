import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import OTPPage from './components/OTPPage';
import ForgetPasswordPage from './components/ForgotPasswordPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import ListingPage from './components/RentPageComponent/ListingPage'
import PrivateRoute from './components/PrivateRoute';
import AddHouse from './components/RentPageComponent/addListingForm';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/verifyotp" element={<OTPPage />} />
                <Route path="/forgot-password" element={<ForgetPasswordPage />} />
                <Route path="/password/reset" element={<ResetPasswordPage />} />
                <Route path="/rentlisting" element={<PrivateRoute><ListingPage /></PrivateRoute>} />
                <Route path="/addHouse" element={<AddHouse />} />
            </Routes>
        </Router>
    );
}

export default App;