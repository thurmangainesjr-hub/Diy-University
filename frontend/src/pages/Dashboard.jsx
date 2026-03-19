/**
 * DIY UNIVERSITY - Dashboard
 * Main overview with progress, schools, and quick actions
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiBook, FiAward, FiTrendingUp, FiClock, FiPlay,
  FiUsers, FiTarget, FiZap, FiArrowRight, FiStar
} from 'react-icons/fi';

const SCHOOLS = [
  { id: 'writing', name: 'Writing & Storytelling', icon: '✍️', courses: 12, color: '#6366f1' },
  { id: 'business', name: 'Business & Entrepreneurship', icon: '💼', courses: 15, color: '#10b981' },
  { id: 'design', name: 'Design & Visual Media', icon: '🎨', courses: 10, color: '#ec4899' },
  { id: 'film', name: 'Film, Audio & Media', icon: '🎬', courses: 14, color: '#f59e0b' },
  { id: 'tech', name: 'Technology & AI', icon: '🤖', courses: 18, color: '#06b6d4' },
  { id: 'operations', name: 'Execution & Operations', icon: '⚙️', courses: 8, color: '#8b5cf6' },
  { id: 'workforce', name: 'Trade & Workforce', icon: '🔧', courses: 11, color: '#22c55e' }
];

const CONTINUE_LEARNING = [
  { id: 1, title: 'Storytelling Fundamentals', school: 'Writing', progress: 68, lesson: 'Character Development' },
  { id: 2, title: 'Business Launch 101', school: 'Business', progress: 45, lesson: 'Market Research' },
  { id: 3, title: 'AI Prompt Engineering', school: 'Technology', progress: 23, lesson: 'Advanced Prompts' }
];

const ACHIEVEMENTS = [
  { id: 1, name: 'First Steps', icon: '🎯', earned: true },
  { id: 2, name: 'Story Starter', icon: '✍️', earned: true },
  { id: 3, name: 'Quick Learner', icon: '⚡', earned: true },
  { id: 4, name: 'Business Mind', icon: '💼', earned: false },
  { id: 5, name: 'Creative Eye', icon: '🎨', earned: false }
];

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-serif text-white mb-2">Welcome to DIY University</h1>
          <p className="text-gray-400">Transform from learner to creator to owner</p>
        </div>
        <button
          onClick={() => navigate('/studio')}
          className="btn btn-primary"
        >
          <FiZap /> Open Studio
        </button>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <StatCard icon={FiBook} label="Courses Enrolled" value="7" color="primary" />
        <StatCard icon={FiAward} label="Certificates Earned" value="3" color="gold" />
        <StatCard icon={FiTrendingUp} label="Current Streak" value="12 days" color="accent" />
        <StatCard icon={FiClock} label="Learning Hours" value="48h" color="secondary" />
      </motion.div>

      {/* Continue Learning */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <FiPlay className="text-primary" /> Continue Learning
          </h2>
          <Link to="/courses" className="text-primary text-sm hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CONTINUE_LEARNING.map((course) => (
            <div key={course.id} className="card hover:border-primary cursor-pointer group">
              <div className="flex items-center justify-between mb-3">
                <span className="badge badge-primary">{course.school}</span>
                <span className="text-sm text-gray-500">{course.progress}%</span>
              </div>
              <h3 className="text-white font-medium mb-1 group-hover:text-primary transition-colors">
                {course.title}
              </h3>
              <p className="text-gray-500 text-sm mb-3">Next: {course.lesson}</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${course.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Schools Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <FiBook className="text-primary" /> Schools
          </h2>
          <Link to="/schools" className="text-primary text-sm hover:underline flex items-center gap-1">
            Explore All <FiArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {SCHOOLS.map((school) => (
            <motion.button
              key={school.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/schools/${school.id}`)}
              className="card text-center py-6 hover:border-primary"
              style={{ '--school-color': school.color }}
            >
              <span className="text-4xl mb-3 block">{school.icon}</span>
              <h3 className="text-white text-sm font-medium mb-1">{school.name.split(' ')[0]}</h3>
              <p className="text-gray-500 text-xs">{school.courses} courses</p>
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* Two Column: Achievements & Faculty */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Achievements */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <FiAward className="text-gold" /> Achievements
            </h2>
            <Link to="/certifications" className="text-primary text-sm hover:underline">View All</Link>
          </div>
          <div className="flex gap-4">
            {ACHIEVEMENTS.map((badge) => (
              <div
                key={badge.id}
                className={`flex flex-col items-center ${badge.earned ? '' : 'opacity-40'}`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${
                  badge.earned
                    ? 'bg-gradient-to-br from-gold/20 to-yellow-600/20 border-2 border-gold'
                    : 'bg-dark-700 border border-dark-600'
                }`}>
                  {badge.icon}
                </div>
                <span className="text-xs text-gray-400 mt-2 text-center">{badge.name}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Quick Actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FiTarget className="text-accent" /> Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => navigate('/faculty')} className="btn btn-secondary justify-start">
              <FiUsers /> Ask Faculty
            </button>
            <button onClick={() => navigate('/studio')} className="btn btn-secondary justify-start">
              <FiZap /> Open Studio
            </button>
            <button onClick={() => navigate('/certifications')} className="btn btn-secondary justify-start">
              <FiAward /> My Certs
            </button>
            <button onClick={() => navigate('/workforce')} className="btn btn-secondary justify-start">
              <FiStar /> Workforce
            </button>
          </div>
        </motion.section>
      </div>

      {/* EOF Ecosystem Banner */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card bg-gradient-to-r from-primary/10 to-purple-600/10 border-primary/30"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
              <FiZap className="text-primary" size={28} />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">EOF Ecosystem Integration</h3>
              <p className="text-gray-400">Connect your learning to real projects in Griot AI & EOF Library</p>
            </div>
          </div>
          <div className="flex gap-3">
            <a href="http://localhost:5173" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              Griot AI
            </a>
            <a href="http://localhost:5174" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              EOF Library
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  const colorClasses = {
    primary: 'from-primary/20 to-primary/5 text-primary',
    gold: 'from-gold/20 to-gold/5 text-gold',
    accent: 'from-accent/20 to-accent/5 text-accent',
    secondary: 'from-secondary/20 to-secondary/5 text-secondary'
  };

  return (
    <div className="card">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center`}>
          <Icon size={24} />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-gray-500 text-sm">{label}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
