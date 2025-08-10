import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import TaskList from './components/TaskList.jsx';
import TaskForm from './components/TaskForm.jsx';
import Home from './components/Home.jsx';
import HomeScreen from './components/HomeScreen.jsx';
import TaskDashboard from './components/TaskDashboard.jsx';
import MyDay from './components/MyDay';
import Next7Days from './components/Next7Days';
import Profile from './components/Profile';
import ChangePassword from './components/ChangePassword';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasklist" element={<TaskList />} />
        <Route path="/tasks/new" element={<TaskForm />} /> {/* New route for creating tasks */}
        <Route path="/taskform/:id" element={<TaskForm />} /> {/* Existing route for editing tasks */}
        <Route path="/homescreen" element={<HomeScreen />} />
        <Route path="/taskdashboard/:id" element={<TaskDashboard />} />
        <Route path="/myday" element={<MyDay />} />
        <Route path="/next7days" element={<Next7Days />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/changepassword" element={<ChangePassword />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}

export default App;