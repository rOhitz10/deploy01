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
        'http://localhost:3000/api/v1/send-request',
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
    }
  };

  return (
    <div className="flex flex-col items-center justify-start px-8 transition-all duration-300">
      {showErr && (
        <div className="text-red-500 bg-red-100 text-center p-2 m-4">{showErr}</div>
      )}
      <div className="p-8 flex gap-4 justify-between items-center">
        {/* Display name for clarity, but make input readOnly */}
        <input
          type="text"
          placeholder={Data?.name }
          
          readOnly
          className="w-full p-2 text-gray-700 border-2 border-black"
        />
        <button
          className="py-2 px-4 border-2 rounded-xl hover:bg-slate-600"
          onClick={fetch}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default SendRequest;
