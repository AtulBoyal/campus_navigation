import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// Factory function for the routing control
const createRoutineMachineLayer = ({ start, end }) => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(start[0], start[1]),
      L.latLng(end[0], end[1])
    ],
    lineOptions: { styles: [{ color: "#3498db", weight: 6 }] },
    addWaypoints: false,
    draggableWaypoints: false,
    fitSelectedRoutes: true,
    showAlternatives: false,
    routeWhileDragging: false,
  });
  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;




// import { useEffect, useRef } from "react";
// import { useMap } from "react-leaflet";
// import L from "leaflet";
// import "leaflet-routing-machine";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// const Routing = ({ start, end }) => {
//   const map = useMap();
//   const routingControlRef = useRef(null);

//   useEffect(() => {
//     if (!map || !start || !end) return;

//     // If control already exists, just update waypoints
//     if (routingControlRef.current) {
//       routingControlRef.current.setWaypoints([
//         L.latLng(start[0], start[1]),
//         L.latLng(end[0], end[1]),
//       ]);
//       return;
//     }

//     // Otherwise, create new control
//     const routingControl = L.Routing.control({
//       waypoints: [
//         L.latLng(start[0], start[1]),
//         L.latLng(end[0], end[1]),
//       ],
//       routeWhileDragging: false,
//       lineOptions: { styles: [{ color: "#3498db", weight: 6 }] },
//       addWaypoints: false,
//       draggableWaypoints: false,
//       fitSelectedRoutes: true,
//       showAlternatives: false,
//     }).addTo(map);

//     routingControlRef.current = routingControl;

//     return () => {
//       // Remove control safely if it exists and is still on the map
//       if (routingControlRef.current) {
//         try {
//           map.removeControl(routingControlRef.current);
//         } catch (e) {
//           // Already removed or not present
//         }
//         routingControlRef.current = null;
//       }
//     };
//   }, [map, start, end]);

//   return null;
// };

// export default Routing;
