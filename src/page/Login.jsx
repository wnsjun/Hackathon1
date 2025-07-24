import kakaoLogo from '../assets/kakao-icon.svg';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const REST_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
  const navigate = useNavigate();

  // 인가코드 받는 함수 작성
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  // 스페이스팜 버튼 클릭 시 home으로 이동
  const handleTitleClick = () => {
    navigate('/home');
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen flex-1 bg-white">
      <h1
        className="text-[#191919] text-2xl font-semibold text-center mb-8 cursor-pointer"
        onClick={handleTitleClick}
      >
        스페이스팜
      </h1>

      <button onClick={handleLogin} className="flex items-center justify-center gap-2 w-[280px] py-3 cursor-pointer rounded-md bg-[#FEE500] text-[#191919] hover:opacity-90 transition">
        <img src={kakaoLogo} alt="kakao" className="w-6 h-6" />
        <span className="text-base font-semibold">카카오로 계속하기</span>
      </button>
    </main>
  );
};
