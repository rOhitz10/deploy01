import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ReceiveRequest({ setreceiveCount }) {
  const [requests, setRequests] = useState([]);
  const userId = localStorage.getItem('sponsorId'); // Get sponsorId from localStorage for API usage.

  // Function to handle acceptance of a request
  const handleAccept = async (requestId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/accept/${requestId}`,
        {}, // Empty body for PUT request
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      const newStatus = response.data.data.status;

      // Update the status in the local requests array
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId ? { ...request, status: newStatus } : request
        )
      );
    } catch (error) {
      console.error('Failed to accept request:', error);
    }
  };

  // Function to handle rejection of a request
  const handleReject = async (requestId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/reject/${requestId}`,
        {}, // Empty body for PUT request
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      const newStatus = response.data.data.status;

      // Update the status in the local requests array
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId ? { ...request, status: newStatus } : request
        )
      );
    } catch (error) {
      console.error('Failed to reject request:', error);
    }
  };

  // Fetch pending requests from the server
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/my-requests', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const requestsData = response.data.data;
        setRequests(requestsData);

        // Update pending requests count in the parent component
        const pendingCount = requestsData.filter((req) => req.status === 'pending').length;
        setreceiveCount(pendingCount);
      } catch (error) {
        console.error('Failed to fetch requests:', error);
      }
    };

    fetchRequests();
  }, [setreceiveCount]); // Dependency ensures the count updates properly.

  return (
    <div className="overflow-y-auto h-80 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      {/* Render the requests */}
      {requests.map((data) => (
        <div
          key={data._id}
          className=" flex items-center justify-center py-4 mb-4  border-b-2 border-gray-950  border-dotted transition-all duration-300 "
        >
          <div className="flex justify-center items-center space-x-2 ">
            <div className=" overflow-clip py-2 min-w-[100px]  text-black text-center border-2 border-gray-500 rounded-md bg-gray-100">
              {data.senderId.name}
            </div>
            
            {/* Accept button, hidden if already accepted */}
            {data.status === 'accepted' || data.status === 'pending' ? (
              <button
                className="py-2 px-4 border-2 rounded-xl hover:bg-green-500 hover:text-white border-green-500 transition duration-200"
                onClick={() => handleAccept(data._id)}
                disabled={data.status === 'accepted'}
              >
                {data.status === 'accepted' ? 'Accepted' : 'Accept'}
              </button>
            ) : null}

            {/* Reject button, hidden if already rejected */}
            {!data.status === 'accepted' || data.status === 'pending' ? (
              <button
                className="py-2 px-4 border-2 rounded-xl hover:bg-red-500 hover:text-white border-red-500 transition duration-200"
                onClick={() => handleReject(data._id)}
                disabled={data.status === 'rejected'}
              >
                {data.status === 'rejected' ? 'Rejected' : 'Reject'}
              </button>
            ) : null}
          </div>
        </div>
      ))}

      {/* Handle empty state */}
      {requests.length === 0 && (
        <div className="text-center text-gray-500 mt-4">No requests available.</div>
      )}
    </div>
  );
}

export default ReceiveRequest;
