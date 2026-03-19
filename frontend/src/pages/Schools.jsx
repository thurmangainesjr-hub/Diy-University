/**
 * DIY UNIVERSITY - Schools Page
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBook, FiArrowRight } from 'react-icons/fi';

const SCHOOLS = [
  {
    id: 'writing',
    name: 'School of Writing & Storytelling',
    icon: '✍️',
    color: '#6366f1',
    courses: 12,
    students: 847,
    description: 'Master the craft of storytelling, from novels to scripts to comic writing.',
    featured: ['Story Structure', 'Character Development', 'Dialogue Mastery', 'Worldbuilding']
  },
  {
    id: 'business',
    name: 'School of Business & Entrepreneurship',
    icon: '💼',
    color: '#10b981',
    courses: 15,
    students: 1203,
    description: 'Build, launch, and scale your business with practical entrepreneurship training.',
    featured: ['Business Launch 101', 'Funding & Grants', 'Marketing Essentials', 'Sales Mastery']
  },
  {
    id: 'design',
    name: 'School of Design & Visual Media',
    icon: '🎨',
    color: '#ec4899',
    courses: 10,
    students: 654,
    description: 'Create stunning visuals, brands, and media assets that captivate audiences.',
    featured: ['Graphic Design Fundamentals', 'Brand Identity', 'Visual Storytelling', 'Motion Graphics']
  },
  {
    id: 'film',
    name: 'School of Film, Audio & Media',
    icon: '🎬',
    color: '#f59e0b',
    courses: 14,
    students: 892,
    description: 'Produce professional films, podcasts, and audio content.',
    featured: ['Filmmaking 101', 'Podcasting', 'Audio Production', 'Video Editing']
  },
  {
    id: 'tech',
    name: 'School of Technology & AI',
    icon: '🤖',
    color: '#06b6d4',
    courses: 18,
    students: 1456,
    description: 'Harness AI tools, automation, and creative technology for your projects.',
    featured: ['AI Prompt Engineering', 'Workflow Automation', 'No-Code Tools', 'Tech Integration']
  },
  {
    id: 'operations',
    name: 'School of Execution & Operations',
    icon: '⚙️',
    color: '#8b5cf6',
    courses: 8,
    students: 423,
    description: 'Master project management, SOPs, and operational excellence.',
    featured: ['Project Management', 'Process Design', 'Launch Planning', 'Quality Control']
  },
  {
    id: 'workforce',
    name: 'School of Trade & Workforce',
    icon: '🔧',
    color: '#22c55e',
    courses: 11,
    students: 567,
    description: 'Prepare for real jobs with practical skills and workforce certifications.',
    featured: ['Workforce Readiness', 'Trade Skills', 'Job Placement', 'Career Development']
  }
];

function Schools() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4 mb-2">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
            <FiBook className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-serif text-white">Schools</h1>
            <p className="text-gray-400">7 academic divisions to master your craft</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SCHOOLS.map((school, i) => (
          <motion.div
            key={school.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => navigate(`/schools/${school.id}`)}
            className="card cursor-pointer hover:border-primary group"
          >
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
                style={{ background: `${school.color}20` }}
              >
                {school.icon}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
                  {school.name}
                </h2>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                  <span>{school.courses} courses</span>
                  <span>·</span>
                  <span>{school.students.toLocaleString()} students</span>
                </div>
              </div>
            </div>
            <p className="text-gray-400 mb-4">{school.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {school.featured.map((course, j) => (
                <span key={j} className="badge badge-primary">{course}</span>
              ))}
            </div>
            <div className="flex items-center justify-end text-primary text-sm font-medium group-hover:underline">
              Explore School <FiArrowRight className="ml-1" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Schools;
