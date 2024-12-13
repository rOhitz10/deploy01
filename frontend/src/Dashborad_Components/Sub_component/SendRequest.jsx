import axios from 'axios';
import { useState } from 'react';

function SendRequest({ Data }) {
  const [showErr, setShowErr] = useState('');

  const receiverId = Data?._id  || null; // Ensures `Data` is defined


  const fetch = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setShowErr('Authorization token is missing. Please log in again.');
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/send-request",
        { receiverId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    
      // Optionally handle success state here
    } catch (error) {
      const errorMessage = error.response?.data?.msg || 'Request failed. Please try again.';
      setShowErr(errorMessage);
      console.error('Error while sending request:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start px-8 transition-all duration-300">
      {showErr && (
        <div className="text-red-500 bg-red-100 text-center p-2 m-4">{showErr}</div>
      )}
      <div className="p-8 flex  justify-between items-center">
        {/* Display name for clarity, but make input readOnly */}
        <input
          
          placeholder={Data? Data.name:"no user for send request" }
          
          readOnly
          className="w-full p-2 font-bold  border-2  rounded-2xl rounded-r-none "
        />
         <button
          className="bg-indigo-300 text-indigo-900 font-semibold  relative right-4 py-2 px-4  border-2 rounded-2xl hover:bg-sky-300 "
          onClick={fetch}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default SendRequest;
