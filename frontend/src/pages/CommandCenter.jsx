/**
 * DIY UNIVERSITY - Command Center
 * Administrative dashboard for system oversight
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiCommand, FiActivity, FiUsers, FiBook, FiAward,
  FiBriefcase, FiTrendingUp, FiAlertCircle, FiCheckCircle,
  FiClock, FiZap, FiDatabase, FiServer, FiGlobe, FiRefreshCw
} from 'react-icons/fi';

function CommandCenter() {
  const [systemStatus] = useState({
    diyUniversity: { status: 'online', latency: '12ms' },
    griotAI: { status: 'online', latency: '45ms' },
    eofLibrary: { status: 'online', latency: '38ms' },
    database: { status: 'online', latency: '8ms' },
    aiProviders: { status: 'partial', message: 'Demo mode - add API keys' }
  });

  const stats = [
    { label: 'Active Learners', value: '2,847', change: '+12%', icon: FiUsers, color: 'primary' },
    { label: 'Courses Completed', value: '8,392', change: '+24%', icon: FiBook, color: 'accent' },
    { label: 'Certificates Issued', value: '1,456', change: '+18%', icon: FiAward, color: 'gold' },
    { label: 'Job Placements', value: '234', change: '+8%', icon: FiBriefcase, color: 'secondary' }
  ];

  const recentActivity = [
    { type: 'enrollment', user: 'Marcus J.', action: 'enrolled in Business Launch 101', time: '2m ago' },
    { type: 'certificate', user: 'Aisha T.', action: 'earned Writing Fundamentals certificate', time: '5m ago' },
    { type: 'completion', user: 'Devon C.', action: 'completed AI Prompt Engineering course', time: '12m ago' },
    { type: 'faculty', user: 'Prof. Inkwell', action: 'assisted 15 students today', time: '18m ago' },
    { type: 'partner', user: 'Faith Community Church', action: 'onboarded 24 new learners', time: '1h ago' }
  ];

  const facultyActivity = [
    { name: 'Dean AI', sessions: 45, status: 'online', load: 23 },
    { name: 'Prof. Inkwell', sessions: 32, status: 'online', load: 67 },
    { name: 'Prof. Venture', sessions: 28, status: 'online', load: 54 },
    { name: 'Prof. Canvas', sessions: 19, status: 'busy', load: 89 },
    { name: 'Prof. Circuit', sessions: 41, status: 'online', load: 45 }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
            <FiCommand className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-serif text-white">Command Center</h1>
            <p className="text-gray-400">System administration and oversight</p>
          </div>
        </div>
        <button className="btn btn-secondary">
          <FiRefreshCw /> Refresh
        </button>
      </motion.div>

      {/* System Status Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-gradient-to-r from-green-500/10 to-accent/10 border-green-500/30"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white font-medium">All Systems Operational</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <StatusIndicator name="DIY University" status={systemStatus.diyUniversity.status} />
            <StatusIndicator name="Griot AI" status={systemStatus.griotAI.status} />
            <StatusIndicator name="EOF Library" status={systemStatus.eofLibrary.status} />
            <StatusIndicator name="Database" status={systemStatus.database.status} />
            <StatusIndicator name="AI Providers" status={systemStatus.aiProviders.status} />
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, i) => (
          <div key={i} className="card">
            <div className="flex items-center justify-between mb-3">
              <stat.icon className={`text-${stat.color}`} size={24} />
              <span className="text-green-400 text-sm font-medium">{stat.change}</span>
            </div>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
            <p className="text-gray-500 text-sm">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FiActivity className="text-primary" /> Recent Activity
          </h2>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-dark-700/50">
                <ActivityIcon type={activity.type} />
                <div className="flex-1">
                  <p className="text-white text-sm">
                    <span className="font-medium">{activity.user}</span>{' '}
                    <span className="text-gray-400">{activity.action}</span>
                  </p>
                  <p className="text-gray-500 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Faculty Activity */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FiUsers className="text-primary" /> Faculty Activity
          </h2>
          <div className="space-y-3">
            {facultyActivity.map((faculty, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-dark-700/50">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{faculty.name}</span>
                    <span className={`w-2 h-2 rounded-full ${
                      faculty.status === 'online' ? 'bg-green-400' : 'bg-yellow-400'
                    }`} />
                  </div>
                  <p className="text-gray-500 text-sm">{faculty.sessions} sessions today</p>
                </div>
                <div className="w-20">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Load</span>
                    <span>{faculty.load}%</span>
                  </div>
                  <div className="progress-bar h-2">
                    <div
                      className={`progress-fill ${faculty.load > 80 ? '!bg-red-500' : faculty.load > 60 ? '!bg-yellow-500' : ''}`}
                      style={{ width: `${faculty.load}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* EOF Integration Panel */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card"
      >
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <FiGlobe className="text-primary" /> EOF Ecosystem Integration
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <IntegrationCard
            name="Griot AI Studio"
            icon="🎬"
            status="connected"
            description="Creative OS for content creation"
            url="http://localhost:5173"
            stats={{ projects: 47, generations: 1234 }}
          />
          <IntegrationCard
            name="EOF Digital Library"
            icon="📚"
            status="connected"
            description="Content & creator platform"
            url="http://localhost:5174"
            stats={{ books: 892, adaptations: 156 }}
          />
          <IntegrationCard
            name="DIY University"
            icon="🎓"
            status="active"
            description="Education & workforce system"
            url="http://localhost:5175"
            stats={{ learners: 2847, certificates: 1456 }}
          />
        </div>
      </motion.section>

      {/* Quick Actions */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card"
      >
        <h2 className="text-lg font-semibold text-white mb-4">Admin Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="btn btn-secondary justify-start">
            <FiUsers /> Manage Users
          </button>
          <button className="btn btn-secondary justify-start">
            <FiBook /> Course Editor
          </button>
          <button className="btn btn-secondary justify-start">
            <FiAward /> Issue Certificate
          </button>
          <button className="btn btn-secondary justify-start">
            <FiDatabase /> Database
          </button>
        </div>
      </motion.section>
    </div>
  );
}

function StatusIndicator({ name, status }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${
        status === 'online' ? 'bg-green-400' :
        status === 'partial' ? 'bg-yellow-400' :
        'bg-red-400'
      }`} />
      <span className="text-gray-400">{name}</span>
    </div>
  );
}

function ActivityIcon({ type }) {
  const icons = {
    enrollment: <FiBook className="text-primary" />,
    certificate: <FiAward className="text-gold" />,
    completion: <FiCheckCircle className="text-accent" />,
    faculty: <FiUsers className="text-purple-400" />,
    partner: <FiBriefcase className="text-secondary" />
  };

  return (
    <div className="w-8 h-8 rounded-lg bg-dark-600 flex items-center justify-center">
      {icons[type] || <FiActivity />}
    </div>
  );
}

function IntegrationCard({ name, icon, status, description, url, stats }) {
  return (
    <div className="p-4 rounded-xl bg-dark-700 border border-dark-600 hover:border-primary transition-all">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <h3 className="text-white font-medium">{name}</h3>
          <span className={`text-xs ${
            status === 'active' ? 'text-green-400' : 'text-blue-400'
          }`}>
            {status === 'active' ? '● Active' : '● Connected'}
          </span>
        </div>
      </div>
      <p className="text-gray-500 text-sm mb-3">{description}</p>
      <div className="flex items-center justify-between text-xs">
        <div className="text-gray-400">
          {Object.entries(stats).map(([key, val], i) => (
            <span key={key}>
              {i > 0 && ' · '}{val} {key}
            </span>
          ))}
        </div>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          Open →
        </a>
      </div>
    </div>
  );
}

export default CommandCenter;
