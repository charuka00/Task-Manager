import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import backgroundImage from '../assets/0002.jpg';
import FixedSidebar from './FixedSidebar';

function MyAllTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('/api/tasks');
        setTasks(res.data);
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
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">My All Tasks</h2>
            {message && <p className="text-gray-900 mb-4 text-center">{message}</p>}
            {loading ? (
              <p className="text-center">Loading...</p>
            ) : tasks.length === 0 ? (
              <p className="text-center">No tasks available.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks.map(task => (
                  <div
                    key={task._id}
                    className="bg-white/90 p-4 rounded-lg shadow-md border border-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:z-10"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                    <p className="text-gray-600 mb-2">{task.description}</p>
                    <p className="text-gray-500 mb-2">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                    <p className="text-gray-500 mb-2">Status: {task.status}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default MyAllTasks;