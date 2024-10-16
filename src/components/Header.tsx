import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '@/AuthContext';

const Header: React.FC = () => {

    const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center text-blue-600">
          <Briefcase className="mr-2" />
          <span className="text-xl font-bold">Cuvette</span>
        </Link>
        <nav className='flex items-center gap-4'>
          <Link to="/contact" className="text-gray-600 hover:text-gray-800">Contact</Link>
          
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          
        </nav>
      </div>
    </header>
  );
};

export default Header;