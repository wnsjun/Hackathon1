import plantImg from '../../assets/plant.png';

const FarmCard = ({ farm }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col">
      <img
        src={plantImg}
        alt="plant"
        className="w-full h-32 object-contain mb-4"
      />
      <h2 className="text-lg font-semibold mb-2">{farm.title}</h2>
      <p className="text-sm text-gray-600 mb-4">{farm.address}</p>

      <div className="flex justify-between text-sm text-gray-700 font-medium">
        <span>가격: {farm.price}</span>
        <span>대여 기간: {farm.rentalPeriod}</span>
      </div>
    </div>
  );
};

export default FarmCard;
