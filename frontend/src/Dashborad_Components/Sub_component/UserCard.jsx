import React from 'react';

const UserCard = ({ user }) => {
  const {
    epin,
    name,
    email,
    number,
    sponsoredBy,
    joinedAt,
    activatedAt,
    selfInvestment,
    teamInvestment,
    totalActivated,
    totalDirectActivated,
  } = user;

  return (
    <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-6 space-y-4 md:space-y-0 md:space-x-6">
      {/* User ID and Actions */}
      <div className="flex flex-col space-y-2 md:w-1/4">
        <div className="text-gray-600 font-semibold">ID: {epin}</div>
        <div className="text-gray-500 text-sm">Sponsored By {sponsoredBy}</div>
        <div className="flex space-x-4">
          level:
        </div>
      </div>

      {/* Personal and Team Details */}
      <div className="flex flex-col md:flex-row justify-between md:w-2/3 space-y-4 md:space-y-0">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-700">PERSONAL DETAILS</h3>
          <p className="text-gray-600">Name: {name}</p>
          <p className="text-gray-600">Email: {email}</p>
          <p className="text-gray-600">Phone: {number}</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-700">TEAM</h3>
         
          <p className="text-gray-600">
            {totalActivated} total ({totalActivated} activated)
          </p>
          <p className="text-gray-600">
            {totalDirectActivated} direct ({totalDirectActivated} activated)
          </p>
        </div>
      </div>

      {/* Joined and Activated Info */}
      <div className="md:w-1/4 text-gray-500 text-sm">
        <p>
          Joined on: {joinedAt} | Activated on: {activatedAt}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
