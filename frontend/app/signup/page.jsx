'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../component/Navber';
import Footer from '../component/footer';
import Input from '../component/Input';
import { MovieIcon, EmailIcon, LockIcon, UserIcon, ArrowIcon } from '../component/icons';

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [step, setStep] = useState(1);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const userData = { name, email, password };

        try {
            setIsSubmitting(true);
            setError(null);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                setStep(2);
                alert('Registration successful. Please check your email for the verification code.');
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleVerification = async (e) => {
        e.preventDefault();

        try {
            setIsSubmitting(true);
            setError(null);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, verificationCode }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                alert('Account verified successfully!');
                setTimeout(() => router.push('/'), 2000);
            } else {
                setError(data.message || 'Verification failed');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('An error occurred. Please try again.');
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
                        <h2 className="mt-4 text-3xl font-bold text-white">
                            {step === 1 ? 'Create Your Account' : 'Verify Your Account'}
                        </h2>
                        <p className="mt-2 text-sm text-zinc-400">
                            {step === 1
                                ? 'Sign up to explore and rate your favorite movies and anime!'
                                : 'Enter the verification code sent to your email.'}
                        </p>
                    </div>
                    {step === 1 ? (
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            <Input
                                icon={UserIcon}
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
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
                            <Input
                                icon={LockIcon}
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            {error && <p className="text-sm text-red-500">{error}</p>}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`relative flex items-center justify-center w-full px-4 py-3 font-medium text-white transition-colors ${
                                    isSubmitting ? 'bg-red-600 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
                                } border border-transparent group rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
                            >
                                {isSubmitting ? 'Submitting...' : 'Sign up'}
                                <ArrowIcon />
                            </button>
                        </form>
                    ) : (
                        <form className="mt-8 space-y-6" onSubmit={handleVerification}>
                            <Input
                                icon={EmailIcon}
                                type="text"
                                placeholder="Enter verification code"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                required
                            />
                            {error && <p className="text-sm text-red-500">{error}</p>}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`relative flex items-center justify-center w-full px-4 py-3 font-medium text-white transition-colors ${
                                    isSubmitting ? 'bg-red-600 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
                                } border border-transparent group rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
                            >
                                {isSubmitting ? 'Submitting...' : 'Verify'}
                                <ArrowIcon />
                            </button>
                        </form>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default RegisterPage;
