import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const Routing = ({ start, end, }) => {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!map || !start || !end) return null;

    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
      routingControlRef.current = null;
    }

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(start[0], start[1]),
        L.latLng(end[0], end[1]),
      ],
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      showAlternatives: false,
      fitSelectedRoutes: true,
      lineOptions: { styles: [{ color: "#2563eb", weight: 6 }] }, // same color as cleanup
    }).addTo(map);

    routingControl.on("routesfound", (e) => {
      const route = e.routes[0];

      map.flyToBounds(
        L.latLngBounds(route.coordinates),
        { duration: 1 }
      );
    });

    routingControlRef.current = routingControl;

    return () => {
      return () => {
        try {
          if (routingControlRef.current) {
            routingControlRef.current.getPlan().setWaypoints([]);
            map.removeControl(routingControlRef.current);
            routingControlRef.current = null;
          }
        } catch (err) {
          console.warn("Routing cleanup:", err);
        }
      };
    };
  }, [map, start, end]);

  return null;
};

export default Routing;

