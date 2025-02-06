import React, { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAppDispatch } from '../../store/hooks';
import { login as loginThunk } from '../../store/features/auth/authThunks';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await dispatch(loginThunk({ email, password })).unwrap();
      
      login(
        response.user,
        response.access_token,
        response.refresh_token
      );

      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
      console.error('Login failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 px-4 pb-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-gray-400">Sign in to your account to continue</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
          {error && (
            <div className="mb-4 p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 pl-10 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20"
                  placeholder="name@example.com"
                  required
                />
                <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 pl-10 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20"
                  placeholder="Enter your password"
                  required
                />
                <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-gray-400 hover:text-white">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg px-4 py-2.5 font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-white hover:opacity-90">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}; 