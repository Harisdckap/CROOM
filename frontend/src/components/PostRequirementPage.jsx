import React from "react";
import { Link } from "react-router-dom";
import HouseImg from "../assets/houseAdd.png";
import PgImg from "../assets/pg.png";
import RoommateImg from "../assets/roomate.png";
import "../components/RentPageComponent/AddRequirement.css";

export const List_page = () => {
    // const navigate = useNavigate();

    return (
        <div className="container ">
            <div
                className="flex justify-between items-center  mt-5 "
            >
                <div></div>
                <p className="font-bold text-white">C-Room</p>
                <Link to="/property">
                <button className="w-8 h-8 border border-white rounded-full text-white" >
                    X
                </button>
                </Link>
            </div>

            <div className="text-center mt-16 text-white">
                <h1 className="text-3xl">Post Your Requirments</h1>
                <p className="mt-6 font-thin leading-7">
                    Find your perfect PG or Roommate or Rooms effortlessly. Just post
                    your <br />
                    requirment and let the matching begin!
                </p>
            </div>

            <div className="flex items-center justify-center gap-12 mt-12 rounded">
                <Link to="/NeedRoomForm">
                    <div className="w-80 h-80 bg-white p-8 rounded">
                        <h1 className="font-bold text-xl">Add Room</h1>
                        <figure class=" h-36 md:w-30 md:h-30 shrink-1 md:shrink-0 mt-10  ml-auto">
                            <img
                                src={HouseImg}
                                className="w-full h-full object-cover rounded"
                                alt=""
                                srcset=""
                            />
                        </figure>
                    </div>
                </Link>
                <Link to="/NeedRoomateForm">
                    <div className="w-80 h-80 bg-white p-8 rounded">
                        <h1 className="font-bold text-xl">
                            Roomate for your Room
                        </h1>

                        <figure class=" md:h-36 hrink-1 md:shrink-0 mt-10 ml-auto">
                            <img
                                src={RoommateImg}
                                className="w-full h-full object-cover rounded"
                                alt=""
                                srcset=""
                            />
                        </figure>
                    </div>
                </Link>

                <Link to="/PgForm">
                    <div className="w-80 h-80 bg-white p-8 rounded">
                        <h1 className="font-bold text-xl">Add PG</h1>
                        <figure class="md:h-36 hrink-1 md:shrink-0 mt-10 ml-auto">
                            <img
                                src={PgImg}
                                className="w-full h-full object-cover rounded"
                                alt=""
                                srcset=""
                            />
                        </figure>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default List_page;
