import React from "react";

function Footer() {
  return (
    <>
      <footer className="relative px-8 tracking-wide sm:px-16 py-14">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="mb-4 text-lg font-semibold text-white">
              Quick Links
            </h2>
            <ul className="space-y-4">
              <li>
                <a
                  href="/"
                  className="text-sm text-white transition-all hover:text-red-500"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/movies"
                  className="text-sm text-white transition-all hover:text-red-500"
                >
                  Movies
                </a>
              </li>
              <li>
                <a
                  href="/series"
                  className="text-sm text-white transition-all hover:text-red-500"
                >
                  Series
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-white">Follow Us</h2>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://www.facebook.com/movieofyearbd"
                  className="text-sm text-white transition-all hover:text-red-500"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-white transition-all hover:text-red-500"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-white transition-all hover:text-red-500"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-white">MOYBD</h2>
            <ul className="space-y-4">
              <li>
                <a
                  href="/about"
                  className="text-sm text-white transition-all hover:text-red-500"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="text-sm text-white transition-all hover:text-red-500"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/Terms-&-Conditions"
                  className="text-sm text-white transition-all hover:text-red-500"
                >
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>

          <div className="flex items-center lg:justify-center">
            <a href="/" className="flex items-center space-x-2 text-white">
              <span
                className="text-5xl font-semibold animate-gradient-text"
                style={{
                  background: "linear-gradient(90deg, red, blue)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "gradientAnimation 3s infinite",
                }}
              >
                MOYBD
              </span>
            </a>
            <style jsx>{`
              @keyframes gradientAnimation {
                0% {
                  background-position: 0%;
                }
                100% {
                  background-position: 100%;
                }
              }
              .animate-gradient-text {
                background-size: 200% 200%;
              }
            `}</style>
          </div>
        </div>

        <hr className="my-8 border-gray-600" />

        <div className="flex items-center gap-6 justify-center">
          <p className="mt-4 text-sm text-white sm:mt-0">
            &copy;{" "}
            <a href="https://www.facebook.com/0x1.dev">
              Dev World {new Date().getFullYear()}
            </a>
            . All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
