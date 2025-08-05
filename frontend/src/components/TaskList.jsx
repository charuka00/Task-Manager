import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
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

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`/api/tasks/${id}`);
        setTasks(tasks.filter(task => task._id !== id));
        setMessage('Task deleted successfully');
        setTimeout(() => setMessage(''), 2000);
      } catch (err) {
        console.error('Delete error:', err.response?.data || err.message);
        setMessage('Failed to delete task');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/taskform/${id}`);
  };

  const handleView = (id) => {
    navigate(`/taskdashboard/${id}`);
  };

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
        <main className="flex-grow flex flex-col items-center justify-start px-4 py-8">
          <div className="w-full max-w-5xl">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Task List</h2>
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
                    className="bg-white/90 p-4 rounded-lg shadow-md border border-gray-200 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleView(task._id)}
                  >
                    <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                    <p className="text-gray-600 mb-2">{task.description}</p>
                    <p className="text-gray-500 mb-2">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                    <p className="text-gray-500 mb-2">Status: {task.status}</p>
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleEdit(task._id); }}
                        className="bg-blue-500 text-white p-1 rounded mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(task._id); }}
                        className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
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

export default TaskList;