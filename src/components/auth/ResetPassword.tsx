import React, { useState, useEffect } from 'react';
import { Lock, ArrowRight, Check, X } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { resetPassword } from '../../store/features/auth/authThunks';

interface FormData {
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  password?: string[];
  confirmPassword?: string;
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

export const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<FormData>({
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Redirect to home if token is not present
  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  const validateForm = (data: FormData): FormErrors => {
    const errors: FormErrors = {};

    // Password validation
    const failedRequirements = passwordRequirements
      .filter(req => !req.test(data.password))
      .map(req => req.message);

    if (failedRequirements.length > 0) {
      errors.password = failedRequirements;
    }

    // Confirm password validation
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
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

    // Validate form
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setApiError(null);

    try {
      await dispatch(resetPassword({
        token: token || '',
        new_password: formData.password
      })).unwrap();

      setResetSuccess(true);
    } catch (err) {
      const errorMessage = typeof err === 'string' ? err : 'An unexpected error occurred. Please try again.';
      setApiError(errorMessage);
      console.error('Password reset error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (resetSuccess) {
    return (
      <div className="min-h-screen bg-black pt-24 px-4 pb-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Password Reset</h1>
            <p className="text-gray-400">Your password has been reset successfully</p>
          </div>

          {/* Success Message */}
          <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
            <div className="text-center">
              <div className="mb-6 p-4 rounded bg-green-500/10 border border-green-500/20 text-green-500">
                Your password has been reset successfully. You can now log in with your new password.
              </div>
              <Link
                to="/login"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg px-4 py-2.5 font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                Go to Login
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (apiError && apiError === 'Invalid reset token') {
    return (
      <div className="min-h-screen bg-black pt-24 px-4 pb-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Password Reset</h1>
            <p className="text-gray-400">There was a problem with your reset link</p>
          </div>

          {/* Error Message */}
          <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
            <div className="text-center">
              <div className="mb-6 p-4 rounded bg-red-500/10 border border-red-500/20 text-red-500">
                The password reset link is invalid or has expired. Please request a new password reset link.
              </div>
              <Link
                to="/login"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg px-4 py-2.5 font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                Go to Login
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 px-4 pb-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Reset Your Password</h1>
          <p className="text-gray-400">Create a new password for your account</p>
        </div>

        {/* Reset Password Form */}
        <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
          {apiError && (
            <div className="mb-4 p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">
                New Password
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

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full bg-black border rounded-lg px-4 py-2.5 pl-10 text-white placeholder:text-gray-500 focus:outline-none ${
                    errors.confirmPassword
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-white/10 focus:border-white/20'
                  }`}
                  placeholder="Confirm your password"
                  required
                />
                <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg px-4 py-2.5 font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Resetting Password...' : 'Reset Password'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Back to Login Link */}
          <div className="mt-6 text-center text-sm text-gray-400">
            Remember your password?{' '}
            <Link to="/login" className="text-white hover:opacity-90">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
