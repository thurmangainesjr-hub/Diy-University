/**
 * DIY UNIVERSITY - Backend Server
 * Education, Certification & Workforce Development API
 */

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// ============================================
// MOCK DATA
// ============================================

const SCHOOLS = [
  {
    id: 'writing',
    name: 'School of Writing & Storytelling',
    icon: '✍️',
    color: '#6366f1',
    courses: 12,
    students: 847,
    description: 'Master the craft of storytelling, from novels to scripts to comic writing.'
  },
  {
    id: 'business',
    name: 'School of Business & Entrepreneurship',
    icon: '💼',
    color: '#10b981',
    courses: 15,
    students: 1203,
    description: 'Build, launch, and scale your business with practical entrepreneurship training.'
  },
  {
    id: 'design',
    name: 'School of Design & Visual Media',
    icon: '🎨',
    color: '#ec4899',
    courses: 10,
    students: 654,
    description: 'Create stunning visuals, brands, and media assets that captivate audiences.'
  },
  {
    id: 'film',
    name: 'School of Film, Audio & Media',
    icon: '🎬',
    color: '#f59e0b',
    courses: 14,
    students: 892,
    description: 'Produce professional films, podcasts, and audio content.'
  },
  {
    id: 'tech',
    name: 'School of Technology & AI',
    icon: '🤖',
    color: '#06b6d4',
    courses: 18,
    students: 1456,
    description: 'Harness AI tools, automation, and creative technology for your projects.'
  },
  {
    id: 'operations',
    name: 'School of Execution & Operations',
    icon: '⚙️',
    color: '#8b5cf6',
    courses: 8,
    students: 423,
    description: 'Master project management, SOPs, and operational excellence.'
  },
  {
    id: 'workforce',
    name: 'School of Trade & Workforce',
    icon: '🔧',
    color: '#22c55e',
    courses: 11,
    students: 567,
    description: 'Prepare for real jobs with practical skills and workforce certifications.'
  }
];

const FACULTY = [
  {
    id: 'dean-ai',
    name: 'Dean AI',
    title: 'Dean of Students',
    avatar: '🎓',
    role: 'administration',
    specialty: 'Academic guidance, enrollment, student success',
    description: 'Your primary guide through the DIY University experience.'
  },
  {
    id: 'prof-inkwell',
    name: 'Prof. Inkwell',
    title: 'Professor of Writing',
    avatar: '✍️',
    role: 'faculty',
    school: 'writing',
    specialty: 'Storytelling, Character Development, Dialogue',
    description: 'Master storyteller with expertise in narrative craft.'
  },
  {
    id: 'prof-venture',
    name: 'Prof. Venture',
    title: 'Professor of Business',
    avatar: '💼',
    role: 'faculty',
    school: 'business',
    specialty: 'Entrepreneurship, Business Strategy, Funding',
    description: 'Serial entrepreneur turned educator.'
  },
  {
    id: 'prof-canvas',
    name: 'Prof. Canvas',
    title: 'Professor of Design',
    avatar: '🎨',
    role: 'faculty',
    school: 'design',
    specialty: 'Graphic Design, Brand Identity, Visual Communication',
    description: 'Award-winning designer and creative director.'
  },
  {
    id: 'prof-frame',
    name: 'Prof. Frame',
    title: 'Professor of Film',
    avatar: '🎬',
    role: 'faculty',
    school: 'film',
    specialty: 'Filmmaking, Cinematography, Video Production',
    description: 'Film industry veteran and visual storyteller.'
  },
  {
    id: 'prof-circuit',
    name: 'Prof. Circuit',
    title: 'Professor of Technology',
    avatar: '🤖',
    role: 'faculty',
    school: 'tech',
    specialty: 'AI Tools, Automation, Creative Technology',
    description: 'Tech innovator bridging AI and creativity.'
  },
  {
    id: 'prof-process',
    name: 'Prof. Process',
    title: 'Professor of Operations',
    avatar: '⚙️',
    role: 'faculty',
    school: 'operations',
    specialty: 'Project Management, SOPs, Process Design',
    description: 'Operations expert and efficiency consultant.'
  },
  {
    id: 'prof-trade',
    name: 'Prof. Trade',
    title: 'Professor of Workforce',
    avatar: '🔧',
    role: 'faculty',
    school: 'workforce',
    specialty: 'Career Development, Job Readiness, Trade Skills',
    description: 'Workforce development specialist.'
  }
];

