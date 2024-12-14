// import { useEffect, useState, useRef } from 'react';
// import { BsShieldLock } from 'react-icons/bs';
// import Sidebar from './Sidebar';
// import Header from './Header';
// import { FaArrowCircleRight } from 'react-icons/fa';
// import axios from 'axios';
// import { useAuth } from '../AuthContext';
// import ReceiveRequest from './Sub_component/ReceiveRequest';
// import SendRequest from './Sub_component/SendRequest';

// const DashHome = () => {
//   const {logout} = useAuth();
//   const [data, setData] = useState({
//     totalCount: 0,
//     referrals: 0,
//     epins: 0,
//     currentStatus: 'Pending',
//   });
//   const [activeUsers, setActiveUser] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [copy, setCopy] = useState(false);
//   const [menuBar, setMenuBar] = useState(false);
//   const sidebarRef = useRef(null); // Ref to track sidebar element
//   const [receive,setreceive] = useState(false) //for receive button
  
//   const [send,setsend] = useState(false) //for send button
//   const [sendError,setsendError] = useState(null)
//   const [senddata, setsendData] = useState({
//     email: 0,
//     level: 0,
//     levelUpdateAt: 0,
//     name: 0,
//     _id: 0,
//   })
//   const [receiveCount, setreceiveCount] = useState('');
//   const sponsorId = localStorage.getItem('sponsorId');
//   const textToCopy = `http://localhost:8000/r/signup/${sponsorId}`;

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(textToCopy);
//       setCopy(true);
//       setTimeout(() => setCopy(false), 2000);
//     } catch (error) {
//       console.log('Error copying to clipboard', error);
//     }
//   };

//   const handleClick = () => {
//     setMenuBar(!menuBar);
//   };

//   const handleOutsideClick = (event) => {
//     if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//       setMenuBar(false); // Close the sidebar if clicked outside
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleOutsideClick);
//     return () => {
//       document.removeEventListener('mousedown', handleOutsideClick);
//     };
//   }, []);

//   // console.log("sponsorId", sponsorId);

//   // send and receive requst
// const handleReceive = () => {
//  setreceive(!receive);
// }

// // api for get user for request 
// const handleSend = async() => {
//   try {
//     const ans = await axios.get("http://localhost:3000/api/v1/get-user-for-request", {
//       headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
//     });

//     if (ans.data.data[0]) { 
//       setsendData(ans.data.data[0]);
//       console.log(ans.data.data[0],"dsscas");
//     }
//     else{
//       setsendData(ans.data.data)
//       console.log(ans.data.data,"12355");
      
//     }
//     setsendError(!sendError);
    
//   } catch (error) {
//     const errorMessage = error.response?.data?.msg || ' Please try again.';
//     setsendError(errorMessage)
//     console.error("Fail to fetch",error);
//   } 
//   setsend(!send);
// }


// useEffect(()=>{
//   // handleSend();
//   console.log("looooooooo");
  
// },[handleSend])


//   useEffect(() => {
//     const fetchData = async () => {
//       if (sponsorId) {
//         try {
//           const response = await axios.get("http://localhost:3000/api/v1/count-all-downline", {
//             params: { sponsorId }, // Pass sponsorId as a query parameter
//             headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }, // Add auth token if required
//           });
//           setData(response.data);

//           const res = await axios.get("http://localhost:3000/api/v1/count-all-direct-downline", {
//             params: { sponsorId },
//             headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
//           });         
//           setActiveUser(res.data.totalCount);
         
         
          

//         } catch (error) {
//           if (error.response && error.response.status === 401) {
//             logout();
//           }
//           setError(`Error fetching data: ${error.response ? error.response.data.message : error.message}`);
//           console.error('Error fetching data:', error);
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [sponsorId]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div
//         ref={sidebarRef}
//         className={`fixed  top-0 left-0  w-60 transition-transform duration-300 ease-in-out transform lg:translate-x-0 ${menuBar ? 'translate-x-0' : '-translate-x-full'} `}
//       >
//         <Sidebar />
//       </div>

//       {/* Main content */}
//       <div className="flex-1 lg:ml-60 ">
//         <button
//           className={`absolute m-4 lg:hidden rounded-full z-20  ${menuBar ? 'hidden' : ''}`}
//           onClick={handleClick}
//         >
//           <FaArrowCircleRight size={30} className={`transition-transform duration-300 `} />
//         </button>

//         <Header />

