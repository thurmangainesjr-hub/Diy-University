/**
 * DIY UNIVERSITY - Faculty Page
 * AI-Powered Academic Faculty System
 *
 * Features:
 * - Dean AI + Assistant Dean
 * - 12-20 Professor Agents with specialties
 * - Metacognition display (confidence, gaps, risks)
 * - Chat interface with each professor
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUsers, FiMessageCircle, FiAlertTriangle, FiCheckCircle,
  FiTarget, FiCpu, FiSend, FiX, FiChevronRight
} from 'react-icons/fi';

// Administration Faculty
const ADMIN_FACULTY = [
  {
    id: 'dean',
    name: 'Dean AI',
    title: 'Academic Oversight',
    avatar: '🎓',
    avatarBg: 'linear-gradient(135deg, #d4af37 0%, #b8962e 100%)',
    status: 'online',
    description: 'Master academic controller overseeing all pathways, certifications, and faculty coordination.',
    capabilities: ['Academic oversight', 'Pathway progression', 'Certification review', 'Faculty coordination'],
    confidence: 98,
    reasoning: { thinking: 'Monitoring all student progress and faculty activity...', gaps: [], risks: [] }
  },
  {
    id: 'assistant-dean',
    name: 'Assistant Dean',
    title: 'Student Support',
    avatar: '📋',
    avatarBg: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    status: 'online',
    description: 'Student support monitoring, progress tracking, and intervention assistance.',
    capabilities: ['Student support', 'Progress tracking', 'Cohort alerts', 'Intervention support'],
    confidence: 95,
    reasoning: { thinking: 'Reviewing student engagement metrics...', gaps: [], risks: [] }
  },
  {
    id: 'partner-coordinator',
    name: 'Partner Coordinator',
    title: 'Institutional Partnerships',
    avatar: '🤝',
    avatarBg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    status: 'online',
    description: 'Manages church, trade school, nonprofit, and workforce partnerships.',
    capabilities: ['Partner onboarding', 'Cohort reporting', 'Institutional support'],
    confidence: 92,
    reasoning: { thinking: 'Coordinating with partner institutions...', gaps: [], risks: [] }
  }
];

// Professor Agents (12 starting professors)
const PROFESSORS = [
  // Writing & Storytelling
  {
    id: 'inkwell',
    name: 'Prof. Inkwell',
    title: 'Writing & Storytelling',
    avatar: '✍️',
    avatarBg: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    school: 'writing',
    status: 'online',
    description: 'Master of narrative structure, character development, and prose craft.',
    specialties: ['Story Structure', 'Character Arcs', 'Dialogue', 'World Building'],
    personality: 'Patient, insightful, loves classic literature',
    confidence: 94
  },
  {
    id: 'scriptum',
    name: 'Prof. Scriptum',
    title: 'Screenplay & Scripts',
    avatar: '🎭',
    avatarBg: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    school: 'writing',
    status: 'online',
    description: 'Expert in screenplay formatting, dialogue writing, and visual storytelling.',
    specialties: ['Screenplay Format', 'TV Writing', 'Adaptation', 'Scene Direction'],
    personality: 'Direct, visual thinker, industry experienced',
    confidence: 91
  },
  // Business & Entrepreneurship
  {
    id: 'ledger',
    name: 'Prof. Ledger',
    title: 'Business Fundamentals',
    avatar: '📊',
    avatarBg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    school: 'business',
    status: 'online',
    description: 'Finance, accounting, and business operations specialist.',
    specialties: ['Finance Basics', 'Accounting', 'Cash Flow', 'Business Planning'],
    personality: 'Analytical, practical, numbers-driven',
    confidence: 96
  },
  {
    id: 'venture',
    name: 'Prof. Venture',
    title: 'Entrepreneurship',
    avatar: '🚀',
    avatarBg: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
    school: 'business',
    status: 'online',
    description: 'Startup building, pitching, and scaling expert.',
    specialties: ['Startup Strategy', 'Pitch Decks', 'Fundraising', 'Growth'],
    personality: 'Energetic, risk-aware, action-oriented',
    confidence: 89
  },
  {
    id: 'grant',
    name: 'Prof. Grant',
    title: 'Funding & Sponsorships',
    avatar: '💰',
    avatarBg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    school: 'business',
    status: 'busy',
    description: 'Grants, sponsorships, and alternative funding specialist.',
    specialties: ['Grant Writing', 'Sponsorships', 'Crowdfunding', 'Investor Relations'],
    personality: 'Strategic, persuasive, detail-oriented',
    confidence: 87
  },
  // Design & Visual Media
  {
    id: 'canvas',
    name: 'Prof. Canvas',
    title: 'Graphic Design',
    avatar: '🎨',
    avatarBg: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
    school: 'design',
    status: 'online',
    description: 'Visual design, branding, and layout specialist.',
    specialties: ['Visual Design', 'Branding', 'Typography', 'Color Theory'],
    personality: 'Creative, aesthetic-focused, trend-aware',
    confidence: 93
  },
  {
    id: 'motion',
    name: 'Prof. Motion',
    title: 'Visual Storytelling',
    avatar: '✨',
    avatarBg: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
    school: 'design',
    status: 'online',
    description: 'Motion graphics, animation, and visual presentation expert.',
    specialties: ['Motion Graphics', 'Animation', 'Presentations', 'Visual Effects'],
    personality: 'Dynamic, innovative, technically skilled',
    confidence: 90
  },
  // Film, Audio & Media
  {
    id: 'reel',
    name: 'Prof. Reel',
    title: 'Filmmaking',
    avatar: '🎬',
    avatarBg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    school: 'film',
    status: 'online',
    description: 'Directing, cinematography, and production master.',
    specialties: ['Directing', 'Cinematography', 'Editing', 'Production'],
    personality: 'Visionary, collaborative, story-driven',
    confidence: 92
  },
  {
    id: 'sound',
    name: 'Prof. Sound',
    title: 'Audio & Podcasting',
    avatar: '🎙️',
    avatarBg: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    school: 'film',
    status: 'online',
    description: 'Audio production, music, and podcast specialist.',
    specialties: ['Audio Production', 'Podcasting', 'Music', 'Sound Design'],
    personality: 'Attentive listener, technically precise',
    confidence: 91
  },
  // Technology & AI
  {
    id: 'circuit',
    name: 'Prof. Circuit',
    title: 'AI Systems',
    avatar: '🤖',
    avatarBg: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
    school: 'tech',
    status: 'online',
    description: 'AI literacy, prompt engineering, and creative technology expert.',
    specialties: ['AI Tools', 'Prompt Engineering', 'Automation', 'Tech Integration'],
    personality: 'Forward-thinking, practical, experimental',
    confidence: 95
  },
  {
    id: 'logic',
    name: 'Prof. Logic',
    title: 'Workflows & Systems',
    avatar: '⚡',
    avatarBg: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    school: 'tech',
    status: 'online',
    description: 'Workflow design, automation, and system architecture specialist.',
    specialties: ['Workflows', 'Automation', 'System Design', 'Process Optimization'],
    personality: 'Systematic, efficient, solution-oriented',
    confidence: 94
  },
  // Operations & Workforce
  {
    id: 'ops',
    name: 'Prof. Ops',
    title: 'Operations',
    avatar: '⚙️',
    avatarBg: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    school: 'operations',
    status: 'online',
    description: 'Project management, SOPs, and operational excellence.',
    specialties: ['Project Management', 'SOPs', 'Quality Control', 'Administration'],
    personality: 'Organized, reliable, process-focused',
    confidence: 93
  }
];

function Faculty() {
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // all, admin, professors

  const filteredFaculty = activeTab === 'admin'
    ? ADMIN_FACULTY
    : activeTab === 'professors'
    ? PROFESSORS
    : [...ADMIN_FACULTY, ...PROFESSORS];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4 mb-2">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
            <FiUsers className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-serif text-white">Faculty</h1>
            <p className="text-gray-400">AI-powered professors with metacognition and domain expertise</p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { id: 'all', label: 'All Faculty', count: ADMIN_FACULTY.length + PROFESSORS.length },
          { id: 'admin', label: 'Administration', count: ADMIN_FACULTY.length },
          { id: 'professors', label: 'Professors', count: PROFESSORS.length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-white'
                : 'bg-dark-700 text-gray-400 hover:bg-dark-600 hover:text-white'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Administration Section */}
      {(activeTab === 'all' || activeTab === 'admin') && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            🎓 Administration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ADMIN_FACULTY.map((faculty) => (
              <AdminCard
                key={faculty.id}
                faculty={faculty}
                onClick={() => setSelectedProfessor(faculty)}
              />
            ))}
          </div>
        </motion.section>
      )}

      {/* Professors Grid */}
      {(activeTab === 'all' || activeTab === 'professors') && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            👨‍🏫 Professor Agents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {PROFESSORS.map((prof) => (
              <ProfessorCard
                key={prof.id}
                professor={prof}
                onClick={() => setSelectedProfessor(prof)}
              />
            ))}
          </div>
        </motion.section>
      )}

      {/* Professor Detail Modal */}
      <AnimatePresence>
        {selectedProfessor && (
          <ProfessorModal
            professor={selectedProfessor}
            onClose={() => setSelectedProfessor(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function AdminCard({ faculty, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="card cursor-pointer hover:border-gold"
    >
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
          style={{ background: faculty.avatarBg }}
        >
          {faculty.avatar}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-white font-semibold">{faculty.name}</h3>
            <span className={`w-2 h-2 rounded-full ${
              faculty.status === 'online' ? 'bg-green-400' : 'bg-yellow-400'
            }`} />
          </div>
          <p className="text-gold text-sm">{faculty.title}</p>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">{faculty.description}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-gray-500">Confidence: {faculty.confidence}%</span>
        <button className="text-primary hover:underline flex items-center gap-1">
          Chat <FiChevronRight size={14} />
        </button>
      </div>
    </motion.div>
  );
}

function ProfessorCard({ professor, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="card cursor-pointer hover:border-primary"
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
          style={{ background: professor.avatarBg }}
        >
          {professor.avatar}
        </div>
        <div className="flex-1">
          <h3 className="text-white font-medium">{professor.name}</h3>
          <p className="text-gray-500 text-sm">{professor.title}</p>
        </div>
        <span className={`w-2 h-2 rounded-full ${
          professor.status === 'online' ? 'bg-green-400' : 'bg-yellow-400'
        }`} />
      </div>
      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{professor.description}</p>
      <div className="flex flex-wrap gap-1">
        {professor.specialties.slice(0, 2).map((spec, i) => (
          <span key={i} className="badge badge-primary text-xs">{spec}</span>
        ))}
        {professor.specialties.length > 2 && (
          <span className="badge badge-primary text-xs">+{professor.specialties.length - 2}</span>
        )}
      </div>
    </motion.div>
  );
}

function ProfessorModal({ professor, onClose }) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([
    { role: 'assistant', content: `Hello! I'm ${professor.name}. How can I help you with ${professor.title} today?` }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    setChat([...chat, { role: 'user', content: message }]);
    setMessage('');
    // Simulate AI response
    setTimeout(() => {
      setChat(prev => [...prev, {
        role: 'assistant',
        content: `That's a great question about ${professor.specialties[0]}. Let me think about this... [This would be a real AI response in production]`
      }]);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-dark-800 rounded-2xl border border-dark-600 max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-dark-600">
          <div className="flex items-start gap-4">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
              style={{ background: professor.avatarBg }}
            >
              {professor.avatar}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">{professor.name}</h2>
              <p className="text-primary">{professor.title}</p>
              {professor.personality && (
                <p className="text-gray-500 text-sm mt-1">{professor.personality}</p>
              )}
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">
              <FiX />
            </button>
          </div>
        </div>

        {/* Metacognition Display */}
        <div className="px-6 py-4 bg-dark-700/50 border-b border-dark-600">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <FiCpu className="text-primary" />
              <span className="text-gray-400 text-sm">Confidence:</span>
              <span className="text-white font-bold">{professor.confidence}%</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCheckCircle className="text-green-400" />
              <span className="text-gray-400 text-sm">Status:</span>
              <span className="text-green-400 capitalize">{professor.status}</span>
            </div>
          </div>
          {professor.reasoning && (
            <p className="text-gray-500 text-sm mt-2 italic">
              "{professor.reasoning.thinking}"
            </p>
          )}
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {chat.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-xl ${
                msg.role === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-dark-700 text-gray-300'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-dark-600">
          <div className="flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={`Ask ${professor.name} a question...`}
              className="flex-1 bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none"
            />
            <button onClick={handleSend} className="btn btn-primary px-6">
              <FiSend />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Faculty;
