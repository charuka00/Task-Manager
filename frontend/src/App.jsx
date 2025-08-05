import { Routes, Route } from 'react-router-dom';
import Register from './components/Register.jsx'; 
import Login from './components/Login.jsx'; 
import TaskList from './components/TaskList.jsx'; 
import TaskForm from './components/TaskForm.jsx'; 
import Home from './components/Home.jsx'; 
import HomeScreen from './components/HomeScreen.jsx'; 
import TaskDashboard from './components/TaskDashboard.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} /> 
      <Route path="/tasklist" element={<TaskList />} /> 
      <Route path="/tasks/new" element={<TaskForm />} />
      <Route path="/tasks/:id/edit" element={<TaskForm />} />
      <Route path="/homescreen" element={<HomeScreen />} />
       <Route path="/taskdashboard/:id" element={<TaskDashboard />} />
    </Routes>
  );
}

export default App;