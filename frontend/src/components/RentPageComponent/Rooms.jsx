import React from 'react'
import UserAdsomponent from "../UserAdsomponent";

const Rooms = () => {
  return (
    <div>
        {ads.rooms.length === 0 ? (
                        <p>No room ads found.</p>
                    ) : (
                        ads.rooms.map((ad) => (
                            // <Space direction="vertical" size={20}>
                            <Card style={{ width: "610px" }} onClick={showChildrenDrawer}>
                            {/* <Space direction="vertical" size={20}> */}
                            <div key={ad.id} className="flex flex-wrap justify-between">
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
  )
}

export default Rooms
