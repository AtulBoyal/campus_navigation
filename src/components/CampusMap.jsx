import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON , Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; 
import { toast } from "react-toastify";

import FromToCard from './FromToCard';
import Routing from './Routing';

// Fix for default marker icon in Leaflet with React (important for Point GeoJSON)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({                 
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const CampusMap = () => {
  const [buildingsData, setBuildingsData] = useState(null);
  const [pathsData, setPathsData] = useState(null);
  const [mapData, setMapData] = useState(null);
  const [routePath, setRoutePath] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  const isInsideIITH = (coords) => {
    const [lat, lng] = coords;

    // Define bounds around IITH campus [You can fine-tune these]
    const IITH_BOUNDS = {
      minLat: 17.581, 
      maxLat: 17.604,
      minLng: 78.118,
      maxLng: 78.129
    };

    return (
      lat >= IITH_BOUNDS.minLat &&
      lat <= IITH_BOUNDS.maxLat &&
      lng >= IITH_BOUNDS.minLng &&
      lng <= IITH_BOUNDS.maxLng
    );
  };

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = [position.coords.latitude, position.coords.longitude];
        if (isInsideIITH(coords)) {
          setUserLocation(coords);
        }
      },
      (error) => {
        console.warn("Auto-location detection failed", error);
      }
    );
  }, []);

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation not supported');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = [position.coords.latitude, position.coords.longitude];
        if (!isInsideIITH(coords)) {
          toast.error('You are currently outside IITH. This app is meant for navigating inside the campus.');
          return;
        }
        setUserLocation(coords);
        toast.success('Location detected successfully! You can now select "My Location" in the From dropdown.');
      },
      (error) => {
        toast.error('Unable to detect location. Check your location access');
      }
    );
  };

  // Fetch backend map data (nodes, edges)
  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL)
    .then(res => res.json())
    .then(data => {
      console.log("Map data loaded:", data);
      setMapData(data);
    });
  }, []);

  
  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // IMPORTANT: Use process.env.PUBLIC_URL to correctly reference files in the public folder.
        // The browser will request these files directly from the web server.
        const buildingsRes = await fetch(`${process.env.PUBLIC_URL}/data/buildings.geojson`);
        const pathsRes = await fetch(`${process.env.PUBLIC_URL}/data/paths.geojson`);
        const [buildingsJson, pathsJson] = await Promise.all([
          buildingsRes.json(),
          pathsRes.json()
        ]);
        
        setBuildingsData(buildingsJson);
        setPathsData(pathsJson);
        // setPoisData(poisJson);
      } catch (error) {
        console.error("Error fetching GeoJSON data:", error);
      }
    };
    
    fetchData();
  }, []); // The empty array ensures this effect runs only once after the initial render
  
  
  // Find a central coordinate for your campus from your data or estimate
  const campusCenter = [17.59741, 78.12283]; 
  const defaultZoom = 17; // Adjust zoom level to fit your campus
  
  const onEachFeature = (feature, layer) => {
    if (feature.properties?.name) {
      layer.bindPopup(feature.properties.name);
    }
  };
  
  const buildingStyle = {
    fillColor: 'black',
    color: 'black',
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.4
  };
  
  const pathStyle = {
    color: 'gray',
    weight: 3,
    opacity: 0.7
  };


  if (!mapData || !buildingsData || !pathsData ) {
    return <div>Loading map...</div>; 
  }
  
  return (
    <div className="relative w-full h-screen">
      {/* Overlay Card */}
      <button
        onClick={handleLocateMe}
        className="absolute top-2 right-2 z-[1001] bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
      >
        Use My Location
      </button>

      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] w-[95vw] sm:w-[500px]">
        <FromToCard mapData={mapData} setRoutePath={setRoutePath} userLocation={userLocation} />
      </div>

      {/* Fullscreen Map */}
      <MapContainer
        center={campusCenter}
        zoom={defaultZoom}
        scrollWheelZoom={true}
        style={{ height: '100vh', width: '100vw' }}
        >
        {/* layers */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {mapData.nodes.map(node => (
          <Marker
            key={node.id}
            position={[node.coords[0], node.coords[1]]}
          >
            <Popup>{node.name}</Popup>
          </Marker>
        ))}

        {/* Visualize campus buildings */}
        <GeoJSON
          data={buildingsData}
          style={buildingStyle}
          onEachFeature={onEachFeature}
        />

        {/* Visualize campus paths */}
        <GeoJSON
          data={pathsData}
          style={pathStyle}
          onEachFeature={onEachFeature}
        />


        {routePath.length > 1 && (
          <Routing
            start={
                routePath[0] === 'my-location'
                  ? userLocation
                  : mapData.nodes.find(n => n.id === routePath[0]).coords
              }
            end={mapData.nodes.find(n => n.id === routePath[routePath.length-1]).coords}
          />
        )}

        {userLocation && (
          <Marker position={userLocation}>
            <Popup>You are here</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default CampusMap;
