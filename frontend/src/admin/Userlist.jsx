import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSortUp, FaSortDown } from 'react-icons/fa';

const Userlist = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/usersList",
          {
              headers: {
                  Authorization: `Bearer ${authToken}`,
              },
          }); 
        setUsers(response.data);
      } catch (error) {
        console.error("There was an error fetching the user list!", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSort = (key) => {
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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleUsersPerPageChange = (event) => {
    setUsersPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when entries per page change
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
    }
    return null;
  };

  return (
    <div className='p-6 bg-white min-h-screen'>
      {/* <h1 className="text-3xl font-bold text-green-900 mb-6">User List</h1> */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search User by Name"
          className="p-2 border border-gray-300 rounded"
          value={searchTerm}
          // onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          <label htmlFor="entries" className="mr-2 text-gray-700">Show</label>
          <select
            id="entries"
            value={usersPerPage}
            // onChange={handleUsersPerPageChange}
            className="border border-gray-300 rounded py-1 px-2 text-gray-700"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <label htmlFor="entries" className="ml-2 text-gray-700">entries</label>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-200 text-gray-800 uppercase text-sm">
            <tr>
              <th
                className="py-3 px-6 text-left cursor-pointer"
                onClick={() => handleSort('id')}
              >
                ID {getSortIcon('id')}
              </th>
              <th
                className="py-3 px-6 text-left cursor-pointer"
                onClick={() => handleSort('name')}
              >
                Name {getSortIcon('name')}
              </th>
              <th
                className="py-3 px-6 text-left cursor-pointer"
                onClick={() => handleSort('email')}
              >
                Email {getSortIcon('email')}
              </th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {currentUsers.map(user => (
              <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100 transition duration-300">
                <td className="py-3 px-6">{user.id}</td>
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => console.log(`View user with ID: ${user.id}`)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div>
          Showing {indexOfFirstUser + 1} to {indexOfLastUser > filteredUsers.length ? filteredUsers.length : indexOfLastUser} of {filteredUsers.length} entries
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
    </div>
  );
}

export default Userlist;
