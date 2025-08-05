import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import backgroundImage from '../assets/0002.jpg';

// Sidebar Component (copied from HomeScreen for consistency)
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

function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Pending');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          const res = await axios.get(`/api/tasks/${id}`);
          const task = res.data;
          setTitle(task.title);
          setDescription(task.description);
          setDueDate(task.dueDate.split('T')[0]);
          setStatus(task.status);
        } catch (err) {
          console.error('Fetch error:', err.response?.data || err.message);
          setMessage('Failed to load task');
        }
      };
      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const taskData = { title, description, dueDate, status };

    try {
      if (id) {
        await axios.put(`/api/tasks/${id}`, taskData);
        setMessage('Task updated successfully');
      } else {
        await axios.post('/api/tasks', taskData);
        setMessage('Task created successfully');
      }
      setTimeout(() => navigate('/tasklist'), 1500);
    } catch (err) {
      console.error('Submit error:', err.response?.data || err.message);
      setMessage(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Header />

      <div className="flex flex-grow">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <main className="flex-grow flex items-center justify-center px-4 py-8">
          <form
            onSubmit={handleSubmit}
            className="bg-white/90 p-6 rounded-lg shadow-md max-w-md w-full"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              {id ? 'Edit Task' : 'Add New Task'}
            </h2>

            <input
              type="text"
              placeholder="Task Title"
              className="border p-2 mb-3 rounded w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              placeholder="Description"
              className="border p-2 mb-3 rounded w-full h-24"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <input
              type="date"
              className="border p-2 mb-3 rounded w-full"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />

            <select
              className="border p-2 mb-3 rounded w-full"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <button
              type="submit"
              className="w-full bg-[#36013F] text-white p-2 rounded cursor-pointer hover:bg-[#2A012F] disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? (id ? 'Updating...' : 'Creating...') : id ? 'Update Task' : 'Add Task'}
            </button>

            {message && <p className="mt-3 text-gray-900">{message}</p>}
          </form>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default TaskForm;
