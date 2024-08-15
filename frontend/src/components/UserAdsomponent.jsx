import React, { useEffect, useState } from "react";
// import Drawer from "react-modern-drawer";
// import "react-modern-drawer/dist/index.css";
import { Button, Card, Drawer, Space } from "antd";
import axios from "axios";
import "../index.css";

const UserAds = (props) => {
    // ------ drawer -> open, close
    const [open, setOpen] = useState(false);
    const [childrenDrawer, setChildrenDrawer] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
    }

    const showChildrenDrawer = () => {
        setChildrenDrawer(true);
        if (ads.listing_type === "rommates") {
            console.log("rommats");

        }
        else if (ads.listing_type === "room") {
            console.log("room")
        }
        else if (ads.listing_type === "pg") {
            console.log("pg");

        }
    }

    const onChildrenDrawerClose = () => {
        setChildrenDrawer(false);
    }
    // ---------------
    const [ads, setAds] = useState({ roommates: [], pg_listings: [], rooms: [] });
    const userId = localStorage.getItem('user_id');
    // console.log(userId);


    // -------------------



    // -------------------

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
    }, []);

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

        //     </section>
        // </div>
        <>

            {/* navbar */}
            {/* <Auth_navbar /> */}
            {/* <Button
                onClick={showDrawer}
                style={{ padding: "10px 20px", position: "absolute", top: "60px", background: "blue", color: "white", border: "none", borderRadius: "5px" }}
            >
                Open drawer
            </Button> */}
            <button onClick={showDrawer} className="block text-center hover:bg-blue-300 rounded p-2 w-full text-left">My Ads</button>
            <Drawer
                onClick={props.onClick}
                title="My Ads"
                width={700}
                onClose={onClose}
                open={open}
                placement="right"
                style={{ position: "absolute", top: "58px" }}
                className="custom-drawer"
            >
                {/* <Button
        onClick={showChildrenDrawer}
        style={{ padding: "10px 20px", background: "blue", color: "white", border: "none", borderRadius: "5px" }}
      >
        Two-level drawer
      </Button> */}

                    {/* <h2>Roomates</h2> */}
                    {/* <Card style={{ width: "600px" }} onClick={showChildrenDrawer}> */}
                    {/* Roommates ads */}
                    {/* {ads.roommates.length === 0 ?
                            (<p>No rommates are found</p>) : */}
                    {/* ( */}
                    {/* ads.roommates.map((ad) => ( */}
                    {/* <div key={ad.id}> */}
                    {/* ----- */}
                    {/* Rooms ads */}
                    {/* {ads.rooms.length >= 0 ? (
                            <p>No rooms are not found</p>
                        ) : (
                            ads.rooms.map((ad) => {
                                <div key={ad.id}>
                                    <div className="flex w-full gap-4">
                                        <div className="flex-1 flex gap-2">
                                            <h1 className="font-bold">Name:</h1>
                                            <p>{ad.title}
                                                console.log(ad.title);

                                            </p>
                                        </div>
                                        <div className="flex-1 flex gap-2">
                                            <h1 className="font-bold">Room Type:</h1>
                                            <p>{ad.location.join("")} */}
                    {/* console.log(ad.room_type); */}

                    {/* </p>
                                        </div>
                                    </div>
                                    <div className="flex w-full gap-4">
                                        <div className="flex-1 flex gap-2">
                                            <h1 className="font-bold">Type:</h1>
                                            <p>{ad.room_type}</p>
                                        </div>
                                        <div className="flex-1 flex gap-2">
                                            <h1 className="font-bold">Rent:</h1>
                                            <p>{ad.price}</p>
                                        </div>
                                    </div>
                                    <Button style={{ background: "red", color: "white", position: "absolute", top: "40px", right: "14px" }}>Delete</Button>
                                </div>
                            })
                        )} */}

                    {/* )) */}
                    {/* ) */}
                    {/* } */}

                    <div>
                    {/* console.log({ads.listing_type}); */}

                    {ads.rooms.length === 0 ? (
                        <p>No room ads found.</p>
                    ) : (
                        ads.rooms.map((ad) => (
                            // <Space direction="vertical" size={20}>
                            <Card style={{ width: "610px" }} onClick={showChildrenDrawer}>
                            {/* <Space direction="vertical" size={20}> */}
                            <div key={ad.id} className="flex flex-wrap justify-between">
                                {/* <p></p> */}

                                <h3 className="text-base"><span className="font-bold">TiTle: </span> {ad.title}</h3>
                                {/* <p>Location: {ad.city}</p> */}
                                <h3 className="text-base"><span className="font-bold">Price: </span> {ad.price}</h3>
                                <h3 className="text-base"><span className="font-bold">Room Type: </span> {ad.room_type}</h3>
                                <h3 className="text-base"><span className="font-bold">Features: </span> {ad.highlighted_features.join(", ")}</h3>

                                {/* <p>Price: ${ad.price}</p>
                                <p>Room Type: {ad.room_type}</p>
                                <p>Features: {ad.highlighted_features.join(", ")}</p> */}
                                <Button style={{ background: "red", color: "white", position: "absolute", top: "44px", right: "14px" }}>Delete</Button>
                            </div>
                            {/* </Space> */}
                            </Card>

                        )))

                    }

                        </div>
                    {/* </Card> */}
                    {/* -------------------- */}
                    {/* <Card style={{ width: "600px" }} onClick={showChildrenDrawer}> */}
                    {/* Roommates ads */}
                    {/* {ads.roommates.length === 0 ?
                            (<p>No rommates are found</p>) : */}
                    {/* ( */}
                    {/* ads.roommates.map((ad) => ( */}
                    {/* <div key={ad.id}> */}
                    {/* <div className="flex w-full gap-4">
                            <div className="flex-1 flex gap-2">
                                <h1 className="font-bold">Name:</h1>
                                <p>Annai Meenakshi Ladies Hostel</p>
                            </div>
                            <div className="flex-1 flex gap-2">
                                <h1 className="font-bold">Location:</h1>
                                <p>Chennai</p>
                            </div>
                        </div>
                        <div className="flex w-full gap-4">
                            <div className="flex-1 flex gap-2">
                                <h1 className="font-bold">Room Type:</h1>
                                <p>PG</p>
                            </div>
                            <div className="flex-1 flex gap-2">
                                <h1 className="font-bold">Rent:</h1>
                                <p>$7000</p>
                            </div>
                        </div>
                        <Button style={{ background: "red", color: "white", position: "absolute", top: "40px", right: "14px" }}>Delete</Button> */}
                    {/* )) */}
                    {/* ) */}
                    {/* } */}
                    {/* </Card> */}
                    {/* -------------- */}
                    {/* <Card style={{ width: "600px" }} onClick={showChildrenDrawer}> */}
                    {/* Roommates ads */}
                    {/* {ads.roommates.length === 0 ?
                            (<p>No rommates are found</p>) : */}
                    {/* ( */}
                    {/* ads.roommates.map((ad) => ( */}
                    {/* <div key={ad.id}> */}
                    {/* <div className="flex w-full gap-4">
                            <div className="flex-1 flex gap-2">
                                <h1 className="font-bold">Name:</h1>
                                <p>Annai Meenakshi Ladies Hostel</p>
                            </div>
                            <div className="flex-1 flex gap-2">
                                <h1 className="font-bold">Location:</h1>
                                <p>Chennai</p>
                            </div>
                        </div>
                        <div className="flex w-full gap-4">
                            <div className="flex-1 flex gap-2">
                                <h1 className="font-bold">Room Type:</h1>
                                <p>PG</p>
                            </div>
                            <div className="flex-1 flex gap-2">
                                <h1 className="font-bold">Rent:</h1>
                                <p>$7000</p>
                            </div>
                        </div>
                        <Button style={{ background: "red", color: "white", position: "absolute", top: "40px", right: "14px" }}>Delete</Button>
                        {/* )) */}
                    {/* ) */}
                    {/* } */}
                    {/* </Card>  */}
                    {/* ---------------- */}
                    {/* <Card style={{ width: "600px" }} onClick={showChildrenDrawer}> */}
                    {/* Roommates ads */}
                    {/* {ads.roommates.length === 0 ?
                            (<p>No rommates are found</p>) : */}
                    {/* ( */}
                    {/* ads.roommates.map((ad) => ( */}
                    {/* <div key={ad.id}> */}
                    {/* <div className="flex w-full gap-4">
                            <div className="flex-1 flex gap-2">
                                <h1 className="font-bold">Name:</h1>
                                <p>Annai Meenakshi Ladies Hostel</p>
                            </div>
                            <div className="flex-1 flex gap-2">
                                <h1 className="font-bold">Location:</h1>
                                <p>Chennai</p>
                            </div>
                        </div>
                        <div className="flex w-full gap-4">
                            <div className="flex-1 flex gap-2">
                                <h1 className="font-bold">Room Type:</h1>
                                <p>PG</p>
                            </div>
                            <div className="flex-1 flex gap-2">
                                <h1 className="font-bold">Rent:</h1>
                                <p>$7000</p>
                            </div>
                        </div> */}
                    {/* <Button style={{ background: "red", color: "white", position: "absolute", top: "40px", right: "14px" }}>Delete</Button> */}
                    {/* )) */}
                    {/* ) */}
                    {/* } */}
                    {/* </Card> */}
                    {/* ------------ */}
                    {/* <Card style={{ width: "600px" }} onClick={showChildrenDrawer}> */}
                    {/* Roommates ads */}
                    {/* {ads.roommates.length === 0 ?
                            (<p>No rommates are found</p>) : */}
                    {/* ( */}
                    {/* ads.roommates.map((ad) => ( */}
                    {/* <div key={ad.id}> */}
                    {/* <div className="flex w-full gap-4">
                            <div className="flex-1 flex gap-2">
                                <h1 className="font-bold">Name:</h1>
                                <p>Annai Meenakshi Ladies Hostel</p>
                            </div>
                            <div className="flex-1 flex gap-2">
                                <h1 className="font-bold">Location:</h1>
                                <p>Chennai</p>
                            </div>
                        </div>
                        <div className="flex w-full gap-4">
                            <div className="flex-1 flex gap-2">
                                <h1 className="font-bold">Room Type:</h1>
                                <p>PG</p>
                            </div>
                            <div className="flex-1 flex gap-2">
                                <h1 className="font-bold">Rent:</h1>
                                <p>$7000</p>
                            </div>
                        </div>
                        <Button style={{ background: "red", color: "white", position: "absolute", top: "40px", right: "14px" }}>Delete</Button> */}
                    {/* )) */}
                    {/* ) */}
                    {/* } */}
                    {/* </Card> */}
                    {/* ------------- */}
                    {/* <Card style={{ width: "600px" }} onClick={showChildrenDrawer}> */}
                    {/* Roommates ads */}
                    {/* {ads.roommates.length === 0 ?
                            (<p>No rommates are found</p>) : */}
                    {/* ( */}
                    {/* ads.roommates.map((ad) => ( */}
                    {/* <div key={ad.id}> */}
                    {/* <div className="flex w-full gap-4">
                            <div className="flex-1 flex gap-2">
                                <h1 className="font-bold">Name:</h1>
                                <p>Annai Meenakshi Ladies Hostel</p>
                            </div>
                            <div className="flex-1 flex gap-2">
                                <h1 className="font-bold">Location:</h1>
                                <p>Chennai</p>
                            </div>
                        </div>
                        <div className="flex w-full gap-4">
                            <div className="flex-1 flex gap-2">
                                <h1 className="font-bold">Room Type:</h1>
                                <p>PG</p>
                            </div>
                            <div className="flex-1 flex gap-2">
                                <h1 className="font-bold">Rent:</h1>
                                <p>$7000</p>
                            </div>
                        </div>
                        <Button style={{ background: "red", color: "white", position: "absolute", top: "40px", right: "14px" }}>Delete</Button> */}
                    {/* )) */}
                    {/* ) */}
                    {/* } */}
                    {/* </Card> */}
                    {/* ------------------ */}
                    {/* <Card style={{ width: "600px" }} onClick={showChildrenDrawer}> */}
                    {/* Roommates ads */}
                    {/* {ads.roommates.length === 0 ?
                            (<p>No rommates are found</p>) : */}
                    {/* ( */}
                    {/* ads.roommates.map((ad) => ( */}
                    {/* <div key={ad.id}> */}
                    {/* <div className="flex w-full gap-4">
                            <div className="flex-1 flex gap-2">
                                <h1 className="font-bold">Name:</h1>
                                <p>Annai Meenakshi Ladies Hostel</p>
                            </div>
                            <div className="flex-1 flex gap-2">
                                <h1 className="font-bold">Location:</h1>
                                <p>Chennai</p>
                            </div>
                        </div>
                        <div className="flex w-full gap-4">
                            <div className="flex-1 flex gap-2">
                                <h1 className="font-bold">Room Type:</h1>
                                <p>PG</p>
                            </div>
                            <div className="flex-1 flex gap-2">
                                <h1 className="font-bold">Rent:</h1>
                                <p>$7000</p>
                            </div>
                        </div> */}
                    {/* <Button style={{ background: "red", color: "white", position: "absolute", top: "40px", right: "14px" }}>Delete</Button> */}
                    {/* )) */}
                    {/* ) */}
                    {/* } */}
                    {/* </Card> */}
                    {/* ---------------------- */}
                    {/* <Card style={{ width: "600px" }} onClick={showChildrenDrawer}> */}
                    {/* Roommates ads */}
                    {/* {ads.roommates.length === 0 ?
                            (<p>No rommates are found</p>) : */}
                    {/* ( */}
                    {/* ads.roommates.map((ad) => ( */}
                    {/* <div key={ad.id}> */}
                    {/* <div className="flex w-full gap-4">
                            <div className="flex-1 flex gap-2">
                                <h1 className="font-bold">Name:</h1>
                                <p>Annai Meenakshi Ladies Hostel</p>
                            </div>
                            <div className="flex-1 flex gap-2">
                                <h1 className="font-bold">Location:</h1>
                                <p>Chennai</p>
                            </div>
                        </div>
                        <div className="flex w-full gap-4">
                            <div className="flex-1 flex gap-2">
                                <h1 className="font-bold">Room Type:</h1>
                                <p>PG</p>
                            </div>
                            <div className="flex-1 flex gap-2">
                                <h1 className="font-bold">Rent:</h1>
                                <p>$7000</p>
                            </div>
                        </div>
                        <Button style={{ background: "red", color: "white", position: "absolute", top: "40px", right: "14px" }}>Delete</Button> */}
                    {/* )) */}
                    {/* ) */}
                    {/* } */}
                    {/* </Card> */}
                {/* </Space> */}
                <Drawer
                    title="Two-level Drawer"
                    width={700}
                    onClose={onChildrenDrawerClose}
                    open={childrenDrawer}
                    placement="right"
                    style={{ position: "absolute", right: 0, top: "58px", background: "white" }}
                >
                   <div>
                    {ads.rooms ? (ads.rooms.map((ad) => (
                            // <Space direction="vertical" size={20}>
                            <Card style={{ width: "610px" }} onClick={showChildrenDrawer}>
                            {/* <Space direction="vertical" size={20}> */}
                            <div key={ad.id} className="flex flex-wrap justify-between">
                                <p>{ad.id === ad.id ? (ad.title + ad.price): ("no")}</p>

                                {/* <h3 className="text-base"><span className="font-bold">TiTle: </span> {ad.title}</h3> */}
                                {/* <p>Location: {ad.city}</p> */}
                                {/* <h3 className="text-base"><span className="font-bold">Price: </span> {ad.price}</h3>
                                <h3 className="text-base"><span className="font-bold">Room Type: </span> {ad.room_type}</h3>
                                <h3 className="text-base"><span className="font-bold">Features: </span> {ad.highlighted_features.join(", ")}</h3> */}

                                {/* <p>Price: ${ad.price}</p>
                                <p>Room Type: {ad.room_type}</p>
                                <p>Features: {ad.highlighted_features.join(", ")}</p> */}
                                {/* <Button style={{ background: "red", color: "white", position: "absolute", top: "44px", right: "14px" }}>Delete</Button> */}
                            </div>
                            {/* </Space> */}
                            </Card>

                        ))) : ("No rooms are not found")}
                    {/* {ads.roommates ? ("roommates") : ("No rommates are not found")}
                    {ads.pg_listings ? ("pg_listings") : ("No PG are not ")} */}
                   </div>

                </Drawer>
            </Drawer>

        </>
    );
};

export default UserAds;
