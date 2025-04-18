"use client"
import React from 'react';
import Navbar from '../component/Navber';
import Footer from '../component/footer';

function page() {
  return (
    <div className="min-h-screen px-4 text-gray-100 bg-black sm:px-6 lg:px-8">
        <Navbar />
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-12 text-center">
        <h2 className="text-3xl font-semibold">Privacy Policy</h2>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto">
        <div className="space-y-8">
          {/* Introduction */}
          <section className="p-6 bg-gray-900 border-l-4 border-red-600 rounded-lg">
            <h3 className="mb-4 text-xl font-semibold text-red-500">Introduction</h3>
            <p className="leading-relaxed text-gray-300">
              At MOYBD, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you use our mobile application and website.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="p-6 bg-gray-900 border-l-4 border-red-600 rounded-lg">
            <h3 className="mb-4 text-xl font-semibold text-red-500">Information We Collect</h3>
            <ul className="space-y-2 text-gray-300 list-disc list-inside">
              <li>Personal identification information (Name, email address)</li>
              <li>Device information and usage data</li>
              <li>Viewing history and preferences</li>
              <li>Payment information when applicable</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="p-6 bg-gray-900 border-l-4 border-red-600 rounded-lg">
            <h3 className="mb-4 text-xl font-semibold text-red-500">How We Use Your Information</h3>
            <div className="space-y-3 text-gray-300">
              <p>We use the collected information for:</p>
              <ul className="ml-4 space-y-2 list-disc list-inside">
                <li>Providing and improving our services</li>
                <li>Personalizing your experience</li>
                <li>Processing your transactions</li>
                <li>Sending periodic emails and updates</li>
                <li>Analyzing usage patterns and trends</li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section className="p-6 bg-gray-900 border-l-4 border-red-600 rounded-lg">
            <h3 className="mb-4 text-xl font-semibold text-red-500">Data Security</h3>
            <p className="leading-relaxed text-gray-300">
              We implement appropriate security measures to protect your personal information. 
              However, no method of transmission over the internet is 100% secure, and we cannot 
              guarantee absolute security.
            </p>
          </section>

          {/* Third-Party Services */}
          <section className="p-6 bg-gray-900 border-l-4 border-red-600 rounded-lg">
            <h3 className="mb-4 text-xl font-semibold text-red-500">Third-Party Services</h3>
            <p className="leading-relaxed text-gray-300">
              Our service may contain links to third-party websites. We are not responsible for 
              the privacy practices or content of these third-party sites.
            </p>
          </section>

          {/* Contact Information */}
          <section className="p-6 bg-gray-900 border-l-4 border-red-600 rounded-lg">
            <h3 className="mb-4 text-xl font-semibold text-red-500">Contact Us</h3>
            <p className="leading-relaxed text-gray-300">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4">
              <p className="text-red-500">Email: privacy@movieapp.com</p>
              <p className="text-red-500">Phone: +880 9638 554567</p>
            </div>
          </section>
        </div>

      </main>
        <Footer />
    </div>
  );
}

export default page;