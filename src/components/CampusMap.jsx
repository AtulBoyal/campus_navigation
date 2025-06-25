import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON , Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; 
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

  // Fetch backend map data (nodes, edges)
  useEffect(() => {
    fetch('http://localhost:5000/api/map')
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
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] w-[90%] sm:w-[500px]">
        <FromToCard mapData={mapData} setRoutePath={setRoutePath} />
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
            start={mapData.nodes.find(n => n.id === routePath[0]).coords}
            end={mapData.nodes.find(n => n.id === routePath[routePath.length-1]).coords}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default CampusMap;