import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import { Login } from './page/Login';
import { Layout } from './components/layouts/Layout';
import { ChatPage } from './page/Chat';
import { AddFarm } from './page/AddFarm';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* "/"와 "/login" 모두 로그인 페이지로 */}
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          {/* 로그인 성공 시 "/home"으로 이동 */}
          <Route path="home" element={<Home />} />
          {/* <Route path="/addfarm" element={<AddFarm />} /> */}
          <Route path="/chat" element={<ChatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
