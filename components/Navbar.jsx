"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate, Link } from "react-router-dom";

/**
 * Full-Screen Navigation Overlay Component
 * Displays when "Menu" button is clicked in the main navbar
 */
const NavigationOverlay = ({ isOpen, onClose }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeSection, setActiveSection] = useState("HOME");
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      setIsLoaded(true);
      initializeCurvedBackground();
      // Prevent body scroll when overlay is open
      document.body.style.overflow = "hidden";
    } else {
      setIsLoaded(false);
      document.body.style.overflow = "unset";
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const initializeCurvedBackground = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const drawCurvedPatterns = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(255, 215, 0, 0.25)";
      ctx.lineWidth = 1.5;

      const time = Date.now() * 0.0003;
      const centerX = canvas.width * 0.7;
      const centerY = canvas.height * 0.6;

      // Draw multiple curved wave patterns
      for (let i = 0; i < 12; i++) {
        ctx.beginPath();
        const radius = 60 + i * 35;
        const offset = Math.sin(time + i * 0.4) * 12;

        for (let angle = 0; angle < Math.PI * 2; angle += 0.08) {
          const x = centerX + Math.cos(angle) * (radius + offset);
          const y = centerY + Math.sin(angle) * (radius * 0.7 + offset);

          if (angle === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Draw flowing architectural curves
      for (let i = 0; i < 10; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 215, 0, ${0.08 + i * 0.015})`;

        const startX = canvas.width * 0.2;
        const startY = canvas.height * 0.15 + i * 70;
        const controlX = canvas.width * 0.85 + Math.sin(time + i * 0.8) * 60;
        const controlY = canvas.height * 0.85 + Math.cos(time + i * 0.6) * 40;
        const endX = canvas.width * 0.95;
        const endY = canvas.height * 0.3 + i * 50;

        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(controlX, controlY, endX, endY);
        ctx.stroke();
      }

      animationFrameRef.current = requestAnimationFrame(drawCurvedPatterns);
    };

    drawCurvedPatterns();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  };

  const navigationItems = [
    { name: "HOME", url: "/" },
    { name: "ABOUT US", url: "/about" },
    { name: "PROPERTIES", url: "/properties" },
    { name: "BLOG", url: "/blog" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      url: "https://facebook.com/nivaasa",
    },
    {
      name: "Instagram",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      url: "https://instagram.com/nivaasa",
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      url: "https://linkedin.com/company/nivaasa",
    },
  ];

  const handleNavClick = (item) => {
    setActiveSection(item.name);
    onClose();
    // Use React Router navigation instead of console.log
    navigate(item.url);
  };

  const handleCTAClick = () => {
    onClose();
    // Navigate to a contact page or scroll to contact section
    navigate("/contact");
  };

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black text-white z-[60] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      <div className="relative z-10 h-full flex flex-col">
        <div className="flex justify-between items-start p-8 lg:p-12">
          <motion.div
            className={`transform transition-all duration-1000 ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 mr-4">
                <img src="logo.png" alt="" />
              </div>
            </div>

            <div>
              <h1 className="text-4xl lg:text-7xl font-bold text-yellow-400 tracking-wider mb-3">
                NIVAASA
              </h1>
              <p className="text-gray-300 text-center text-base lg:text-xl font-light">
                Beyond Spaces, Building Legacies
              </p>
            </div>
          </motion.div>

          <motion.button
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center text-white hover:text-yellow-400 transition-colors duration-300 hover:bg-white/10 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </motion.button>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 px-8 lg:px-12 pb-12">
          <motion.div
            className={`flex flex-col justify-center transform transition-all duration-1000 delay-300 ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="w-40 h-px bg-white mb-12"></div>

            <nav className="space-y-8">
              {navigationItems.map((item, index) => (
                <div key={index} className="relative">
                  <motion.button
                    onClick={() => handleNavClick(item)}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`text-5xl lg:text-6xl xl:text-7xl font-light text-left transition-all duration-300 ${
                      location.pathname === item.url
                        ? "text-yellow-400"
                        : hoveredItem === index
                        ? "text-yellow-400"
                        : "text-white hover:text-yellow-400"
                    } ${
                      hoveredItem === index ? "transform translate-x-6" : ""
                    }`}
                    whileHover={{ x: 24 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.name}
                  </motion.button>

                  <motion.div
                    className={`absolute left-0 top-1/2 w-3 h-3 bg-yellow-400 rounded-full transform -translate-y-1/2 transition-all duration-300 ${
                      hoveredItem === index || location.pathname === item.url
                        ? "opacity-100 -translate-x-8"
                        : "opacity-0 -translate-x-6"
                    }`}
                    animate={{
                      scale:
                        hoveredItem === index || location.pathname === item.url
                          ? 1
                          : 0,
                      x:
                        hoveredItem === index || location.pathname === item.url
                          ? -32
                          : -24,
                    }}
                  />
                </div>
              ))}
            </nav>
          </motion.div>

          <motion.div
            className={`flex flex-col justify-center transform transition-all duration-1000 delay-500 ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <div className="w-40 h-px bg-white mb-12"></div>

            <div className="space-y-10">
              <motion.h2
                className="text-4xl lg:text-5xl xl:text-6xl font-light text-yellow-400 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                Know More
                <br />
                About Projects?
              </motion.h2>

              <motion.p
                className="text-white text-xl lg:text-2xl leading-relaxed max-w-lg font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                Through a unique combination of engineering, construction and
                design disciplines and expertise
              </motion.p>

              <motion.button
                onClick={handleCTAClick}
                className="bg-white text-black px-10 py-5 font-bold text-xl tracking-wider hover:bg-yellow-400 hover:text-black transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                LET'S BUILD
              </motion.button>

              <motion.div
                className="flex space-x-8 pt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center hover:bg-yellow-400 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Enhanced Elegant Navbar with Integrated Navigation Overlay
 */
const ElegantNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavigationOverlayOpen, setIsNavigationOverlayOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openNavigationOverlay = () => {
    setIsNavigationOverlayOpen(true);
    setIsMobileMenuOpen(false); // Close mobile menu if open
  };

  const closeNavigationOverlay = () => {
    setIsNavigationOverlayOpen(false);
  };

  const navigationItems = [
    { name: "HOME", to: "/", active: location.pathname === "/" },
    {
      name: "PROPERTIES",
      to: "/properties",
      active: location.pathname === "/properties",
    },
    { name: "ABOUT", to: "/about", active: location.pathname === "/about" },
    { name: "BLOG", to: "/blog", active: location.pathname === "/blog" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        className={`top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/95 backdrop-blur-lg shadow-2xl border-b border-white/10"
            : "bg-gradient-to-r from-black via-gray-900 to-black"
        }`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-blue-900/20"
        />

        <div className="relative w-full bg-black px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "backOut" }}
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <Link to="/" className="flex items-center space-x-2">
                <motion.div
                  className="relative w-12 h-12 mb-2"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div className="absolute inset-0 rounded-xl" />
                  <img src="logo.png" alt="" />
                </motion.div>
                <motion.div>
                  <motion.h1
                    className="text-2xl font-bold tracking-wider bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    NIVAASA
                  </motion.h1>
                </motion.div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.nav
              className="hidden lg:flex items-center space-x-14"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Link
                    to={item.to}
                    className={`relative px-6 py-3 text-sm font-medium tracking-wide rounded-full transition-all duration-300 block ${
                      item.active
                        ? "bg-gradient-to-r from-white to-gray-100 text-black shadow-lg"
                        : "text-white hover:text-yellow-400"
                    }`}
                  >
                    {!item.active && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-full opacity-0"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                    {item.active && (
                      <motion.div
                        className="absolute bottom-0 left-1/2 w-1 h-1 bg-yellow-400 rounded-full transform -translate-x-1/2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            {/* Desktop Menu Button - Opens Navigation Overlay */}
            <motion.div
              className="hidden lg:flex items-center space-x-3 cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              onClick={openNavigationOverlay}
            >
              <motion.div className="flex flex-col space-y-1.5">
                {[16, 24, 20].map((width, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-r from-white to-gray-300 rounded-full h-[1px]"
                    style={{ width: `${width}px` }}
                    whileHover={{
                      width: "24px",
                      background: "linear-gradient(to right, #fbbf24, #f59e0b)",
                    }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  />
                ))}
              </motion.div>
              <motion.span className="text-[11px] font-semibold tracking-wider text-white group-hover:text-yellow-400 transition-colors duration-300">
                MENU
              </motion.span>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMobileMenu}
              className="lg:hidden flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex flex-col space-y-1.5">
                <motion.div
                  className="w-6 h-0.5 bg-white rounded-full"
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 6 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="w-6 h-0.5 bg-white rounded-full"
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="w-6 h-0.5 bg-white rounded-full"
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -6 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className="text-sm font-medium text-white tracking-wider">
                MENU
              </span>
            </motion.button>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden overflow-hidden"
              >
                <motion.div className="py-6 border-t border-white/20">
                  <nav className="flex flex-col space-y-2">
                    {navigationItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={item.to}
                          className={`px-6 py-4 text-base font-medium tracking-wide rounded-xl transition-all duration-300 block ${
                            item.active
                              ? "bg-gradient-to-r from-white to-gray-100 text-black shadow-lg"
                              : "text-white hover:bg-white/10 hover:text-yellow-400"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <motion.div className="flex items-center justify-between">
                            <span>{item.name}</span>
                            <motion.div
                              className="w-2 h-2 rounded-full bg-yellow-400"
                              initial={{ scale: 0 }}
                              animate={{ scale: item.active ? 1 : 0 }}
                              transition={{ duration: 0.3 }}
                            />
                          </motion.div>
                        </Link>
                      </motion.div>
                    ))}

                    {/* Mobile Menu - Full Navigation Button */}
                    <motion.button
                      onClick={openNavigationOverlay}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: navigationItems.length * 0.1 }}
                      whileHover={{ x: 10, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-4 text-base font-medium tracking-wide rounded-xl transition-all duration-300 text-yellow-400 hover:bg-yellow-400/10 border border-yellow-400/30"
                    >
                      <motion.div className="flex items-center justify-between">
                        <span>FULL MENU</span>
                        <motion.div
                          className="w-2 h-2 rounded-full bg-yellow-400"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        />
                      </motion.div>
                    </motion.button>
                  </nav>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Navigation Overlay */}
      <AnimatePresence>
        {isNavigationOverlayOpen && (
          <NavigationOverlay
            isOpen={isNavigationOverlayOpen}
            onClose={closeNavigationOverlay}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ElegantNavbar;