//         {copy && <div className='absolute top-22 w-full  flex justify-center items-center  h-12 bg-red-200'> <h1 className='text-2xl text-red-600'>Copied!</h1></div>}
//         <div className="p-8">
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-2xl font-semibold">Dashboard</h1>
//             <div className="text-sm ml-8">
//               <label className="block text-gray-500">My Referral Link:</label>
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="text"
//                   readOnly
//                   value={textToCopy}
//                   className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 w-full"
//                 />
//                 <button
//                   className="px-2 py-1 bg-gray-100 rounded-md hover:bg-gray-200"
//                   onClick={handleCopy}
//                 >
//                   {copy ? '✅' : '📋'}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Cards Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//             <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
//               <div>
//                 <h2 className="text-sm text-gray-500">TOTAL USERS</h2>
//                 <span className="text-xl font-semibold">{data.totalCount}</span>
//               </div>
//               <div className="bg-blue-100 p-3 rounded-full text-blue-500">👥</div>
//             </div>
//             <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
//               <div>
//                 <h2 className="text-sm text-gray-500">ACTIVE USERS</h2>
//                 <span className="text-xl font-semibold">{data.totalCount}</span>
//               </div>
//               <div className="bg-green-100 p-3 rounded-full text-green-500">👥</div>
//             </div>
//             <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
//               <div>
//                 <h2 className="text-sm text-gray-500">REFERRALS</h2>
//                 <span className="text-xl font-semibold">{activeUsers}</span>
//               </div>
//               <div className="bg-purple-100 p-3 rounded-full text-purple-500">👤</div>
//             </div>
//           </div>

//           {/* Epin Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
//               <div>
//                 <h2 className="text-sm text-gray-500">EPINS</h2>
//                 <span className="text-xl font-semibold">{data.epins}</span>
//               </div>
//               <div className="bg-blue-100 p-3 rounded-full text-blue-500">
//                 <BsShieldLock />
//               </div>
//             </div>

//             {/* CURRENT STATUS */}
//             <div className="bg-white p-4 rounded-lg shadow-md text-center">
//               <h2 className="text-sm text-gray-500">CURRENT STATUS</h2>
//               <span className="text-xl font-semibold text-blue-500">{data.currentStatus}</span>
//             </div>
//           </div>

//           {/* Action Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6" >
//             <div className="border-2 border-green-400 rounded-lg text-center ">
//               <h2 className="text-xl font-semibold text-green-500">Receive Help</h2>
//               <button className="my-4 px-4 py-2 bg-green-500 text-white rounded-full" onClick={handleReceive}>
//                {receiveCount} Receive Link Available
//               </button>
//               {receive && <ReceiveRequest setreceiveCount={setreceiveCount} />}
//               </div>
//             <div className="border-2 border-red-400 rounded-lg p-6 text-center">
//               <h2 className="text-xl font-semibold text-red-500">Send Help</h2>
//               <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-full" onClick={handleSend}>
//                 Send Link Available 
//               </button>
//               {sendError? (
//                 <div className="text-red-500 bg-red-100   text-center  p-2 m-4">
//             {sendError}
//           </div> 
//           ):
//               (!sendError && <SendRequest Data={senddata}/> 
//               )
//           }
              
//             </div>
//           </div>
//         </div>
        
//       </div>
//     </div>
//   );
// };

// export default DashHome;

























import { useEffect, useState, useRef } from 'react';
import { BsShieldLock } from 'react-icons/bs';
import Sidebar from './Sidebar';
import Header from './Header';
import { FaArrowCircleRight } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import ReceiveRequest from './Sub_component/ReceiveRequest';
import SendRequest from './Sub_component/SendRequest';

