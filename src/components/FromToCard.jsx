import React, { useState } from 'react';

// Main App component for the navigation UI
const FromToCard = () => {
  // State variables to hold the values of the 'From' and 'To' input fields
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');

  // Handler for the 'Show Directions' button click
  const handleShowDirections = () => {
    // In a real application, you would integrate with a mapping API here
    // to fetch and display directions based on fromLocation and toLocation.
    console.log('Fetching directions from:', fromLocation, 'to:', toLocation);
    // You could also add validation or loading states here.

    // For demonstration, we'll just show an alert (in a real app, use a modal)
    // Removed alert as per instructions, will just log to console.
    // In a production app, you'd show directions on a map or a new screen.
    alert(`Showing directions from "${fromLocation}" to "${toLocation}". (This would connect to a map service!)`);
  };

  return (
    // Main container for the application, centered on the screen with a yellow-orange gradient background

    <div className="justify-center bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200 bg-gradient-to-r from-yellow-300 to-orange-500">
    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        IITH MAPS
    </h1>

    {/* 'From' location input group */}
    <div className="mb-4">
        <label htmlFor="from" className="block text-gray-700 text-sm font-semibold mb-2">
        From:
        </label>
        <input
        type="text"
        id="from"
        className="shadow-sm appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        placeholder="Your current location or starting point"
        value={fromLocation}
        onChange={(e) => setFromLocation(e.target.value)}
        />
    </div>

    {/* 'To' location input group */}
    <div className="mb-6">
        <label htmlFor="to" className="block text-gray-700 text-sm font-semibold mb-2">
        To:
        </label>
        <input
        type="text"
        id="to"
        className="shadow-sm appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        placeholder="Your destination"
        value={toLocation}
        onChange={(e) => setToLocation(e.target.value)}
        />
    </div>

    {/* Show Directions button */}
    <button
        onClick={handleShowDirections}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 transform hover:scale-105"
    >
        Show Directions
    </button>
    </div>
  );
};

export default FromToCard;
