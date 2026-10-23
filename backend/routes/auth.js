/**
 * DIY UNIVERSITY - Auth Routes
 * Production-ready with demo mode fallback
 */

import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateToken, protect } from '../middleware/auth.js';
import { demoUsers, isDbConnected } from '../services/demoStore.js';

const router = express.Router();

// Create demo user object
// Ids must be unique even when two people sign up in the same millisecond
const createDemoUser = (name, email, password) => {
  const id = `demo-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  return {
    _id: id,
    id,
    name,
    email,
    password: bcrypt.hashSync(password, 10),
    role: 'learner',
    avatar: '👤',
    bio: '',
    location: '',
    enrolledCourses: [],
    completedCourses: [],
    certificates: [],
    badges: [{ id: 'first-steps', name: 'First Steps', earnedAt: new Date() }],
    stats: {
      coursesCompleted: 0,
      certificatesEarned: 0,
      learningHours: 0,
      currentStreak: 1,
      lastActiveAt: new Date()
    },
    createdAt: new Date()
  };
};

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, partnerOrg } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, email, and password'
      });
    }

    if (isDbConnected()) {
      // Production mode with MongoDB
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: 'User already exists with this email'
        });
      }

      const user = await User.create({
        name,
        email,
        password,
        partnerOrg,
        badges: [{ id: 'first-steps', name: 'First Steps', earnedAt: new Date() }]
      });

      const token = generateToken(user._id);

      res.status(201).json({
        success: true,
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            stats: user.stats,
            badges: user.badges
          },
          token
        }
      });
    } else {
      // Demo mode - store in memory
      if (demoUsers.has(email)) {
        return res.status(400).json({
          success: false,
          error: 'User already exists with this email'
        });
      }

      const user = createDemoUser(name, email, password);
      demoUsers.set(email, user);

      const token = generateToken(user._id);

      res.status(201).json({
        success: true,
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            stats: user.stats,
            badges: user.badges
          },
          token,
          mode: 'demo'
        }
      });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during registration'
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password'
      });
    }

    if (isDbConnected()) {
      // Production mode
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials'
        });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials'
        });
      }

      user.updateStreak();
      await user.save();

      const token = generateToken(user._id);

      res.json({
        success: true,
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            bio: user.bio,
            location: user.location,
            enrolledCourses: user.enrolledCourses,
            completedCourses: user.completedCourses,
            certificates: user.certificates,
            badges: user.badges,
            stats: user.stats
          },
          token
        }
      });
    } else {
      // Demo mode
      const user = demoUsers.get(email);

      if (!user) {
        // Auto-create demo user on first login
        const newUser = createDemoUser(email.split('@')[0], email, password);
        demoUsers.set(email, newUser);

        const token = generateToken(newUser._id);

        return res.json({
          success: true,
          data: {
            user: {
              id: newUser._id,
              name: newUser.name,
              email: newUser.email,
              role: newUser.role,
              avatar: newUser.avatar,
              bio: newUser.bio,
              location: newUser.location,
              enrolledCourses: newUser.enrolledCourses,
              completedCourses: newUser.completedCourses,
              certificates: newUser.certificates,
              badges: newUser.badges,
              stats: newUser.stats
            },
            token,
            mode: 'demo'
          }
        });
      }

      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials'
        });
      }

      const token = generateToken(user._id);

      res.json({
        success: true,
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            bio: user.bio,
            location: user.location,
            enrolledCourses: user.enrolledCourses,
            completedCourses: user.completedCourses,
            certificates: user.certificates,
            badges: user.badges,
            stats: user.stats
          },
          token,
          mode: 'demo'
        }
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during login'
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    let user;

    if (isDbConnected()) {
      user = await User.findById(req.user._id);
    } else {
      // Find in demo users
      user = Array.from(demoUsers.values()).find(u => u._id === req.user._id);
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        bio: user.bio,
        location: user.location,
        enrolledCourses: user.enrolledCourses,
        completedCourses: user.completedCourses,
        certificates: user.certificates,
        badges: user.badges,
        stats: user.stats,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, bio, location, avatar } = req.body;

    if (isDbConnected()) {
      const user = await User.findByIdAndUpdate(
        req.user._id,
        { name, bio, location, avatar },
        { new: true, runValidators: true }
      );

      res.json({
        success: true,
        data: user
      });
    } else {
      // Update demo user
      const user = Array.from(demoUsers.values()).find(u => u._id === req.user._id);
      if (user) {
        if (name) user.name = name;
        if (bio) user.bio = bio;
        if (location) user.location = location;
        if (avatar) user.avatar = avatar;
      }

      res.json({
        success: true,
        data: user
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   PUT /api/auth/password
// @desc    Change password
// @access  Private
router.put('/password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (isDbConnected()) {
      const user = await User.findById(req.user._id).select('+password');

      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          error: 'Current password is incorrect'
        });
      }

      user.password = newPassword;
      await user.save();
    } else {
      const user = Array.from(demoUsers.values()).find(u => u._id === req.user._id);
      if (user) {
        const isMatch = bcrypt.compareSync(currentPassword, user.password);
        if (!isMatch) {
          return res.status(401).json({
            success: false,
            error: 'Current password is incorrect'
          });
        }
        user.password = bcrypt.hashSync(newPassword, 10);
      }
    }

    res.json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// Export demo users for other routes
export { demoUsers };
export default router;
