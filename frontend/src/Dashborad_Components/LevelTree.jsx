import React, { useEffect, useRef, useState } from 'react';
import { FaSearch, FaRedoAlt, FaUserCircle, FaArrowCircleRight } from 'react-icons/fa';
import { LuArrowUpSquare } from "react-icons/lu";
import Sidebar from './Sidebar';
import Header from './Header';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const LevelCard = ({ node, grandChildCount }) => {
  const { name, epin, children } = node;

  return (
    <div className="flex border-2 shadow-lg p-2 min-w-full h-52">
      <div className="flex flex-col justify-center items-center px-6 border-r-2">
        <h1>LEVEL</h1>
        <h2>{children ? children.length : 0} Active</h2>
        <h2>{grandChildCount} children</h2>
        <p className="text-gray-500">{epin}</p>
      </div>
      <div className={`mt-4 flex ${children.length > 2 ? 'overflow-x-scroll rounded-lg shadow-md scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200' : ''} w-[85%]`}>
        {children.length > 0 ? (
          children.map((child) => (
            <div className="flex flex-col mx-8 justify-center items-center" key={child._id}>
              <span className="flex justify-center items-center bg-green-500 text-white rounded-full p-4">
                <FaUserCircle size={40} />
              </span>
              <h1>{child.name}</h1>
              <h1>{child.epin}</h1>
            </div>
          ))
        ) : (
          <p className="text-gray-500 p-4">No children</p>
        )}
      </div>
    </div>
  );
};

function LevelTree() {
  const [menuBar, setMenuBar] = useState(false);
  const sidebarRef = useRef(null);
  const { logout } = useAuth();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
//  const [receiverId,setreceiverId] = useState('6739fc570b84042ddc72a12d');
  const [levelledUp, setlevelledUp] = useState({
    email: 0,
    level: 0,
    name: 0,
    previousLevel: 0,
    _id: 0,
  });


  const handleClick = () => {
    setMenuBar(!menuBar);
  };

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

  const token = localStorage.getItem('token')
  const receiverId = levelledUp._id;
  const handleUpdatelevel = async() => {
    if(receiverId){
      try {
        const Updatelevel = await axios.post(
          'http://localhost:3000/api/v1/send-request-for-levelup',
          { receiverId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error("update level fail:",error);
      }
    }
  }
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/v1/get-grand-nodes', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(Array.isArray(res.data.data) ? res.data.data : []);

        const levelUp = await axios.get('http://localhost:3000/api/v1/get-first-levelledUp', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setlevelledUp(levelUp.data.data[0]);
      } catch (error) {
        console.error("Cannot fetch data", error);
        if (error.response && error.response.status === 401) {
          logout();
        }
      }
    };
    fetchData();
  }, [logout]);

  const countGrandChildren = (node) => {
    if (!node.children || node.children.length === 0) return 0;
    return node.children.reduce((count, child) => count + 1 + countGrandChildren(child), 0);
  };

  // Filtered data to include search for epin and name in both nodes and children
  const filteredData = data.filter((node) =>
    node.epin.includes(searchQuery) ||
    node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (node.children && node.children.some((child) =>
      child.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      child.epin.includes(searchQuery)
    ))
  );

  // Get the first matched account for profile block display
  const profileDisplay = filteredData.length > 0 ? filteredData[0] : null;

  return (
    <div className="flex min-h-screen ">
      <div ref={sidebarRef}
        className={`fixed top-0 left-0  w-60 transition-transform duration-300 ease-in-out transform lg:translate-x-0 ${menuBar ? 'translate-x-0' : '-translate-x-full'
          }  `}
      >
        <Sidebar />
      </div>

      <div className="flex-1 lg:ml-60">
        <button
          className="absolute m-4 rounded-full z-20 lg:hidden"
          onClick={handleClick}
        >
          <FaArrowCircleRight
            size={30}
            className={`transition-transform duration-300 ${menuBar ? 'hidden' : ''
              }`}
          />
        </button>

        <Header />

        <div className="  p-8 border-2">
          <h1 className=" flex-col p-8">Level Tree</h1>
          <div className="flex space-x-4 mb-6">
            <input
              type="text"
              placeholder="Search by epin or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md">
              <FaSearch className="inline mr-2" />
              Search
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
              onClick={() => setSearchQuery('')} // Clear search query
            >
              <FaRedoAlt className="inline mr-2" />
              Reset
            </button>
          </div>

          {/* Display the selected profile or default if no match */}
          {
            profileDisplay ? (
              <div className="flex flex-col items-center">
                <div className="bg-green-500 text-white rounded-full p-4 mb-2">
                  <FaUserCircle size={50} />
                </div>
                <p className="font-semibold text-gray-700">{profileDisplay.epin ? profileDisplay.epin : ""}</p>
                <p className="text-gray-500">{profileDisplay ? profileDisplay.name : ""}</p>

              </div>
            ) : (<h1>No User Found</h1>)
          }

          {/* {
            levelledUp ? (
              <div className="flex flex-col items-center bg-slate-300 rounded-2xl p-4">
                <div className="bg-green-500 text-white rounded-full p-4 mb-2">
                  <FaUserCircle size={50} />
                </div>
                <p className="font-semibold text-gray-700">Level: {levelledUp.level}</p>
              <p className="font-semibold text-gray-700">Name: {levelledUp.name}</p>

              </div>
            ) : (<h1>No User Found</h1>)
          }  */}

          {/* <div className="flex justify-end">
            <button className="p-3" onClick={handleUpdatelevel}>
              <LuArrowUpSquare size={40} />
            </button>
          </div> */}
        </div>

        {filteredData.map((node) => (
          <LevelCard
            key={node._id}
            node={node}
            grandChildCount={countGrandChildren(node)}
          />
        ))}
      </div>
    </div>
  );
}

export default LevelTree;
