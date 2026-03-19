/**
 * DIY UNIVERSITY - Faculty Routes
 * AI-powered faculty interactions
 */

import express from 'express';
import aiService from '../services/aiService.js';
import { protect, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Faculty data
const FACULTY = [
  {
    id: 'dean-ai',
    name: 'Dean AI',
    title: 'Dean of Students',
    avatar: '🎓',
    role: 'administration',
    specialty: 'Academic guidance, enrollment, student success',
    description: 'Your primary guide through the DIY University experience.',
    status: 'online',
    color: '#6366f1'
  },
  {
    id: 'prof-inkwell',
    name: 'Prof. Inkwell',
    title: 'Professor of Writing',
    avatar: '✍️',
    role: 'faculty',
    school: 'writing',
    specialty: 'Storytelling, Character Development, Dialogue',
    description: 'Master storyteller with expertise in narrative craft.',
    status: 'online',
    color: '#6366f1'
  },
  {
    id: 'prof-venture',
    name: 'Prof. Venture',
    title: 'Professor of Business',
    avatar: '💼',
    role: 'faculty',
    school: 'business',
    specialty: 'Entrepreneurship, Business Strategy, Funding',
    description: 'Serial entrepreneur turned educator.',
    status: 'online',
    color: '#10b981'
  },
  {
    id: 'prof-canvas',
    name: 'Prof. Canvas',
    title: 'Professor of Design',
    avatar: '🎨',
    role: 'faculty',
    school: 'design',
    specialty: 'Graphic Design, Brand Identity, Visual Communication',
    description: 'Award-winning designer and creative director.',
    status: 'online',
    color: '#ec4899'
  },
  {
    id: 'prof-frame',
    name: 'Prof. Frame',
    title: 'Professor of Film',
    avatar: '🎬',
    role: 'faculty',
    school: 'film',
    specialty: 'Filmmaking, Cinematography, Video Production',
    description: 'Film industry veteran and visual storyteller.',
    status: 'online',
    color: '#f59e0b'
  },
  {
    id: 'prof-circuit',
    name: 'Prof. Circuit',
    title: 'Professor of Technology',
    avatar: '🤖',
    role: 'faculty',
    school: 'tech',
    specialty: 'AI Tools, Automation, Creative Technology',
    description: 'Tech innovator bridging AI and creativity.',
    status: 'online',
    color: '#06b6d4'
  },
  {
    id: 'prof-process',
    name: 'Prof. Process',
    title: 'Professor of Operations',
    avatar: '⚙️',
    role: 'faculty',
    school: 'operations',
    specialty: 'Project Management, SOPs, Process Design',
    description: 'Operations expert and efficiency consultant.',
    status: 'online',
    color: '#8b5cf6'
  },
  {
    id: 'prof-trade',
    name: 'Prof. Trade',
    title: 'Professor of Workforce',
    avatar: '🔧',
    role: 'faculty',
    school: 'workforce',
    specialty: 'Career Development, Job Readiness, Trade Skills',
    description: 'Workforce development specialist.',
    status: 'online',
    color: '#22c55e'
  }
];

// @route   GET /api/faculty
// @desc    Get all faculty
// @access  Public
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: FACULTY
  });
});

// @route   GET /api/faculty/:id
// @desc    Get single faculty member
// @access  Public
router.get('/:id', (req, res) => {
  const faculty = FACULTY.find(f => f.id === req.params.id);

  if (!faculty) {
    return res.status(404).json({
      success: false,
      error: 'Faculty not found'
    });
  }

  res.json({
    success: true,
    data: faculty
  });
});

// @route   POST /api/faculty/:id/chat
// @desc    Chat with faculty AI
// @access  Public (optional auth for context)
router.post('/:id/chat', optionalAuth, async (req, res) => {
  try {
    const { messages } = req.body;
    const facultyId = req.params.id;

    // Validate faculty exists
    const faculty = FACULTY.find(f => f.id === facultyId);
    if (!faculty) {
      return res.status(404).json({
        success: false,
        error: 'Faculty not found'
      });
    }

    // Build user context if authenticated
    const userContext = {};
    if (req.user) {
      userContext.name = req.user.name;
      if (req.user.enrolledCourses?.length > 0) {
        userContext.currentCourse = req.user.enrolledCourses[0].courseId;
        userContext.progress = req.user.enrolledCourses[0].progress;
      }
    }

    // Get AI response
    const response = await aiService.chat(facultyId, messages, userContext);

    res.json({
      success: true,
      data: {
        role: 'assistant',
        content: response.content,
        faculty: faculty.name,
        provider: response.provider
      }
    });
  } catch (error) {
    console.error('Faculty chat error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get response from faculty'
    });
  }
});

// @route   GET /api/faculty/school/:schoolId
// @desc    Get faculty by school
// @access  Public
router.get('/school/:schoolId', (req, res) => {
  const faculty = FACULTY.filter(f => f.school === req.params.schoolId);

  res.json({
    success: true,
    data: faculty
  });
});

export default router;
