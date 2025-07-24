import { useNavigate } from 'react-router-dom';
import plant from '../../assets/plant.png';

const FarmCard = ({ farm }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/plant/${farm.id}`, { state: { farm } });
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 flex flex-col"
    >
      <div
        className="w-full h-[284px] self-stretch rounded-lg bg-cover bg-center"
        style={{
          backgroundImage: `url(${plant})`,
        }}
      ></div>

      <div className="p-4">
      <div className="flex justify-between text-sm text-gray-700 font-medium">
        <h2 className="text-lg font-semibold mb-2">{farm.title}</h2>
        <p className="font-bold border border-gray-400 px-2 py-1 rounded">채팅하기</p>
        </div>

        <p className="text-sm text-gray-600 mb-4">{farm.address}</p>
        
          
        <div className="flex justify-between text-sm text-gray-700 font-medium">
          <span>가격: {farm.price}</span>
          <span>대여 기간: {farm.rentalPeriod}</span>
        </div>
      </div>
    </div>
  );
};

export default FarmCard;
