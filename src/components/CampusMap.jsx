import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON , Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; 
import { toast } from "react-toastify";
import { CAMPUS_CONFIG } from '../config/campusConfig';
import FromToCard from './FromToCard';
import Routing from './Routing';
import RouteInfoCard from './RouteInfoCard';

// Fix for default marker icon in Leaflet with React (important for Point GeoJSON)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({                 
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const buildingStyle = {
  fillColor: '#1f2937',
  color: '#111827',
  weight: 1,
  opacity: 0.8,
  fillOpacity: 0.4
};

const pathStyle = {
  color: '#6b7280',
  weight: 3,
  opacity: 0.7
};

const CampusMap = () => {
  const [buildingsData, setBuildingsData] = useState(null);
  const [pathsData, setPathsData] = useState(null);
  const [mapData, setMapData] = useState(null);
  const [routePath, setRoutePath] = useState([]);
  const [routeInfo, setRouteInfo] = useState(null);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/map`)
        
        if (!response.ok){
          throw new Error("Failed to load map data");
        }
        
        const data = await response.json();
        setMapData(data);
      }
      catch(error){
        console.error(error);
        setLoadingError(true);
        toast.error("Unable to load campus data");
      }
    };

    fetchMapData();
  }, []);

  
  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
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
        setLoadingError(true);
        toast.error("Unable to load campus map layers");
      }
    };
    
    fetchData();
  }, []); // The empty array ensures this effect runs only once after the initial render
  
  
  const onEachFeature = (feature, layer) => {
    if (feature.properties?.name) {
      layer.bindPopup(feature.properties.name);
    }
  };
  
  if (loadingError) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Failed to load campus data
          </h2>
          <p className="text-gray-600 mt-2">
            Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!mapData || !buildingsData || !pathsData ) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 font-medium">
          Loading Campus Map...
        </p>
      </div>
    );
  }
  
  return (
    <div className="relative w-full h-screen">

      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] w-[95vw] sm:w-[500px]">
        <FromToCard mapData={mapData} setRoutePath={setRoutePath} />
      </div>

      <RouteInfoCard
        routeInfo={routeInfo}
      />

      {/* Fullscreen Map */}
      <MapContainer
        center={CAMPUS_CONFIG.center}
        zoom={CAMPUS_CONFIG.defaultZoom}
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
            <Popup>
              <div className="min-w-[180px]">
                <h3 className="font-bold text-lg">
                  {node.icon} {node.name}
                </h3>

                <p className="text-sm text-gray-600">
                  {node.category}
                </p>

                <p className="text-xs mt-1">
                  {node.description}
                </p>
              </div>
            </Popup>
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


        {routePath.length > 1 &&
          (
            <Routing
              start={
                mapData.nodes.find(
                  n => n.id === routePath[0]
                ).coords
              }
              end={
                mapData.nodes.find(
                  (n) => n.id === routePath[routePath.length - 1]
                ).coords
              }
              setRouteInfo={setRouteInfo}
            />
        )}
      </MapContainer>
    </div>
  );
};

export default CampusMap;
