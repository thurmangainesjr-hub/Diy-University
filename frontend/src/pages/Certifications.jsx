/**
 * DIY UNIVERSITY - Certifications Page
 * Badges, certificates, and credential tracking
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiAward, FiDownload, FiShare2, FiExternalLink,
  FiCheckCircle, FiLock, FiClock, FiStar
} from 'react-icons/fi';

const CERTIFICATES = [
  {
    id: 1,
    title: 'Storytelling Fundamentals',
    school: 'Writing & Storytelling',
    icon: '✍️',
    color: '#6366f1',
    status: 'earned',
    earnedDate: 'January 15, 2024',
    grade: 'A',
    hours: 48,
    skills: ['Story Structure', 'Character Development', 'Dialogue', 'Theme'],
    credentialId: 'DIY-WRT-001-2024'
  },
  {
    id: 2,
    title: 'Business Launch 101',
    school: 'Business & Entrepreneurship',
    icon: '💼',
    color: '#10b981',
    status: 'in_progress',
    progress: 45,
    hours: 72,
    skills: ['Business Model', 'Market Research', 'MVP', 'Launch Strategy']
  },
  {
    id: 3,
    title: 'AI Prompt Engineering',
    school: 'Technology & AI',
    icon: '🤖',
    color: '#06b6d4',
    status: 'in_progress',
    progress: 23,
    hours: 36,
    skills: ['Prompt Design', 'Chain of Thought', 'AI Tools', 'Automation']
  },
  {
    id: 4,
    title: 'Graphic Design Fundamentals',
    school: 'Design & Visual Media',
    icon: '🎨',
    color: '#ec4899',
    status: 'locked',
    hours: 60,
    skills: ['Typography', 'Color Theory', 'Layout', 'Composition'],
    prerequisite: 'Complete Writing Fundamentals'
  },
  {
    id: 5,
    title: 'Filmmaking 101',
    school: 'Film, Audio & Media',
    icon: '🎬',
    color: '#f59e0b',
    status: 'locked',
    hours: 72,
    skills: ['Cinematography', 'Directing', 'Editing', 'Sound Design'],
    prerequisite: 'Enroll in course'
  }
];

const BADGES = [
  { id: 1, name: 'First Steps', icon: '🎯', description: 'Complete your first lesson', earned: true },
  { id: 2, name: 'Story Starter', icon: '✍️', description: 'Write your first story outline', earned: true },
  { id: 3, name: 'Quick Learner', icon: '⚡', description: 'Complete 5 lessons in one day', earned: true },
  { id: 4, name: 'Business Mind', icon: '💼', description: 'Complete Business Launch 101', earned: false },
  { id: 5, name: 'Creative Eye', icon: '🎨', description: 'Complete a design project', earned: false },
  { id: 6, name: 'Tech Savvy', icon: '🤖', description: 'Master AI prompts', earned: false },
  { id: 7, name: 'Streak Master', icon: '🔥', description: '30-day learning streak', earned: false },
  { id: 8, name: 'Perfectionist', icon: '💎', description: 'Score 100% on any exam', earned: false }
];

function Certifications() {
  const [activeTab, setActiveTab] = useState('certificates');
  const [selectedCert, setSelectedCert] = useState(null);

  const earnedCerts = CERTIFICATES.filter(c => c.status === 'earned');
  const inProgressCerts = CERTIFICATES.filter(c => c.status === 'in_progress');
  const earnedBadges = BADGES.filter(b => b.earned);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold to-yellow-600 flex items-center justify-center">
            <FiAward className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-serif text-white">Certifications</h1>
            <p className="text-gray-400">Your earned credentials and progress</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="text-center px-4">
            <p className="text-2xl font-bold text-gold">{earnedCerts.length}</p>
            <p className="text-gray-500 text-sm">Certificates</p>
          </div>
          <div className="text-center px-4 border-l border-dark-600">
            <p className="text-2xl font-bold text-primary">{earnedBadges.length}</p>
            <p className="text-gray-500 text-sm">Badges</p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 border-b border-dark-600 pb-2"
      >
        {['certificates', 'badges'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-t-lg font-medium transition-all ${
              activeTab === tab
                ? 'bg-dark-700 text-white border-b-2 border-primary'
                : 'text-gray-500 hover:text-white'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </motion.div>

      {activeTab === 'certificates' ? (
        <div className="space-y-6">
          {/* Earned Certificates */}
          {earnedCerts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FiCheckCircle className="text-accent" /> Earned Certificates
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {earnedCerts.map((cert) => (
                  <CertificateCard key={cert.id} cert={cert} onSelect={setSelectedCert} />
                ))}
              </div>
            </motion.section>
          )}

          {/* In Progress */}
          {inProgressCerts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FiClock className="text-primary" /> In Progress
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inProgressCerts.map((cert) => (
                  <CertificateCard key={cert.id} cert={cert} />
                ))}
              </div>
            </motion.section>
          )}

          {/* Locked */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FiLock className="text-gray-500" /> Available to Unlock
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CERTIFICATES.filter(c => c.status === 'locked').map((cert) => (
                <CertificateCard key={cert.id} cert={cert} />
              ))}
            </div>
          </motion.section>
        </div>
      ) : (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {BADGES.map((badge, i) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`card text-center py-6 ${badge.earned ? '' : 'opacity-50'}`}
              >
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-3 ${
                  badge.earned
                    ? 'bg-gradient-to-br from-gold/20 to-yellow-600/20 border-2 border-gold'
                    : 'bg-dark-700 border border-dark-600'
                }`}>
                  {badge.icon}
                </div>
                <h3 className="text-white font-medium mb-1">{badge.name}</h3>
                <p className="text-gray-500 text-xs">{badge.description}</p>
                {badge.earned && (
                  <span className="inline-flex items-center gap-1 text-gold text-xs mt-2">
                    <FiCheckCircle size={12} /> Earned
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Certificate Modal */}
      {selectedCert && (
        <CertificateModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
      )}
    </div>
  );
}

function CertificateCard({ cert, onSelect }) {
  const isEarned = cert.status === 'earned';
  const isInProgress = cert.status === 'in_progress';
  const isLocked = cert.status === 'locked';

  return (
    <div
      className={`card ${isEarned ? 'hover:border-gold cursor-pointer' : ''} ${isLocked ? 'opacity-60' : ''}`}
      onClick={() => isEarned && onSelect?.(cert)}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: `${cert.color}20` }}
        >
          {cert.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-white font-semibold truncate">{cert.title}</h3>
            {isEarned && <FiCheckCircle className="text-gold flex-shrink-0" />}
            {isLocked && <FiLock className="text-gray-500 flex-shrink-0" />}
          </div>
          <p className="text-gray-500 text-sm">{cert.school}</p>

          {isEarned && (
            <div className="mt-2 flex items-center gap-3 text-sm">
              <span className="text-gold">Grade: {cert.grade}</span>
              <span className="text-gray-500">·</span>
              <span className="text-gray-400">{cert.earnedDate}</span>
            </div>
          )}

          {isInProgress && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-500">Progress</span>
                <span className="text-primary">{cert.progress}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${cert.progress}%` }} />
              </div>
            </div>
          )}

          {isLocked && cert.prerequisite && (
            <p className="text-gray-500 text-sm mt-2">{cert.prerequisite}</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {cert.skills.map((skill, i) => (
          <span key={i} className="badge bg-dark-600 text-gray-400 text-xs">{skill}</span>
        ))}
      </div>
    </div>
  );
}

