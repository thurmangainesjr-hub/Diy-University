/**
 * DIY UNIVERSITY - Authentication Middleware
 */

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'diy-university-secret-key-change-in-production';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

// Generate JWT Token
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE
  });
};

// Protect routes - require authentication
export const protect = async (req, res, next) => {
  let token;

  // Get token from header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized - no token'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Get user from token
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not found'
      });
    }

    // Update streak
    req.user.updateStreak();
    await req.user.save();

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized - invalid token'
    });
  }
};

// Role authorization
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Role ${req.user.role} is not authorized for this action`
      });
    }
    next();
  };
};

// Optional auth - doesn't fail if no token
export const optionalAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = await User.findById(decoded.id);
    } catch (error) {
      // Token invalid, but continue without user
    }
  }

  next();
};

export default { generateToken, protect, authorize, optionalAuth };
