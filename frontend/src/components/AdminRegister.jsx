import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import backgroundImage from '../assets/0002.jpg';
import FixedSidebar from './FixedSidebar';

function AdminRegister() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        setMessage('Please log in as an admin to register a new admin');
        setLoading(false);
        return;
      }

      await axios.post('/admin/register', { firstName, lastName, email, password }, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setMessage('Admin user created successfully');
      setTimeout(() => navigate('/users'), 1500);
    } catch (err) {
      console.error('Register error:', err.response?.data || err.message);
      setMessage(err.response?.data?.message || 'Failed to create admin user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <Header />
      <div className="flex flex-grow">
        <FixedSidebar />
        <main className="flex-grow flex items-center justify-center px-4 py-8 ml-64">
          <form onSubmit={handleSubmit} className="bg-white/90 p-6 rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">Register New Admin</h2>
            <input
              type="text"
              placeholder="First Name"
              className="border p-2 mb-3 rounded w-full"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border p-2 mb-3 rounded w-full"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="border p-2 mb-3 rounded w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border p-2 mb-3 rounded w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-[#36013F] text-white p-2 rounded cursor-pointer hover:bg-[#2A012F] disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Admin'}
            </button>
            {message && <p className="mt-3 text-gray-900">{message}</p>}
          </form>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default AdminRegister;