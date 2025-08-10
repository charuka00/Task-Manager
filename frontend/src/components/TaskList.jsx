import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import backgroundImage from '../assets/0002.jpg';
import FixedSidebar from './FixedSidebar';

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
    console.log('Navigating to edit for ID:', id); // Debug log
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
      <div className="flex flex-grow">
        <FixedSidebar />
        <main className="flex-grow flex flex-col items-center justify-start px-4 py-8 ml-64">
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
                    className="bg-black/70 p-8 rounded-xl shadow-md flex-shrink-0 text-white cursor-pointer hover:bg-black/80"
                    onClick={() => handleView(task._id)}
                  >
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <p className="text-gray-300 mb-2">{task.description}</p>
                    <p className="text-gray-400 mb-2">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                    <p className="text-gray-400 mb-2">Status: {task.status}</p>
                    <p className="text-gray-400 mb-2">Priority: {task.priority}</p> {/* New priority display */}
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleEdit(task._id); }}
                        className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
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
            <div className="mt-4 text-center">
              <Link
                to="/tasks/new"
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                Add New Task
              </Link>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default TaskList;