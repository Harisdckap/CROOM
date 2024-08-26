import React, { useEffect, useState } from "react";
import { Button, Card, Drawer, Modal, Form, Upload, Input, Select } from "antd";
import axios from "axios";
import DetailsUserAdsComponents from "./DetailsUserAdsComponents";
import "../index.css";
import { UploadOutlined } from "@ant-design/icons";

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
                setAds(response.data);
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
            const street = locationData.street || "";
            const doorNo = locationData.doorNo || "";
            const area = locationData.area || "";
            const country = locationData.country || "";
            const pin = locationData.pin || "";
            return {
                address1: `${doorNo}, ${street}, ${area}`,
                address2: `${city}`,
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

    const handleFormSubmit = async (values) => {
        try {

            const location = JSON.stringify({
                doorNo: values.address1.split(",")[0] || "",
                street: values.address1.split(",")[1] || "",
                area: values.address1.split(",")[2] || "",
                city: values.address2 || "",
                state: values.state || "",
                pin: values.pincode || "",
                country: values.country || ""
            })
            console.log(location);

            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('price', values.price);
            formData.append('room_type', values.room_type);
            formData.append('contact', values.contact);
            formData.append('looking_for_gender', values.looking_for_gender);
            formData.append('occupancy', values.occupancy);
            formData.append('location', location);
            // formData.append('address1', values.address1);
            // formData.append('address2', values.address2);
            // formData.append('state', values.state);
            // formData.append('country', values.country);
            // formData.append('pincode', values.pincode);
            formData.append('listing_type', values.listing_type);
            formData.append('highlighted_features', values.highlighted_features.join(','));
            formData.append('amenities', values.amenities.join(','));
            formData.append('description', values.description);

            if (values.images && values.images.length > 0) {
                values.images.forEach(file => {
                    formData.append('images[]', file.originFileObj);
                });
            }

            const response = await axios.put(`http://127.0.0.1:8000/api/ads/${selectedAd.id}/update`, formData, {
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

    const normFile = (e) => Array.isArray(e) ? e : e?.fileList;

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
                            ...selectedAd,
                            address1: parseLocation(selectedAd.location).address1,
                            address2: parseLocation(selectedAd.location).address2,
                        }}
                        onValuesChange={handleFormChange}
                        onFinish={handleFormSubmit}
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
                            <Select>
                                <Option value="1RK">1RK</Option>
                                <Option value="1BHK">1BHK</Option>
                                <Option value="2BHK">2BHK</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="contact"
                            label="Contact"
                            rules={[{ required: true, message: 'Please input the contact number!' }]}
                        >
                            <Input type="tel" />
                        </Form.Item>

                        <Form.Item
                            name="address1"
                            label="Address 1"
                            rules={[{ required: true, message: 'Please input address 1!' }]}
                        >
                            <Input placeholder="example: door no, street, area" />
                        </Form.Item>

                        <Form.Item
                            name="address2"
                            label="Address 2"
                            rules={[{ required: true, message: 'Please input address 2!' }]}
                        >
                            <Input placeholder="example: city, district" />
                        </Form.Item>

                        <Form.Item
                            name="state"
                            label="State"
                            rules={[{ required: true, message: 'Please input the state!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="country"
                            label="Country"
                            rules={[{ required: true, message: 'Please input the country!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="pincode"
                            label="PIN Code"
                            rules={[{ required: true, message: 'Please input the PIN code!' }]}
                        >
                            <Input type="number" />
                        </Form.Item>

                        <Form.Item
                            name="listing_type"
                            label="Listing Type"
                            rules={[{ required: true, message: 'Please select the listing type!' }]}
                        >
                            <Select>
                                <Option value="room">Rooms</Option>
                                <Option value="roommates">Roommates</Option>
                                <Option value="pg">PG</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="highlighted_features"
                            label="Features"
                            rules={[{ required: true, message: 'Please select at least one feature!' }]}
                        >
                            <Select mode="multiple">
                                <Option value="attached bathroom">Attached Bathroom</Option>
                                <Option value="balcony">Balcony</Option>
                                <Option value="swimming pool">Swimming Pool</Option>
                                <Option value="gym">Gym</Option>
                                <Option value="parking">Parking</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="amenities"
                            label="Amenities"
                            rules={[{ required: true, message: 'Please select at least one amenity!' }]}
                        >
                            <Select mode="multiple">
                                <Option value="wifi">Wi-Fi</Option>
                                <Option value="air condition">Air Condition</Option>
                                <Option value="fridge">Fridge</Option>
                                <Option value="kitchen">Kitchen</Option>
                                <Option value="washing machine">Washing Machine</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="images"
                            label="Upload Images"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            rules={[{ message: "Please upload at least one image" }]}
                        >
                            <Upload
                                listType="picture"
                                className="h-20 w-20 object-cover"
                                multiple={true}
                                beforeUpload={() => true}
                                defaultFileList={selectedAd.photos ? JSON.parse(selectedAd.photos).map((photo, index) => ({
                                    uid: index.toString(),
                                    name: `Ad photo ${index}`,
                                    status: 'done',
                                    url: `http://127.0.0.1:8000/storage/${photo.replace("\\", "/")}`,
                                })) : []}
                            >
                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[{ message: 'Please input the description!' }]}
                        >
                            <Input.TextArea rows={4} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">Save</Button>
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </>
    );
};

export default UserAdsComponent;




