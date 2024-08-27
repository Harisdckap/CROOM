import React, { useEffect, useState } from "react";
import { Button, Card, Drawer, Modal, Form, Upload, Input, Select } from "antd";
import axios from "axios";
import DetailsUserAdsComponents from "./DetailsUserAdsComponents";
import "../index.css";
import EditAdsComponent from "./EditAdsComponent";

const { Option } = Select;

const UserAdsComponent = ({ drawerOpen, closeDrawer }) => {
    const [open, setOpen] = useState(false);
    const [childrenDrawer, setChildrenDrawer] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedAd, setSelectedAd] = useState(null);
    const [ads, setAds] = useState({ roommates: [], pg_listings: [], rooms: [] });
    const userId = localStorage.getItem('user_id');
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/user/${userId}/ads`);
                const ads=response.data
                setAds(response.data);

                ads.rooms = ads.rooms.map(ad => ({
                    ...ad,
                    highlighted_features: ad.highlighted_features ? ad.highlighted_features.split(", ") : [],
                    amenities: ad.amenities ? ad.amenities.split(", ") : [],
                }));

                ads.roommates = ads.roommates.map(ad => ({
                    ...ad,
                    highlighted_features: ad.highlighted_features ? ad.highlighted_features.split(", ") : [],
                    amenities: ad.amenities ? ad.amenities.split(", ") : [],
                }));

                ads.pg_listings = ads.pg_listings.map(ad => ({
                    ...ad,
                    highlighted_features: ad.highlighted_features ? ad.highlighted_features.split(", ") : [],
                    amenities: ad.amenities ? ad.amenities.split(", ") : [],
                }));
            } catch (error) {
                console.error("Error fetching user ads:", error);
            }
        };

        fetchAds();
    }, [userId]);

    const parseLocation = (location) => {
        try {
            const outerJson = JSON.parse(location);
            const locationData = JSON.parse(outerJson);

            const state = locationData.state || "";
            const city = locationData.city || "";
            const district = location.district || "";
            const street = locationData.street || "";
            const doorNo = locationData.doorNo || "";
            const area = locationData.area || "";
            const country = locationData.country || "";
            const pin = locationData.pin || "";
            return {
                address1: `${doorNo}, ${street}, ${area}`,
                address2: `${city}, ${district}`,
                state: `${state}`,
                pincode: `${pin}`,
                country: `${country}`,
            };
        } catch (error) {
            console.error("Failed to parse location data:", error);
            return {
                address1: "Unknown",
                address2: "Unknown",
                state: "Unknown",
                pincode: "Unknown",
                country: "Unknown"
            };
        }
    };
    const showChildrenDrawer = (ad) => {
        setSelectedAd(ad);
        setChildrenDrawer(true);

        const { address1, address2, state, pincode, country } = parseLocation(ad.location);
        setSelectedAd({ ...ad, address1, address2, state, pincode, country });
    };
    const onChildrenDrawerClose = () => setChildrenDrawer(false);
    const showEditModal = () => setEditModalVisible(true);
    const handleEditModalCancel = () => setEditModalVisible(false);
    const handleFormChange = (changedValues, allValues) => {
        setFormData(allValues);
    };

    const printFormData = (formData) => {
        for (let [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`${key}: ${value.name} (${value.size} bytes)`);
            } else {
                console.log(`${key}: ${value}`);
            }
        }
    };
    const handleFormSubmit = async (values) => {
        try {

            const userId = localStorage.getItem('user_id');
            console.log("userId:", userId);

            // Prepare location data
            const location = JSON.stringify({
                doorNo: values.address1.split(",")[0] || "",
                street: values.address1.split(",")[1] || "",
                area: values.address1.split(",")[2] || "",
                city: values.address2.split(",")[0] || "",
                district: values.address2.split(",")[1] || "",
                state: values.state || "",
                pin: values.pincode || "",
                country: values.country || ""
            });
            // console.log("Location:", location);

            // Process highlighted features and amenities
            const highlightedFeaturesArray = typeof values.highlighted_features === 'string'
                ? values.highlighted_features.split(",").map(feature => feature.trim())
                : values.highlighted_features || [];
            const amenitiesArray = typeof values.amenities === 'string'
                ? values.amenities.split(",").map(amenity => amenity.trim())
                : values.amenities || [];

            console.log("Highlighted Features Array:", highlightedFeaturesArray);
            console.log("Amenities Array:", amenitiesArray);

            // Convert arrays to JSON strings for FormData
            const highlightedFeaturesString = JSON.stringify(highlightedFeaturesArray);
            const amenitiesString = JSON.stringify(amenitiesArray);

            console.log("Highlighted Features JSON String for FormData:", highlightedFeaturesString);
            console.log("Amenities JSON String for FormData:", amenitiesString);

            // Prepare FormData

            const formData = new FormData()
            formData.append('user_id', userId);
            if(values.listing_type === "room") {
                formData.append('title', values.title);
                formData.append('location', location);
                formData.append('price', values.price);
                formData.append('room_type', values.room_type);
                formData.append('contact', values.contact);
                formData.append('listing_type', values.listing_type);
                formData.append('looking_for_gender', values.looking_for_gender);
                formData.append('lookinf_for', 'Roommates')
                formData.append('occupancy', values.occupancy);
                formData.append('highlighted_features', highlightedFeaturesString);
                formData.append('amenities', amenitiesString);
                formData.append('photos', values.photos);
                formData.append('description', values.description);
            }
            else if(values.listing_type === "roommates") {
                formData.append('title', values.title);
                formData.append('location', location);
                formData.append('approx_rent', values.approx_rent);
                formData.append('room_type', values.room_type);
                formData.append('listing_type', values.listing_type);
                formData.append('looking_for_gender', values.looking_for_gender);
                formData.append('lookinf_for', 'Room');
                formData.append('number_of_people', values.number_of_people)
                formData.append('occupancy', values.occupancy);
                formData.append('highlighted_features', highlightedFeaturesString);
                formData.append('amenities', amenitiesString);
                formData.append('photos', values.photos);
                formData.append('post', values.description);
            }
            else if(values.listing_type === "pg") {
                formData.append('pg_name', values.pg_name);
                formData.append('location', location);
                formData.append('occupancy_amount', values.occupancy_amount);
                formData.append('pg_type', values.pg_type);
                formData.append('mobile_num', values.mobile_num);
                formData.append('listing_type', values.listing_type);
                formData.append('looking_for_gender', values.looking_for_gender);
                formData.append('occupancy_type', values.occupancy);
                formData.append('highlighted_features', highlightedFeaturesString);
                formData.append('amenities', amenitiesString);
                formData.append('photos', values.photos);
                formData.append('pg_post_content', values.description);
            }

            if (values.photos && values.photos.length > 0) {
                values.photos.forEach(file => {
                    formData.append('photos[]', file.originFileObj);
                });
            }

            // Log FormData values
            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            // Submit the form data
            const response = await axios.put(`http://127.0.0.1:8000/api/property/${selectedAd.id}/${selectedAd.listing_type}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("Ad updated successfully:", response.data);
            setEditModalVisible(false);
            fetchAds();
        } catch (error) {
            console.error("Error updating ad:", error);
        }
    };

    return (
        <>
            <Drawer
                title="My Ads"
                width={700}
                onClose={closeDrawer}
                open={drawerOpen}
                placement="right"
                className="custom-drawer absolute top-14"
                zIndex={200}
            >
                <div className="block">
                    {ads.rooms.length === 0 ? (
                        <p>No room ads found.</p>
                    ) : (
                        ads.rooms.map((ad) => (
                            <Card key={ad.id} className="w-full mb-4" onClick={() => showChildrenDrawer(ad)}>
                                <div className="flex flex-wrap justify-between">
                                    <h3 className="text-base font-bold">Title: {ad.title}</h3>
                                    <h3 className="text-base font-bold">Price: {ad.price}</h3>
                                    <h3 className="text-base font-bold">Room Type: {ad.room_type}</h3>
                                    <h3 className="text-base font-bold">Type: {ad.listing_type}</h3>
                                </div>
                            </Card>
                        ))
                    )}
                    {ads.roommates.length === 0 ? (
                        <p>No roommates ads found.</p>
                    ) : (
                        ads.roommates.map((ad) => (
                            <Card key={ad.id} className="w-full mb-4" onClick={() => showChildrenDrawer(ad)}>
                                <div className="flex flex-wrap justify-between">
                                    <h3 className="text-base font-bold">Title: {ad.title}</h3>
                                    <h3 className="text-base font-bold">Price: {ad.approx_rent}</h3>
                                    <h3 className="text-base font-bold">Room Type: {ad.room_type}</h3>
                                    <h3 className="text-base font-bold">Type: {ad.listing_type}</h3>
                                </div>
                            </Card>
                        ))
                    )}
                    {ads.pg_listings.length === 0 ? (
                        <p>No PG listings found.</p>
                    ) : (
                        ads.pg_listings.map((ad) => (
                            <Card key={ad.id} className="w-full mb-4" onClick={() => showChildrenDrawer(ad)}>
                                <div className="flex flex-wrap justify-between">
                                    <h3 className="text-base font-bold">Title: {ad.pg_name}</h3>
                                    <h3 className="text-base font-bold">Price: {ad.occupancy_amount}</h3>
                                    <h3 className="text-base font-bold">Room Type: {ad.pg_type}</h3>
                                    <h3 className="text-base font-bold">Type: {ad.listing_type}</h3>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
                <DetailsUserAdsComponents
                    ad={selectedAd}
                    open={childrenDrawer}
                    onClose={onChildrenDrawerClose}
                    showEditModal={showEditModal}
                />
            </Drawer>

            <EditAdsComponent
                visible = {editModalVisible}
                onCancel = {handleEditModalCancel}
                handleFormSubmit = {handleFormSubmit}
                selectedAd = {selectedAd}
                handleFormChange={handleFormChange}
                normFile={(e)=>(Array.isArray(e) ? e : e?.fileList)}
                parseLocation={parseLocation}
            />
        </>
    );
};

export default UserAdsComponent;





