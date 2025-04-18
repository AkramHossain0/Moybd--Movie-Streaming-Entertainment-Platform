"use client"
import React from 'react';
import Navbar from '../component/Navber';
import Footer from '../component/footer';

function App() {
    return (
        <div className="min-h-screen px-4 text-gray-200 bg-black sm:px-6 lg:px-8">
            <Navbar />
            <h1 className='mb-4 text-4xl font-bold text-center text-red-600'>Terms & Conditions</h1>
            {/* Main Content */}
            <main className="max-w-4xl mx-auto">
                <div className="p-8 bg-gray-900 border border-red-800 rounded-lg shadow-2xl">
                    <section className="mb-8">
                        <h3 className="mb-4 text-xl font-semibold text-red-500">Welcome to MOYBD</h3>
                        <p className="mb-4">
                            By accessing and using MOYBD, you accept and agree to be bound by the terms and
                            provisions of this agreement.
                        </p>
                    </section>
                    <div className="space-y-8">
                        <section>
                            <h3 className="mb-4 text-xl font-semibold text-red-500">1. Free Access</h3>
                            <div className="space-y-3">
                                <p>MOYBD is completely free to use. We provide:</p>
                                <ul className="ml-4 space-y-2 list-disc list-inside">
                                    <li>Unlimited movie streaming</li>
                                    <li>Ad-supported content</li>
                                    <li>Access to our entire library</li>
                                    <li>Regular content updates</li>
                                </ul>
                            </div>
                        </section>
                        <section>
                            <h3 className="mb-4 text-xl font-semibold text-red-500">2. User Accounts</h3>
                            <p>
                                While MOYBD is free, users must create an account to access our services. You are
                                responsible for maintaining the confidentiality of your account information.
                            </p>
                        </section>
                        <section>
                            <h3 className="mb-4 text-xl font-semibold text-red-500">3. Content Usage</h3>
                            <div className="space-y-3">
                                <p>Users agree to:</p>
                                <ul className="ml-4 space-y-2 list-disc list-inside">
                                    <li>Not redistribute our content</li>
                                    <li>Use the service for personal, non-commercial purposes</li>
                                    <li>Not attempt to circumvent any technical protection measures</li>
                                    <li>Not share account credentials</li>
                                </ul>
                            </div>
                        </section>
                        <section>
                            <h3 className="mb-4 text-xl font-semibold text-red-500">4. Service Availability</h3>
                            <p>
                                We strive to provide uninterrupted service, but we may need to perform maintenance or
                                updates. We reserve the right to modify or discontinue the service at any time.
                            </p>
                        </section>
                        <section>
                            <h3 className="mb-4 text-xl font-semibold text-red-500">5. Privacy Policy</h3>
                            <p>
                                Your privacy is important to us. Please review our Privacy Policy to understand how we
                                collect, use, and protect your personal information.
                            </p>
                        </section>
                        <section>
                            <h3 className="mb-4 text-xl font-semibold text-red-500">6. Content Guidelines</h3>
                            <div className="space-y-3">
                                <p>All users must adhere to our content guidelines:</p>
                                <ul className="ml-4 space-y-2 list-disc list-inside">
                                    <li>No inappropriate or offensive comments</li>
                                    <li>Respect intellectual property rights</li>
                                    <li>No spamming or harassment</li>
                                    <li>Age-appropriate interaction</li>
                                </ul>
                            </div>
                        </section>
                        <section>
                            <h3 className="mb-4 text-xl font-semibold text-red-500">7. Technical Requirements</h3>
                            <div className="space-y-3">
                                <p>To use MOYBD, you need:</p>
                                <ul className="ml-4 space-y-2 list-disc list-inside">
                                    <li>Stable internet connection (minimum 5 Mbps)</li>
                                    <li>Modern web browser (Chrome, Firefox, Safari, Edge)</li>
                                    <li>JavaScript enabled</li>
                                    <li>Cookies enabled for proper functionality</li>
                                </ul>
                            </div>
                        </section>
                        <section>
                            <h3 className="mb-4 text-xl font-semibold text-red-500">8. Termination</h3>
                            <div className="space-y-3">
                                <p>We reserve the right to terminate or suspend access to our service immediately, without prior notice or liability, for any reason, including:</p>
                                <ul className="ml-4 space-y-2 list-disc list-inside">
                                    <li>Violation of Terms</li>
                                    <li>Fraudulent activity</li>
                                    <li>Abuse of service</li>
                                    <li>Multiple account creation</li>
                                </ul>
                            </div>
                        </section>
                        <section>
                            <h3 className="mb-4 text-xl font-semibold text-red-500">9. Changes to Terms</h3>
                            <p>
                                We may modify these terms at any time. Continued use of MOYBD after changes constitutes acceptance of new terms. Users will be notified of significant changes.
                            </p>
                        </section>
                        <section>
                            <h3 className="mb-4 text-xl font-semibold text-red-500">10. Disclaimer</h3>
                            <p>
                                MOYBD is provided "as is" without warranties of any kind. We are not responsible for any technical issues, content availability, or third-party links.
                            </p>
                        </section>
                        <section className="p-6 mt-12 bg-gray-800 rounded-lg">
                            <h3 className="mb-4 text-xl font-semibold text-red-500">Contact Us</h3>
                            <p>
                                If you have any questions about these Terms & Conditions, please contact us at:
                                <br />
                                <a
                                    href="mailto:support@movieapp.com"
                                    className="text-red-500 transition-colors hover:text-red-400"
                                >
                                    support@movieapp.com
                                </a>
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default App;