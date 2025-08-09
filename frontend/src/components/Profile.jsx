import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import Footer from './Footer';
import FixedSidebar from './FixedSidebar';
import backgroundImage from '../assets/0002.jpg';

function Profile() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phoneNumber: '',
    birthDate: '',
  });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/users/profile');
        console.log('Profile data:', response.data); // Debug log
        if (response.status === 200) {
          setUserData(response.data);
        }
      } catch (err) {
        console.error('Profile fetch error:', err.response?.data || err.message); // Debug error
        toast.error(err.response?.data?.message || 'Failed to fetch profile');
        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/users/profile', userData);
      if (response.status === 200) {
        toast.success('Profile updated successfully');
        setEditMode(false);
      }
    } catch (err) {
      console.error('Profile update error:', err);
      toast.error(err.response?.data?.message || 'Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#36013F]"></div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Header />
      <div className="flex flex-grow">
        <FixedSidebar />
        <main className="flex-grow p-8 ml-0 md:ml-64">
          <div className="bg-black/70 p-8 rounded-xl shadow-md flex-shrink-0 text-white max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">My Profile</h2>
              <button
                onClick={() => setEditMode(!editMode)}
                className="bg-[#36013F] text-white px-4 py-2 rounded hover:bg-[#2A012F] transition"
              >
                {editMode ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            {editMode ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={userData.firstName}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-[#36013F] focus:border-[#36013F] bg-black/50 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={userData.lastName}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-[#36013F] focus:border-[#36013F] bg-black/50 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-[#36013F] focus:border-[#36013F] bg-gray-700 text-white"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Phone Number</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={userData.phoneNumber}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-[#36013F] focus:border-[#36013F] bg-black/50 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Birth Date</label>
                    <input
                      type="date"
                      name="birthDate"
                      value={userData.birthDate}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-[#36013F] focus:border-[#36013F] bg-black/50 text-white"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={userData.address}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-[#36013F] focus:border-[#36013F] bg-black/50 text-white"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="px-4 py-2 border border-gray-500 rounded-md text-gray-300 hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#36013F] text-white rounded-md hover:bg-[#2A012F]"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">First Name</h3>
                    <p className="mt-1 text-lg text-white">{userData.firstName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Last Name</h3>
                    <p className="mt-1 text-lg text-white">{userData.lastName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Email</h3>
                    <p className="mt-1 text-lg text-white">{userData.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Phone Number</h3>
                    <p className="mt-1 text-lg text-white">{userData.phoneNumber}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Birth Date</h3>
                    <p className="mt-1 text-lg text-white">
                      {new Date(userData.birthDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="text-sm font-medium text-gray-400">Address</h3>
                    <p className="mt-1 text-lg text-white">{userData.address}</p>
                  </div>
                </div>
                <div className="pt-6">
                  <a
                    href="/changepassword"
                    className="text-[#ffffff] hover:underline font-medium"
                  >
                    Change Password
                  </a>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;