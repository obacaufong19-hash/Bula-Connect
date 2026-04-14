'use client';
import { useState, useEffect } from 'react';
import OfflineMap from '../components/OfflineMap';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.theme === 'dark') setDarkMode(true);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-900 sticky top-0 z-50 border-b">
        <div className="max-w-screen-2xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🌺</span>
            <h1 className="logo-font text-3xl text-[#00AEEF]">Bula Connect</h1>
          </div>
          <button onClick={toggleTheme} className="text-2xl">
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      <main>
        <OfflineMap />
      </main>
    </div>
  );
}
