import React, { useEffect, useState, useRef } from 'react';
import AdminSidebar from './AdminSidebar';
import { FaArrowCircleRight } from 'react-icons/fa';

function AdminLevel() {
  const [menuBar, setMenuBar] = useState(false);
  const sidebarRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle search input change
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Toggle sidebar menu visibility
  const handleClick = () => {
    setMenuBar(!menuBar);
  };

  // Close sidebar if clicked outside
  const handleOutsideClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setMenuBar(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // User data
  const users = [
    { name: "Steve Anderson", role: "Web Designer", img: "path/to/image1.jpg" },
    { name: "Marie Angela", role: "Artist", img: "path/to/image2.jpg" },
    { name: "Freddie Sho", role: "Brand Designer", img: "path/to/image3.jpg" },
    { name: "Ellise Chester", role: "Web Designer", img: "path/to/image4.jpg" },
    { name: "Patric Lazy", role: "Brand Designer", img: "path/to/image5.jpg" },
    { name: "Ashley Cooper", role: "UI/UX Designer", img: "path/to/image6.jpg" },
    { name: "Arden Dean", role: "UI/UX Designer", img: "path/to/image7.jpg" },
  ];

  // Filtered users based on search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-60 transition-transform duration-300 ease-in-out transform lg:translate-x-0 ${menuBar ? 'translate-x-0' : '-translate-x-full'} lg:static lg:w-60`}
      >
        <AdminSidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Toggle Button */}
        <button
          aria-label="Toggle sidebar"
          className={`absolute m-4 lg:hidden rounded-full z-20 ${menuBar ? 'hidden' : ''}`}
          onClick={handleClick}
        >
          <FaArrowCircleRight size={30} className="text-gray-600" />
        </button>

        {/* Dashboard Container */}
        <div className="p-8 m-12">
          <div className="flex justify-center items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-700">All User</h1>
          </div>

          {/* Search Bar */}
          <div className="flex border border-gray-300 rounded-lg p-2 mb-6">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleInputChange}
              className="w-full p-2 outline-none text-gray-700"
            />
          </div>

          {/* All Users Section with Scroll */}
          <aside className="p-4 bg-white rounded-lg shadow-md overflow-y-auto scrollbar-y">
            {filteredUsers.map((user, index) => (
              <div
                key={index}
                className="flex items-center mb-4 p-4 rounded-lg hover:bg-blue-50 shadow-sm transition-shadow"
              >
                {/* Profile Image */}
                <img
                  src={user.img}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                
                {/* User Info */}
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-800">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.role}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button className="bg-slate-500 text-white px-3 py-1 rounded-lg text-xs">Level</button>
                  <button className="bg-red-400 text-white px-3 py-1 rounded-lg text-xs">Edit</button>
                  <button className="bg-blue-400 text-white px-3 py-1 rounded-lg text-xs">View</button>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </div>
  );
}

export default AdminLevel;
