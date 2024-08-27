import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSortUp, FaSortDown, FaEye } from 'react-icons/fa';

const Userlist = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const auth_userID = localStorage.getItem('user_id');
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/usersList/${auth_userID}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching user list:', error);
      }
    };

    fetchUsers();
  }, [auth_userID, authToken]);

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

      alert(response.data.message);
      setUsers(users.map(user => (user.id === userId ? { ...user, role: newRole } : user)));
      setShowModal(false);
    } catch (error) {
      console.error('Error changing role:', error);
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  };

  const handleRemoveUser = async userId => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/removeUser`, {
        data: { user_id: userId },
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      alert(response.data.message);
      setUsers(users.filter(user => user.id !== userId));
      setShowModal(false);
    } catch (error) {
      console.error('Error removing user:', error);
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  };

  const handleSort = key => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const filteredUsers = sortedUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleUsersPerPageChange = event => {
    setUsersPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const getSortIcon = key => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
    }
    return null;
  };

  const handleOpenModal = user => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search User by Name"
          className="p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <div>
          <label htmlFor="entries" className="mr-2 text-gray-700">
            Show
          </label>
          <select
            id="entries"
            value={usersPerPage}
            onChange={handleUsersPerPageChange}
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
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('id')}>
                ID {getSortIcon('id')}
              </th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('name')}>
                Name {getSortIcon('name')}
              </th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('email')}>
                Email {getSortIcon('email')}
              </th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {currentUsers.map(user => (
              <tr
                key={user.id}
                className="border-b border-gray-200 hover:bg-gray-100 transition duration-300"
              >
                <td className="py-3 px-6">{user.id}</td>
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleOpenModal(user)}
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
          Showing {indexOfFirstUser + 1} to {indexOfLastUser > filteredUsers.length ? filteredUsers.length : indexOfLastUser} of{' '}
          {filteredUsers.length} entries
        </div>
        <div className="flex space-x-1">
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-3 py-1 rounded ${currentPage === number ? 'bg-blue-950 text-white' : 'bg-gray-300 text-gray-700'}`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>

      {showModal && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
            <h2 className="text-xl font-semibold mb-4">User: {selectedUser.name}</h2>
            <p className="mb-4">Select an action:</p>
            <div className="flex justify-between gap-4">
              <button
                onClick={() => handleChangeRole(selectedUser.id, 'admin')}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Make as Admin
              </button>
              <button
                onClick={() => handleRemoveUser(selectedUser.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Remove User
              </button>
            </div>
            <button onClick={handleCloseModal} className="mt-4 text-gray-700 underline">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Userlist;
