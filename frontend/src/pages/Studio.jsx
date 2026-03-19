/**
 * DIY UNIVERSITY - Studio Workspace
 * Execution-based learning environment
 *
 * Features:
 * - Project workspace for hands-on learning
 * - Assignment submission
 * - Real-time faculty assistance
 * - Integration with Griot AI for creation
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiEdit3, FiSave, FiUpload, FiMessageCircle, FiBook,
  FiCheckCircle, FiClock, FiTarget, FiZap, FiSend,
  FiPaperclip, FiImage, FiFile, FiExternalLink
} from 'react-icons/fi';

const ACTIVE_ASSIGNMENTS = [
  {
    id: 1,
    title: 'Create Your Story Outline',
    course: 'Storytelling Fundamentals',
    dueDate: '2 days',
    status: 'in_progress',
    type: 'writing'
  },
  {
    id: 2,
    title: 'Business Model Canvas',
    course: 'Business Launch 101',
    dueDate: '5 days',
    status: 'not_started',
    type: 'business'
  },
  {
    id: 3,
    title: 'AI Prompt Challenge',
    course: 'AI Prompt Engineering',
    dueDate: '1 week',
    status: 'not_started',
    type: 'tech'
  }
];

const TOOLS = [
  { id: 'write', icon: '✍️', label: 'Write', description: 'Text editor' },
  { id: 'design', icon: '🎨', label: 'Design', description: 'Visual tools' },
  { id: 'present', icon: '📊', label: 'Present', description: 'Slides' },
  { id: 'griot', icon: '🎬', label: 'Griot AI', description: 'Create with AI' }
];

function Studio() {
  const [activeAssignment, setActiveAssignment] = useState(ACTIVE_ASSIGNMENTS[0]);
  const [content, setContent] = useState('');
  const [showFacultyChat, setShowFacultyChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'I\'m Prof. Inkwell, here to help with your writing assignment. What would you like to work on?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { role: 'user', content: chatInput }]);
    setChatInput('');
    // Simulate response
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Great question! For a compelling story outline, start with your protagonist\'s core desire and the obstacle preventing them from achieving it...'
      }]);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-112px)] flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
            <FiEdit3 className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-serif text-white">Studio Workspace</h1>
            <p className="text-gray-400">Create, execute, and submit your work</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-secondary">
            <FiSave /> Save Draft
          </button>
          <button className="btn btn-primary">
            <FiUpload /> Submit
          </button>
        </div>
      </motion.div>

      {/* Main Studio Area */}
      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Left: Assignments Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-72 bg-dark-800 rounded-xl border border-dark-600 flex flex-col overflow-hidden"
        >
          <div className="p-4 border-b border-dark-600">
            <h2 className="font-medium text-white flex items-center gap-2">
              <FiTarget className="text-primary" /> Active Assignments
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {ACTIVE_ASSIGNMENTS.map((assignment) => (
              <button
                key={assignment.id}
                onClick={() => setActiveAssignment(assignment)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  activeAssignment?.id === assignment.id
                    ? 'bg-primary/20 border border-primary/50'
                    : 'bg-dark-700 hover:bg-dark-600 border border-transparent'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-white text-sm font-medium line-clamp-2">
                    {assignment.title}
                  </h3>
                  <StatusBadge status={assignment.status} />
                </div>
                <p className="text-gray-500 text-xs mt-1">{assignment.course}</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                  <FiClock size={12} />
                  <span>Due in {assignment.dueDate}</span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Center: Workspace */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 bg-dark-800 rounded-xl border border-dark-600 flex flex-col overflow-hidden"
        >
          {/* Toolbar */}
          <div className="p-4 border-b border-dark-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {TOOLS.map((tool) => (
                <button
                  key={tool.id}
                  className="px-4 py-2 rounded-lg bg-dark-700 hover:bg-dark-600 text-gray-400 hover:text-white transition-all flex items-center gap-2"
                  title={tool.description}
                >
                  <span>{tool.icon}</span>
                  <span className="text-sm">{tool.label}</span>
                </button>
              ))}
            </div>
            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary text-sm"
            >
              <FiZap /> Open Griot AI <FiExternalLink size={14} />
            </a>
          </div>

          {/* Assignment Header */}
          {activeAssignment && (
            <div className="p-4 border-b border-dark-600 bg-dark-700/50">
              <h2 className="text-lg font-semibold text-white mb-1">{activeAssignment.title}</h2>
              <p className="text-gray-400 text-sm">{activeAssignment.course}</p>
            </div>
          )}

          {/* Editor Area */}
          <div className="flex-1 p-4 overflow-y-auto">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your assignment here...

Tips:
• Break down your ideas into clear sections
• Use the tools above to enhance your work
• Ask the Faculty Assistant for help anytime
• Connect to Griot AI for creative generation"
              className="w-full h-full bg-transparent text-white placeholder-gray-600 resize-none focus:outline-none text-lg leading-relaxed"
            />
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-dark-600 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-white">
                <FiPaperclip size={20} />
              </button>
              <button className="text-gray-400 hover:text-white">
                <FiImage size={20} />
              </button>
              <button className="text-gray-400 hover:text-white">
                <FiFile size={20} />
              </button>
            </div>
            <div className="text-gray-500 text-sm">
              {content.length} characters · {content.split(/\s+/).filter(Boolean).length} words
            </div>
          </div>
        </motion.div>

        {/* Right: Faculty Chat */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-80 bg-dark-800 rounded-xl border border-dark-600 flex flex-col overflow-hidden"
        >
          <div className="p-4 border-b border-dark-600">
            <h2 className="font-medium text-white flex items-center gap-2">
              <FiMessageCircle className="text-primary" /> Faculty Assistant
            </h2>
            <p className="text-gray-500 text-xs mt-1">Prof. Inkwell · Writing</p>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-xl text-sm ${
                  msg.role === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-dark-700 text-gray-300'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="px-4 pb-2">
            <div className="flex flex-wrap gap-2">
              {['Help me start', 'Review my work', 'Give feedback'].map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setChatInput(prompt)}
                  className="px-3 py-1 rounded-full bg-dark-700 text-gray-400 text-xs hover:bg-dark-600 hover:text-white"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-dark-600">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendChat()}
                placeholder="Ask for help..."
                className="flex-1 bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 text-sm focus:border-primary focus:outline-none"
              />
              <button onClick={handleSendChat} className="btn btn-primary px-3">
                <FiSend size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const config = {
    in_progress: { label: 'In Progress', class: 'badge-primary' },
    not_started: { label: 'Not Started', class: 'bg-dark-600 text-gray-400' },
    submitted: { label: 'Submitted', class: 'badge-success' },
    graded: { label: 'Graded', class: 'badge-gold' }
  };

  const { label, class: className } = config[status] || config.not_started;

  return (
    <span className={`badge text-xs ${className}`}>{label}</span>
  );
}

export default Studio;
