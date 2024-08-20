import React from "react";
import hero4 from "../assets/hero4.png";

const HomePageTab2 = () => {
    return (
        <section className="flex flex-col lg:flex-row items-center py-4 justify-between lg:px-12 bg-white gap-8 lg:gap-16">
            {/* Image Section */}
            <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
                <img
                    src={hero4}
                    alt="Two people on a couch"
                    className="w-full h-auto object-cover"
                />
            </div>

            {/* Text Section */}
            <div className="w-full lg:w-1/2 text-center lg:text-left px-4 sm:px-8 lg:px-0">
                <h2 className="gradient-text text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
                    Why Use C-room?
                </h2>
                <p className="text-base sm:text-lg text-gray-700 mb-4">
                    C-room is a one-stop destination for anyone looking out for
                    roommates, flatmates, or PGs. We understand that finding the
                    right living situation can be a challenge, which is why we
                    make the process easy and stress-free.
                </p>
                <p className="text-base sm:text-lg text-gray-700">
                    Our platform allows you to browse through a wide range of
                    listings for co-living spaces, PGs, and flats, and find the
                    perfect match for your lifestyle and. So, why wait? Start
                    your search today and find your ideal living situation with
                    C-room!
                </p>
            </div>
        </section>
    );
};

export default HomePageTab2;
