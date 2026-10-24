/**
 * DIY UNIVERSITY - Main Layout
 * 3-Panel Academic Command Center
 */

import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiHome, FiBook, FiUsers, FiAward, FiBriefcase,
  FiCommand, FiEdit3, FiMenu, FiSearch,
  FiBell, FiSettings, FiChevronRight, FiBookOpen, FiZap
} from 'react-icons/fi';

const SCHOOLS = [
  { id: 'writing', name: 'Writing & Storytelling', icon: '✍️', color: '#6366f1' },
  { id: 'business', name: 'Business & Entrepreneurship', icon: '💼', color: '#10b981' },
  { id: 'design', name: 'Design & Visual Media', icon: '🎨', color: '#ec4899' },
  { id: 'film', name: 'Film, Audio & Media', icon: '🎬', color: '#f59e0b' },
  { id: 'tech', name: 'Technology & AI', icon: '🤖', color: '#06b6d4' },
  { id: 'operations', name: 'Execution & Operations', icon: '⚙️', color: '#8b5cf6' },
  { id: 'workforce', name: 'Trade & Workforce', icon: '🔧', color: '#22c55e' }
];

const NAV_ITEMS = [
  { path: '/', icon: FiHome, label: 'Dashboard' },
  { path: '/schools', icon: FiBook, label: 'Schools' },
  { path: '/faculty', icon: FiUsers, label: 'Faculty' },
  { path: '/certifications', icon: FiAward, label: 'Certifications' },
  { path: '/workforce', icon: FiBriefcase, label: 'Workforce' },
  { path: '/command-center', icon: FiCommand, label: 'Command Center' },
  { path: '/studio', icon: FiEdit3, label: 'Studio' },
  { path: '/adaptation-engine', icon: FiZap, label: 'Adaptation Engine' },
  { path: '/flipbook', icon: FiBookOpen, label: 'Guides' }
];

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightPanelOpen] = useState(true);

  return (
    <div className="diy-layout">
      {/* Top Bar */}
      <header className="h-14 bg-dark-800 border-b border-dark-600 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-dark-700 rounded-lg text-gray-400 hover:text-white"
          >
            <FiMenu size={20} />
          </button>
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold">
              D
            </div>
            <span className="font-serif text-xl text-white">DIY University</span>
          </Link>
        </div>

        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search courses, lessons, faculty..."
              className="w-full bg-dark-700 border border-dark-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-dark-700 rounded-lg text-gray-400 hover:text-white relative">
            <FiBell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 hover:bg-dark-700 rounded-lg text-gray-400 hover:text-white">
            <FiSettings size={20} />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-sm font-medium cursor-pointer">
            U
          </div>
        </div>
      </header>

      <div className="main-container">
        {/* Left Sidebar */}
        <motion.aside
          initial={false}
          animate={{ width: sidebarOpen ? 260 : 60 }}
          className="bg-dark-800 border-r border-dark-600 flex flex-col overflow-hidden"
        >
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-400 hover:bg-dark-700 hover:text-white'
                  }`}
                >
                  <item.icon size={20} />
                  {sidebarOpen && <span className="font-medium">{item.label}</span>}
                </Link>
              );
            })}

            {sidebarOpen && (
              <>
                <div className="pt-4 pb-2">
                  <span className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Schools
                  </span>
                </div>
                {SCHOOLS.map((school) => (
                  <button
                    key={school.id}
                    onClick={() => navigate(`/schools/${school.id}`)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-dark-700 hover:text-white transition-all text-left"
                  >
                    <span className="text-lg">{school.icon}</span>
                    <span className="text-sm truncate">{school.name}</span>
                  </button>
                ))}
              </>
            )}
          </nav>

          {sidebarOpen && (
            <div className="p-3 border-t border-dark-600">
              <div className="text-xs text-gray-500 mb-2">EOF Ecosystem</div>
              <div className="space-y-1">
                <a href="http://localhost:5173" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:bg-dark-700 hover:text-white text-sm">
                  <FiZap className="text-purple-400" /> Griot AI Studio
                </a>
                <a href="http://localhost:5174" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:bg-dark-700 hover:text-white text-sm">
                  <FiBookOpen className="text-yellow-400" /> EOF Library
                </a>
              </div>
            </div>
          )}
        </motion.aside>

        {/* Center Content */}
        <main className="center-content">
          <Outlet />
        </main>

        {/* Right Panel - Faculty Assistant */}
        {rightPanelOpen && (
          <motion.aside
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-80 bg-dark-800 border-l border-dark-600 flex flex-col"
          >
            <div className="p-4 border-b border-dark-600">
              <h3 className="font-medium text-white flex items-center gap-2">
                <FiUsers className="text-primary" /> Faculty Assistant
              </h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <FacultyQuickAccess />
            </div>
          </motion.aside>
        )}
      </div>
    </div>
  );
}

function FacultyQuickAccess() {
  const professors = [
    { id: 'dean', name: 'Dean AI', avatar: '🎓', status: 'online', role: 'Administration' },
    { id: 'inkwell', name: 'Prof. Inkwell', avatar: '✍️', status: 'online', role: 'Writing' },
    { id: 'venture', name: 'Prof. Venture', avatar: '💼', status: 'online', role: 'Business' },
    { id: 'canvas', name: 'Prof. Canvas', avatar: '🎨', status: 'busy', role: 'Design' },
    { id: 'reel', name: 'Prof. Reel', avatar: '🎬', status: 'online', role: 'Film' },
  ];

  return (
    <div className="space-y-3">
      {professors.map((prof) => (
        <button
          key={prof.id}
          className="w-full flex items-center gap-3 p-3 rounded-lg bg-dark-700 hover:bg-dark-600 transition-all text-left"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center text-xl">
              {prof.avatar}
            </div>
            <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-dark-700 ${
              prof.status === 'online' ? 'bg-green-400' : 'bg-yellow-400'
            }`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">{prof.name}</p>
            <p className="text-gray-500 text-xs">{prof.role}</p>
          </div>
          <FiChevronRight className="text-gray-500" />
        </button>
      ))}
      <Link to="/faculty" className="block w-full py-2 text-primary text-sm font-medium hover:underline text-center">
        View All Faculty →
      </Link>
    </div>
  );
}

export default Layout;
