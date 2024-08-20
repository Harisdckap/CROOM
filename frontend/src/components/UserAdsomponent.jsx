import React, { useEffect, useState } from "react";
import { Button, Card, Drawer, Modal, Form, Input } from "antd";
import axios from "axios";
import "../index.css"; // Make sure this file includes slick-carousel imports
import Slider from "react-slick";

const UserAds = () => {
    const [open, setOpen] = useState(false);
    const [childrenDrawer, setChildrenDrawer] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedAd, setSelectedAd] = useState(null);
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
    }, [userId]);

    const showDrawer = () => setOpen(true);
    const onClose = () => setOpen(false);
    const showChildrenDrawer = (ad) => {
        setSelectedAd(ad);
        setChildrenDrawer(true);
        let locationString = "Unknown Location";

    if (ad.location) {
        try {
            const OuterData = JSON.parse(ad.location);
            const locationData = JSON.parse(OuterData);
            const city =
                (typeof locationData.city === "string" && locationData.city.trim()) ||
                "Unknown City";
            const district =
                (typeof locationData.district === "string" &&
                    locationData.district.trim()) ||
                "Unknown District";
            const street =
                (typeof locationData.street === "string" &&
                    locationData.street.trim()) ||
                "Unknown Street";
            const doorNo =
                (typeof locationData.doorNo === "string" &&
                    locationData.doorNo.trim()) ||
                "Unknown Door No";

            locationString = `${doorNo}, ${street}, ${district}, ${city}`;
        } catch (error) {
            console.error("Failed to parse location data:", error);
        }
    }

    setSelectedAd({ ...ad, formattedLocation: locationString });
    };
    const onChildrenDrawerClose = () => setChildrenDrawer(false);
    const showEditModal = () => setEditModalVisible(true);
    const handleEditModalCancel = () => setEditModalVisible(false);

    const handleEdit = async (values) => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/user/${userId}/ads/${selectedAd.id}`, values);
            setEditModalVisible(false);
            const response = await axios.get(`http://127.0.0.1:8000/api/user/${userId}/ads`);
            setAds(response.data);
        } catch (error) {
            console.error("Error editing ad:", error);
        }
    };

    const handleDelete = async (adId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/user/${userId}/ads/${adId}`);
            setAds((prevAds) => ({
                ...prevAds,
                rooms: prevAds.rooms.filter((ad) => ad.id !== adId),
            }));
        } catch (error) {
            console.error("Error deleting ad:", error);
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        // className: "custom-slider",
        // dotsClass: "custom-dots"
    };

    return (
        <>
            <button onClick={showDrawer} className="block text-center hover:bg-blue-300 rounded p-2 w-full text-left">My Ads</button>
            <Drawer
                title="My Ads"
                width={700}
                onClose={onClose}
                open={open}
                placement="right"
                className="custom-drawer absolute top-14"
                zIndex={1000}
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
                                    <Button
                                        onClick={() => handleDelete(ad.id)}
                                        className="bg-red-500 text-white absolute top-2 right-2"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
                <Drawer
                    title="Ad Details"
                    width={700}
                    onClose={onChildrenDrawerClose}
                    open={childrenDrawer}
                    placement="right"
                    className="bg-white absolute top-14"
                    // zIndex={1100}
                >
                    {selectedAd && (
                        <div className="block">
                            <h3 className="text-base font-bold">{selectedAd.title}</h3>
                            <div className="relative">
                                {selectedAd.photos && (
                                    <Slider {...settings} className="fade-in">
                                        {JSON.parse(selectedAd.photos).map((photo, index) => (
                                            <div key={index} className="p-2 flex justify-center">
                                                <img
                                                    src={`http://127.0.0.1:8000/storage/${photo.replace("\\/", "/")}`}
                                                    alt={`Ad photo ${index}`}
                                                    className="w-84 mx-auto h-80 object-fill"
                                                />
                                            </div>
                                        ))}
                                    </Slider>
                                )}
                            </div>
                            <h3 className="text-base font-bold mt-2">Price: {selectedAd.price}</h3>
                            <h3 className="text-base font-bold">Room Type: {selectedAd.room_type}</h3>
                            <h3 className="text-base font-bold">Features: {selectedAd.highlighted_features.join(", ")}</h3>
                            <h3 className="text-base font-bold">Location: {selectedAd.formattedLocation}</h3>

                            <Button onClick={showEditModal} className="mr-2">Edit</Button>
                            <Button onClick={() => handleDelete(selectedAd.id)} className="bg-red-500 text-white">Delete</Button>
                        </div>
                    )}
                </Drawer>
            </Drawer>
            <Modal
                title="Edit Ad"
                visible={editModalVisible}
                onCancel={handleEditModalCancel}
                footer={null}
                zIndex={1200}
            >
                {selectedAd && (
                    <Form
                        initialValues={{
                            title: selectedAd.title,
                            price: selectedAd.price,
                            room_type: selectedAd.room_type,
                            highlighted_features: selectedAd.highlighted_features.join(", "),
                            location: selectedAd.location,
                        }}
                        onFinish={handleEdit}
                    >
                        <Form.Item
                            name="title"
                            label="Title"
                            rules={[{ required: true, message: 'Please input the title!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="price"
                            label="Price"
                            rules={[{ required: true, message: 'Please input the price!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="room_type"
                            label="Room Type"
                            rules={[{ required: true, message: 'Please input the room type!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="highlighted_features"
                            label="Features"
                            rules={[{ required: true, message: 'Please input the features!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="location"
                            label="Location"
                            rules={[{ required: true, message: 'Please input the location!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Save</Button>
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </>
    );
}

export default UserAds;
