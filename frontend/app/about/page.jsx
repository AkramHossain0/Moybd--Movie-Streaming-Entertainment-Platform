"use client"
import React from 'react';
import Navbar from '../component/Navber';
import Footer from '../component/footer';
import Link from 'next/link';

function App() {
  return (
    <div className="min-h-screen text-white bg-black">
      
      <Navbar />

      {/* About Content */}
      <div className="max-w-6xl px-4 py-16 mx-auto">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-red-600">Our Story</h2>
            <p className="leading-relaxed text-gray-300">
              Founded in 2024, MOYBD emerged from a passion for cinema and a desire to create
              the ultimate movie discovery platform. We believe that every great film deserves
              to be discovered and every movie enthusiast deserves a seamless watching experience.
            </p>
            <div className="p-6 border rounded-lg bg-red-600/10 border-red-600/20">
              <h3 className="mb-3 text-xl font-semibold text-red-500">Our Mission</h3>
              <p className="text-gray-400">
                To revolutionize how people discover, track, and enjoy their favorite movies,
                while building a vibrant community of film enthusiasts.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="p-6 bg-gray-900 border shadow-lg rounded-xl border-red-600/20">
              <h3 className="mb-4 text-2xl font-bold text-red-600">Key Features</h3>
              <ul className="space-y-4">
                {[
                  'Personalized movie recommendations',
                  'Advanced search and filtering',
                  'Watchlist management',
                  'Real-time movie ratings',
                  'Community reviews and discussions',
                ].map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 text-center bg-gray-900 border rounded-lg border-red-600/20">
                <div className="mb-2 text-3xl font-bold text-red-600">1M+</div>
                <div className="text-sm text-gray-400">Active Users</div>
              </div>
              <div className="p-6 text-center bg-gray-900 border rounded-lg border-red-600/20">
                <div className="mb-2 text-3xl font-bold text-red-600">500K+</div>
                <div className="text-sm text-gray-400">Movies Tracked</div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-20">
          <h2 className="mb-12 text-3xl font-bold text-center text-red-600">Meet Our Team</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: 'Akram Hossain',
                role: '..',
                image: 'https://avatars.githubusercontent.com/u/167062006?s=400&u=f13bc3b77d0375f120af989d59806e3a5afcd38d&v=4',
              },
              {
                name: 'Minhajul Islam',
                role: '..',
                image: 'https://avatars.githubusercontent.com/u/170158642?v=4',
              },
              {
                name: 'Artificial intelligence',
                role: '..',
                image: 'https://raw.githubusercontent.com/AkramHossain0/data/refs/heads/main/AI.jpg',
              }
            ].map((member, index) => (
              <div key={index} className="p-6 text-center bg-gray-900 border rounded-xl border-red-600/20">
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-32 h-32 mx-auto mb-4 border-2 border-red-600 rounded-full"
                />
                <h3 className="text-xl font-semibold text-red-500">{member.name}</h3>
                <p className="text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-20 text-center">
          <h2 className="mb-6 text-3xl font-bold text-red-600">Get in Touch</h2>
          <p className="mb-8 text-gray-300">
            Have questions or feedback? We'd love to hear from you!
          </p>
          <Link href='/contact'>
          <button className="px-8 py-3 font-semibold text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700">
            Contact Us
          </button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;