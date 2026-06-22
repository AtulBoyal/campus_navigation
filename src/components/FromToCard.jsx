// Main App component for the navigation UI
import React, { useState } from 'react';

const FromToCard = ({ mapData, setRoutePath, userLocation }) => {
  // State variables to hold the values of the 'From' and 'To' input fields
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handler for the 'Show Directions' button click
  const handleShowDirections = () => {
    setError("");

    if (!fromLocation || !toLocation) {
      setError('Please select both source and destination.');
      return;
    }

    if (fromLocation === toLocation) {
      setError('Source and destination must be different.');
      return;
    }

    if (fromLocation === 'my-location' && !userLocation) {
      setError("Please detect your location first.");
      return;
    }

    // Set route path for Leaflet Routing Machine
    setRoutePath([fromLocation, toLocation]);
  };

  const handleSwapLocations = () => {
    setFromLocation(toLocation);
    setToLocation(fromLocation);
  };

  return (
    <div className="max-w-full sm:max-w-md w-[90vw]
      px-5 py-6 
      rounded-2xl shadow-xl border border-gray-200
      bg-white 
      mx-auto
    ">
      <h1 className="text-2xl font-bold text-center text-gray-800">
        IITH MAPS
      </h1>

      <p className="text-sm text-center text-gray-500 mt-1 mb-5">
        Find the shortest route between campus locations
      </p>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* FROM */}
      <div className="mb-4">
        <label 
          htmlFor="from" 
          className="block text-gray-700 text-sm font-semibold mb-2">
          From
        </label>

        <select
          id="from"
          value={fromLocation}
          onChange={(e) => setFromLocation(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select starting point</option>

          {userLocation && 
            <option value="my-location">
              My Location
            </option>
          
          }
          {mapData?.nodes.map((node) => (
            <option key={node.id} value={node.id}>
              {node.name}
            </option>
          ))}
        </select>
      </div>

      {/* SWAP BUTTON */}
      <div className="flex justify-center mb-4">
          <button
            type="button"
            onClick={handleSwapLocations}
            className="w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-100 transition"
            title="Swap Locations"
          >
            ⇅
          </button>
      </div>

      {/* TO */}
      <div className="mb-6">
        <label 
          htmlFor="to" 
          className="block text-gray-700 text-sm font-semibold mb-2">
          To
        </label>

        <select
          id="to"
          value={toLocation}
          onChange={(e) => setToLocation(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        className="
          w-full
          bg-blue-600
          hover:bg-blue-700
          text-white
          font-semibold
          py-3
          rounded-xl
          transition
        "
      >
        Show Route
      </button>
    </div>
  );
};

export default FromToCard;