'use client';
import React, { useState } from 'react';
import Navbar from '../component/Navber';
import Footer from '../component/footer';

function Page() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Reset password
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle email submission for reset code
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:4000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Reset code sent to your email.');
        setStep(2); // Move to reset password step
      } else {
        setError(result.message || 'Failed to send reset code.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }

    setLoading(false);
  };

  // Handle password reset
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resetCode, newPassword }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Password successfully reset. You can now log in.');
        setStep(1); 
        setEmail('');
        setResetCode('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError(result.message || 'Failed to reset password.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className='bg-black'>
      <Navbar />
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="p-8 bg-gray-900 border border-red-800 rounded-lg shadow-2xl">
            {step === 1 ? (
              <>
                <h2 className="mb-2 text-2xl font-bold text-white">Forgot Password?</h2>
                <p className="mb-6 text-gray-400">
                  No worries! Enter your email and we'll send you reset instructions.
                </p>
                <form onSubmit={handleEmailSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 text-white transition-colors bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center w-full px-4 py-3 font-bold text-white transition-colors duration-200 ease-in-out bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    ) : (
                      'Send Reset Code'
                    )}
                  </button>
                </form>
              </>
            ) : (
              <>
                <h2 className="mb-2 text-2xl font-bold text-white">Reset Password</h2>
                <p className="mb-6 text-gray-400">
                  Enter the reset code sent to your email and set a new password.
                </p>
                <form onSubmit={handlePasswordReset} className="space-y-6">
                  <div>
                    <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-300">
                      Reset Code
                    </label>
                    <input
                      type="text"
                      id="resetCode"
                      value={resetCode}
                      onChange={(e) => setResetCode(e.target.value)}
                      className="w-full px-4 py-3 text-white transition-colors bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                      placeholder="Enter reset code"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-300">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-3 text-white transition-colors bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                      placeholder="Enter new password"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-300">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 text-white transition-colors bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center w-full px-4 py-3 font-bold text-white transition-colors duration-200 ease-in-out bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    ) : (
                      'Reset Password'
                    )}
                  </button>
                </form>
              </>
            )}

            {(error || message) && (
              <div
                className={`p-4 mt-4 border rounded-lg ${
                  error ? 'border-red-600 bg-red-900/50' : 'border-green-600 bg-green-900/50'
                }`}
              >
                <p className={`text-sm text-center ${error ? 'text-red-400' : 'text-green-400'}`}>
                  {error || message}
                </p>
              </div>
            )}

            <div className="mt-6 text-center">
              <a href="/login" className="text-sm text-gray-400 transition-colors hover:text-red-500">
                Back to Login
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Page;
