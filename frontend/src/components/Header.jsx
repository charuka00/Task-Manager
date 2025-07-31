import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-[#36013F] text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-3xl font-bold">Task Manager</h1>
      <nav className="space-x-4">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/register" className="hover:text-gray-300">Register</Link>
        <Link to="/login" className="hover:text-gray-300">Login</Link>
      </nav>
    </header>
  );
}

export default Header;