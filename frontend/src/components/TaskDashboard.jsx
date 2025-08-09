import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import backgroundImage from '../assets/0002.jpg';

function TaskDashboard() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`/api/tasks/${id}`);
        setTask(res.data);
      } catch (err) {
        console.error('Fetch task error:', err.response?.data || err.message);
        setError('Failed to load task details');
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!task) return <p className="text-center">Task not found</p>;

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="bg-white/90 p-6 rounded-lg shadow-md max-w-2xl w-full">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{task.title}</h2>
          <p className="text-gray-600 mb-2">{task.description}</p>
          <p className="text-gray-500 mb-2">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
          <p className="text-gray-500 mb-2">Status: {task.status}</p>
          <Link
            to="/tasklist"
            className="bg-[#36013F] text-white px-4 py-2 rounded-lg hover:bg-[#2A012F] transition duration-300 mt-4 inline-block"
          >
            Back to Task List
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default TaskDashboard;