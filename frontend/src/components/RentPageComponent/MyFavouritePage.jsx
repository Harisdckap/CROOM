// src/pages/MyFavoritePage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import FavoriteCard from "../RentPageComponent/MyFavouritePage";

const MyFavoritePage = () => {
    const [favoriteRooms, setFavoriteRooms] = useState([]);
    const [favoriteRoommates, setFavoriteRoommates] = useState([]);
    const [favoritePGs, setFavoritePGs] = useState([]);
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || {});

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            const favoriteIds = Object.keys(favorites).filter(id => favorites[id]);
            console.log('Favorite IDs:', favoriteIds);

            if (favoriteIds.length > 0) {
                const response = await axios.get("http://127.0.0.1:8000/api/favorite-items", {
                    params: { ids: favoriteIds }
                });
                console.log('Favorite items response:', response.data);
                setFavoriteRooms(response.data.rooms || []);
                setFavoriteRoommates(response.data.roommates || []);
                setFavoritePGs(response.data.pgs || []);
            } else {
                console.log('No favorite items to fetch.');
            }
        } catch (error) {
            console.error("Error fetching favorite items:", error.response ? error.response.data : error.message);
        }
    };


    const handleToggleFavorite = (id) => {
        setFavorites((prev) => {
            const newFavorites = { ...prev, [id]: !prev[id] };
            console.log('Updating favorites:', newFavorites);
            localStorage.setItem("favorites", JSON.stringify(newFavorites));
            return newFavorites;
        });
    };

    const renderFavorites = (items, type) => {
        return items.map(item => (
            <FavoriteCard
                key={item.id}
                item={item}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favorites[item.id]}
            />
        ));
    };

    return (
        <div>
            <div className="container mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteRooms.length > 0 && renderFavorites(favoriteRooms, 'room')}
                {favoriteRoommates.length > 0 && renderFavorites(favoriteRoommates, 'roommate')}
                {favoritePGs.length > 0 && renderFavorites(favoritePGs, 'pg')}
                {favoriteRooms.length === 0 && favoriteRoommates.length === 0 && favoritePGs.length === 0 && (
                    <p className="text-center text-gray-700">No favorite items found.</p>
                )}
            </div>
            <div className="fixed bottom-0 right-0 p-4">
                <a href="/property" className="block hover:bg-blue-300 rounded p-2">Back to Properties</a>
            </div>
        </div>
    );
};

export default MyFavoritePage;
