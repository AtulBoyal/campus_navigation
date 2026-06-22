const RouteInfoCard = ({ routeInfo }) => {
  if (!routeInfo) return null;

  const distanceKm = (
    routeInfo.distance / 1000
  ).toFixed(2);

  const walkingMinutes = Math.ceil(
    routeInfo.time / 60
  );

  return (
    <div
      className="
        absolute
        bottom-4
        left-1/2
        -translate-x-1/2

        sm:left-auto
        sm:translate-x-0
        sm:right-5

        z-[1000]
        bg-white
        rounded-2xl
        shadow-xl
        px-4
        py-3
        border
        border-gray-200
      "
    >
      <div className="flex gap-4 items-center text-sm font-medium">
        <span>
          📏 {distanceKm} km
        </span>

        <span>
          🚶 {walkingMinutes} min
        </span>
      </div>
    </div>
  );
};

export default RouteInfoCard;