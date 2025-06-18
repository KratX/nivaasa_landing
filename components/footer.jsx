"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Luxury Real Estate Footer Component
 * Features newsletter subscription, contact information, and company branding
 * with sophisticated dark theme and animated geometric background
 */
const Footer = () => {
  // State management for form and animations
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Initialize component
  useEffect(() => {
    setIsLoaded(true);
    initializeGeometricBackground();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  /**
   * Initialize animated geometric background patterns
   */
  const initializeGeometricBackground = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const drawArchitecturalLines = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;

      const time = Date.now() * 0.0002;

      // Draw architectural wireframe patterns
      for (let i = 0; i < canvas.width; i += 120) {
        for (let j = 0; j < canvas.height; j += 120) {
          const offset = Math.sin(time + i * 0.01 + j * 0.01) * 15;

          // Draw building-like structures
          ctx.beginPath();
          ctx.rect(i + offset, j, 80, 100);
          ctx.stroke();

          // Draw connecting lines
          ctx.beginPath();
          ctx.moveTo(i + 40, j);
          ctx.lineTo(i + 40 + offset, j - 50);
          ctx.lineTo(i + 120, j - 25);
          ctx.stroke();

          // Draw diagonal supports
          ctx.beginPath();
          ctx.moveTo(i, j + 100);
          ctx.lineTo(i + 80 + offset, j);
          ctx.stroke();

          // Draw grid lines
          if (i < canvas.width - 120) {
            ctx.beginPath();
            ctx.moveTo(i + 80, j + 50);
            ctx.lineTo(i + 120, j + 50);
            ctx.stroke();
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(drawArchitecturalLines);
    };

    drawArchitecturalLines();

    // Handle window resize
    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  };

  /**
   * Handle email subscription
   */
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  /**
   * Social media links configuration
   */
  const socialLinks = [
    {
      name: "Facebook",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      url: "#",
    },
    {
      name: "Instagram",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      url: "#",
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      url: "#",
    },
  ];

  /**
   * Navigation links
   */
  const navLinks = [
    { name: "Privacy Policy", url: "#" },
    { name: "Experience Center", url: "#" },
    { name: "Media&News", url: "#" },
  ];

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{ zIndex: 1 }}
      />

      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* Top Border Line */}
        <div className="w-full h-px bg-white"></div>

        {/* Main Footer Section */}
        <div className="container mx-auto px-6 py-16">
          {/* Header */}
          <div
            className={`mb-16 transform transition-all duration-1000 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
              Stay Updated with our Projects
            </h2>
            <div className="w-24 h-1 bg-yellow-400"></div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left Section - Newsletter */}
            <div
              className={`transform transition-all duration-1000 delay-300 ${
                isLoaded
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-light text-yellow-400 mb-8">
                Let's Talk
              </h3>

              {/* Email Subscription Form */}
              <form onSubmit={handleSubscribe} className="mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Your Email Address"
                      className="w-full bg-transparent border-b-2 border-white pb-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors duration-300"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-transparent border border-white text-white hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-300 font-medium"
                    disabled={isSubscribed}
                  >
                    {isSubscribed ? "Subscribed!" : "Subscribe"}
                  </button>
                </div>
              </form>

              <p className="text-gray-400 text-sm">
                Don't worry, we won't spam your inbox
              </p>
            </div>

            {/* Right Section - Contact Info */}
            <div
              className={`transform transition-all duration-1000 delay-500 ${
                isLoaded
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
              }`}
            >
              {/* Address */}
              <div className="mb-8">
                <p className="text-white text-lg leading-relaxed">
                  Elan Tower, Golf course Road,
                  <br />
                  sector 42, Gurgaon, 122002
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-yellow-400 font-medium mb-2">EMAIL US</h4>
                  <a
                    href="mailto:nivaasasupport@gmail.com"
                    className="text-white hover:text-yellow-400 transition-colors duration-300"
                  >
                    nivaasasupport@gmail.com
                  </a>
                </div>

                <div>
                  <h4 className="text-yellow-400 font-medium mb-2">CALL US</h4>
                  <a
                    href="tel:7045682162"
                    className="text-white hover:text-yellow-400 transition-colors duration-300"
                  >
                    7045682162
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-6 py-8">
            {/* Navigation Links */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mb-8">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Bottom Row */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
              {/* Copyright */}
              <div className="text-gray-400 text-sm text-center lg:text-left">
                <p>© 2024 Nivaasa. All rights reserved.</p>
                <p>Designed with excellence for luxury real estate.</p>
              </div>

              {/* Company Logo and Branding */}
              <div className="flex flex-col items-center">
                <div className="flex items-center mb-2">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-3">
                    <img src="logo.png" alt="" />
                  </div>
                  <div>
                    <h4 className="text-yellow-400 font-bold text-xl tracking-wider">
                      NIVAASA
                    </h4>
                    <p className="text-gray-400 text-xs">
                      Beyond Spaces. Building Legacies
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className={`w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-yellow-400 transition-all duration-300 transform hover:scale-110 ${
                      hoveredSocial === index ? "scale-110 bg-yellow-400" : ""
                    }`}
                    onMouseEnter={() => setHoveredSocial(index)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
