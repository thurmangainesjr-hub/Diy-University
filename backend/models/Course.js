/**
 * DIY UNIVERSITY - Course Model
 */

import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  id: String,
  title: String,
  type: {
    type: String,
    enum: ['video', 'text', 'quiz', 'assignment', 'discussion'],
    default: 'text'
  },
  content: String,
  videoUrl: String,
  duration: Number, // minutes
  order: Number,
  resources: [{
    title: String,
    url: String,
    type: String
  }]
});

const moduleSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  order: Number,
  lessons: [lessonSchema]
});

const courseSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  school: {
    type: String,
    required: true,
    enum: ['writing', 'business', 'design', 'film', 'tech', 'operations', 'workforce']
  },
  instructor: {
    type: String,
    required: true
  },
  instructorId: String,
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  duration: String, // e.g., "8 weeks"
  thumbnail: String,
  modules: [moduleSchema],
  skills: [String],
  prerequisites: [String],
  certificateId: String,
  stats: {
    students: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    completionRate: { type: Number, default: 0 }
  },
  pricing: {
    type: { type: String, enum: ['free', 'paid', 'subscription'], default: 'free' },
    price: { type: Number, default: 0 }
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual for total lessons count
courseSchema.virtual('totalLessons').get(function() {
  return this.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
