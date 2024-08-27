import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import OTPPage from "./components/OTPPage";
import ForgetPasswordPage from "./components/ForgotPasswordPage";
import ResetPasswordPage from "./components/ResetPasswordPage";
import NeedRoomForm from "./components/RentPageComponent/Add_Room_Form";
import NeedRoomate from "./components/RentPageComponent/Add_Roomate_Form";
import Add_PG from "./components/RentPageComponent/Add_Pg_Form";
import PostRequirementPage from "./components/PostRequirementPage";
import PropertyPage from "./components/RentPageComponent/property";
import PropertyDetail from "./components/RentPageComponent/PropertyDetail";
import PlanPage from "./components/RentPageComponent/PlanPage";
import Profile from "./components/User";
import UserAdsComponent from "./components/UserAdsComponent";
import CountryDropdown from "./components/RentPageComponent/CountryDropdown";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/verifyotp" element={<OTPPage />} />
                <Route
                    path="/forgot-password"
                    element={<ForgetPasswordPage />}
                />
                <Route path="/password/reset" element={<ResetPasswordPage />} />
                <Route path="/NeedRoomForm" element={<NeedRoomForm />} />
                <Route path="/NeedRoomateForm" element={<NeedRoomate />} />
                <Route path="/PgForm" element={<Add_PG />} />

                <Route
                    path="/PostRequirementPage"
                    element={<PostRequirementPage />}
                />
                <Route path="/property" element={<PropertyPage />} />
                <Route
                    path="/property/:id/:location/:listingType"
                    element={<PropertyDetail />}
                />

                <Route path="/PlanPage" element={<PlanPage />} />
                <Route path="/profile" element={<Profile />} />
                {/* <Route path="/my-ads" element={<UserAds />} /> */}
                <Route path="/country-dropdown" element={<CountryDropdown />} />
                {/* <Route path="/user-ads" element={<UserAdsPage />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
