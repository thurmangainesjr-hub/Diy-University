/**
 * DIY UNIVERSITY - Courses Page
 * Course catalog for a specific school
 */

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowLeft, FiPlay, FiClock, FiUsers, FiStar,
  FiBook, FiAward, FiFilter, FiSearch, FiCheckCircle
} from 'react-icons/fi';

const SCHOOL_DATA = {
  writing: {
    name: 'School of Writing & Storytelling',
    icon: '✍️',
    color: '#6366f1',
    description: 'Master the craft of storytelling, from novels to scripts to comic writing.',
    courses: [
      {
        id: 'story-fundamentals',
        title: 'Storytelling Fundamentals',
        instructor: 'Prof. Inkwell',
        level: 'Beginner',
        duration: '8 weeks',
        students: 1247,
        rating: 4.9,
        lessons: 24,
        progress: 68,
        enrolled: true,
        description: 'Learn the core principles of compelling storytelling that captivate readers.',
        skills: ['Story Structure', 'Character Arcs', 'Conflict', 'Theme']
      },
      {
        id: 'character-development',
        title: 'Character Development Mastery',
        instructor: 'Prof. Inkwell',
        level: 'Intermediate',
        duration: '6 weeks',
        students: 892,
        rating: 4.8,
        lessons: 18,
        progress: 0,
        enrolled: false,
        description: 'Create memorable, three-dimensional characters that resonate with audiences.',
        skills: ['Psychology', 'Motivation', 'Dialogue', 'Character Voice']
      },
      {
        id: 'worldbuilding',
        title: 'Worldbuilding Workshop',
        instructor: 'Prof. Inkwell',
        level: 'Intermediate',
        duration: '10 weeks',
        students: 654,
        rating: 4.7,
        lessons: 30,
        progress: 0,
        enrolled: false,
        description: 'Craft immersive worlds with rich history, culture, and internal logic.',
        skills: ['World Design', 'Magic Systems', 'Culture Building', 'Maps']
      },
      {
        id: 'dialogue-mastery',
        title: 'Dialogue Mastery',
        instructor: 'Prof. Inkwell',
        level: 'Advanced',
        duration: '4 weeks',
        students: 423,
        rating: 4.9,
        lessons: 12,
        progress: 0,
        enrolled: false,
        description: 'Write dialogue that reveals character, advances plot, and sounds natural.',
        skills: ['Subtext', 'Voice', 'Pacing', 'Conflict in Dialogue']
      }
    ]
  },
  business: {
    name: 'School of Business & Entrepreneurship',
    icon: '💼',
    color: '#10b981',
    description: 'Build, launch, and scale your business with practical entrepreneurship training.',
    courses: [
      {
        id: 'business-launch',
        title: 'Business Launch 101',
        instructor: 'Prof. Venture',
        level: 'Beginner',
        duration: '12 weeks',
        students: 2134,
        rating: 4.8,
        lessons: 36,
        progress: 45,
        enrolled: true,
        description: 'From idea to launch - build your first business step by step.',
        skills: ['Business Model', 'Market Research', 'MVP', 'Launch Strategy']
      },
      {
        id: 'funding-grants',
        title: 'Funding & Grants',
        instructor: 'Prof. Venture',
        level: 'Intermediate',
        duration: '6 weeks',
        students: 876,
        rating: 4.7,
        lessons: 18,
        progress: 0,
        enrolled: false,
        description: 'Navigate funding options from grants to investors to bootstrapping.',
        skills: ['Pitch Deck', 'Grant Writing', 'Investor Relations', 'Financial Planning']
      }
    ]
  },
  design: {
    name: 'School of Design & Visual Media',
    icon: '🎨',
    color: '#ec4899',
    description: 'Create stunning visuals, brands, and media assets that captivate audiences.',
    courses: [
      {
        id: 'graphic-design',
        title: 'Graphic Design Fundamentals',
        instructor: 'Prof. Canvas',
        level: 'Beginner',
        duration: '10 weeks',
        students: 1567,
        rating: 4.9,
        lessons: 30,
        progress: 0,
        enrolled: false,
        description: 'Master the principles of visual design from typography to layout.',
        skills: ['Typography', 'Color Theory', 'Layout', 'Composition']
      }
    ]
  },
  film: {
    name: 'School of Film, Audio & Media',
    icon: '🎬',
    color: '#f59e0b',
    description: 'Produce professional films, podcasts, and audio content.',
    courses: [
      {
        id: 'filmmaking-101',
        title: 'Filmmaking 101',
        instructor: 'Prof. Frame',
        level: 'Beginner',
        duration: '12 weeks',
        students: 1823,
        rating: 4.8,
        lessons: 36,
        progress: 0,
        enrolled: false,
        description: 'Learn the complete filmmaking process from pre-production to post.',
        skills: ['Cinematography', 'Directing', 'Editing', 'Sound Design']
      }
    ]
  },
  tech: {
    name: 'School of Technology & AI',
    icon: '🤖',
    color: '#06b6d4',
    description: 'Harness AI tools, automation, and creative technology for your projects.',
    courses: [
      {
        id: 'ai-prompts',
        title: 'AI Prompt Engineering',
        instructor: 'Prof. Circuit',
        level: 'Beginner',
        duration: '6 weeks',
        students: 2456,
        rating: 4.9,
        lessons: 18,
        progress: 23,
        enrolled: true,
        description: 'Master the art of communicating with AI to achieve powerful results.',
        skills: ['Prompt Design', 'Chain of Thought', 'AI Tools', 'Automation']
      }
    ]
  },
  operations: {
    name: 'School of Execution & Operations',
    icon: '⚙️',
    color: '#8b5cf6',
    description: 'Master project management, SOPs, and operational excellence.',
    courses: [
      {
        id: 'project-management',
        title: 'Project Management',
        instructor: 'Prof. Process',
        level: 'Beginner',
        duration: '8 weeks',
        students: 987,
        rating: 4.7,
        lessons: 24,
        progress: 0,
        enrolled: false,
        description: 'Plan, execute, and deliver projects on time and on budget.',
        skills: ['Planning', 'Scheduling', 'Risk Management', 'Team Leadership']
      }
    ]
  },
  workforce: {
    name: 'School of Trade & Workforce',
    icon: '🔧',
    color: '#22c55e',
    description: 'Prepare for real jobs with practical skills and workforce certifications.',
    courses: [
      {
        id: 'workforce-readiness',
        title: 'Workforce Readiness',
        instructor: 'Prof. Trade',
        level: 'Beginner',
        duration: '4 weeks',
        students: 1234,
        rating: 4.8,
        lessons: 12,
        progress: 0,
        enrolled: false,
        description: 'Essential skills for entering and thriving in the workforce.',
        skills: ['Resume Building', 'Interview Skills', 'Workplace Etiquette', 'Communication']
      }
    ]
  }
};

