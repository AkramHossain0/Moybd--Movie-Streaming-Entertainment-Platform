'use client';

import React, { useState } from 'react';
import Navbar from '../component/Navber';
import Footer from '../component/footer';

function Page() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        alert('Your message has been sent successfully!');
      } else {
        alert('Failed to send your message. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen text-gray-100 bg-black">
        <Navbar />

        <main className="container px-4 py-16 mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 text-center">
              <h1 className="mb-4 text-4xl font-bold text-transparent md:text-5xl bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text">
                Get in Touch
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-gray-400">
                Have any questions or feedback? We'd love to hear from you! Reach out to us for support, suggestions, or anything else related to your movie experience.
              </p>
            </div>

            <div className="grid gap-8 mb-16 md:grid-cols-3">
              {/* Contact Info Cards */}
              <div className="p-8 text-center transition-colors bg-gray-900 rounded-xl hover:bg-gray-800">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10">
                  <svg className="w-8 h-8 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92V17a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5v-.08a2 2 0 0 1 .5-1.29l3.5-4a2 2 0 0 1 1.5-.63h9a2 2 0 0 1 1.5.63l3.5 4a2 2 0 0 1 .5 1.29z"></path>
                    <path d="M16 3a4 4 0 1 1-8 0"></path>
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Phone</h3>
                <p className="text-gray-400">+880 9638 554567</p>
              </div>

              <div className="p-8 text-center transition-colors bg-gray-900 rounded-xl hover:bg-gray-800">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/10">
                  <svg className="w-8 h-8 text-purple-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16v16H4z"></path>
                    <polyline points="4 4 12 12 20 4"></polyline>
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Email</h3>
                <p className="text-gray-400">support@movieapp.com</p>
              </div>

              <div className="p-8 text-center transition-colors bg-gray-900 rounded-xl hover:bg-gray-800">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/10">
                  <svg className="w-8 h-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6"></path>
                    <path d="M3.27 6.96a9 9 0 0 1 17.46 0"></path>
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Location</h3>
                <p className="text-gray-400">Dhaka, Bnagladesh</p>
              </div>
            </div>

            <div className="p-8 bg-gray-900 rounded-2xl md:p-12">
              <h2 className="mb-6 text-2xl font-bold">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Input Fields */}
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block mb-2 text-sm font-medium">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Enter the subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Enter your message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 rounded-lg outline-none resize-none focus:ring-2 focus:ring-red-500"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center w-full gap-2 px-6 py-3 font-semibold text-white transition-opacity rounded-lg bg-gradient-to-r from-red-500 to-purple-600 hover:opacity-90"
                >
                  {loading ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg
                        className="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default Page;
