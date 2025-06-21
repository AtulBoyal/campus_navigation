// Main App component for the navigation UI
import React, { useState } from 'react';

const FromToCard = ({ mapData, setRoutePath }) => {
  // State variables to hold the values of the 'From' and 'To' input fields
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handler for the 'Show Directions' button click
  const handleShowDirections = () => {
    if (!fromLocation || !toLocation) {
      console.log('Please select both start and end locations');
      return;
    }

    if (fromLocation === toLocation) {
      setError('Please select different locations');
      return;
    }

    setError(null);
    setLoading(true);

    // Set route path for Leaflet Routing Machine
    setRoutePath([fromLocation, toLocation]);
    
    setLoading(false);
  };

  return (
    <div className="justify-center bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200 bg-gradient-to-r from-yellow-300 to-orange-500">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        IITH MAPS
      </h1>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-center">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="from" className="block text-gray-700 text-sm font-semibold mb-2">
          From:
        </label>
        <select
          id="from"
          className="shadow-sm appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          value={fromLocation}
          onChange={(e) => setFromLocation(e.target.value)}
        >
          <option value="">Select starting point</option>
          {mapData?.nodes.map((node) => (
            <option key={node.id} value={node.id}>
              {node.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="to" className="block text-gray-700 text-sm font-semibold mb-2">
          To:
        </label>
        <select
          id="to"
          className="shadow-sm appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          value={toLocation}
          onChange={(e) => setToLocation(e.target.value)}
        >
          <option value="">Select destination</option>
          {mapData?.nodes.map((node) => (
            <option key={node.id} value={node.id}>
              {node.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleShowDirections}
        disabled={loading}
        className={`w-full text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 transform ${
          loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
        }`}
      >
        {loading ? 'Calculating...' : 'Show Directions'}
      </button>
    </div>
  );
};

export default FromToCard;