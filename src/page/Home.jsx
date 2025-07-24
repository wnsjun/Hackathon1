import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FarmCard from '../components/common/FarmCard';
import { mockFarms } from '../data/mockFarms';
import Button from '../components/common/Button';
import banner from '../assets/banner.png';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [farms, setFarms] = useState([]);
  const query = useQuery();
  const searchQuery = query.get('query') || '';
  const navigate = useNavigate();

  useEffect(() => {
    setFarms(mockFarms);
  }, []);

  const filteredFarms = farms.filter((farm) =>
    farm.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const farmsToShow = filteredFarms.slice(0, 6);

  return (
    <div className="p-12">
      <img
        src={banner}
        alt="소개 배너"
        className="w-full max-w-6xl mx-auto mb-8 rounded"
      />

      <div className="flex justify-between items-center mb-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold">텃밭 매물 확인</h1>
        <Button onClick={() => navigate('/addfarm')}>매물 등록</Button>
      </div>

      {farmsToShow.length === 0 ? (
        <p className="text-center text-gray-500">등록된 텃밭이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {farmsToShow.map((farm) => (
            <FarmCard key={farm.id} farm={farm} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