const COURSES = [
  {
    id: 'story-fundamentals',
    title: 'Storytelling Fundamentals',
    school: 'writing',
    instructor: 'Prof. Inkwell',
    level: 'Beginner',
    duration: '8 weeks',
    lessons: 24,
    students: 1247,
    rating: 4.9,
    description: 'Learn the core principles of compelling storytelling.'
  },
  {
    id: 'business-launch',
    title: 'Business Launch 101',
    school: 'business',
    instructor: 'Prof. Venture',
    level: 'Beginner',
    duration: '12 weeks',
    lessons: 36,
    students: 2134,
    rating: 4.8,
    description: 'From idea to launch - build your first business.'
  },
  {
    id: 'ai-prompts',
    title: 'AI Prompt Engineering',
    school: 'tech',
    instructor: 'Prof. Circuit',
    level: 'Beginner',
    duration: '6 weeks',
    lessons: 18,
    students: 2456,
    rating: 4.9,
    description: 'Master the art of communicating with AI.'
  }
];

// Demo user
let currentUser = {
  id: 'user-1',
  name: 'Marcus Johnson',
  email: 'marcus@example.com',
  role: 'learner',
  enrolledCourses: ['story-fundamentals', 'business-launch', 'ai-prompts'],
  completedCourses: [],
  certificates: [],
  badges: ['first-steps', 'story-starter', 'quick-learner'],
  stats: {
    coursesCompleted: 3,
    certificatesEarned: 1,
    learningHours: 48,
    currentStreak: 12
  }
};

// ============================================
// ROUTES
// ============================================

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'DIY University API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// ============================================
// AUTH ROUTES
// ============================================

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Demo login - accept any credentials
  res.json({
    success: true,
    data: {
      user: currentUser,
      token: 'demo-jwt-token'
    }
  });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;

  currentUser = {
    ...currentUser,
    name,
    email
  };

  res.json({
    success: true,
    data: {
      user: currentUser,
      token: 'demo-jwt-token'
    }
  });
});

app.get('/api/auth/me', (req, res) => {
  res.json({
    success: true,
    data: currentUser
  });
});

// ============================================
// SCHOOLS ROUTES
// ============================================

app.get('/api/schools', (req, res) => {
  res.json({
    success: true,
    data: SCHOOLS
  });
});

app.get('/api/schools/:id', (req, res) => {
  const school = SCHOOLS.find(s => s.id === req.params.id);
  if (!school) {
    return res.status(404).json({ success: false, error: 'School not found' });
  }

  const schoolCourses = COURSES.filter(c => c.school === req.params.id);

  res.json({
    success: true,
    data: {
      ...school,
      courses: schoolCourses
    }
  });
});

// ============================================
// COURSES ROUTES
// ============================================

app.get('/api/courses', (req, res) => {
  const { school, enrolled } = req.query;

  let courses = [...COURSES];

  if (school) {
    courses = courses.filter(c => c.school === school);
  }

  if (enrolled === 'true') {
    courses = courses.filter(c => currentUser.enrolledCourses.includes(c.id));
  }

  res.json({
    success: true,
    data: courses
  });
});

app.get('/api/courses/:id', (req, res) => {
  const course = COURSES.find(c => c.id === req.params.id);
  if (!course) {
    return res.status(404).json({ success: false, error: 'Course not found' });
  }

  res.json({
    success: true,
    data: {
      ...course,
      enrolled: currentUser.enrolledCourses.includes(course.id),
      progress: currentUser.enrolledCourses.includes(course.id) ? Math.floor(Math.random() * 100) : 0
    }
  });
});

app.post('/api/courses/:id/enroll', (req, res) => {
  const courseId = req.params.id;

  if (!currentUser.enrolledCourses.includes(courseId)) {
    currentUser.enrolledCourses.push(courseId);
  }

  res.json({
    success: true,
    message: 'Enrolled successfully'
  });
});

// ============================================
// FACULTY ROUTES
// ============================================

app.get('/api/faculty', (req, res) => {
  res.json({
    success: true,
    data: FACULTY
  });
});

app.get('/api/faculty/:id', (req, res) => {
  const faculty = FACULTY.find(f => f.id === req.params.id);
  if (!faculty) {
    return res.status(404).json({ success: false, error: 'Faculty not found' });
  }

  res.json({
    success: true,
    data: faculty
  });
});

app.post('/api/faculty/:id/chat', (req, res) => {
  const { message } = req.body;
  const faculty = FACULTY.find(f => f.id === req.params.id);

  if (!faculty) {
    return res.status(404).json({ success: false, error: 'Faculty not found' });
  }

  // Simulated AI response
  const responses = {
    'prof-inkwell': "Great question about storytelling! Let me share some insights...",
    'prof-venture': "From a business perspective, here's what I recommend...",
    'prof-canvas': "When it comes to design, consider these principles...",
    'prof-circuit': "For AI and technology, here's what you should know...",
    'dean-ai': "As your Dean, I'm here to guide you through your learning journey..."
  };

  res.json({
    success: true,
    data: {
      role: 'assistant',
      content: responses[req.params.id] || "Thank you for your question. Let me help you with that...",
      faculty: faculty.name
    }
  });
});

