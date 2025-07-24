import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 border-b-1 border-black left-0 right-0 h-20 bg-white text-black flex items-center justify-between px-10 z-50">
      <div className="space-x-10 flex items-center">
        <Link to="/" className="font-semibold text-2xl">
          Home
        </Link>
        <Link to="/1">1</Link>
        <Link to="/2">2</Link>
      </div>
      <Link to="/login">Login</Link>
    </nav>
  );
};