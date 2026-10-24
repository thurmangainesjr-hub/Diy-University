/**
 * DIY UNIVERSITY - Demo Mode Store
 * In-memory users for when MongoDB is not connected
 */

import mongoose from 'mongoose';

export const demoUsers = new Map();

export const isDbConnected = () => mongoose.connection.readyState === 1;

export const findDemoUserById = (id) =>
  Array.from(demoUsers.values()).find(u => u._id === id) || null;
