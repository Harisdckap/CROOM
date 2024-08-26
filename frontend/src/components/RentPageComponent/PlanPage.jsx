import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import PlanCard from "./PlanCard";
import { FaTimes } from "react-icons/fa"; 

const PlansPage = () => {
    const navigate = useNavigate();
    const [plans, setPlans] = useState([
        {
            id: 1,
            name: "Basic Plan",
            price: "₹1000",
            duration: "month",
            features: [
                "Access to basic listings",
                "Email support",
                "Limited access to amenities",
            ],
            icon: "fa-leaf",
        },
        {
            id: 2,
            name: "Standard Plan",
            price: "₹2000",
            duration: "month",
            features: [
                "Access to standard listings",
                "Access to common amenities",
                "Monthly newsletters",
            ],
            icon: "fa-gem",
        },
        {
            id: 3,
            name: "Premium Plan",
            price: "₹3000",
            duration: "month",
            features: [
                "Access to all listings",
                "24/7 customer support",
                "Premium support",
            ],
            icon: "fa-crown",
        },
    ]);

    const handleClose = () => {
        navigate(-1);
        // Handle the close action (e.g., navigate away, hide content, etc.)
        console.log("Page closed or content hidden");
    };

    return (
        <div className="relative min-h-screen bg-gray-100 flex flex-col items-center py-2">
            <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-300 z-10"
            >
                <FaTimes className="h-8 w-8" />
            </button>
            <nav className="bg-gray-100 px-3 py-4 w-full">
                <div className="flex items-center justify-center">
                    <img src={logo} alt="Logo" className="w-20 h-auto" />
                </div>
            </nav>
            <h1 className="text-4xl font-bold mb-8 gradient-text">Choose Your Plan</h1>
            <div className="flex flex-wrap justify-center">
                {plans.map((plan) => (
                    <PlanCard
                        key={plan.id}
                        {...plan}
                    />
                ))}
            </div>
        </div>
    );
};

export default PlansPage;
