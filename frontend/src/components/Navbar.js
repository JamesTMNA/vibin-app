import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Home, Search, Camera, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black bg-opacity-90 backdrop-blur-md border-b border-gray-800 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white cursor-pointer" onClick={() => navigate('/')}>
              <span className="text-green-500">V</span>ine
            </h1>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-6">
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              className={`p-2 rounded-lg transition-colors ${
                isActive('/') 
                  ? 'bg-white bg-opacity-20 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="ml-2">Home</span>
            </Button>

            <Button
              variant="ghost"
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white hover:bg-opacity-10 transition-colors"
            >
              <Search className="w-5 h-5" />
              <span className="ml-2">Discover</span>
            </Button>

            <Button
              onClick={() => navigate('/upload')}
              variant="ghost"
              className={`p-2 rounded-lg transition-colors ${
                isActive('/upload') 
                  ? 'bg-white bg-opacity-20 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <Camera className="w-5 h-5" />
              <span className="ml-2">Create</span>
            </Button>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {currentUser && (
              <>
                <Button
                  onClick={() => navigate(`/profile/${currentUser.id}`)}
                  variant="ghost"
                  className="flex items-center gap-2 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white hover:bg-opacity-10 transition-colors"
                >
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback>{currentUser.displayName?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block">{currentUser.username}</span>
                </Button>

                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500 hover:bg-opacity-10 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              size="sm"
              className={`p-2 ${isActive('/') ? 'text-white' : 'text-gray-400'}`}
            >
              <Home className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => navigate('/upload')}
              variant="ghost"
              size="sm"
              className={`p-2 ${isActive('/upload') ? 'text-white' : 'text-gray-400'}`}
            >
              <Camera className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => navigate(`/profile/${currentUser?.id}`)}
              variant="ghost"
              size="sm"
              className="p-2"
            >
              <Avatar className="w-6 h-6">
                <AvatarImage src={currentUser?.avatar} />
                <AvatarFallback>{currentUser?.displayName?.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;