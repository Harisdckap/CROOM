import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSortUp, FaSortDown, FaEye } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Adminlist = () => {
    const [admins, setAdmins] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "ascending",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [adminsPerPage, setAdminsPerPage] = useState(5);
    const [showModal, setShowModal] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);

    const auth_userID = localStorage.getItem("user_id");
    const authToken = localStorage.getItem("authToken");

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/adminList/${auth_userID}`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );

                setAdmins(response.data);
            } catch (error) {
                console.error("There was an error fetching the admin list!", error);
            }
        };

        fetchAdmins();
    }, [auth_userID, authToken]);

    const handleRemoveAdmin = async (adminId) => {
        try {
            const response = await axios.delete(
                `http://127.0.0.1:8000/api/removeAdmin`,
                {
                    data: { admin_id: adminId },
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            toast.success(response.data.message);
            setAdmins(admins.filter((admin) => admin.id !== adminId));
            setShowModal(false);
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                console.error("There was an error removing the admin!", error);
                toast.error("An unexpected error occurred.");
            }
        }
    };

    const handleSort = (key) => {
        let direction = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    const sortedAdmins = [...admins].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
    });

    const filteredAdmins = sortedAdmins.filter((admin) =>
        admin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastAdmin = currentPage * adminsPerPage;
    const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
    const currentAdmins = filteredAdmins.slice(
        indexOfFirstAdmin,
        indexOfLastAdmin
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleAdminsPerPageChange = (event) => {
        setAdminsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const pageNumbers = [];
    for (
        let i = 1;
        i <= Math.ceil(filteredAdmins.length / adminsPerPage);
        i++
    ) {
        pageNumbers.push(i);
    }

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === "ascending" ? (
                <FaSortUp />
            ) : (
                <FaSortDown />
            );
        }
        return null;
    };

    const handleOpenModal = (admin) => {
        setSelectedAdmin(admin);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedAdmin(null);
    };

    const handleChangeRole = async (userId, newRole) => {
        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/changeRole`,
                { user_id: userId, role: newRole },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            toast.success(response.data.message); // Show success toast
            setAdmins(
                admins.map((admin) =>
                    admin.id === userId ? { ...admin, role: newRole } : admin
                )
            );
            setShowModal(false);
            setTimeout(() => {
                window.location.reload();
            }, 5000);
        } catch (error) {
            console.error("Error changing role:", error);
            if (error.response) {
                toast.error(error.response.data.message); // Show error toast
            } else {
                toast.error("An unexpected error occurred."); // Show generic error toast
            }
        }
    };

    return (
        <div className="p-6 bg-white min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search Admin by Name"
                    className="p-2 border border-gray-300 rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div>
                    <label htmlFor="entries" className="mr-2 text-gray-700">
                        Show
                    </label>
                    <select
                        id="entries"
                        value={adminsPerPage}
                        onChange={handleAdminsPerPageChange}
                        className="border border-gray-300 rounded py-1 px-2 text-gray-700"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                    <label htmlFor="entries" className="ml-2 text-gray-700">
                        entries
                    </label>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-200 text-gray-800 uppercase text-sm">
                        <tr>
                            <th
                                className="py-3 px-6 text-left cursor-pointer"
                                onClick={() => handleSort("id")}
                            >
                                ID {getSortIcon("id")}
                            </th>
                            <th
                                className="py-3 px-6 text-left cursor-pointer"
                                onClick={() => handleSort("name")}
                            >
                                Name {getSortIcon("name")}
                            </th>
                            <th
                                className="py-3 px-6 text-left cursor-pointer"
                                onClick={() => handleSort("email")}
                            >
                                Email {getSortIcon("email")}
                            </th>
                            <th className="py-3 px-6 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {currentAdmins.map((admin) => (
                            <tr
                                key={admin.id}
                                className="border-b border-gray-200 hover:bg-gray-100 transition duration-300"
                            >
                                <td className="py-3 px-6">{admin.id}</td>
                                <td className="py-3 px-6">{admin.name}</td>
                                <td className="py-3 px-6">{admin.email}</td>
                                <td className="py-3 px-6 text-center">
                                    <button
                                        onClick={() => handleOpenModal(admin)}
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        <FaEye />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <div>
                    Showing {indexOfFirstAdmin + 1} to{" "}
                    {indexOfLastAdmin > filteredAdmins.length
                        ? filteredAdmins.length
                        : indexOfLastAdmin}{" "}
                    of {filteredAdmins.length} entries
                </div>
                <div className="flex space-x-1">
                    {pageNumbers.map((number) => (
                        <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`px-3 py-1 rounded ${
                                currentPage === number
                                    ? "bg-blue-950 text-white"
                                    : "bg-gray-300 text-gray-700"
                            }`}
                        >
                            {number}
                        </button>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {showModal && selectedAdmin && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
                        <h2 className="text-xl font-semibold mb-4">
                            Admin: {selectedAdmin.name}
                        </h2>
                        <p className="mb-4">Select an action:</p>
                        <div className="flex justify-between gap-4">
                            <button
                                onClick={() =>
                                    handleChangeRole(selectedAdmin.id, 3) 
                                }
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Make as User
                            </button>
                            <button
                                onClick={() =>
                                    handleRemoveAdmin(selectedAdmin.id)
                                }
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Remove Admin
                            </button>
                        </div>
                        <button
                            onClick={handleCloseModal}
                            className="mt-4 text-gray-700 underline"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default Adminlist;
