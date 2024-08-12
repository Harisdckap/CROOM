import React, { useState } from "react";
import hero3 from "../assets/hero3.svg";

const HomepageTabContent = () => {
    const [activeTab, setActiveTab] = useState("rentRoom");

    return (
        <section className="w-11/12 md:w-8/12 lg:w-11/12 flex flex-col lg:flex-row gap-10 lg:gap-20 justify-between items-center lg:items-start">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <h2 className="gradient-text text-2xl sm:text-3xl font-bold mb-6">
                    How It Works
                </h2>
                <div className="flex justify-center lg:justify-start mb-6">
                    <button
                        className={`pr-4 py-2 text-base sm:text-lg font-semibold ${
                            activeTab === "rentRoom"
                                ? "text-custom-green border-b-2 border-green-500"
                                : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("rentRoom")}
                    >
                        Rent A Room
                    </button>
                    <button
                        className={`pr-4 py-2 text-base sm:text-lg font-semibold ${
                            activeTab === "findRoom"
                                ? "text-custom-green border-b-2 border-green-500"
                                : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("findRoom")}
                    >
                        Find A Room
                    </button>
                </div>
                <div>
                    {activeTab === "findRoom" && (
                        <div>
                            <p className="text-lg mb-2 text-gray-700">
                                <span className="text-sm">✔️</span> Search For A Locality And Find The Right Post Or A Listing
                            </p>
                            <p className="text-lg mb-2 text-gray-700">
                                <span className="text-sm">✔️</span> Contact The Roommate Or A Landlord To Close The Deal
                            </p>
                            <p className="text-lg mb-2 text-gray-700">
                                <span className="text-sm">✔️</span> That Is It! Ready To Move In?
                            </p>
                        </div>
                    )}
                    {activeTab === "rentRoom" && (
                        <div>
                            <p className="text-lg mb-2 text-gray-700">
                                <span className="text-sm">✔️</span> Fill Up A Form With The Basic Details About Your Apartment
                            </p>
                            <p className="text-lg mb-2 text-gray-700">
                                <span className="text-sm">✔️</span> Sign Up, Complete Your Profile And Post Your Listing For Free
                            </p>
                            <p className="text-lg mb-2 text-gray-700">
                                <span className="text-sm">✔️</span> That Is It! Your Listing Is Now In Front Of Thousands Of Seekers
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <img src={hero3} alt="Illustration" className="w-auto h-60 sm:h-72 lg:h-80" />
        </section>
    );
};

export default HomepageTabContent;