// ============================================
// CERTIFICATIONS ROUTES
// ============================================

app.get('/api/certifications', (req, res) => {
  res.json({
    success: true,
    data: {
      earned: currentUser.certificates,
      available: COURSES.map(c => ({
        id: `cert-${c.id}`,
        courseId: c.id,
        title: c.title,
        school: c.school
      }))
    }
  });
});

// ============================================
// WORKFORCE ROUTES
// ============================================

app.get('/api/workforce/jobs', (req, res) => {
  const jobs = [
    {
      id: 1,
      title: 'Junior Content Writer',
      company: 'EOF Media',
      location: 'Remote',
      salary: '$45,000 - $55,000',
      match: 95,
      partner: true
    },
    {
      id: 2,
      title: 'Marketing Associate',
      company: 'Startup Ventures',
      location: 'Atlanta, GA',
      salary: '$50,000 - $60,000',
      match: 82,
      partner: true
    }
  ];

  res.json({
    success: true,
    data: jobs
  });
});

app.get('/api/workforce/partners', (req, res) => {
  const partners = [
    { name: 'EOF Media', logo: '📚', jobs: 12, hired: 45 },
    { name: 'Startup Ventures', logo: '🚀', jobs: 8, hired: 23 },
    { name: 'TechFlow Inc.', logo: '💻', jobs: 15, hired: 67 }
  ];

  res.json({
    success: true,
    data: partners
  });
});

// ============================================
// USER PROGRESS ROUTES
// ============================================

app.get('/api/progress', (req, res) => {
  res.json({
    success: true,
    data: {
      enrolledCourses: currentUser.enrolledCourses.length,
      completedCourses: currentUser.completedCourses.length,
      certificates: currentUser.certificates.length,
      badges: currentUser.badges.length,
      stats: currentUser.stats
    }
  });
});

// ============================================
// ADMIN/COMMAND CENTER ROUTES
// ============================================

app.get('/api/admin/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      activeLearners: 2847,
      coursesCompleted: 8392,
      certificatesIssued: 1456,
      jobPlacements: 234,
      systemStatus: {
        diyUniversity: 'online',
        griotAI: 'online',
        eofLibrary: 'online',
        database: 'online'
      }
    }
  });
});

// ============================================
// STUDIO ROUTES
// ============================================

app.get('/api/studio/assignments', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 1,
        title: 'Create Your Story Outline',
        course: 'Storytelling Fundamentals',
        dueDate: '2 days',
        status: 'in_progress'
      },
      {
        id: 2,
        title: 'Business Model Canvas',
        course: 'Business Launch 101',
        dueDate: '5 days',
        status: 'not_started'
      }
    ]
  });
});

app.post('/api/studio/submit', (req, res) => {
  const { assignmentId, content } = req.body;

  res.json({
    success: true,
    message: 'Assignment submitted successfully',
    data: {
      assignmentId,
      submittedAt: new Date().toISOString()
    }
  });
});

// ============================================
// EOF ECOSYSTEM INTEGRATION
// ============================================

app.get('/api/ecosystem/status', (req, res) => {
  res.json({
    success: true,
    data: {
      griotAI: {
        url: 'http://localhost:5173',
        status: 'connected',
        projects: 47
      },
      eofLibrary: {
        url: 'http://localhost:5174',
        status: 'connected',
        books: 892
      },
      diyUniversity: {
        url: 'http://localhost:5175',
        status: 'active',
        learners: 2847
      }
    }
  });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   🎓 DIY UNIVERSITY API SERVER                               ║
║                                                              ║
║   Status: Running                                            ║
║   Port: ${PORT}                                                 ║
║   Mode: ${process.env.NODE_ENV || 'development'}                                        ║
║                                                              ║
║   Endpoints:                                                 ║
║   - GET  /health                                             ║
║   - POST /api/auth/login                                     ║
║   - GET  /api/schools                                        ║
║   - GET  /api/courses                                        ║
║   - GET  /api/faculty                                        ║
║   - GET  /api/certifications                                 ║
║   - GET  /api/workforce/jobs                                 ║
║   - GET  /api/admin/stats                                    ║
║                                                              ║
║   Part of the EOF Ecosystem                                  ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
  `);
});

export default app;
