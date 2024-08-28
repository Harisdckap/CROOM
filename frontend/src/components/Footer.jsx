import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
    return (
        <footer className="bg-blue-100 text-gray-700 p-8 ">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Logo and Address Section */}
                <div>
                    <img src={logo} alt="Croom Logo" className="h-10 mb-4" />
                    <h3 className="font-bold text-lg">Corporate Office</h3>
                    <p className="mt-2">
                        L76A, L Block, 21st Street, <br />
                        Anna Nagar, <br />
                        Chennai, Tamil Nadu 600102 <br />
                    </p>
                </div>

                {/* Company Information */}
                <div>
                    <h3 className="font-bold text-lg">Company Information</h3>
                    <ul className="mt-2 space-y-2">
                        <li>
                            <a href="#careers" className="hover:text-blue-600">
                                Careers
                            </a>
                        </li>
                        <li>
                            <a href="#contact" className="hover:text-blue-600">
                                Contact Us
                            </a>
                        </li>
                        <li>
                            <a href="#blog" className="hover:text-blue-600">
                                Blog
                            </a>
                        </li>
                        <li>
                            <a href="#faqs" className="hover:text-blue-600">
                                FAQs
                            </a>
                        </li>
                        <li>
                            <a href="#privacy" className="hover:text-blue-600">
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="#terms" className="hover:text-blue-600">
                                T&C
                            </a>
                        </li>
                        <li>
                            <a
                                href="#disclaimers"
                                className="hover:text-blue-600"
                            >
                                Disclaimers
                            </a>
                        </li>
                        <li>
                            <a
                                href="#how-it-works"
                                className="hover:text-blue-600"
                            >
                                How it Works
                            </a>
                        </li>
                        <li>
                            <a
                                href="#list-property"
                                className="hover:text-blue-600"
                            >
                                List Your Property
                            </a>
                        </li>
                        <li>
                            <a href="#sitemap" className="hover:text-blue-600">
                                Sitemap
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact and Social Media */}
                <div>
                    <h3 className="font-bold text-lg">Contact Us</h3>
                    <p className="mt-2">
                        <span>📞 +91 8990898989</span> <br />
                        <span>✉️ croomapp@gmail.com</span>
                    </p>
                    <div className="mt-4">
                        <h3 className="font-bold text-lg">Stay In Touch</h3>
                        <div className="flex space-x-4 mt-2">
                            {/* Social Media Icons */}
                            <a href="#facebook" className="hover:text-blue-600">
                                <i className="fab fa-facebook"></i>{" "}
                                {/* Add FontAwesome or SVG icon */}
                            </a>
                            <a href="#youtube" className="hover:text-blue-600">
                                <i className="fab fa-youtube"></i>
                            </a>
                            <a href="#linkedin" className="hover:text-blue-600">
                                <i className="fab fa-linkedin"></i>
                            </a>
                            <a
                                href="#instagram"
                                className="hover:text-blue-600"
                            >
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                    {/* App Store Links */}
                    <div className="mt-6">
                        <h3 className="font-bold text-lg">
                            Download the Croom App
                        </h3>
                        <div className="flex space-x-4 mt-2">
                            {/* Apple App Store */}
                            <a
                                href="https://www.apple.com/app-store/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg"
                                    alt="App Store"
                                    className="h-8"
                                />
                            </a>

                            {/* Google Play Store */}
                            <a
                                href="https://play.google.com/store"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                    alt="Google Play"
                                    className="h-8"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
