import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import TaskList from "./components/TaskList.jsx";
import TaskForm from "./components/TaskForm.jsx";
import Home from "./components/Home.jsx";
import HomeScreen from "./components/HomeScreen.jsx";
import TaskDashboard from "./components/TaskDashboard.jsx";
import MyDay from "./components/MyDay";
import Next7Days from "./components/Next7Days";
import Profile from "./components/Profile";
import ChangePassword from "./components/ChangePassword";
import UserList from "./components/UserListPage.jsx";
import AdminRegister from "./components/AdminRegister.jsx";

// Utils
import ProtectedRoute from "./utils/ProtectedRoute.jsx";

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasklist" element={<TaskList />} />
        <Route path="/taskform/:id" element={<TaskForm />} />
        <Route path="/homescreen" element={<HomeScreen />} />
        <Route path="/taskdashboard/:id" element={<TaskDashboard />} />
        <Route path="/myday" element={<MyDay />} />
        <Route path="/next7days" element={<Next7Days />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/changepassword" element={<ChangePassword />} />

        {/* Protected routes (any logged-in user) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/users" element={<UserList />} />
        </Route>

        {/* Admin-only routes */}
        <Route element={<ProtectedRoute requireAdmin={true} />}>
          <Route path="/admin/register" element={<AdminRegister />} />
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}

export default App;
