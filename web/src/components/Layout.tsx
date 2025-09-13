import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../lib/store';

const Layout: React.FC = () => {
  const { token, setToken } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate('/login');
  };

  const toggleDarkMode = () => {
    if (localStorage.theme === 'dark') {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-lg">
            Diário de Craque
          </Link>
          <div className="flex items-center">
            {token ? (
              <>
                <Link
                  to="/review/weekly"
                  className="text-gray-300 hover:text-white mr-4"
                >
                  Revisão Semanal
                </Link>
                <Link
                  to="/review/monthly"
                  className="text-gray-300 hover:text-white mr-4"
                >
                  Revisão Mensal
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white mr-4"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white mr-4"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-300 hover:text-white mr-4"
                >
                  Cadastro
                </Link>
              </>
            )}
            <button
              onClick={toggleDarkMode}
              className="text-gray-300 hover:text-white"
            >
              Toggle Dark Mode
            </button>
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;