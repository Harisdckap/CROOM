import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminAdsTable = () => {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch all ads from the API
        axios.get('/api/admin/ads')
            .then(response => {
                setAds(response.data.ads);
            })
            .catch(error => {
                console.error('There was an error fetching the ads!', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleRemove = (adId, listingType) => {
        axios.post('/api/remove-ad', { ad_id: adId, listing_type: listingType })
            .then(response => {
                alert(response.data.message);
                setAds(ads.filter(ad => ad.id !== adId));
            })
            .catch(error => {
                console.error('There was an error removing the ad!', error);
            });
    };

    if (loading) {
        return <p>Loading...</p>; // You can customize the loading state
    }

    return (
        <div className="overflow-x-auto">
            {ads.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Ad ID</th>
                            <th className="py-2 px-4 border-b">Location</th>
                            <th className="py-2 px-4 border-b">User ID</th>
                            <th className="py-2 px-4 border-b">Ad Name</th>
                            <th className="py-2 px-4 border-b">Price</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ads.map(ad => (
                            <tr key={ad.id}>
                                <td className="py-2 px-4 border-b">{ad.id}</td>
                                <td className="py-2 px-4 border-b">{ad.location}</td>
                                <td className="py-2 px-4 border-b">{ad.user_id}</td>
                                <td className="py-2 px-4 border-b">{ad.ad_name}</td>
                                <td className="py-2 px-4 border-b">${ad.price}</td>
                                <td className="py-2 px-4 border-b">
                                    <button 
                                        onClick={() => handleRemove(ad.id, ad.listing_type)} 
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center">No ads available</p>
            )}
        </div>
    );
};

export default AdminAdsTable;
