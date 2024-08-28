import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Select, Upload } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import "../index.css"

const {Option} = Select;

const EditAdsComponent = ({ visible, onCancel, handleFormSubmit, selectedAd, handleFormChange, parseLocation, normFile }) => {
    const [form] = Form.useForm();

    // Use parseLocation function passed from the parent component
    const location = selectedAd && selectedAd.location ? parseLocation(selectedAd.location) : { address1: '', address2: '' };

    useEffect(() => {
        if (selectedAd) {
            // Update form fields when selectedAd changes
            form.setFieldsValue({
                ...selectedAd,
                address1: location.address1,
                address2: location.address2,
            });
        }
    }, [selectedAd, form, location]);

    const isRoom = selectedAd?.listing_type === "room";
    const isRoommates = selectedAd?.listing_type === "roommates";
    const isPG = selectedAd?.listing_type === "pg";

    // console.log("Selected Ad:", selectedAd);
    // console.log("Is Room:", isRoom);
    // console.log("Is Roommates:", isRoommates);
    // console.log("Is PG:", isPG);

    return (
        <Modal
        style={{ fontFamily: 'Varela Round, sans-serif' }}
            title="Edit Ad"
            visible={visible}
            onCancel={onCancel}
            footer={null}
            zIndex={1200}
          
        >
                {/* console.log(selectedAd); */}


                {selectedAd && (
                    <Form
                        initialValues={{
                            ...selectedAd,
                            address1: parseLocation(selectedAd.location).address1,
                            address2: parseLocation(selectedAd.location).address2,
                            // country: parseLocation(selectedAd.location).country,
                        }}
                        onValuesChange={handleFormChange}
                        onFinish={handleFormSubmit}
                        className='block'
                        style={{ fontFamily: 'Varela Round, sans-serif' }}
                    >
                        {/* title */}
                        {isRoom && (<Form.Item
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            
                            name="title"
                            label="Title"
                            rules={[{ required: true, message: 'Please input the title!' }]}
                        >
                            <Input style={{ fontFamily: 'Varela Round, sans-serif' }} />
                        </Form.Item>)}
                        {isRoommates && (<Form.Item
                            name="title"
                            label="Title"
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            rules={[{ required: true, message: 'Please input the title!', }]}
                        >
                            <Input style={{ fontFamily: 'Varela Round, sans-serif' }} />
                        </Form.Item>)}
                        {isPG && (<Form.Item
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            name="pg_name"
                            label="Title"
                            rules={[{ required: true, message: 'Please input the title!' }]}
                        >
                            <Input style={{ fontFamily: 'Varela Round, sans-serif' }} />
                        </Form.Item>)}
                        {/* location */}
                        <Form.Item
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            name="address1"
                            label="Address 1"
                            rules={[{ required: true, message: 'Please input address 1!' }]}
                        >
                            <Input style={{ fontFamily: 'Varela Round, sans-serif' }} placeholder="example: door no, street, area" />
                        </Form.Item>

                        <Form.Item
                            name="address2"
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            label="Address 2"
                            rules={[{ required: true, message: 'Please input address 2!' }]}
                        >
                            <Input style={{ fontFamily: 'Varela Round, sans-serif' }} placeholder="example: city, district" />
                        </Form.Item>

                        <Form.Item
                            name="state"
                            label="State"
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            rules={[{ required: true, message: 'Please input the state!' }]}
                        >
                            <Input style={{ fontFamily: 'Varela Round, sans-serif' }}  />
                        </Form.Item>

                        <Form.Item
                            name="country"
                            label="Country"
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            rules={[{ required: true, message: 'Please input the country!' }]}
                        >
                            <Input style={{ fontFamily: 'Varela Round, sans-serif' }}  />
                        </Form.Item>

                        <Form.Item
                            name="pincode"
                            label="PIN Code"
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            rules={[{ required: true, message: 'Please input the PIN code!' }]}
                        >
                            <Input style={{ fontFamily: 'Varela Round, sans-serif' }} type="number" />
                        </Form.Item>
                        {/* price */}
                        {isRoom && (<Form.Item
                            name="price"
                            label="Price"
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            rules={[{ required: true, message: 'Please input the price!' }]}
                        >
                            <Input style={{ fontFamily: 'Varela Round, sans-serif' }} />
                        </Form.Item>)}
                        {isRoommates && (<Form.Item
                            name="approx_rent"
                            label="Price"
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            rules={[{ required: true, message: 'Please input the price!' }]}
                        >
                            <Input style={{ fontFamily: 'Varela Round, sans-serif' }}  />
                        </Form.Item>)}
                        {isPG && (<Form.Item
                            name="occupancy_amount"
                            label="Price"
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            rules={[{ required: true, message: 'Please input the price!' }]}
                        >
                            <Input style={{ fontFamily: 'Varela Round, sans-serif' }}  />
                        </Form.Item>)}
                            {/* room type */}
                            {isRoom && (<Form.Item
                            name="room_type"
                            label="Room Type"
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            rules={[{ required: true, message: 'Please input the room type!' }]}
                        >
                            <Select style={{ fontFamily: 'Varela Round, sans-serif' }}>
                                <Option value="1RK">1RK</Option>
                                <Option value="1BHK">1BHK</Option>
                                <Option value="2BHK">2BHK</Option>
                                <Option value="3BHK">3BHK</Option>
                            </Select>
                        </Form.Item>)}
                            {isRoommates && (<Form.Item
                            name="room_type"
                            label="Room Type"
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            rules={[{ required: true, message: 'Please input the room type!' }]}
                        >
                            <Select style={{ fontFamily: 'Varela Round, sans-serif' }} >
                                <Option value="1RK">1RK</Option>
                                <Option value="1BHK">1BHK</Option>
                                <Option value="2BHK">2BHK</Option>
                                <Option value="3BHK">3BHK</Option>
                            </Select>
                        </Form.Item>)}
                        {isPG && (<Form.Item
                            name="pg_type"
                            label="Room Type"
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            rules={[{ required: true, message: 'Please input the room type!' }]}
                        >
                            <Select  style={{ fontFamily: 'Varela Round, sans-serif' }}>
                                <Option value="1RK">1RK</Option>
                                <Option value="1BHK">1BHK</Option>
                                <Option value="2BHK">2BHK</Option>
                                <Option value="3BHK">3BHK</Option>
                            </Select>
                        </Form.Item>)}
                        {/* contact */}
                        {isRoom && (<Form.Item
                            name="contact"
                            label="Contact"
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            rules={[{ required: true, message: 'Please input the contact number!' }]}
                        >
                            <Input style={{ fontFamily: 'Varela Round, sans-serif' }} type="tel"  />
                        </Form.Item>)}
                        {isPG && (<Form.Item
                            name="mobile_num"
                            label="Contact"
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            rules={[{ required: true, message: 'Please input the contact number!' }]}
                        >
                            <Input type="tel" style={{ fontFamily: 'Varela Round, sans-serif' }}  />
                        </Form.Item>)}
                        {/* listing type */}
                        <Form.Item
                            name="listing_type"
                            label="Listing Type"
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            rules={[{ required: true, message: 'Please select the listing type!' }]}
                        >
                            <Select style={{ fontFamily: 'Varela Round, sans-serif' }} >
                                <Option value="room">Rooms</Option>
                                <Option value="roommates">Roommates</Option>
                                <Option value="pg">PG</Option>
                            </Select>
                        </Form.Item>
                        {/* looking for gender */}
                        {isRoom && (<Form.Item
                            name="looking_for_gender"
                            label="Gender"
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            rules={[{ required: true, message: 'Please select the listing type!' }]}
                        >
                            <Select style={{ fontFamily: 'Varela Round, sans-serif' }} >
                                <Option value="room">Male</Option>
                                <Option value="roommates">Female</Option>
                                <Option value="pg">Any</Option>
                            </Select>
                        </Form.Item>)}
                        {isRoommates && (<Form.Item
                            name="looking_for_gender"
                            label="Gender"
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            rules={[{ required: true, message: 'Please select the listing type!' }]}
                        >
                            <Select style={{ fontFamily: 'Varela Round, sans-serif' }} >
                                <Option value="room">Male</Option>
                                <Option value="roommates">Female</Option>
                                <Option value="pg">Any</Option>
                            </Select>
                        </Form.Item>)}
                        {isPG && (<Form.Item
                            name="looking_for_gender"
                            label="Gender"
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            rules={[{ required: true, message: 'Please select the listing type!' }]}
                        >
                            <Select style={{ fontFamily: 'Varela Round, sans-serif' }} >
                                <Option value="girls">Girls</Option>
                                <Option value="boys">Boys</Option>
                                <Option value="both">Both</Option>
                            </Select>
                        </Form.Item>)}
                        {/* looking for */}
                        {isRoom && (<Form.Item
                            name="looking_for"
                            label="Looking"
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            // rules={[{ required: true, message: 'Please select the listing type!' }]}
                        >
                            <Input style={{ fontFamily: 'Varela Round, sans-serif' }} value="Roommates" />
                        </Form.Item>)}
                        {isRoommates && (<Form.Item
                            name="looking_for"
                            label="Looking"
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            // rules={[{ required: true, message: 'Please select the listing type!' }]}
                        >
                            <Input style={{ fontFamily: 'Varela Round, sans-serif' }} value="Room"  />
                        </Form.Item>)}
                        {/* occupancy */}
                        {isRoom && (<Form.Item
                            name="occupancy"
                            label="Occupancy"
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            rules={[{ required: true, message: 'Please select at least one feature!' }]}
                        >
                            <Select style={{ fontFamily: 'Varela Round, sans-serif' }} mode="multiple" >
                                <Option value="bachelar">Bachelar</Option>
                                <Option value="Family">Family</Option>

                            </Select>
                        </Form.Item>)}
                        {isRoommates && (<Form.Item
                            name="number_of_people"
                            label="Number of People"
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            rules={[{ required: true, message: 'Please select the listing type!' }]}
                        >
                            <Input style={{ fontFamily: 'Varela Round, sans-serif' }} value="Room"  />
                        </Form.Item>)}
                        {isRoommates && (<Form.Item
                            name="occupancy"
                            label="Occupancy"
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            rules={[{ required: true, message: 'Please select at least one feature!' }]}
                        >
                            <Input style={{ fontFamily: 'Varela Round, sans-serif' }}  />
                        </Form.Item>)}
                        {isPG && (<Form.Item
                            name="occupancy_type"
                            label="Occupancy"
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            rules={[{ required: true, message: 'Please select at least one feature!' }]}
                        >
                            <Select style={{ fontFamily: 'Varela Round, sans-serif' }} mode="multiple" >
                                <Option value="single">Single</Option>
                                <Option value="double">Double</Option>
                                <Option value="triple">Triple</Option>
                            </Select>
                        </Form.Item>)}
                        {/* highlighted features */}
                        {isRoom && (<Form.Item
                            name="highlighted_features"
                            label="Features"
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            rules={[{ required: true, message: 'Please select at least one feature!' }]}
                        >
                            <Select style={{ fontFamily: 'Varela Round, sans-serif' }} mode="multiple" >
                                <Option value="attached bathroom">Attached Bathroom</Option>
                                <Option value="balcony">Balcony</Option>
                                <Option value="swimming pool">Swimming Pool</Option>
                                <Option value="gym">Gym</Option>
                                <Option value="parking">Parking</Option>
                            </Select>
                        </Form.Item>)}
                        {isRoommates && (<Form.Item
                            name="highlighted_features"
                            label="Features"
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            rules={[{ required: true, message: 'Please select at least one feature!' }]}
                        >
                            <Select style={{ fontFamily: 'Varela Round, sans-serif' }} mode="multiple" >
                                <Option value="working full time">Working full time</Option>
                                <Option value="college student">College Student</Option>
                                <Option value="25+ age">25+ age</Option>
                                <Option value="working night shift">Working Night Shift</Option>
                                <Option value="Pure Vegetarian">Pure Vegetarian</Option>
                            </Select>
                        </Form.Item>)}
                        {isPG && (<Form.Item
                            name="highlighted_features"
                            label="Features"
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            rules={[{ required: true, message: 'Please select at least one feature!' }]}
                        >
                            <Select style={{ fontFamily: 'Varela Round, sans-serif' }} mode="multiple" >
                                <Option value="attached bathroom">Attached Bathroom</Option>
                                <Option value="balcony">Balcony</Option>
                                <Option value="Furnished">Furnished</Option>
                                <Option value="parking">Parking</Option>
                            </Select>
                        </Form.Item>)}
                        {/* amenities */}
                        <Form.Item
                            name="amenities"
                            label="Amenities"
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            rules={[{ required: true, message: 'Please select at least one amenity!' }]}
                        >
                            <Select style={{ fontFamily: 'Varela Round, sans-serif' }}
                             mode="multiple" >
                                <Option value="wifi">Wi-Fi</Option>
                                <Option value="air condition">Air Condition</Option>
                                <Option value="fridge">Fridge</Option>
                                <Option value="kitchen">Kitchen</Option>
                                <Option value="washing machine">Washing Machine</Option>
                            </Select>
                        </Form.Item>
                        {/* photos */}
                        <Form.Item
                            name="photos"
                            label="Upload Images"
                            getValueFromEvent={normFile}
                            rules={[{ message: "Please upload at least one image" }]}
                        >
                            <Upload
                                listType="picture"
                                className="h-20 w-20 object-cover"
                                multiple={true}
                                beforeUpload={() => false}
                                defaultFileList={selectedAd.photos ? JSON.parse(selectedAd.photos).map((photo, index) => ({
                                    uid: index.toString(),
                                    name: `Ad photo ${index}`,
                                    status: 'done',
                                    url: `http://127.0.0.1:8000/storage/${photo.replace("\\", "/")}`,
                                })) : []}
                            >
                                <Button  icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item>
                        {/* decription */}
                        {isRoom && (<Form.Item
                            name="description"
                            label="Description"
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            rules={[{ required: true, message: 'Please input the description!' }]}
                        >
                            <Input.TextArea style={{ fontFamily: 'Varela Round, sans-serif' }} rows={4}  />
                        </Form.Item>)}
                        {isRoommates && (<Form.Item
                            name="post"
                            label="Description"
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            rules={[{ required: true, message: 'Please input the description!' }]}
                        >
                            <Input.TextArea style={{ fontFamily: 'Varela Round, sans-serif' }} rows={4}  />
                        </Form.Item>)}
                        {isPG && (<Form.Item
                            name="pg_post_content"
                            label="Description"
                            style={{ fontFamily: 'Varela Round, sans-serif' }}
                            rules={[{ required: true, message: 'Please input the description!' }]}
                        >
                            <Input.TextArea style={{ fontFamily: 'Varela Round, sans-serif' }} rows={4} />
                        </Form.Item >)}
                        <Form.Item className='text-center' >
                            <Button className='w-36 primary-btn' style={{ fontFamily: 'Varela Round, sans-serif' }} type="primary" htmlType="submit">Save</Button>
                        </Form.Item>
                    </Form>
                )}
            </Modal>
    );
};

export default EditAdsComponent;