import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import backgroundImage from '../assets/0002.jpg';
import FixedSidebar from './FixedSidebar';

function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Pending');
  const [priority, setPriority] = useState('Low'); // New state for Priority
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('TaskForm rendered with id:', id); // Debug log
    // Skip fetch for new task (id === 'new')
    if (id && id !== 'new') {
      const fetchTask = async () => {
        try {
          const userToken = localStorage.getItem('userToken');
          if (!userToken) {
            setMessage('Please log in to edit tasks');
            return;
          }
          console.log('Fetching task for ID:', id);
          const res = await axios.get(`/api/tasks/${id}`, {
            headers: { Authorization: `Bearer ${userToken}` },
          });
          console.log('Task data:', res.data);
          const task = res.data;
          setTitle(task.title || '');
          setDescription(task.description || '');
          setDueDate(task.dueDate ? task.dueDate.split('T')[0] : '');
          setStatus(task.status || 'Pending');
          setPriority(task.priority || 'Low'); // Set priority from fetched data
        } catch (err) {
          console.error('Fetch error:', err.response?.data || err.message);
          setMessage(
            err.response?.status === 401
              ? 'Unauthorized access. Please log in again.'
              : 'Failed to load task'
          );
        }
      };
      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const taskData = { title, description, dueDate, status, priority }; // Include priority
    const userToken = localStorage.getItem('userToken');

    if (!userToken) {
      setMessage('Please log in to save tasks');
      setLoading(false);
      return;
    }

    try {
      if (id && id !== 'new') {
        await axios.put(`/api/tasks/${id}`, taskData, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setMessage('Task updated successfully');
      } else {
        await axios.post('/api/tasks', taskData, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setMessage('Task created successfully');
      }
      setTimeout(() => navigate('/tasklist'), 1500);
    } catch (err) {
      console.error('Submit error:', err.response?.data || err.message);
      setMessage(
        err.response?.status === 401
          ? 'Unauthorized access. Please log in again.'
          : err.response?.data?.message || 'Something went wrong'
      );
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
        <FixedSidebar />
        <main className="flex-grow flex items-center justify-center px-4 py-8 ml-64">
          <form
            onSubmit={handleSubmit}
            className="bg-white/90 p-6 rounded-lg shadow-md max-w-md w-full"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              {id === 'new' ? 'Add New Task' : 'Edit Task'}
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
            <select
              className="border p-2 mb-3 rounded w-full" // Matches existing select styling
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <button
              type="submit"
              className="w-full bg-[#36013F] text-white p-2 rounded cursor-pointer hover:bg-[#2A012F] disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? (id && id !== 'new' ? 'Updating...' : 'Creating...') : id && id !== 'new' ? 'Update Task' : 'Add Task'}
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