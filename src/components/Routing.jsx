import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const Routing = ({ start, end }) => {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!map || !start || !end) return;

    // Remove previous routing control and its route lines
    if (routingControlRef.current) {
      try {
        // Remove directions panel DOM
        const container = routingControlRef.current.getContainer && routingControlRef.current.getContainer();
        if (container && container.parentNode) {
          container.parentNode.removeChild(container);
        }

        // Remove routing control from map
        if (routingControlRef.current._container && map.hasLayer(routingControlRef.current)) {
          map.removeControl(routingControlRef.current);
        }

        // Remove all route polylines with the route color (adjust color if changed)
        map.eachLayer(layer => {
          if (
            layer instanceof L.Polyline &&
            layer.options &&
            layer.options.color === "#3498db"
          ) {
            map.removeLayer(layer);
          }
        });
      } catch (e) {
        // Ignore errors if already removed
      }
      routingControlRef.current = null;
    }

    // Create new routing control
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(start[0], start[1]),
        L.latLng(end[0], end[1]),
      ],
      routeWhileDragging: false,
      lineOptions: { styles: [{ color: "#3498db", weight: 6 }] }, // same color as cleanup
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
    }).addTo(map);

    routingControlRef.current = routingControl;

    return () => {
      // Cleanup on unmount
      if (routingControlRef.current) {
        try {
          const container = routingControlRef.current.getContainer && routingControlRef.current.getContainer();
          if (container && container.parentNode) {
            container.parentNode.removeChild(container);
          }
          if (routingControlRef.current._container && map.hasLayer(routingControlRef.current)) {
            map.removeControl(routingControlRef.current);
          }
          // Remove all route polylines
          map.eachLayer(layer => {
            if (
              layer instanceof L.Polyline &&
              layer.options &&
              layer.options.color === "#3498db"
            ) {
              map.removeLayer(layer);
            }
          });
        } catch (e) {}
        routingControlRef.current = null;
      }
    };
  }, [map, start, end]);

  return null;
};

export default Routing;

