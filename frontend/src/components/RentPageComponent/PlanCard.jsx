import React from "react";
import { FaTimes } from "react-icons/fa"; // Import React Icon for the close button

const PlanCard = ({ name, price, duration, features, icon, onClose }) => {
    // Payment handler function
    const handlePayment = () => {
        // Replace the URL with your actual payment gateway URL or your payment logic
        const paymentUrl = "https://paytm.com/payment-page-url"; // Example Paytm URL
        window.location.href = paymentUrl; // Redirect to the payment page
    };

    return (
        <div className="relative bg-white shadow-md rounded-lg p-6 m-4 w-80 max-w-xs lg:max-w-sm">
            <div className="flex items-center justify-center mb-4">
                <i className={`fas ${icon} text-4xl text-blue-500`}></i>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-center gradient-text">{name}</h2>
            <p className="text-gray-700 mb-4 text-center text-xl">
                {price}/{duration}
            </p>
            <ul className="mb-4">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center mb-2">
                        <i className="fas fa-check-circle text-green-500 mr-2"></i>
                        {feature}
                    </li>
                ))}
            </ul>
            <div className="flex justify-center">
                <button
                    className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition duration-300"
                    onClick={handlePayment} // Trigger payment on click
                >
                    Select Plan
                </button>
            </div>
        </div>
    );
};

export default PlanCard;
