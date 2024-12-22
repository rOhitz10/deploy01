import axios from 'axios';
import { useState } from 'react';

function SendRequest({ sendData }) {
  const [showErr, setShowErr] = useState('');
  const [view, setView] = useState(false);
  const [financialDetails, setFinancialDetails] = useState(null);
  const token = localStorage.getItem('token');

  const receiverId = sendData?._id || null;
  const epin = sendData?.epin || ''; // Ensure epin exists before usage

  const handleView = async () => {
    try {
      const response = await axios.get(
        "/api/v1/get-financial-detail",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        { epin : epin }, // Pass epin as query parameter
      );

      setFinancialDetails(response.data);
      setView(true);
    } catch (error) {
      console.error("Cannot fetch financial detail", error);
      setShowErr('Unable to fetch financial details.');
    }
  };

  const fetch = async () => {
    if (!token) {
      setShowErr('Authorization token is missing. Please log in again.');
      return;
    }

    try {
      await axios.post(
        "/api/v1/send-request",
        { receiverId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowErr('Request sent successfully!');
    } catch (error) {
      const errorMessage = error.response?.data?.msg || 'Request failed. Please try again.';
      setShowErr(errorMessage);
      console.error('Error while sending request:', error);
    }
  };

  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      setView(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start m-8 transition-all duration-300">
      {showErr && (
        <div className="text-red-500 bg-red-100 text-center p-2 m-4">{showErr}</div>
      )}
      <div className="flex items-center justify-between p-4 mb-4 bg-white shadow hover:shadow-red-400 rounded-lg transition-all duration-300 hover:shadow-md">
        <input
          placeholder={sendData ? sendData.name : "No user for send request"}
          readOnly
          className="w-full p-2 font-bold text-blue-200"
        />
        <button
          className="flex items-center mx-2 px-3 py-1 text-sm font-medium text-green-600 border border-green-500 rounded hover:bg-green-500 hover:text-white transition"
          onClick={fetch}
        >
          Send
        </button>
        <button
          className="flex items-center mx-2 px-3 py-1 text-sm font-medium text-red-600 border border-red-500 rounded hover:bg-red-500 hover:text-white transition"
          onClick={handleView}
        >
          View
        </button>
      </div>

      {view && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div className="bg-white p-8 rounded-lg shadow-lg relative max-w-md w-full">
            <button
              onClick={() => setView(false)}
              className="absolute top-2 right-2 text-lg text-gray-600"
            >
              ✖
            </button>
            <h2 className="text-2xl font-semibold mb-4">Details for {sendData?.name}</h2>
            <p><strong>Receiver ID:</strong> {sendData?._id}</p>
            <p><strong>Email:</strong> {sendData?.email}</p>

            {financialDetails && (
              <div className="mt-4">
                <p><strong>Mobile:</strong> {financialDetails.phoneNumber}</p>
                <p><strong>Financial Details:</strong></p>
                <p><strong>AccountHolderName:</strong> {financialDetails.financialDetails.accountHolderName}</p>
                <p><strong>AccountNumber:</strong> {financialDetails.financialDetails.accountNo}</p>
                <p><strong>Bank Name:</strong> {financialDetails.financialDetails.bankName}</p>
                <p><strong>GooglePay:</strong> {financialDetails.financialDetails.googlePay}</p>
                <p><strong>IFSC Code:</strong> {financialDetails.financialDetails.ifscCode}</p>
                <p><strong>PhonePe:</strong> {financialDetails.financialDetails.phonePe}</p>

                <ul>
                  {financialDetails.transactions?.map((tx, index) => (
                    <li key={index}>
                      {tx.date} - {tx.amount}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SendRequest;