function Courses() {
  const { schoolId } = useParams();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const school = SCHOOL_DATA[schoolId] || SCHOOL_DATA.writing;

  const filteredCourses = school.courses.filter(course => {
    if (filter === 'enrolled' && !course.enrolled) return false;
    if (filter === 'available' && course.enrolled) return false;
    if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          onClick={() => navigate('/schools')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
        >
          <FiArrowLeft /> Back to Schools
        </button>
        <div className="flex items-start gap-4">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
            style={{ background: `${school.color}20` }}
          >
            {school.icon}
          </div>
          <div>
            <h1 className="text-3xl font-serif text-white">{school.name}</h1>
            <p className="text-gray-400 mt-1">{school.description}</p>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex gap-2">
          {[
            { id: 'all', label: 'All Courses' },
            { id: 'enrolled', label: 'My Courses' },
            { id: 'available', label: 'Available' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f.id
                  ? 'bg-primary text-white'
                  : 'bg-dark-700 text-gray-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-dark-700 border border-dark-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:border-primary focus:outline-none"
          />
        </div>
      </motion.div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card hover:border-primary cursor-pointer group"
            onClick={() => navigate(`/courses/${course.id}`)}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`badge ${
                    course.level === 'Beginner' ? 'badge-success' :
                    course.level === 'Intermediate' ? 'badge-primary' :
                    'badge-gold'
                  }`}>
                    {course.level}
                  </span>
                  {course.enrolled && (
                    <span className="badge bg-primary/20 text-primary">Enrolled</span>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">by {course.instructor}</p>
              </div>
              {course.enrolled && course.progress > 0 && (
                <div className="text-right">
                  <span className="text-2xl font-bold text-primary">{course.progress}%</span>
                  <p className="text-gray-500 text-xs">Complete</p>
                </div>
              )}
            </div>

            <p className="text-gray-400 mb-4">{course.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {course.skills.map((skill, j) => (
                <span key={j} className="badge bg-dark-600 text-gray-300">{skill}</span>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <FiBook size={14} /> {course.lessons} lessons
                </span>
                <span className="flex items-center gap-1">
                  <FiClock size={14} /> {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <FiUsers size={14} /> {course.students.toLocaleString()}
                </span>
              </div>
              <span className="flex items-center gap-1 text-gold">
                <FiStar size={14} /> {course.rating}
              </span>
            </div>

            {course.enrolled && course.progress > 0 && (
              <div className="mt-4">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${course.progress}%` }} />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <FiBook className="mx-auto text-gray-600 mb-4" size={48} />
          <p className="text-gray-500">No courses found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

export default Courses;