function CertificateModal({ cert, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-dark-800 rounded-2xl border border-gold/30 max-w-2xl w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Certificate Display */}
        <div className="bg-gradient-to-br from-dark-700 to-dark-800 p-8 border-b border-gold/20">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-gold/20 to-yellow-600/20 border-2 border-gold flex items-center justify-center text-4xl mb-4">
              {cert.icon}
            </div>
            <p className="text-gold text-sm uppercase tracking-wider mb-2">Certificate of Completion</p>
            <h2 className="text-2xl font-serif text-white mb-2">{cert.title}</h2>
            <p className="text-gray-400">{cert.school}</p>
            <div className="flex items-center justify-center gap-4 mt-4 text-sm">
              <span className="text-gold">Grade: {cert.grade}</span>
              <span className="text-gray-500">|</span>
              <span className="text-gray-400">{cert.hours} hours</span>
              <span className="text-gray-500">|</span>
              <span className="text-gray-400">{cert.earnedDate}</span>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="p-6">
          <h3 className="text-white font-medium mb-3">Skills Demonstrated</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {cert.skills.map((skill, i) => (
              <span key={i} className="badge badge-gold">{skill}</span>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
            <span>Credential ID: {cert.credentialId}</span>
            <span>DIY University</span>
          </div>

          <div className="flex gap-3">
            <button className="btn btn-primary flex-1">
              <FiDownload /> Download PDF
            </button>
            <button className="btn btn-secondary flex-1">
              <FiShare2 /> Share
            </button>
            <button className="btn btn-secondary">
              <FiExternalLink /> Verify
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Certifications;
