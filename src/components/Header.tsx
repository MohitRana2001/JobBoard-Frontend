import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, LogOut } from 'lucide-react';
import { useAuth } from '../AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication token from localStorage
    localStorage.removeItem('authToken');
    // Update authentication state
    setIsAuthenticated(false);
    // Redirect to home page
    navigate('/');
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center text-blue-600">
          <Briefcase className="mr-2" />
          <span className="text-xl font-bold">Cuvette</span>
        </Link>
        <nav className="flex items-center">
          <Link to="/contact" className="text-gray-600 hover:text-gray-800 mr-4">Contact</Link>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <LogOut className="mr-1" size={18} />
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
