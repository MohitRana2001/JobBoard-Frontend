import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '@/AuthContext';

const Header: React.FC = () => {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;  // Returns true if token exists, false otherwise
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center text-blue-600">
          <img src="/cuvette.svg" alt="Cuvette" className="w-full h-auto" />
        </Link>
        <nav className='flex items-center gap-4'>
          <Link to="/" className="text-gray-600 hover:text-gray-800">Contact</Link>
          {isAuthenticated() ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/login')}
              className="flex items-center"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;