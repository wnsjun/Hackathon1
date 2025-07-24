import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './page/Home'
import { Login } from './page/Login';
import { Layout } from './components/layouts/Layout'
import { ChatPage } from "./page/Chat";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<ChatPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
