import React from 'react';
import roommateImageHome from '../assets/roommateImageHome.jpg';
import roomImageHome from '../assets/roomImageHome.jpg';
import pgImageHome from '../assets/pgImageHome.jpg'

const HomePageTab3 = () => {
  const listings = [
    { title: 'Roommate', image: roommateImageHome },
    { title: 'PG', image: pgImageHome },
    { title: 'Room', image: roomImageHome },
  ];

  return (
    <div className="w-full px-14 py-10 flex justify-between items-top pt-20">
    <div className='w-auto'>
    <h3 className="gradient-text text-3xl font-bold mb-4">Explore The Latest</h3>
    <h2 className="gradient-text text-3xl font-bold mb-4">C-room</h2>
    <h4 className="gradient-text text-2xl mb-8">Listings</h4>
    </div>
    <div className=''>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {listings.map((listing, index) => (
          <div key={index} className="w-60 relative">
            <img 
              src={listing.image} 
              alt={listing.title} 
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <span className="text-white text-xl font-bold">{listing.title}</span>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default HomePageTab3;
