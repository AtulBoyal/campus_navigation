import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; 
import FromToCard from './FromToCard';

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
  const [poisData, setPoisData] = useState(null);

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // IMPORTANT: Use process.env.PUBLIC_URL to correctly reference files in the public folder.
        // The browser will request these files directly from the web server.
        const buildingsRes = await fetch(`${process.env.PUBLIC_URL}/data/buildings.geojson`);
        const pathsRes = await fetch(`${process.env.PUBLIC_URL}/data/paths.geojson`);
        const poisRes = await fetch(`${process.env.PUBLIC_URL}/data/pois.geojson`);

        const buildingsJson = await buildingsRes.json();
        const pathsJson = await pathsRes.json();
        const poisJson = await poisRes.json();

        setBuildingsData(buildingsJson);
        setPathsData(pathsJson);
        setPoisData(poisJson);
      } catch (error) {
        console.error("Error fetching GeoJSON data:", error);
      }
    };

    fetchData();
  }, []); // The empty array ensures this effect runs only once after the initial render


  // Find a central coordinate for your campus from your data or estimate
  const campusCenter = [17.59741, 78.12283]; 
  const defaultZoom = 15; // Adjust zoom level to fit your campus

  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.name) {
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

  const poiStyle = (feature) => {
      // You can customize point styles here, e.g., different icons based on feature.properties.type
      return {}; // Default marker
  };

  return (
    <div className="relative w-full h-screen">
  {/* Overlay Card */}
  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] w-[90%] sm:w-[500px]">
    <FromToCard />
  </div>

  {/* Fullscreen Map */}
  <MapContainer
    center={campusCenter}
    zoom={defaultZoom}
    scrollWheelZoom={true}
    style={{ height: '100%', width: '100%' }}
  >
    {/* layers */}
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
     />

    <GeoJSON
      data={buildingsData}
      style={buildingStyle}
      onEachFeature={onEachFeature}
    />

    <GeoJSON
       data={pathsData}
       style={pathStyle}
       onEachFeature={onEachFeature}
    />

    <GeoJSON
      data={poisData}
      pointToLayer={(feature, latlng) => {
    //         // For POIs, you might want custom icons
        return L.marker(latlng); // Use default Leaflet marker for now
       }}
      onEachFeature={onEachFeature}
     />

  </MapContainer>
</div>
  );
};

export default CampusMap;