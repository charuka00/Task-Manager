import { Link } from 'react-router-dom';

function FixedSidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-[#2A012F] text-white p-6 hidden md:block z-20">
      <div className="mb-8">
        <Link to="/profile" className="hover:underline text-2xl">
          👤
        </Link>
      </div>
      <ul className="space-y-4">
        <li>
          <Link to="/" className="hover:underline">Home</Link>
        </li>
        <li>
          <Link to="/tasklist" className="hover:underline">Task List</Link>
        </li>
        <li>
          <Link to="/myday" className="hover:underline">My Day</Link>
        </li>
        <li>
          <Link to="/next7days" className="hover:underline">Next 7 Days</Link>
        </li>
        <li>
          <Link to="/myalltasks" className="hover:underline">My All Tasks</Link>
        </li>
        <li>
          <Link to="/users" className="hover:underline">User List</Link> {/* New link */}
        </li>
        <li>
          <Link
            to="/taskform/new"
            className="flex items-center space-x-2 bg-[#36013F] hover:bg-[#2A012F] px-3 py-2 rounded w-fit"
          >
            <span className="text-lg font-bold">+</span>
            <span>Add Task</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/register" className="hover:underline">Register Admin</Link>
        </li>
      </ul>
    </aside>
  );
}

export default FixedSidebar;