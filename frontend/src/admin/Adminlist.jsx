import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSortUp, FaSortDown } from 'react-icons/fa';

const Adminlist = () => {
  const [sellers, setSellers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [sellersPerPage, setSellersPerPage] = useState(5); //default entries per page

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/adminList",
          {
              headers: {
                  Authorization: `Bearer ${authToken}`,
              },
          }); 
        setSellers(response.data);
      } catch (error) {
        console.error("There was an error fetching the admin list!", error);
      }
    };

    fetchSellers();
  }, []);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedSellers = [...sellers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const filteredSellers = sortedSellers.filter(seller =>
    seller.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastSeller = currentPage * sellersPerPage;
  const indexOfFirstSeller = indexOfLastSeller - sellersPerPage;
  const currentSellers = filteredSellers.slice(indexOfFirstSeller, indexOfLastSeller);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSellersPerPageChange = (event) => {
    setSellersPerPage(Number(event.target.value));
    setCurrentPage(1); //reset to first page when entries per page change
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredSellers.length / sellersPerPage); i++) {
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
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search Seller by Name"
          className="p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          <label htmlFor="entries" className="mr-2 text-gray-700">Show</label>
          <select
            id="entries"
            value={sellersPerPage}
            onChange={handleSellersPerPageChange}
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

      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('id')}
            >
              ID {getSortIcon('id')}
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('name')}
            >
              Name {getSortIcon('name')}
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('email')}
            >
              Email {getSortIcon('email')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentSellers.map(seller => (
            <tr key={seller.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{seller.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{seller.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{seller.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => handleViewClick(seller.id)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <div>
          Showing {indexOfFirstSeller + 1} to {indexOfLastSeller > filteredSellers.length ? filteredSellers.length : indexOfLastSeller} of {filteredSellers.length} entries
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

export default Adminlist;
