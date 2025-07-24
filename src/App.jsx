import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import { Login } from './page/Login';
import { Layout } from './components/layouts/Layout';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
