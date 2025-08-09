import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import FixedSidebar from './FixedSidebar';
import backgroundImage from '../assets/0002.jpg';

function Next7Days() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of day
  
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return date;
  });

  const getDayLabel = (date, index) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.getTime() === today.getTime()) return 'Today';
    if (date.getTime() === tomorrow.getTime()) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const handleAddTask = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    navigate(`/tasks/new?dueDate=${formattedDate}`);
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Header />
      <div className="flex flex-grow">
        <FixedSidebar />
        <main className="flex-grow ml-64 px-6 py-6 overflow-x-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Next 7 Days</h2>
          {message && <p className="text-red-500 mb-4">{message}</p>}
          {loading ? (
            <p className="text-white">Loading...</p>
          ) : (
            <div className="flex space-x-4 pb-6 w-max">
              {days.map((day, index) => {
                const formatted = day.toISOString().split('T')[0];
                const dayTasks = tasks.filter(
                  (task) =>
                    task.dueDate && 
                    new Date(task.dueDate).toISOString().split('T')[0] === formatted
                );

                return (
                  <div
                    key={index}
                    className="w-72 bg-black/70 text-white p-8 rounded-xl shadow-md flex-shrink-0"
                  >
                    <h3 className="text-lg font-semibold mb-1">
                      {getDayLabel(day, index)}{' '}
                      <span className="text-sm text-gray-400">
                        {day.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </h3>
                    <div className="mt-2 space-y-3">
                      {dayTasks.length === 0 ? (
                        <p className="text-sm text-gray-400">No tasks</p>
                      ) : (
                        dayTasks.map((task) => (
                          <div
                            key={task._id}
                            className="bg-gray-800 rounded p-2 text-sm"
                          >
                            <p>{task.title}</p>
                            <p className="text-gray-400 text-xs">
                              Status: {task.status}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                    <button
                      onClick={() => handleAddTask(day)}
                      className="mt-4 w-full border border-gray-500 hover:border-white text-white py-1 rounded flex items-center justify-center gap-1 text-sm"
                    >
                      <span>＋</span> Add Task
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Next7Days;