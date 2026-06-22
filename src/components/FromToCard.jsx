// Main App component for the navigation UI
import React, { useState, useEffect } from 'react';
import Select from "react-select";

const FromToCard = ({ mapData, setRoutePath, }) => {
  // State variables to hold the values of the 'From' and 'To' input fields
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  // const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(window.innerWidth > 640);
  const [error, setError] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  const selectStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "48px",
      borderRadius: "12px",
    }),
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setExpanded(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const locationOptions = [
    ...(mapData?.nodes.map(node => ({
      value: node.id,
      label: node.name,
    })) || [])
  ];

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

    // Set route path for Leaflet Routing Machine
    setRoutePath([fromLocation, toLocation]);

    if (window.innerWidth < 640) {
      setExpanded(false);
    }
  };

  const handleSwapLocations = () => {
    if (!fromLocation && !toLocation) return;

    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  if (!expanded) {
    return (
      <div className="mx-auto">
        <button
        onClick={() => setExpanded(true)}
        className="
          bg-white/85
          backdrop-blur-md
          shadow-lg
          rounded-xl
          px-5
          py-3
          font-semibold
          border
          border-gray-200
        "
        >
          🔍 Navigate Campus
        </button>
      </div>
    );
  }

  if (collapsed) {
    return (
      <div className="max-w-full sm:max-w-md w-[95vw] sm:w-[380px]
      px-5 py-6 
      rounded-3xl
      shadow-2xl
      border border-white/40
      bg-white 
      mx-auto
    ">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-extrabold text-gray-800">
            🗺️ IITH Maps
          </h1>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-xl text-gray-600 hover:text-black"
          >
            {collapsed ? "▼" : "▲"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-full sm:max-w-md w-[95vw] sm:w-[380px]
      px-5 py-6 
      rounded-3xl
      shadow-2xl
      border border-white/40
      bg-white 
      mx-auto
    ">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-extrabold text-gray-800">
          🗺️ IITH Maps
        </h1>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-xl text-gray-600 hover:text-black"
        >
          {collapsed ? "▼" : "▲"}
        </button>
      </div>

      {!collapsed && (
        <>
          <p className="text-sm text-center text-gray-600 mt-2 mb-5">
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

            <Select
              styles={selectStyles}
              options={locationOptions}
              value={
                locationOptions.find(
                  option => option.value === fromLocation
                ) || null
              }
              onChange={(selected) =>
                setFromLocation(selected?.value || "")
              }
              placeholder="Search starting point..."
              isSearchable
            />
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

            <Select
              styles={selectStyles}
              options={locationOptions.filter(
                option => option.value !== "my-location"
              )}
              value={
                locationOptions.find(
                  option => option.value === toLocation
                ) || null
              }
              onChange={(selected) =>
                setToLocation(selected?.value || "")
              }
              placeholder="Search destination..."
              isSearchable
            />
          </div>

          <button
            onClick={() => {
              handleShowDirections();
              setCollapsed(true);
            }}
            className="
              w-full
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              hover:from-blue-700
              hover:to-indigo-700
              shadow-lg
              text-white
              font-semibold
              py-3
              rounded-xl
              transition
              "
          >
            Show Route
          </button>
        </>
      )}
    </div>
  );
};

export default FromToCard;