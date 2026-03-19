/**
 * DIY UNIVERSITY - Login Page
 * Authentication for learners, faculty, and admins
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiArrowRight, FiBook } from 'react-icons/fi';

function Login() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate login/signup
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-dark-900 flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/20 to-purple-900/20 p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
              <span className="text-2xl">🎓</span>
            </div>
            <span className="text-2xl font-serif text-white">DIY University</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-serif text-white mb-4">
              Transform from Learner<br />
              to Creator to Owner
            </h1>
            <p className="text-gray-400 text-lg">
              Execution-based learning for the creative economy.
              Build real skills, earn real credentials, get real opportunities.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-dark-700/50 flex items-center justify-center text-2xl">
              ✍️
            </div>
            <div>
              <h3 className="text-white font-medium">7 Schools of Mastery</h3>
              <p className="text-gray-500 text-sm">From Writing to Tech to Workforce</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-dark-700/50 flex items-center justify-center text-2xl">
              🤖
            </div>
            <div>
              <h3 className="text-white font-medium">AI Faculty Mentors</h3>
              <p className="text-gray-500 text-sm">Personal guidance from specialized professors</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-dark-700/50 flex items-center justify-center text-2xl">
              💼
            </div>
            <div>
              <h3 className="text-white font-medium">Workforce Pipeline</h3>
              <p className="text-gray-500 text-sm">Direct path from learning to earning</p>
            </div>
          </div>
        </motion.div>

        <div className="text-gray-500 text-sm">
          Part of the EOF Ecosystem · Integrated with Griot AI & EOF Library
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
              <span className="text-2xl">🎓</span>
            </div>
            <span className="text-2xl font-serif text-white">DIY University</span>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-serif text-white mb-2">
              {isSignUp ? 'Create Your Account' : 'Welcome Back'}
            </h2>
            <p className="text-gray-400">
              {isSignUp ? 'Start your learning journey today' : 'Continue your learning journey'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-gray-400 text-sm mb-2">Full Name</label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full bg-dark-700 border border-dark-600 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none"
                    required={isSignUp}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-gray-400 text-sm mb-2">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full bg-dark-700 border border-dark-600 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full bg-dark-700 border border-dark-600 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none"
                  required
                />
              </div>
            </div>

            {!isSignUp && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-400">
                  <input type="checkbox" className="rounded bg-dark-700 border-dark-600" />
                  Remember me
                </label>
                <a href="#" className="text-primary hover:underline">Forgot password?</a>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-3 text-lg"
            >
              {loading ? (
                <span className="animate-spin">⏳</span>
              ) : (
                <>
                  {isSignUp ? 'Create Account' : 'Sign In'}
                  <FiArrowRight />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary hover:underline"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-dark-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-dark-900 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <button className="btn btn-secondary w-full">
                <span className="text-xl">🌐</span> Google
              </button>
              <button className="btn btn-secondary w-full">
                <span className="text-xl">📱</span> Phone
              </button>
            </div>
          </div>

          <div className="mt-8 p-4 rounded-xl bg-dark-700/50 border border-dark-600">
            <p className="text-gray-400 text-sm text-center">
              🎓 <strong className="text-white">Partner Access:</strong> If you're joining through a church,
              community organization, or employer partner,
              <a href="#" className="text-primary hover:underline ml-1">use partner login</a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
