import React, { useState } from 'react';
import { Mail, Lock, User, AtSign, ArrowRight, Check, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { signup } from '../../store/features/auth/authThunks';
import { useAuth } from '../../hooks/useAuth';

interface FormData {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string[];
}

interface PasswordRequirement {
  message: string;
  test: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  {
    message: 'At least 8 characters long',
    test: (password) => password.length >= 8,
  },
  {
    message: 'Contains at least one number',
    test: (password) => /\d/.test(password),
  },
  {
    message: 'Contains at least one uppercase letter',
    test: (password) => /[A-Z]/.test(password),
  },
  {
    message: 'Contains at least one lowercase letter',
    test: (password) => /[a-z]/.test(password),
  },
];

const PasswordRequirementsList: React.FC<{ password: string }> = ({ password }) => {
  return (
    <div className="mt-2 space-y-2">
      {passwordRequirements.map((req, index) => {
        const isMet = req.test(password);
        return (
          <div key={index} className="flex items-center gap-2">
            {isMet ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <X className="w-4 h-4 text-gray-400" />
            )}
            <span className={`text-sm ${isMet ? 'text-green-500' : 'text-gray-400'}`}>
              {req.message}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    username: '',
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const validateForm = (data: FormData): FormErrors => {
    const errors: FormErrors = {};
    
    // Username validation
    if (!data.username.trim() || data.username.trim().length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      errors.email = 'Invalid email format';
    }
    
    // Password validation
    const failedRequirements = passwordRequirements
      .filter(req => !req.test(data.password))
      .map(req => req.message);
    
    if (failedRequirements.length > 0) {
      errors.password = failedRequirements;
    }
    
    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    setApiError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Trim all form fields
    const trimmedData = {
      ...formData,
      name: formData.name.trim(),
      username: formData.username.trim(),
      email: formData.email.trim(),
      password: formData.password
    };
    
    // Validate form
    const validationErrors = validateForm(trimmedData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsLoading(true);
    setApiError(null);

    try {
      const resultAction = await dispatch(signup(trimmedData)).unwrap();
      // After successful signup, call login to set the auth state
      login(
        resultAction.user,
        resultAction.access_token,
        resultAction.refresh_token
      );
      navigate('/');
    } catch (error: unknown) {
      // The error from createAsyncThunk's rejectWithValue is available directly
      setApiError(typeof error === 'string' ? error : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 px-4 pb-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create your account</h1>
          <p className="text-gray-400">Get started with your free account today</p>
        </div>

        {/* Signup Form */}
        <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
          {apiError && (
            <div className="mb-4 p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                Full name
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 pl-10 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20"
                  placeholder="John Doe"
                  required
                />
                <User className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-1">
                Username
              </label>
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full bg-black border rounded-lg px-4 py-2.5 pl-10 text-white placeholder:text-gray-500 focus:outline-none ${
                    errors.username 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-white/10 focus:border-white/20'
                  }`}
                  placeholder="johndoe"
                  required
                />
                <AtSign className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-500">{errors.username}</p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-black border rounded-lg px-4 py-2.5 pl-10 text-white placeholder:text-gray-500 focus:outline-none ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-white/10 focus:border-white/20'
                  }`}
                  placeholder="name@example.com"
                  required
                />
                <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full bg-black border rounded-lg px-4 py-2.5 pl-10 text-white placeholder:text-gray-500 focus:outline-none ${
                    errors.password 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-white/10 focus:border-white/20'
                  }`}
                  placeholder="Create a strong password"
                  required
                />
                <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              {errors.password && Array.isArray(errors.password) && (
                <div className="mt-1 text-sm text-red-500">
                  Please fix the following:
                  <ul className="list-disc list-inside mt-1">
                    {errors.password.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              <PasswordRequirementsList password={formData.password} />
            </div>

            {/* Terms and Conditions */}
            <div className="text-sm text-gray-400">
              By signing up, you agree to our{' '}
              <Link to="/terms" className="text-white hover:opacity-90">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-white hover:opacity-90">
                Privacy Policy
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg px-4 py-2.5 font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating account...' : 'Create account'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-white hover:opacity-90">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}; 