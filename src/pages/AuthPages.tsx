import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { APP_NAME } from '../config/app';

interface AuthPageProps {
  mode: 'login' | 'signup' | 'forgot-password';
  navigate: (path: string) => void;
}

export const AuthPages: React.FC<AuthPageProps> = ({ mode, navigate }) => {
  const { login, signup } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false); // MUST NOT BE PRE-CHECKED
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (mode === 'signup') {
      if (!agreedToTerms) {
        setErrorMessage('You must review and agree to the Terms and Conditions and Privacy Policy to create an account.');
        return;
      }
      setIsSubmitting(true);
      const res = await signup(email, password, fullName);
      setIsSubmitting(false);
      if (res.success) {
        navigate('/upload');
      } else {
        setErrorMessage(res.error || 'Failed to create account.');
      }
    } else if (mode === 'login') {
      setIsSubmitting(true);
      const res = await login(email, password);
      setIsSubmitting(false);
      if (res.success) {
        navigate('/upload');
      } else {
        setErrorMessage(res.error || 'Failed to log in.');
      }
    } else if (mode === 'forgot-password') {
      if (!email.includes('@')) {
        setErrorMessage('Please provide a valid email address.');
        return;
      }
      setResetSent(true);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 sm:py-16 space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          {mode === 'signup'
            ? `Create your ${APP_NAME} account`
            : mode === 'login'
            ? `Log in to ${APP_NAME}`
            : 'Reset your password'}
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {mode === 'signup'
            ? 'Save analyses, track ATS score improvements, and export reports.'
            : mode === 'login'
            ? 'Access your saved resume analyses and customized roadmaps.'
            : 'Enter your email address to receive password reset instructions.'}
        </p>
      </div>

      <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-sm p-6 sm:p-8 space-y-5">
        {resetSent ? (
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xs text-neutral-800 dark:text-neutral-200 leading-relaxed">
              If an account matches <strong>{email}</strong>, a password reset link has been dispatched. Check your inbox and spam folder.
            </div>
            <button
              onClick={() => navigate('/login')}
              className="btn-secondary w-full text-xs py-2"
            >
              Return to log in
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {mode === 'signup' && (
              <div>
                <label className="block text-neutral-700 dark:text-neutral-300 font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Chen"
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-transparent rounded-xs text-neutral-900 dark:text-neutral-100 focus:outline-hidden focus:border-neutral-900 dark:focus:border-neutral-100"
                />
              </div>
            )}

            <div>
              <label className="block text-neutral-700 dark:text-neutral-300 font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@university.edu"
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-transparent rounded-xs text-neutral-900 dark:text-neutral-100 focus:outline-hidden focus:border-neutral-900 dark:focus:border-neutral-100"
              />
            </div>

            {mode !== 'forgot-password' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-neutral-700 dark:text-neutral-300 font-medium">
                    Password
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => navigate('/forgot-password')}
                      className="text-[11px] text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === 'signup' ? 'Minimum 8 characters' : 'Enter password'}
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-transparent rounded-xs text-neutral-900 dark:text-neutral-100 focus:outline-hidden focus:border-neutral-900 dark:focus:border-neutral-100"
                />
              </div>
            )}

            {/* MANDATORY CONSENT CHECKBOX NOT PRE-CHECKED */}
            {mode === 'signup' && (
              <div className="pt-1 flex items-start gap-2 text-[11px] text-neutral-600 dark:text-neutral-400">
                <input
                  type="checkbox"
                  id="consent-checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 rounded-xs border-neutral-300 dark:border-neutral-700"
                />
                <label htmlFor="consent-checkbox" className="leading-normal">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/terms')}
                    className="underline text-neutral-900 dark:text-neutral-100"
                  >
                    Terms and Conditions
                  </button>{' '}
                  and have read the{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/privacy')}
                    className="underline text-neutral-900 dark:text-neutral-100"
                  >
                    Privacy Policy
                  </button>
                  .
                </label>
              </div>
            )}

            {errorMessage && (
              <div className="p-2.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-800 dark:text-neutral-200">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full py-2 text-xs"
            >
              {isSubmitting
                ? 'Processing...'
                : mode === 'signup'
                ? 'Create Account'
                : mode === 'login'
                ? 'Log In'
                : 'Send Reset Link'}
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 text-center text-xs text-neutral-500">
          {mode === 'login' ? (
            <p>
              Do not have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="underline text-neutral-900 dark:text-neutral-100 font-medium"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button
                onClick={() => navigate('/login')}
                className="underline text-neutral-900 dark:text-neutral-100 font-medium"
              >
                Log in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
