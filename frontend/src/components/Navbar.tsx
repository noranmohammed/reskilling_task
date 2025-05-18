import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-purple-800 p-4">
      <ul className="flex justify-center space-x-4">
        <li>
          <Link to="/posts" className="text-white font-medium hover:underline">
            Posts
          </Link>
        </li>
        <li>
          <Link to="/dashboard/newpost" className="text-white font-medium hover:underline">
            create post
          </Link>
        </li>
        <li>
          <Link to="/" className="text-white font-medium hover:underline">
            Login
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="text-white font-medium hover:underline">
            Dashboard
          </Link>
        </li>
      </ul>
    </nav>
  );
}