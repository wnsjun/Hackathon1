import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FarmCard from '../components/common/FarmCard';
import { mockFarms } from '../data/mockFarms';
import Button from '../components/common/Button';
import banner from '../assets/banner.png';

const Home = () => {
  const [farms, setFarms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFarms(mockFarms);
  }, []);

  const farmsToShow = farms.slice(0, 6);

  return (
    <div className="p-12">
      <img
        src={banner}
        alt="소개 배너"
        className="w-full max-w-6xl mx-auto mb-8 rounded"
      />

      <div className="flex justify-between items-center mb-6 max-w-6xl mx-auto">
        <h1
          style={{
            color: '#000',
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '24px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: '160%',
          }}
        >
          텃밭 매물 확인
        </h1>
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
