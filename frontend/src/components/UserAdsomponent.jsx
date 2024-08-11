import React, { useEffect, useState } from "react";
import axios from "axios";

const UserAds = () => {
    const [ads, setAds] = useState({ roommates: [], pg_listings: [], rooms: [] });
    const userId = localStorage.getItem('user_id');

    useEffect(() => {
        const fetchAds = async () => {
            try {
              const response = await axios.get(`http://127.0.0.1:8000/api/user/${userId}/ads`);

                setAds(response.data);
            } catch (error) {
                console.error("Error fetching user ads:", error);

            }
        };

        fetchAds();
    },[]);

    console.log(ads);

    return (
        // <div>
        //     <h1>User's Ads</h1>

        //     {/* Display Roommate ads */}
        //     <section>
        //         <h2>Roommates</h2>
        //         {ads.roommates.length === 0 ? (
        //             <p>No roommate ads found.</p>
        //         ) : (
        //             ads.roommates.map((ad) => (
        //                 <div key={ad.id}>
        //                     <h3>{ad.location}</h3>
        //                     <p>Looking for: {ad.looking_for}</p>
        //                     <p>Rent: ${ad.approx_rent}</p>
        //                     <p>Room Type: {ad.room_type}</p>
        //                     <p>Features: {ad.highlighted_features.join(", ")}</p>
        //                 </div>
        //             ))
        //         )}
        //     </section>

        //     {/* Display PG ads */}
        //     <section>
        //         <h2>PG Listings</h2>
        //         {ads.pg_listings.length === 0 ? (
        //             <p>No PG listings found.</p>
        //         ) : (
        //             ads.pg_listings.map((ad) => (
        //                 <div key={ad.id}>
        //                     <h3>{ad.pg_name}</h3>
        //                     <p>Location: {ad.location}</p>
        //                     <p>Occupancy Type: {ad.occupancy_type}</p>
        //                     <p>Rent: ${ad.occupancy_amount}</p>
        //                     <p>Features: {ad.highlighted_features.join(", ")}</p>
        //                 </div>
        //             ))
        //         )}
        //     </section>

        //     {/* Display Room ads */}
        //     <section>
        //         <h2>Rooms</h2>
        //         {ads.rooms.length === 0 ? (
        //             <p>No room ads found.</p>
        //         ) : (
        //             ads.rooms.map((ad) => (
        //                 <div key={ad.id}>
        //                     <h3>{ad.title}</h3>
        //                     <p>Location: {ad.location}</p>
        //                     <p>Price: ${ad.price}</p>
        //                     <p>Room Type: {ad.room_type}</p>
        //                     <p>Features: {ad.highlighted_features.join(", ")}</p>
        //                 </div>
        //             ))
        //         )}
        //     </section>
        // </div>
        <>

        </>
    );
};

export default UserAds;
