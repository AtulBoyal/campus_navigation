const RouteInfoCard = ({ routeInfo }) => {
  if (!routeInfo) return null;

  const distanceKm = (routeInfo.distance / 1000).toFixed(2);

  const walkingMinutes = Math.ceil(
    routeInfo.duration / 60
  );

  return (
    <div
      className="
      absolute
      bottom-5
      right-5
      z-[1000]
      bg-white
      rounded-xl
      shadow-xl
      p-4
      min-w-[240px]
      border
      "
    >
      <h3 className="font-bold text-lg mb-2">
        Route Summary
      </h3>

      <div className="space-y-1 text-sm">
        <p>
          <strong>Distance:</strong>{" "}
          {distanceKm} km
        </p>

        <p>
          <strong>ETA:</strong>{" "}
          {walkingMinutes} min
        </p>

        <p className="text-green-600 font-medium">
          Route Found
        </p>
      </div>
    </div>
  );
};

export default RouteInfoCard;