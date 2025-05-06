'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../component/Navber';
import Footer from '../component/footer';
import Input from '../component/Input';
import { EmailIcon, LockIcon, MovieIcon, ArrowIcon } from '../component/icons';
import crypto from 'crypto';

const decryptAES = (encrypted, secret, iv) => {
  const key = crypto.createHash('sha256').update(secret).digest();
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

const AES_SECRET = process.env.NEXT_PUBLIC_AES_SECRET; 

function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success && data.token) {
        try {
          const decryptedToken = JSON.parse(
            decryptAES(data.token.Data, AES_SECRET, data.token.iv)
          );
          if (decryptedToken.isLoggedIn === true) {
            if (rememberMe) {
              localStorage.setItem('isLoggedIn', 'true');
            } else {
              sessionStorage.setItem('isLoggedIn', 'true');
            }
            alert('Login successful!');
            router.push('/');
          } else {
            setError('Login failed. Please try again.');
          }
        } catch (err) {
          setError('Unable to decrypt login data.');
        }
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 space-y-8 border bg-zinc-900/50 rounded-2xl backdrop-blur-sm border-zinc-800">
          <div className="text-center">
            <div className="flex justify-center">
              <MovieIcon />
            </div>
            <h2 className="mt-4 text-3xl font-bold text-white">Login to Your Account</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Access personalized recommendations and review your favorite movies and anime!
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <Input
              icon={EmailIcon}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              icon={LockIcon}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="flex items-center justify-between gap-1">
              <div className='flex items-center'>
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-red-500 rounded border-zinc-700 bg-zinc-800 focus:ring-red-500 focus:ring-offset-zinc-900"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-zinc-400">
                  Remember me
                </label>
              </div>
              <a href="/forget" className="ml-1 text-red-500 hover:text-red-400">
                Forget Password?
              </a>
            </div>
            <button
              type="submit"
              className={`relative flex items-center justify-center w-full px-4 py-3 font-medium text-white transition-colors ${
                isSubmitting ? 'bg-red-600 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
              } border border-transparent group rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Sign In'}
              <ArrowIcon />
            </button>
            <p className="text-sm text-center text-zinc-400">
              Don't have an account?{' '}
              <button
                type="button"
                className="font-medium text-red-500 hover:text-red-400"
                onClick={() => router.push('/signup')}
              >
                Sign up here
              </button>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Page;