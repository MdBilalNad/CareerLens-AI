import React from 'react';
import { APP_NAME } from '../config/app';
import { useAuth } from '../context/AuthContext';
import { Moon, Sun, LogOut, User as UserIcon } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate }) => {
  const { user, isAuthenticated, logout, theme, toggleTheme } = useAuth();

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <header className="w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => navigate('/')}
          className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 hover:opacity-85 transition-opacity flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 bg-blue-600 dark:bg-blue-500 rounded-xs inline-block" />
          <span>{APP_NAME}</span>
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
          <button
            onClick={() => navigate('/upload')}
            className={`hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors ${
              currentPath === '/upload' ? 'text-neutral-900 dark:text-neutral-100 font-medium' : ''
            }`}
          >
            Upload Resume
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className={`hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors ${
              currentPath === '/dashboard' ? 'text-neutral-900 dark:text-neutral-100 font-medium' : ''
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate('/how-it-works')}
            className={`hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors ${
              currentPath === '/how-it-works' ? 'text-neutral-900 dark:text-neutral-100 font-medium' : ''
            }`}
          >
            How Scoring Works
          </button>
          {isAuthenticated && (
            <button
              onClick={() => navigate('/settings')}
              className={`hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors ${
                currentPath === '/settings' ? 'text-neutral-900 dark:text-neutral-100 font-medium' : ''
              }`}
            >
              Settings
            </button>
          )}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleTheme}
            aria-label="Toggle visual theme"
            className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors rounded-xs border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800"
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2 text-xs">
              {/* User Avatar Badge */}
              <div
                onClick={() => navigate('/settings')}
                title={user?.email}
                className="hidden sm:flex items-center gap-1.5 px-2 py-1 bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/80 rounded-xs cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
              >
                <span className="w-5 h-5 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-[10px] font-mono font-bold flex items-center justify-center rounded-xs">
                  {getInitials(user?.fullName)}
                </span>
                <span className="font-medium text-neutral-800 dark:text-neutral-200 max-w-[100px] truncate">
                  {user?.fullName.split(' ')[0]}
                </span>
              </div>

              {/* Enhanced Logout Button */}
              <button
                onClick={logout}
                title="Log out of session"
                className="btn-secondary text-xs py-1 px-2.5 flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-neutral-50 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <LogOut size={13} className="text-neutral-500" />
                <span>Log out</span>
              </button>

              <button
                onClick={() => navigate('/upload')}
                className="btn-primary text-xs py-1 px-3 hidden xs:inline-flex"
              >
                Analyze
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/login')}
                className="text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 px-2 py-1.5"
              >
                Log in
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="btn-primary text-xs py-1.5 px-3"
              >
                Sign up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
