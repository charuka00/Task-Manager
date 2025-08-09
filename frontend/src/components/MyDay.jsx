import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import backgroundImage from '../assets/0002.jpg';
import FixedSidebar from './FixedSidebar';

function MyDay() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('/api/tasks');
        const today = new Date().toISOString().split('T')[0];
        const todayTasks = res.data.filter(task => task.dueDate.split('T')[0] === today);
        setTasks(todayTasks);
      } catch (err) {
        console.error('Fetch tasks error:', err.response?.data || err.message);
        setMessage('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Header />
      <div className="flex flex-grow">
        <FixedSidebar />
        <main className="flex-grow flex flex-col items-center justify-start px-4 py-8 ml-64">
          <div className="w-full max-w-5xl">
            <h1 className="text-8xl font-bold mb-4 text-center text-gray-800">Good Morning</h1>
            <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">Be so good no one can ignore you</h1>

            {message && <p className="text-gray-900 mb-4 text-center">{message}</p>}
            {loading ? (
              <p className="text-center">Loading...</p>
            ) : tasks.length === 0 ? (
              <p className="text-center">No tasks for today.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks.map(task => (
                  <div key={task._id} className="bg-black/70 p-8 rounded-xl shadow-md flex-shrink-0 text-white">
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <p className="text-gray-300 mb-2">{task.description}</p>
                    <p className="text-gray-400 mb-2">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                    <p className="text-gray-400 mb-2">Status: {task.status}</p>
                  </div>
                ))}
              </div>
            )}
            {/* Add Task Button at the bottom */}
            <div className="text-center mt-6">
              <Link
                to="/tasks/new"
                className="bg-[#36013F] text-white px-6 py-2 rounded-md hover:bg-[#2A012F] transition duration-300"
              >
                Add Task
              </Link>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default MyDay;