/**
 * DIY UNIVERSITY - Main Application
 * Education, Certification & Workforce Development for EOF Ecosystem
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Schools from './pages/Schools';
import Courses from './pages/Courses';
import Lesson from './pages/Lesson';
import Faculty from './pages/Faculty';
import Certifications from './pages/Certifications';
import Workforce from './pages/Workforce';
import CommandCenter from './pages/CommandCenter';
import Studio from './pages/Studio';
import Profile from './pages/Profile';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="schools" element={<Schools />} />
        <Route path="schools/:schoolId" element={<Courses />} />
        <Route path="course/:courseId" element={<Courses />} />
        <Route path="lesson/:lessonId" element={<Lesson />} />
        <Route path="faculty" element={<Faculty />} />
        <Route path="certifications" element={<Certifications />} />
        <Route path="workforce" element={<Workforce />} />
        <Route path="command-center" element={<CommandCenter />} />
        <Route path="studio" element={<Studio />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
