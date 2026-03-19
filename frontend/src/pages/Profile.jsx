/**
 * DIY UNIVERSITY - Profile Page
 * User profile, settings, and learning history
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiUser, FiMail, FiMapPin, FiCalendar, FiEdit2,
  FiBook, FiAward, FiClock, FiTrendingUp, FiSettings,
  FiLogOut, FiBell, FiShield, FiExternalLink
} from 'react-icons/fi';

const USER_DATA = {
  name: 'Marcus Johnson',
  email: 'marcus@example.com',
  location: 'Atlanta, GA',
  joinDate: 'September 2023',
  avatar: '👤',
  bio: 'Aspiring entrepreneur and storyteller. Building my skills to launch my own media company.',
  stats: {
    coursesCompleted: 3,
    certificatesEarned: 1,
    learningHours: 48,
    currentStreak: 12
  },
  currentCourses: [
    { title: 'Storytelling Fundamentals', progress: 68 },
    { title: 'Business Launch 101', progress: 45 },
    { title: 'AI Prompt Engineering', progress: 23 }
  ],
  recentActivity: [
    { action: 'Completed lesson', detail: 'Character Development', time: '2 hours ago' },
    { action: 'Earned badge', detail: 'Quick Learner', time: '1 day ago' },
    { action: 'Started course', detail: 'AI Prompt Engineering', time: '3 days ago' },
    { action: 'Completed course', detail: 'Writing Basics', time: '1 week ago' }
  ]
};

function Profile() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-gradient-to-r from-primary/10 to-purple-600/10 border-primary/30"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-5xl">
              {USER_DATA.avatar}
            </div>
            <div>
              <h1 className="text-3xl font-serif text-white mb-1">{USER_DATA.name}</h1>
              <p className="text-gray-400 mb-3">{USER_DATA.bio}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <FiMail size={14} /> {USER_DATA.email}
                </span>
                <span className="flex items-center gap-1">
                  <FiMapPin size={14} /> {USER_DATA.location}
                </span>
                <span className="flex items-center gap-1">
                  <FiCalendar size={14} /> Joined {USER_DATA.joinDate}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn btn-secondary"
          >
            <FiEdit2 /> Edit Profile
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <StatCard
          icon={FiBook}
          label="Courses Completed"
          value={USER_DATA.stats.coursesCompleted}
          color="primary"
        />
        <StatCard
          icon={FiAward}
          label="Certificates Earned"
          value={USER_DATA.stats.certificatesEarned}
          color="gold"
        />
        <StatCard
          icon={FiClock}
          label="Learning Hours"
          value={`${USER_DATA.stats.learningHours}h`}
          color="accent"
        />
        <StatCard
          icon={FiTrendingUp}
          label="Current Streak"
          value={`${USER_DATA.stats.currentStreak} days`}
          color="secondary"
        />
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-2 border-b border-dark-600 pb-2"
      >
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'courses', label: 'My Courses' },
          { id: 'activity', label: 'Activity' },
          { id: 'settings', label: 'Settings' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 rounded-t-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-dark-700 text-white border-b-2 border-primary'
                : 'text-gray-500 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Progress */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FiBook className="text-primary" /> Current Courses
            </h2>
            <div className="space-y-4">
              {USER_DATA.currentCourses.map((course, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white">{course.title}</span>
                    <span className="text-primary">{course.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Recent Activity */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
          >
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FiClock className="text-primary" /> Recent Activity
            </h2>
            <div className="space-y-3">
              {USER_DATA.recentActivity.map((activity, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-dark-700/50">
                  <div>
                    <p className="text-white text-sm">{activity.action}</p>
                    <p className="text-gray-500 text-xs">{activity.detail}</p>
                  </div>
                  <span className="text-gray-500 text-xs">{activity.time}</span>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      )}

      {activeTab === 'courses' && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {USER_DATA.currentCourses.map((course, i) => (
            <div key={i} className="card hover:border-primary cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">{course.title}</h3>
                  <p className="text-gray-500 text-sm">In Progress</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-primary">{course.progress}%</span>
                  <div className="w-32 mt-2">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.section>
      )}

      {activeTab === 'activity' && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="space-y-4">
            {USER_DATA.recentActivity.map((activity, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-dark-700/50">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <FiBook className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-white">{activity.action}: <span className="text-primary">{activity.detail}</span></p>
                  <p className="text-gray-500 text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {activeTab === 'settings' && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <SettingsCard
            icon={FiUser}
            title="Account Settings"
            description="Update your profile information and preferences"
          />
          <SettingsCard
            icon={FiBell}
            title="Notifications"
            description="Manage email and push notification preferences"
          />
          <SettingsCard
            icon={FiShield}
            title="Privacy & Security"
            description="Password, two-factor authentication, and data"
          />
          <SettingsCard
            icon={FiExternalLink}
            title="Connected Apps"
            description="Griot AI, EOF Library, and other integrations"
          />
          <div className="card border-red-500/30 hover:border-red-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <FiLogOut className="text-red-500" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-medium">Sign Out</h3>
                  <p className="text-gray-500 text-sm">Sign out of your account</p>
                </div>
              </div>
              <button className="btn bg-red-500/20 text-red-500 hover:bg-red-500/30">
                Sign Out
              </button>
            </div>
          </div>
        </motion.section>
      )}
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

function SettingsCard({ icon: Icon, title, description }) {
  return (
    <div className="card hover:border-primary cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-dark-700 flex items-center justify-center">
            <Icon className="text-primary" size={24} />
          </div>
          <div>
            <h3 className="text-white font-medium">{title}</h3>
            <p className="text-gray-500 text-sm">{description}</p>
          </div>
        </div>
        <FiEdit2 className="text-gray-500" />
      </div>
    </div>
  );
}

export default Profile;
