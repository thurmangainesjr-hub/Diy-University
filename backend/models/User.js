/**
 * DIY UNIVERSITY - User Model
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['learner', 'faculty', 'admin', 'partner'],
    default: 'learner'
  },
  avatar: {
    type: String,
    default: '👤'
  },
  bio: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  enrolledCourses: [{
    courseId: String,
    enrolledAt: { type: Date, default: Date.now },
    progress: { type: Number, default: 0 },
    completedLessons: [String]
  }],
  completedCourses: [{
    courseId: String,
    completedAt: Date,
    grade: String,
    certificateId: String
  }],
  certificates: [{
    id: String,
    courseId: String,
    title: String,
    earnedAt: Date,
    grade: String,
    credentialId: String
  }],
  badges: [{
    id: String,
    name: String,
    earnedAt: Date
  }],
  stats: {
    coursesCompleted: { type: Number, default: 0 },
    certificatesEarned: { type: Number, default: 0 },
    learningHours: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    lastActiveAt: { type: Date, default: Date.now }
  },
  partnerOrg: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update streak on activity
userSchema.methods.updateStreak = function() {
  const now = new Date();
  const lastActive = this.stats.lastActiveAt;
  const daysDiff = Math.floor((now - lastActive) / (1000 * 60 * 60 * 24));

  if (daysDiff === 1) {
    this.stats.currentStreak += 1;
  } else if (daysDiff > 1) {
    this.stats.currentStreak = 1;
  }
  this.stats.lastActiveAt = now;
};

const User = mongoose.model('User', userSchema);

export default User;
