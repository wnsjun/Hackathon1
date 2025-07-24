import kakaoLogo from '../assets/kakao-icon.svg';
import { useNavigate } from 'react-router-dom';
import SpaceFarm from '../assets/SpaceFarm.svg';

export const Login = () => {
  const navigate = useNavigate();

  // 카카오 소셜 로그인 백엔드 엔드포인트
  const backendKakaoURL = '/oauth2/authorization/kakao';

  const handleLogin = () => {
    window.location.href = backendKakaoURL;
  };

  // 스페이스팜 버튼 클릭 시 home으로 이동
  const handleTitleClick = () => {
    navigate('/home');
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen flex-1 bg-white cursor-pointer">
      <img
        src={SpaceFarm}
        alt="로고"
        className="h-10 w-auto"
        onClick={handleTitleClick}
      />
      <h1
        className="text-[#191919] text-2xl font-semibold text-center mb-8 cursor-pointer"
        onClick={handleTitleClick}
      >
        스페이스팜
      </h1>

      <button
        onClick={handleLogin}
        className="flex items-center justify-center gap-2 w-[280px] py-3 cursor-pointer rounded-md bg-[#FEE500] text-[#191919] hover:opacity-90 transition"
      >
        <img src={kakaoLogo} alt="kakao" className="w-6 h-6" />
        <span className="text-base font-semibold">카카오로 계속하기</span>
      </button>
    </main>
  );
};
