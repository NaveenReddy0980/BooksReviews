import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';

export default function Navbar() {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isLoggedIn = !!localStorage.getItem('token') && !!user._id;

  const handleLogout = () => {
    setProfileOpen(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Logo / Brand */}
      <div className="text-xl font-bold text-gray-800 cursor-pointer" onClick={() => navigate('/')}>
        Books Reviews
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center gap-3">
        <Button variant="primary" onClick={() => navigate('/add-book')}>
          Add Book
        </Button>
        {isLoggedIn && (
          <Button variant="secondary" onClick={() => navigate('/my-books')}>
            My Books
          </Button>
        )}

        {/* Profile or Login */}
        {isLoggedIn ? (
          <div className="relative">
            <button
              onClick={() => setProfileOpen((s) => !s)}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white uppercase font-semibold hover:bg-blue-700"
              aria-label={`Profile for ${user.name}`}
            >
              {user.name?.charAt(0) || 'U'}
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-md rounded-md z-50">
                <button
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  onClick={handleLogout}
                  aria-label="Logout"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            aria-label="Log in"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}