import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import premiumProperty from "../assets/luxury_pg2.jpg";
import premiumProperty1 from "../assets/luxyry_pg1.jpg";
import backgroundImage from "../assets/hero2.jpg";
import HomepageTabContent from "./HomepageTabContent";
import HomePageTab2 from "./HomePageTab2";
import HomePageTab3 from "./HomePageTab3";
import ExploreButton from "./RentPageComponent/ExploreButton";


const Home = () => {
    return (
        <div>
            <Header />
            <div className="w-full min-h-screen relative bg-white overflow-hidden leading-normal tracking-normal pt-14">
                <section
                    className="relative pt-24 pb-12 flex flex-col items-center"
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="absolute inset-0 bg-white bg-opacity-5 backdrop-blur-sm"></div>
                    <div className="relative text-center">
                        <h1 className="gradient-text text-5xl font-extrabold text-blue-600 leading-normal">
                            Find compatible flatmates <br /> Rooms & PGs
                        </h1>
                        <p className="text-lg mb-6 text-gray-200 font-medium">
                            Share your room with right roommates
                        </p>
                       <ExploreButton />
                    </div>
                </section>
                <HomePageTab2 />
                <section className="flex justify-center w-full bg-gray-100 pt-14">
                    <HomepageTabContent />
                </section>
                <HomePageTab3 />
                <section className="pt-10">
                    <section className="flex justify-center w-full bg-gray-100 pt-10">
                        <div className="w-11/12 md:w-8/12 lg:w-11/12 flex gap-40 lg:flex-row">
                            <article className="mt-5 lg:mt-20 lg:max-w-fit">
                                <h2 className="gradient-text text-2xl md:text-3xl lg:text-5xl font-medium font-poppins leading-tight">
                                    Are you looking for Luxury PG stay?
                                </h2>
                                <p className="text-gray-700 mt-4 text-sm lg:text-lg lg:mt-5 lg:w-4/5 lg:leading-8">
                                    View and book your appointment with our
                                    partners
                                </p>
                            </article>

                            <div className="w-full lg:w-11/12 md:h-96 relative rounded-md">
                                <figure className="transform rotate-3 sm:w-3/5 md:h-30 md:w-2/3 rounded-md absolute bottom-14 right-0 overflow-hidden z-10">
                                    <img
                                        alt="vector image"
                                        src={premiumProperty}
                                        decoding="async"
                                        data-nimg="fill"
                                        className="w-80 h-44 object-cover rounded-md border-4 border-inherit"
                                    />
                                </figure>
                                <figure className="transform -rotate-3 sm:w-3/5 md:h-30 md:w-2/3 rounded-md absolute top-0 left-0 overflow-hidden">
                                    <img
                                        alt="vector image"
                                        src={premiumProperty1}
                                        decoding="async"
                                        data-nimg="fill"
                                        className="w-80 h-44 object-cover rounded-md border-4 border-inherit"
                                    />
                                </figure>
                            </div>
                        </div>
                    </section>
                </section>
                <section className="w-auto">
                    <div className="w-auto py-8 px-14">
                        <h3 className="gradient-text text-3xl font-bold mb-4">
                            How to Unlock Your Ideal Living Space with
                        C-room
                        </h3>
                        <p className="mb-4 text-sm text-gray-700">
                            Are you chasing the dream of the perfect flat or the
                            ultimate flatmate? Look no further than C-room,
                            your all-in-one solution for discovering the finest
                            spaces and compatible roomies. With 1000+ listings,
                            FlatMate is engineered to simplify your quest, make
                            it more efficient, and, most importantly, liberate
                            you from those pesky brokerage fees. Let's dive into
                            how FlatMate.in operates, so you can find the
                            perfect spot for you.
                        </p>
                        <h5 className="text-xl font-semibold mb-2 text-gray-700">
                            1. Discover Your Ideal Location with Search:
                        </h5>
                        <p className="mb-2 text-sm text-gray-700">
                            The journey commences with a straightforward quest.
                            On C-room, you possess the authority to search
                            into your favored location and unearth the listings
                            that align with your requirements. Whether you're in
                            pursuit of a room, a flat, or looking for a flatmate
                            to share your space, our user-friendly exploration
                            feature empowers you to filter your options based on
                            your preferences, budget, and geographical
                            preference.
                        </p>
                        <p className="mb-4 text-sm text-gray-700">
                            With our potent search tools, you can effortlessly
                            sieve through the outcomes and obtain all the
                            pivotal particulars about each listing. From the
                            rental expense to the provided amenities, you'll
                            have a clear understanding of what each option
                            offers. This makes it easy to find the perfect
                            living arrangement that fits your lifestyle and
                            budget.
                        </p>
                        <h5 className="text-xl font-semibold mb-2 text-gray-700">
                            2. Explore 100% Brokerage-Free Listings:
                        </h5>
                        <p className="mb-2 text-sm text-gray-700">
                            At C-rrom, we boast of our broker-free
                            approach. What does this signify for you? It means
                            no need to struggle with the added costs of
                            brokerage fees. All our listings are 100%
                            brokerage-free, ensuring you obtain the best value
                            for your money.
                        </p>
                        <p className="mb-4 text-sm text-gray-700">
                            You can also check compatibility match percentages
                            for potential flatmate options. This distinctive
                            feature aids you in measuring how well your
                            inclinations harmonize with those of potential
                            flatmates, making it simpler to pinpoint a suitable
                            living situation. Once you've pinpointed a match,
                            you can directly connect with them through our
                            platform. You can opt to drop them a message via our
                            secure chat feature or ring them up directly – the
                            choice is yours.
                        </p>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
