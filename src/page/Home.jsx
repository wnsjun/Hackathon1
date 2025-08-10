import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FarmCard from '../components/common/FarmCard';
import { mockFarms } from '../data/mockFarms';
import { fetchAllFarms } from '../apis/home';
import ChatbotIcon from '../components/common/ChatbotIcon';
import { Navbar } from '../components/layouts/Navbar';
import banner from '../assets/banner.png';
import LocationFilter from '../components/common/LocationFilter';
import AreaFilter from '../components/common/AreaFilter';
import PriceFilter from '../components/common/PriceFilter';
import ThemeFilter from '../components/common/ThemeFilter';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    location: '위치',
    area: '평수',
    price: '가격',
    theme: '테마'
  });
  const [openFilter, setOpenFilter] = useState(null);
  const [appliedFilters, setAppliedFilters] = useState({
    location: [],
    area: { minArea: 16, maxArea: 100 },
    price: { minPrice: 1000, maxPrice: 1000000 },
    theme: []
  });
  const [userName] = useState('00');
  const query = useQuery();
  const searchQuery = query.get('query') || '';
  const navigate = useNavigate();

  const resetFilters = () => {
    setAppliedFilters({
      location: [],
      area: { minArea: 16, maxArea: 100 },
      price: { minPrice: 1000, maxPrice: 1000000 },
      theme: []
    });
    setFilters({
      location: '위치',
      area: '평수',
      price: '가격',
      theme: '테마'
    });
    setOpenFilter(null);
    navigate('/home');
  };

  const loadFarms = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAllFarms();
      setFarms(data);
    } catch (err) {
      console.error('매물 목록 로딩 실패:', err);
      setError('매물 목록을 불러올 수 없습니다.');
      setFarms(mockFarms);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFarms();
  }, []);

  useEffect(() => {
    const handleResetFilters = () => {
      resetFilters();
    };

    window.addEventListener('resetHomeFilters', handleResetFilters);
    
    return () => {
      window.removeEventListener('resetHomeFilters', handleResetFilters);
    };
  }, []);

  const filteredFarms = farms.filter((farm) => {
    // API DTO 구조: { id, title, price, rentalPeriod, address, isAvailable }
    
    // 검색어 필터링 (제목과 주소에서 검색)
    const matchesSearch = !searchQuery || 
      farm.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farm.address?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 위치 필터링
    const matchesLocation = appliedFilters.location.length === 0 || 
      appliedFilters.location.some(loc => farm.address?.includes(loc.split(' ')[0]));
    
    // 평수 필터링 (mockFarms와 호환성을 위해 area 속성도 확인)
    const farmArea = farm.area || farm.size || 20;
    const matchesArea = farmArea >= appliedFilters.area.minArea && 
      farmArea <= appliedFilters.area.maxArea;
    
    // 가격 필터링
    const farmPrice = farm.price;
    const matchesPrice = farmPrice >= appliedFilters.price.minPrice && 
      farmPrice <= appliedFilters.price.maxPrice;
    
    // 테마 필터링 (mockFarms와 호환성을 위해)
    const farmTheme = farm.theme;
    const matchesTheme = appliedFilters.theme.length === 0 || 
      appliedFilters.theme.includes(farmTheme);
    
    // 사용 가능한 매물만 표시 (API에서 제공하는 경우)
    const isAvailable = farm.isAvailable !== false;
    
    return matchesSearch && matchesLocation && matchesArea && matchesPrice && matchesTheme && isAvailable;
  });

  const handleFilterDropdownChange = (filterType) => {
    setOpenFilter(openFilter === filterType ? null : filterType);
  };

  const handleLocationFilterApply = (selectedLocations) => {
    setAppliedFilters(prev => ({
      ...prev,
      location: selectedLocations
    }));
  };

  const handleAreaFilterApply = ({ minArea, maxArea }) => {
    setAppliedFilters(prev => ({
      ...prev,
      area: { minArea, maxArea }
    }));
  };

  const handlePriceFilterApply = ({ minPrice, maxPrice }) => {
    setAppliedFilters(prev => ({
      ...prev,
      price: { minPrice, maxPrice }
    }));
  };

  const handleThemeFilterApply = (selectedThemes) => {
    setAppliedFilters(prev => ({
      ...prev,
      theme: selectedThemes
    }));
  };

  const handleRegisterFarmClick = () => {
    navigate('/addfarm');
  };

  const handleViewAllRecommendationsClick = () => {
    loadFarms();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="px-6 sm:px-12 lg:px-20 xl:px-32 py-6 pt-24">
        {/* 배너 섹션 */}
        <div className="mb-8">
        <img
        src={banner}
          alt="SpaceFarm 텃밭 대여 서비스"
  className="w-full max-w-[1440px] aspect-[1440/437] flex-shrink-0 object-cover rounded-xl"
/>


        </div>

        {/* 추천 섹션 */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {userName}님만을 위한 텃밭이에요
            </h2>
            <button 
              onClick={handleViewAllRecommendationsClick}
              className="text-sm text-[#777] font-medium flex items-center gap-1 transition-colors"
            >
              새로고침
              <svg className="w-6 h-6 p-[2.857px] flex justify-center items-center aspect-square text-[#777]" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.42885 2.00028C2.67228 3.57514 0.857422 6.59914 0.857422 10.0003C0.857422 12.4251 1.82068 14.7506 3.5353 16.4653C5.24992 18.1799 7.57544 19.1431 10.0003 19.1431M14.5717 18.0003C17.1854 16.3911 19.1431 13.294 19.1431 10.0003C19.1431 7.57544 18.1799 5.24992 16.4653 3.5353C14.7506 1.82068 12.4251 0.857422 10.0003 0.857422" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5.42885 6.57143V2H0.857422M14.5717 13.4286V18H19.1431" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredFarms.slice(0, 3).map((farm) => (
              <FarmCard key={farm.id} farm={farm} isRecommended={true} />
            ))}
          </div>
        </div>

        {/* 텃밭 매물 확인 섹션 */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">텃밭 매물 확인</h2>
            <button 
              onClick={handleRegisterFarmClick}
              className="bg-[#1aa752] hover:bg-green-600 text-white px-7 py-3 rounded-[100px] font-normal text-[24px] leading-[1.5] tracking-[-0.48px] transition-colors shadow-sm flex items-center gap-2"
            >
              매물 등록
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14"/>
              </svg>
            </button>
          </div>

          {/* 필터 버튼들 */}
          <div className="flex flex-wrap gap-3 mb-8">
            {Object.entries(filters).map(([key, value]) => (
              <div key={key} className="relative">
                <button
                  onClick={() => handleFilterDropdownChange(key)}
                  className={`cursor-pointer px-4 py-2 border rounded-lg text-sm flex items-center gap-2 transition-colors bg-white ${
                    openFilter === key 
                      ? 'border-green-400 text-green-600' 
                      : 'border-gray-300 text-gray-700 hover:border-green-400 hover:text-green-600'
                  }`}
                >
                  {value}
                  <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className={`text-gray-400 transition-transform ${
                      openFilter === key ? 'rotate-180' : ''
                    }`}
                  >
                    <path d="M7 10l5 5 5-5z"/>
                  </svg>
                </button>
                
                {/* 필터 컴포넌트들 */}
                {key === 'location' && (
                  <LocationFilter 
                    isOpen={openFilter === 'location'}
                    onClose={() => setOpenFilter(null)}
                    farms={farms}
                    onApplyFilter={handleLocationFilterApply}
                  />
                )}
                {key === 'area' && (
                  <AreaFilter 
                    isOpen={openFilter === 'area'}
                    onClose={() => setOpenFilter(null)}
                    onApplyFilter={handleAreaFilterApply}
                  />
                )}
                {key === 'price' && (
                  <PriceFilter 
                    isOpen={openFilter === 'price'}
                    onClose={() => setOpenFilter(null)}
                    onApplyFilter={handlePriceFilterApply}
                  />
                )}
                {key === 'theme' && (
                  <ThemeFilter 
                    isOpen={openFilter === 'theme'}
                    onClose={() => setOpenFilter(null)}
                    onApplyFilter={handleThemeFilterApply}
                  />
                )}
              </div>
            ))}
          </div>

          {/* 농장 카드들 */}
          {loading ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center animate-spin">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                  <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-6.219-8.56"/>
                </svg>
              </div>
              <p className="text-gray-500 text-lg">매물 목록을 불러오는 중...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-red-400">
                  <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
              </div>
              <p className="text-red-600 text-lg mb-2">{error}</p>
              <button 
                onClick={loadFarms}
                className="text-green-600 hover:text-green-700 underline"
              >
                다시 시도
              </button>
            </div>
          ) : filteredFarms.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                  <path stroke="currentColor" strokeWidth="1.5" d="M12 2L2 7v10c0 5.55 3.84 7.74 9 8.86C16.16 24.74 22 22.55 22 17V7l-10-5z"/>
                  <path stroke="currentColor" strokeWidth="1.5" d="M8 12h8M12 8v8"/>
                </svg>
              </div>
              <p className="text-gray-500 text-lg mb-2">조건에 맞는 텃밭이 없습니다</p>
              <p className="text-gray-400 text-sm">필터 조건을 변경해보세요</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {filteredFarms.map((farm) => (
                <FarmCard key={farm.id} farm={farm} isRecommended={false} />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* 챗봇 아이콘 */}
      <ChatbotIcon />
    </div>
  );
};

export default Home;
