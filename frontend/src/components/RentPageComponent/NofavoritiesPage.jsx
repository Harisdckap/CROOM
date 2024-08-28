import { Link } from 'react-router-dom';
import image from "../../assets/nofavorities.jpg";

const NoFavorites = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-screen-sm mt-7"> {/* Container width settings */}
      {/* Left Side - Image */}
      <div className="w-1/2 flex justify-center"> 
        <img 
          src={image}
          alt="No Favorites" 
          className="w-80 h-80 object-contain" 
        />
      </div>

      {/* Right Side - Content */}
      <div className="w-1/2 text-center p-6"> 
        <h2 className="text-3xl font-bold text-gray-700 mb-4">No favorites available</h2>
        <p className="text-gray-500 mb-6">
          You haven't added any favorites to your listing yet. Explore our listings and add some to see them here.
        </p>

        {/* Navigate to listing button */}
        <Link to="/property?address=chennai&p=0&t=a&propertyType=all" className="bg-blue-500 text-white px-6 py-3 rounded-full shadow hover:bg-blue-600 transition duration-300">
          Browse Listings
        </Link>
      </div>
    </div>
  );
};

export default NoFavorites;
