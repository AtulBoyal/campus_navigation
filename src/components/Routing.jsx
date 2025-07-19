import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const Routing = ({ start, end }) => {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!map || !start || !end) return null;

    // Remove previous routing control and its route lines
    // if (routingControlRef.current) {
    //   try {
    //     // Remove directions panel DOM
    //     const container = routingControlRef.current.getContainer && routingControlRef.current.getContainer();
    //     if (container && container.parentNode) {
    //       container.parentNode.removeChild(container);
    //     }

    //     // Remove routing control from map
    //     if (routingControlRef.current._container && map.hasLayer(routingControlRef.current)) {
    //       map.removeControl(routingControlRef.current);
    //     }

    //     // Remove all route polylines with the route color (adjust color if changed)
    //     map.eachLayer(layer => {
    //       if (
    //         layer instanceof L.Polyline &&
    //         layer.options &&
    //         layer.options.color === "#3498db"
    //       ) {
    //         map.removeLayer(layer);
    //       }
    //     });
    //   } catch (e) {
    //     // Ignore errors if already removed
    //   }
    //   routingControlRef.current = null;
    // }
    if (routingControlRef.current) {
    routingControlRef.current.on('routesfound', (e) => {
      const mapInstance = map;
      const route = e.routes[0].coordinates;
      // Remove previous animated polyline if any
      if (routingControlRef.current._animatedLine) {
        mapInstance.removeLayer(routingControlRef.current._animatedLine);
      }

      // Animate by gradually adding points
      let current = 0;
      const animatedLine = L.polyline([], {color: "#3498db", weight: 6}).addTo(mapInstance);
      routingControlRef.current._animatedLine = animatedLine;

      function drawStep() {
        if (current < route.length) {
          animatedLine.addLatLng(route[current]);
          current++;
          requestAnimationFrame(drawStep); // Smooth animation
        }
      }
      drawStep();
    });
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

    routingControl.on("routesfound", function (e) {
      const routes = e.routes;
      if (routes && routes[0]) {
        // Leaflet route object
        const firstRoute = routes[0];
        // This gives you the array of coordinates (LatLngs)
        const coordinates = firstRoute.coordinates;
        // Compute bounds over the route
        const routeBounds = L.latLngBounds(coordinates);
        // Now fly to fit the bounds, smoothly!
        map.flyToBounds(routeBounds, { duration: 1 });
      }
    });

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

