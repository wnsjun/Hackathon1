import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Searchbar } from '../common/Searchbar';
import SpaceFarm from '../../assets/SpaceFarm.svg';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (query) => {
    if (location.pathname !== '/home') {
      navigate(`/home?query=${encodeURIComponent(query)}`);
    } else {
      navigate({
        pathname: '/home',
        search: `?query=${encodeURIComponent(query)}`,
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-white text-black border-b border-black z-50 flex items-center px-10">
      {/* 왼쪽 메뉴 */}
      <div className="w-1/3 flex items-center space-x-10">
        <Link
          to="/home"
          className="font-semibold text-2xl flex items-center space-x-2"
        >
          <img src={SpaceFarm} alt="로고" className="h-10 w-auto" />
          <span>Space Farm</span>
        </Link>

        <Link to="/home">홈</Link>
        <Link to="/community">커뮤니티</Link>
      </div>

      {/* 가운데 검색바 */}
      <div className="w-1/3 flex justify-center">
        <Searchbar onSearch={handleSearch} />
      </div>

      {/* 오른쪽 메뉴 */}
      <div className="w-1/3 flex justify-end items-center space-x-10">
        <Link to="/chat">채팅</Link>
        <Link to="/profile">내 프로필</Link>
      </div>
    </nav>
  );
};
