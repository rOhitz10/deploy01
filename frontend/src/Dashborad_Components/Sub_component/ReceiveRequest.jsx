import { useState } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';

function ReceiveRequest({ Data, Count = 0 }) {
  const [requests, setRequests] = useState(Data);
  const [errorMessage, setErrorMessage] = useState(null);

  const userId = localStorage.getItem('epin');

  // Function to handle acceptance of a request
  const handleAccept = async (requestId) => {
    try {
      const response = await axios.put(
        `/api/v1/accept/${requestId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      const newStatus = response.data.data.status;

      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId ? { ...request, status: newStatus } : request
        )
      );
      setErrorMessage(null); // Clear any previous errors
    } catch (error) {
      setErrorMessage('Failed to accept the request. Please try again.');
      console.error('Failed to accept request:', error);
    }
  };

  // Function to handle rejection of a request
  const handleReject = async (requestId) => {
    try {
      const response = await axios.put(
        `/api/v1/reject/${requestId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      const newStatus = response.data.data.status;

      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId ? { ...request, status: newStatus } : request
        )
      );
      setErrorMessage(null); // Clear any previous errors
    } catch (error) {
      setErrorMessage('Failed to reject the request. Please try again.');
      console.error('Failed to reject request:', error);
    }
  };

  return (
    <div className="overflow-y-auto h-80 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-4">
      {errorMessage && (
        <div className="text-red-500 text-sm bg-red-100 border border-red-500 p-2 rounded-md mb-4">
          {errorMessage}
        </div>
      )}

      {requests.length > 0 ? (
        requests.map((request) => (
          <div
            key={request._id}
            className="flex items-center justify-between p-4 mb-4 bg-white shadow hover:shadow-green-300 rounded-lg transition-all duration-300 hover:shadow-md"
          >
            <div className="flex items-center space-x-4">
              <div className="text-sm font-medium text-gray-700">
                {request.senderId?.name || 'Unknown Sender'}
              </div>
            </div>

            <div className="flex space-x-3">
              {request.status === 'pending' && (
                <>
                  <button
                    className="flex items-center px-3 py-1 text-sm font-medium text-green-600 border border-green-500 rounded hover:bg-green-500 hover:text-white transition"
                    onClick={() => handleAccept(request._id)}
                  >
                    <FaCheck className="mr-1" /> Accept
                  </button>
                  <button
                    className="flex items-center px-3 py-1 text-sm font-medium text-red-600 border border-red-500 rounded hover:bg-red-500 hover:text-white transition"
                    onClick={() => handleReject(request._id)}
                  >
                    <FaTimes className="mr-1" /> Reject
                  </button>
                </>
              )}

              {request.status === 'accepted' && (
                <span className="px-3 py-1 text-sm font-medium text-green-600 border border-green-500 rounded">
                  Accepted
                </span>
              )}

              {request.status === 'rejected' && (
                <span className="px-3 py-1 text-sm font-medium text-red-600 border border-red-500 rounded">
                  Rejected
                </span>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">
          <p>No requests available.</p>
        </div>
      )}
    </div>
  );
}

export default ReceiveRequest;