const DashHome = () => {
  const { logout } = useAuth();
  const [data, setData] = useState({
    totalCount: 0,
    referrals: 0,
    epins: 0,
    currentStatus: 'Pending',
  });
  const [activeUsers, setActiveUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copy, setCopy] = useState(false);
  const [menuBar, setMenuBar] = useState(false);
  const sidebarRef = useRef(null); // Ref to track sidebar element
  const [receive, setReceive] = useState(false); // For receive button
  const [send, setSend] = useState(false); // For send button
  const [sendError, setSendError] = useState(null);
  const [sendData, setSendData] = useState(null); // Changed to null initially for clarity
  const [receiveCount, setReceiveCount] = useState('');

  const sponsorId = localStorage.getItem('sponsorId');
  const textToCopy = `http://localhost:8000/r/signup/${sponsorId}`;

  // Handle copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopy(true);
      setTimeout(() => setCopy(false), 2000);
    } catch (error) {
      console.log('Error copying to clipboard', error);
    }
  };

  // Handle menu bar toggling
  const handleClick = () => {
    setMenuBar(!menuBar);
  };

  const handleOutsideClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setMenuBar(false); // Close the sidebar if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // Toggle receive state and ensure send is closed
  const handleReceive = () => {
    setReceive(true);  // Open Receive
    setSend(false);    // Close Send
    setSendError(null)
  };

  // Toggle send state and ensure receive is closed
  const handleSend = async () => {
    setReceive(false);  // Close Receive
    setSend(true);      // Open Send

    try {
      const ans = await axios.get("/api/v1/get-user-for-request", {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      
      
      if (ans.data.data[0]) {
        setSendData(ans.data.data[0]);
      } else {
        setSendData(ans.data.data);
      }
     
      
      setSendError(null); // Reset error state on success
    } catch (error) {
      const errorMessage = error.response?.data?.msg || 'Please try again.';
      setSendError(errorMessage);
    }
  };

  // API function to fetch data (to avoid repetition)
  const fetchData = async () => {
    if (sponsorId) {
      try {
        const response = await axios.get("/api/v1/count-all-downline", {
          params: { sponsorId },
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        setData(response.data);

        const res = await axios.get("/api/v1/count-all-direct-downline", {
          params: { sponsorId },
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        setActiveUsers(res.data.totalCount);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          logout();
        }
        setError(`Error fetching data: ${error.response ? error.response.data.message : error.message}`);
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  // UseEffect to fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, [sponsorId]); // Only runs when sponsorId changes

  // Loading and error handling
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 w-60 transition-transform duration-300 ease-in-out transform lg:translate-x-0 ${menuBar ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 lg:ml-60">
        <button
          className={`absolute m-4 lg:hidden rounded-full z-20 ${menuBar ? 'hidden' : ''}`}
          onClick={handleClick}
        >
          <FaArrowCircleRight size={30} className="transition-transform duration-300" />
        </button>

        <Header />

        {copy && (
          <div className="absolute top-22 w-full flex justify-center items-center h-12 bg-red-200">
            <h1 className="text-2xl text-red-600">Copied!</h1>
          </div>
        )}
        <div className="p-8 ">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className="text-sm ml-8">
              <label className="block text-gray-500">My Referral Link:</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  readOnly
                  value={textToCopy}
                  className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 w-full"
                />
                <button className="px-2 py-1 bg-gray-100 rounded-md hover:bg-gray-200" onClick={handleCopy}>
                  {copy ? '✅' : '📋'}
                </button>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <h2 className="text-sm text-gray-500">TOTAL USERS</h2>
                <span className="text-xl font-semibold">{data.totalCount}</span>
              </div>
              <div className="bg-blue-100 p-3 rounded-full text-blue-500">👥</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <h2 className="text-sm text-gray-500">ACTIVE USERS</h2>
                <span className="text-xl font-semibold">{activeUsers}</span>
              </div>
              <div className="bg-green-100 p-3 rounded-full text-green-500">👥</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <h2 className="text-sm text-gray-500">REFERRALS</h2>
                <span className="text-xl font-semibold">{data.referrals}</span>
              </div>
              <div className="bg-purple-100 p-3 rounded-full text-purple-500">👤</div>
            </div>
          </div>

          {/* Epin Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <h2 className="text-sm text-gray-500">EPINS</h2>
                <span className="text-xl font-semibold">{data.epins}</span>
              </div>
              <div className="bg-blue-100 p-3 rounded-full text-blue-500">
                <BsShieldLock />
              </div>
            </div>

            {/* CURRENT STATUS */}
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <h2 className="text-sm text-gray-500">CURRENT STATUS</h2>
              <span className="text-xl font-semibold text-blue-500">{data.currentStatus}</span>
            </div>
          </div>

          {/* Buttons for Receive and Send */}
          <div className="mt-6 flex justify-center items-center gap-8">
            <button onClick={handleReceive} className="bg-blue-600 text-white py-2 px-4 rounded-md">
              {receive ? `Close Receive Request ${receiveCount}` : 'Open Receive Request'}
            </button>
            <button onClick={handleSend} className="ml-4 bg-green-600 text-white py-2 px-4 rounded-md">
              {send ? 'Close Send Request' : 'Open Send Request'}
            </button>
          </div>

          {/* Conditionally Render ReceiveRequest or SendRequest */}
          <div className=' flex flex-col justify-center items-center '>
            <div className='max-w-[80%]'>

          {receive && <ReceiveRequest setReceiveCount={setReceiveCount}/>}

          {sendError && (
            <div className="text-red-500 bg-red-100   text-center  p-2 m-4">
        {sendError}
        </div> 
          )
        }
        {send && <SendRequest sendData={sendData} />}
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashHome;
