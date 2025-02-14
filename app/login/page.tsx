'use client';

import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { signIn } from 'next-auth/react';
import axios from 'axios';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  console.log(isSignUp);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isSignUp) {
        // Handle signup - requires email, username, and password
        await axios.post("http://localhost:5280/api/auth/register", {
          username : formData.username,
          password : formData.password,
          email : formData.email
        });
        
        // signIn();
        
      } else {
        // Handle login - requires username and password only
        console.log("LOgging user!!!!")
        console.log(formData.username, formData.password)
        const res = await signIn("credentials", {
          username: formData.username,
          password: formData.password,
          redirect : false,
          callbackUrl: "/",
        });

        

        if (res?.error) {
          setError(res?.error);
        }
      }
    } catch (err) {
      console.log(err);
      setError("에러 생김 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  return (
    <div className="pt-24 min-h-screen flex items-center justify-center bg-gradient-to-br from-[#000319] via-[#111928] to-purple-900">
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-[rgba(17,25,40,0.75)] backdrop-blur-lg rounded-2xl border border-[rgba(255,255,255,0.125)] p-8 shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              {isSignUp ? 'Create an account' : 'Welcome back'}
            </h2>
            <p className="text-white/60">
              {isSignUp 
                ? 'Sign up to get started' 
                : 'Sign in to continue to your account'}
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              type="button"
              onClick={() => signIn('google')}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 
                       text-white transition-all duration-300"
            >
              <FcGoogle className="w-5 h-5" />
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={() => signIn('github')}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 
                       text-white transition-all duration-300"
            >
              <FaGithub className="w-5 h-5" />
              <span>GitHub</span>
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[rgba(17,25,40,0.75)] text-white/40">
                Or continue with
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* email field */}
            {isSignUp && (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white 
                           placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 
                           focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                  required={isSignUp}
                />
              </div>
            )}

            {/* Username field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white/80 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white 
                         placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 
                         focus:border-transparent transition-all duration-300"
                placeholder="Enter your username"
                required
              />
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white 
                           placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 
                           focus:border-transparent transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white 
                           transition-colors duration-300 focus:outline-none"
                >
                  {showPassword ? (
                    <IoEyeOffOutline className="w-5 h-5" />
                  ) : (
                    <IoEyeOutline className="w-5 h-5" />
                  )}
                </button>
              </div>
              {/* Password requirements */}
              {isSignUp && (
                <p className="mt-2 text-xs text-white/40">
                  Must be at least 8 characters long
                </p>
              )}
            </div>

            {/* Error message */}
            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            {/* Remember Me & Forgot Password - Only show during login */}
            {!isSignUp && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-white/10 bg-white/10 text-purple-500 
                             focus:ring-purple-500 focus:ring-offset-0"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-white/60">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-lg bg-purple-600 text-white font-medium 
                       hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 
                       focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>{isSignUp ? 'Creating account...' : 'Signing in...'}</span>
                </div>
              ) : (
                isSignUp ? 'Create account' : 'Sign in'
              )}
            </button>
          </form>

          {/* Toggle Sign Up/Sign In */}
          <p className="mt-6 text-center text-white/60">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{' '}
            <button 
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
                setFormData({ email: '', username: '', password: '' });
              }}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;