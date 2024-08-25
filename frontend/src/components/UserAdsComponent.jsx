import React, { useEffect, useState } from "react";
import { Button, Card, Drawer, Modal, Form, Upload, Input, Select } from "antd";
import axios from "axios";
import DetailsUserAdsComponents from "./DetailsUserAdsComponents";
import "../index.css";
import { UploadOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Option } = Select;

const UserAdsComponent = ({ drawerOpen, closeDrawer }) => {
    const [childrenDrawer, setChildrenDrawer] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedAd, setSelectedAd] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [ads, setAds] = useState({
        roommates: [],
        pg_listings: [],
        rooms: [],
    });
    const userId = localStorage.getItem("user_id");
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/user/${userId}/ads`
                );
                const adsData = response.data;
                setAds(adsData);
                // console.log("hii",selectedAd.photos);
                
    
                // Parsing photos after adsData is set
                if (selectedAd.photos) {
                    try {
                        const parsedPhotos = JSON.parse(selectedAd.photos);
                        // console.log(parsedPhotos);
                        
                        const initialFileList = parsedPhotos.map(
                            (photo, index) => ({
                                uid: index, // Unique ID for each file
                                name: `Photo ${index + 1}`,
                                url: photo, // Ensure URL is correctly set
                                status: "done", // Status to indicate file is already uploaded
                            })
                        );
                        setFileList(initialFileList);
                    } catch (error) {
                        console.error("Failed to parse photos:", error);
                    }
                }
            } catch (error) {
                console.error("Error fetching user ads:", error);
            }
        };
    
        fetchAds();
    }, [userId]);

    const handleUpload = ({ fileList }) => {
        const updatedFileList = fileList.map((file) => {
            if (!file.url && file.originFileObj) {
                const fileUrl = URL.createObjectURL(file.originFileObj);
                return { ...file, url: fileUrl };
            }
            return file;
        });
        setFileList(updatedFileList);
    };



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
                country: "Unknown",
            };
        }
    };

    const showChildrenDrawer = (ad) => {
        const { address1, address2, state, pincode, country } = parseLocation(
            ad.location
        );
        setSelectedAd({ ...ad, address1, address2, state, pincode, country });
        setChildrenDrawer(true);
    };

    const onChildrenDrawerClose = () => setChildrenDrawer(false);
    const showEditModal = () => setEditModalVisible(true);
    const handleEditModalCancel = () => setEditModalVisible(false);

    const handleFormChange = (changedValues, allValues) => {
        setFormData(allValues);
    };

    const handleFormSubmit = async (values) => {
        console.log(values);
        
        try {
            const location = JSON.stringify({
                doorNo: values.address1.split(",")[0] || "",
                street: values.address1.split(",")[1] || "",
                area: values.address1.split(",")[2] || "",
                city: values.address2 || "",
                state: values.state || "",
                pin: values.pincode || "",
                country: values.country || "",
            });
         console.log(values);
         
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("price", values.price);
            formData.append("room_type", values.room_type);
            formData.append("contact", values.contact);
            formData.append("looking_for_gender", values.looking_for_gender);
            formData.append("occupancy", values.occupancy);
            formData.append("location", location);
            formData.append("listing_type", values.listing_type);
            formData.append("highlighted_features", values.highlighted_features.join(","));
            formData.append("amenities", values.amenities.join(","));
            formData.append("description", values.description);
            formData.append("user_id",  localStorage.getItem("user_id"));
    
            if (values.images && values.images.length > 0) {
                values.images.forEach((file) => {
                    formData.append("images[]", file.originFileObj);
                });
            }
    
            await axios.put(
                `http://127.0.0.1:8000/api/property/${selectedAd.id}/${selectedAd.listing_type}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
    
            toast.success("Ad updated successfully!");
            setEditModalVisible(false);
            fetchAds(); // Refresh the ads list after successful submission
        } catch (error) {
            console.error("Error updating ad:", error);
            toast.error("Error updating ad. Please try again.");
        }
    };
    
    const handleDelete = async (adId, listingType) => {
        // Optimistically remove the ad from UI
        setAds((prevAds) => ({
            ...prevAds,
            [listingType]: prevAds[listingType]
                ? prevAds[listingType].filter((ad) => ad.id !== adId)
                : [],
        }));

        try {
            const response = await axios.delete(
                `http://127.0.0.1:8000/api/property/${listingType}/${adId}`
            );
            console.log("Response data:", response.data);

            // Show success toast and close drawers
            toast.success("Ad deleted successfully!");
            onChildrenDrawerClose();
            closeDrawer();
        } catch (error) {
            console.error("Error deleting ad:", error);
            setAds((prevAds) => ({
                ...prevAds,
                [listingType]: [...prevAds[listingType], { id: adId }],
            }));
            toast.error("Failed to delete ad. Please try again.");
        }
    };

    const normFile = (e) => (Array.isArray(e) ? e : e?.fileList);

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
                            <Card
                                key={ad.id}
                                className="w-full mb-4"
                                onClick={() => showChildrenDrawer(ad)}
                            >
                                <div className="flex flex-wrap justify-between">
                                    <h3 className="text-base font-bold">
                                        Title: {ad.title}
                                    </h3>
                                    <h3 className="text-base font-bold">
                                        Price: {ad.price}
                                    </h3>
                                    <h3 className="text-base font-bold">
                                        Room Type: {ad.room_type}
                                    </h3>
                                    <h3 className="text-base font-bold">
                                        Type: {ad.listing_type}
                                    </h3>
                                </div>
                            </Card>
                        ))
                    )}
                    {ads.roommates.length === 0 ? (
                        <p>No roommates ads found.</p>
                    ) : (
                        ads.roommates.map((ad) => (
                            <Card
                                key={ad.id}
                                className="w-full mb-4"
                                onClick={() => showChildrenDrawer(ad)}
                            >
                                <div className="flex flex-wrap justify-between">
                                    <h3 className="text-base font-bold">
                                        Title: {ad.title}
                                    </h3>
                                    <h3 className="text-base font-bold">
                                        Price: {ad.approx_rent}
                                    </h3>
                                    <h3 className="text-base font-bold">
                                        Room Type: {ad.room_type}
                                    </h3>
                                    <h3 className="text-base font-bold">
                                        Type: {ad.listing_type}
                                    </h3>
                                </div>
                            </Card>
                        ))
                    )}
                    {ads.pg_listings.length === 0 ? (
                        <p>No PG listings found.</p>
                    ) : (
                        ads.pg_listings.map((ad) => (
                            <Card
                                key={ad.id}
                                className="w-full mb-4"
                                onClick={() => showChildrenDrawer(ad)}
                            >
                                <div className="flex flex-wrap justify-between">
                                    <h3 className="text-base font-bold">
                                        Title: {ad.pg_name}
                                    </h3>
                                    <h3 className="text-base font-bold">
                                        Price: {ad.occupancy_amount}
                                    </h3>
                                    <h3 className="text-base font-bold">
                                        Room Type: {ad.pg_type}
                                    </h3>
                                    <h3 className="text-base font-bold">
                                        Type: {ad.listing_type}
                                    </h3>
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
                    handleDelete={handleDelete}
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
                            address1: parseLocation(selectedAd.location)
                                .address1,
                            address2: parseLocation(selectedAd.location)
                                .address2,
                            images: fileList,
                        }}
                        onValuesChange={handleFormChange}
                        onFinish={handleFormSubmit}
                    >
                        <Form.Item
                            name="title"
                            label="Title"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the title",
                                },
                            ]}
                        >
                            <Input placeholder="Enter title" />
                        </Form.Item>
                        <Form.Item
                            name="price"
                            label="Price"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the price",
                                },
                            ]}
                        >
                            <Input placeholder="Enter price" />
                        </Form.Item>
                        <Form.Item
                            name="room_type"
                            label="Room Type"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select the room type",
                                },
                            ]}
                        >
                            <Select placeholder="Select room type">
                                <Option value="Single">Single</Option>
                                <Option value="Double">Double</Option>
                                <Option value="Triple">Triple</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="contact"
                            label="Contact"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the contact details",
                                },
                            ]}
                        >
                            <Input placeholder="Enter contact details" />
                        </Form.Item>
                        <Form.Item
                            name="address1"
                            label="Address Line 1"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the address",
                                },
                            ]}
                        >
                            <Input placeholder="Enter address line 1" />
                        </Form.Item>
                        <Form.Item
                            name="address2"
                            label="City"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the city",
                                },
                            ]}
                        >
                            <Input placeholder="Enter city" />
                        </Form.Item>
                        <Form.Item
                            name="state"
                            label="State"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the state",
                                },
                            ]}
                        >
                            <Input placeholder="Enter state" />
                        </Form.Item>
                        <Form.Item
                            name="pincode"
                            label="Pincode"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the pincode",
                                },
                            ]}
                        >
                            <Input placeholder="Enter pincode" />
                        </Form.Item>
                        <Form.Item
                            name="country"
                            label="Country"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the country",
                                },
                            ]}
                        >
                            <Input placeholder="Enter country" />
                        </Form.Item>
                        <Form.Item
                            name="highlighted_features"
                            label="Highlighted Features"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please enter highlighted features",
                                },
                            ]}
                        >
                            <Select
                                mode="multiple"
                                placeholder="Select highlighted features"
                            >
                                <Option value="Feature1">Feature 1</Option>
                                <Option value="Feature2">Feature 2</Option>
                                <Option value="Feature3">Feature 3</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="amenities"
                            label="Amenities"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select amenities",
                                },
                            ]}
                        >
                            <Select
                                mode="multiple"
                                placeholder="Select amenities"
                            >
                                <Option value="Amenity1">Amenity 1</Option>
                                <Option value="Amenity2">Amenity 2</Option>
                                <Option value="Amenity3">Amenity 3</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the description",
                                },
                            ]}
                        >
                            <Input.TextArea placeholder="Enter description" />
                        </Form.Item>
                        <Form.Item
                            name="images"
                            label="Upload Images"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            rules={[
                                {
                                    required: true,
                                    message: "Please upload images",
                                },
                            ]}
                        >
                            <Upload
                                listType="photo"
                                beforeUpload={() => false}
                                onChange={handleUpload}
                                multiple
                                maxCount={5}
                                fileList={fileList}
                            >
                                <Button icon={<UploadOutlined />}>
                                    Upload
                                </Button>
                            </Upload>
                        </Form.Item>

              
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Update Ad
                            </Button>
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </>
    );
};

export default UserAdsComponent;
