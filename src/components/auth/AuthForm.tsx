import React from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

interface AuthFormProps {
  mode: 'login' | 'signup' | 'reset';
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit, isLoading = false }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {mode === 'signup' && (
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required={mode === 'signup'}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      {mode !== 'reset' && (
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative mt-1">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required={mode !== 'reset'}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      )}

      {mode === 'signup' && (
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="relative mt-1">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              required={mode === 'signup'}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Reset Password'
        )}
      </button>
    </form>
  );
};

export default AuthForm; 