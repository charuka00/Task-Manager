import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import backgroundImage from '../assets/0002.jpg';


function Home() {
  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Header />
      <div className="flex flex-grow">
       

        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center px-4 py-8 ml-64">
          <div className="text-center max-w-2xl bg-white/90 p-6 rounded-lg shadow-lg">
            <h2 className="text-4xl font-extrabold mb-4 text-gray-800">Welcome to WorkZap</h2>
            <p className="text-lg text-gray-600 mb-6">
              Stay organized and boost your productivity with our powerful task management tool. Create accounts, manage tasks, and track your progress effortlessly!
            </p>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Home;