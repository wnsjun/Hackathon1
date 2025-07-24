const FarmCard = ({ farm }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
      <img
        src={farm.thumbnailUrl}
        alt={farm.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-1">{farm.title}</h2>
        <p className="text-sm text-gray-600 mb-1">가격: {farm.price}</p>
        <p className="text-sm text-gray-600 mb-1">
          대여 기간: {farm.rentalPeriod}
        </p>
        <p className="text-sm text-gray-600 mb-2">위치: {farm.address}</p>
        {farm.isAvailable ? (
          <span className="inline-block px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded">
            예약 가능
          </span>
        ) : (
          <span className="inline-block px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded">
            예약 불가
          </span>
        )}
      </div>
    </div>
  );
};

export default FarmCard;
