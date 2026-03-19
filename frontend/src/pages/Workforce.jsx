/**
 * DIY UNIVERSITY - Workforce Pipeline
 * Job placement, career tracking, and partner opportunities
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiBriefcase, FiMapPin, FiDollarSign, FiClock,
  FiCheckCircle, FiStar, FiExternalLink, FiFilter,
  FiTrendingUp, FiUsers, FiAward, FiTarget
} from 'react-icons/fi';

const JOB_LISTINGS = [
  {
    id: 1,
    title: 'Junior Content Writer',
    company: 'EOF Media',
    location: 'Remote',
    type: 'Full-time',
    salary: '$45,000 - $55,000',
    posted: '2 days ago',
    skills: ['Storytelling', 'Content Writing', 'SEO'],
    match: 95,
    requirements: ['Writing Fundamentals Certificate'],
    partner: true
  },
  {
    id: 2,
    title: 'Marketing Associate',
    company: 'Startup Ventures',
    location: 'Atlanta, GA',
    type: 'Full-time',
    salary: '$50,000 - $60,000',
    posted: '1 week ago',
    skills: ['Marketing', 'Business Strategy', 'Social Media'],
    match: 82,
    requirements: ['Business Launch 101 Certificate'],
    partner: true
  },
  {
    id: 3,
    title: 'AI Content Specialist',
    company: 'TechFlow Inc.',
    location: 'Remote',
    type: 'Contract',
    salary: '$60/hr',
    posted: '3 days ago',
    skills: ['AI Prompting', 'Content Creation', 'Automation'],
    match: 78,
    requirements: ['AI Prompt Engineering Certificate'],
    partner: false
  },
  {
    id: 4,
    title: 'Creative Designer',
    company: 'Brand Studio',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$55,000 - $70,000',
    posted: '5 days ago',
    skills: ['Graphic Design', 'Brand Identity', 'Adobe Suite'],
    match: 45,
    requirements: ['Graphic Design Certificate'],
    partner: true
  },
  {
    id: 5,
    title: 'Video Production Intern',
    company: 'Media House',
    location: 'Los Angeles, CA',
    type: 'Internship',
    salary: '$20/hr',
    posted: '1 day ago',
    skills: ['Filmmaking', 'Video Editing', 'Cinematography'],
    match: 30,
    requirements: ['Filmmaking 101 Certificate'],
    partner: false
  }
];

const CAREER_PATHS = [
  {
    id: 'content-creator',
    title: 'Content Creator',
    icon: '✍️',
    color: '#6366f1',
    avgSalary: '$52,000',
    growth: '+15%',
    certifications: ['Writing Fundamentals', 'AI Prompt Engineering'],
    roles: ['Content Writer', 'Copywriter', 'Social Media Manager']
  },
  {
    id: 'entrepreneur',
    title: 'Entrepreneur',
    icon: '💼',
    color: '#10b981',
    avgSalary: 'Variable',
    growth: '+20%',
    certifications: ['Business Launch 101', 'Marketing Essentials'],
    roles: ['Founder', 'Business Owner', 'Consultant']
  },
  {
    id: 'creative-producer',
    title: 'Creative Producer',
    icon: '🎬',
    color: '#f59e0b',
    avgSalary: '$65,000',
    growth: '+12%',
    certifications: ['Filmmaking 101', 'Project Management'],
    roles: ['Producer', 'Director', 'Production Manager']
  },
  {
    id: 'tech-specialist',
    title: 'AI/Tech Specialist',
    icon: '🤖',
    color: '#06b6d4',
    avgSalary: '$75,000',
    growth: '+25%',
    certifications: ['AI Prompt Engineering', 'Workflow Automation'],
    roles: ['AI Specialist', 'Automation Engineer', 'Tech Consultant']
  }
];

const PARTNER_COMPANIES = [
  { name: 'EOF Media', logo: '📚', jobs: 12, hired: 45 },
  { name: 'Startup Ventures', logo: '🚀', jobs: 8, hired: 23 },
  { name: 'TechFlow Inc.', logo: '💻', jobs: 15, hired: 67 },
  { name: 'Brand Studio', logo: '🎨', jobs: 6, hired: 18 },
  { name: 'Media House', logo: '🎬', jobs: 10, hired: 34 }
];

function Workforce() {
  const [activeTab, setActiveTab] = useState('jobs');
  const [jobFilter, setJobFilter] = useState('all');

  const filteredJobs = JOB_LISTINGS.filter(job => {
    if (jobFilter === 'partner') return job.partner;
    if (jobFilter === 'high-match') return job.match >= 75;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-green-600 flex items-center justify-center">
            <FiBriefcase className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-serif text-white">Workforce Pipeline</h1>
            <p className="text-gray-400">From learning to earning - your career path</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <StatCard icon={FiBriefcase} label="Available Jobs" value="47" color="primary" />
        <StatCard icon={FiUsers} label="Partner Companies" value="12" color="accent" />
        <StatCard icon={FiAward} label="Learners Placed" value="234" color="gold" />
        <StatCard icon={FiTrendingUp} label="Avg Salary Increase" value="+42%" color="secondary" />
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-2 border-b border-dark-600 pb-2"
      >
        {[
          { id: 'jobs', label: 'Job Listings' },
          { id: 'careers', label: 'Career Paths' },
          { id: 'partners', label: 'Partner Companies' }
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

      {activeTab === 'jobs' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex items-center gap-3">
            <FiFilter className="text-gray-500" />
            {[
              { id: 'all', label: 'All Jobs' },
              { id: 'partner', label: 'Partner Jobs' },
              { id: 'high-match', label: 'High Match (75%+)' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setJobFilter(f.id)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  jobFilter === f.id
                    ? 'bg-primary text-white'
                    : 'bg-dark-700 text-gray-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {filteredJobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card hover:border-primary"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                      {job.partner && (
                        <span className="badge badge-primary text-xs">Partner</span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <FiBriefcase size={14} /> {job.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiMapPin size={14} /> {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiDollarSign size={14} /> {job.salary}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiClock size={14} /> {job.posted}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {job.skills.map((skill, j) => (
                        <span key={j} className="badge bg-dark-600 text-gray-300">{skill}</span>
                      ))}
                    </div>
                    <p className="text-gray-500 text-sm">
                      Requires: {job.requirements.join(', ')}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <div className={`text-2xl font-bold ${
                      job.match >= 75 ? 'text-accent' : job.match >= 50 ? 'text-primary' : 'text-gray-500'
                    }`}>
                      {job.match}%
                    </div>
                    <p className="text-gray-500 text-xs">Match</p>
                    <button className="btn btn-primary mt-3 text-sm">
                      Apply <FiExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'careers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CAREER_PATHS.map((path, i) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card hover:border-primary"
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: `${path.color}20` }}
                >
                  {path.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{path.title}</h3>
                  <div className="flex items-center gap-4 text-sm mt-1">
                    <span className="text-gold">{path.avgSalary}</span>
                    <span className="text-accent">{path.growth} growth</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-500 text-sm mb-2">Required Certifications:</p>
                <div className="flex flex-wrap gap-2">
                  {path.certifications.map((cert, j) => (
                    <span key={j} className="badge badge-primary">{cert}</span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-gray-500 text-sm mb-2">Career Roles:</p>
                <div className="flex flex-wrap gap-2">
                  {path.roles.map((role, j) => (
                    <span key={j} className="badge bg-dark-600 text-gray-300">{role}</span>
                  ))}
                </div>
              </div>

              <button className="btn btn-secondary w-full mt-4">
                <FiTarget /> View Career Path
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'partners' && (
        <div className="space-y-6">
          <p className="text-gray-400">
            Our partner companies actively recruit DIY University graduates and offer exclusive job opportunities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PARTNER_COMPANIES.map((company, i) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card hover:border-primary"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-dark-700 flex items-center justify-center text-2xl">
                    {company.logo}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{company.name}</h3>
                    <span className="badge badge-primary text-xs">Partner</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-primary text-lg font-semibold">{company.jobs}</p>
                    <p className="text-gray-500">Open Jobs</p>
                  </div>
                  <div className="text-right">
                    <p className="text-accent text-lg font-semibold">{company.hired}</p>
                    <p className="text-gray-500">Learners Hired</p>
                  </div>
                </div>
                <button className="btn btn-secondary w-full mt-4">
                  View Opportunities
                </button>
              </motion.div>
            ))}
          </div>
        </div>
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

export default Workforce;
