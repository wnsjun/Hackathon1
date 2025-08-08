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
  const [filters, setFilters] = useState({
    location: '위치',
    area: '면적',
    features: '옵션',
    period: '대여기간'
  });
  const query = useQuery();
  const searchQuery = query.get('query') || '';
  const navigate = useNavigate();

  useEffect(() => {
    setFarms(mockFarms);
  }, []);

  const filteredFarms = farms.filter((farm) =>
    farm.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFilterDropdownChange = (filterType) => {
    // 필터 드롭다운 핸들러 (추후 구현)
  };

  const handleRegisterFarmClick = () => {
    navigate('/addfarm');
  };

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-6">
      {/* 배너 섹션 */}
      <div className="mb-6">
        <img
          src={banner}
          alt="소개 배너"
          className="w-full max-w-5xl mx-auto mb-6 rounded"
        />
      </div>

      {/* 추천 섹션 */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">00님만을 위한 텃밭이에요</h2>
          <button className="text-sm text-gray-600 hover:text-gray-800">
            전체보기 〉
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {filteredFarms.slice(0, 3).map((farm) => (
            <FarmCard key={farm.id} farm={farm} isRecommended={true} />
          ))}
        </div>
      </div>

      {/* 텃밭 매물 확인 섹션 */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">텃밭 매물 확인</h2>
          <Button 
            onClick={handleRegisterFarmClick}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            매물 등록 +
          </Button>
        </div>

        {/* 필터 버튼들 */}
        <div className="flex gap-3 mb-6">
          {Object.entries(filters).map(([key, value]) => (
            <button
              key={key}
              onClick={() => handleFilterDropdownChange(key)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:border-gray-400 flex items-center gap-1"
            >
              {value}
              <span className="text-gray-400">▼</span>
            </button>
          ))}
        </div>

        {/* 농장 카드들 */}
        {filteredFarms.length === 0 ? (
          <p className="text-center text-gray-500 py-10">등록된 텃밭이 없습니다.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {filteredFarms.map((farm) => (
              <FarmCard key={farm.id} farm={farm} isRecommended={false} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
