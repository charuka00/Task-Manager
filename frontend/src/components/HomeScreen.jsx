import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import backgroundImage from '../assets/0002.jpg';

// Sidebar Component
function Sidebar() {
  return (
    <aside className="w-64 bg-[#2A012F] text-white p-6 hidden md:block">
      <h3 className="text-xl font-bold mb-6">Menu</h3>
      <ul className="space-y-4">
        <li>
          <Link to="/" className="hover:underline">Home</Link>
        </li>
        <li>
          <Link to="/tasklist" className="hover:underline">Task List</Link>
        </li>
        <li>
          <Link
            to="/tasks/new"
            className="flex items-center space-x-2 bg-[#36013F] hover:bg-[#2A012F] px-3 py-2 rounded w-fit"
          >
            <span className="text-lg font-bold">+</span>
            <span>Add Task</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

function HomeScreen() {
  useEffect(() => {
    console.log('HomeScreen mounted');
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Header />

      {/* Layout with sidebar and main content */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center px-4 py-8">
          <div className="text-center max-w-2xl bg-white/90 p-6 rounded-lg shadow-lg">
            <h2 className="text-4xl font-extrabold mb-4 text-gray-800">Welcome to Your Dashboard</h2>
            <p className="text-lg text-gray-600 mb-6">
              You have successfully registered! Start managing your tasks or explore your account.
            </p>
            <Link
              to="/tasklist"
              className="bg-[#36013F] text-white px-4 py-2 rounded-lg hover:bg-[#2A012F] transition duration-300"
            >
              Go to Tasks
            </Link>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default HomeScreen;
