"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const NavigationOverlay = ({ isOpen, onClose }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [heightBreakpoint, setHeightBreakpoint] = useState("medium");
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const navigate = useNavigate();

  // Custom height breakpoints
  useEffect(() => {
    const updateHeightBreakpoint = () => {
      const height = window.innerHeight;
      if (height < 500) {
        setHeightBreakpoint("xs"); // Very short - landscape mobile
      } else if (height < 600) {
        setHeightBreakpoint("sm"); // Short - portrait mobile
      } else if (height < 750) {
        setHeightBreakpoint("md"); // Medium - tablets
      } else if (height < 900) {
        setHeightBreakpoint("lg"); // Large - small laptops
      } else {
        setHeightBreakpoint("xl"); // Extra large - desktop
      }
    };

    updateHeightBreakpoint();
    window.addEventListener("resize", updateHeightBreakpoint);
    return () => window.removeEventListener("resize", updateHeightBreakpoint);
  }, []);

  // Height-based responsive values
  const getResponsiveValues = () => {
    const values = {
      xs: {
        // < 500px height
        headerHeight: "120px",
        headerMinHeight: "100px",
        headerMaxHeight: "140px",
        logoSize: "w-12 h-12",
        titleSize: "text-lg sm:text-xl",
        subtitleSize: "text-xs sm:text-sm",
        navTextSize: "text-lg sm:text-xl md:text-2xl",
        ctaTextSize: "text-lg sm:text-xl",
        spacing: "space-y-1",
        padding: "p-3",
        buttonSize: "px-4 py-2 text-sm",
        socialSize: "w-8 h-8",
        gridGap: "gap-4",
      },
      sm: {
        // 500-600px height
        headerHeight: "140px",
        headerMinHeight: "120px",
        headerMaxHeight: "160px",
        logoSize: "w-14 h-14 sm:w-16 sm:h-16",
        titleSize: "text-xl sm:text-2xl md:text-3xl",
        subtitleSize: "text-sm sm:text-base",
        navTextSize: "text-xl sm:text-2xl md:text-3xl",
        ctaTextSize: "text-xl sm:text-2xl",
        spacing: "space-y-2",
        padding: "p-4",
        buttonSize: "px-5 py-2.5 text-base",
        socialSize: "w-9 h-9",
        gridGap: "gap-5",
      },
      md: {
        // 600-750px height
        headerHeight: "180px",
        headerMinHeight: "160px",
        headerMaxHeight: "200px",
        logoSize: "w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20",
        titleSize: "text-2xl sm:text-3xl md:text-4xl",
        subtitleSize: "text-sm sm:text-base md:text-lg",
        navTextSize: "text-xl sm:text-2xl md:text-3xl lg:text-4xl",
        ctaTextSize: "text-xl sm:text-2xl md:text-3xl",
        spacing: "space-y-2 sm:space-y-3",
        padding: "p-4 sm:p-6",
        buttonSize: "px-6 py-3 text-base sm:text-lg",
        socialSize: "w-10 h-10 sm:w-11 sm:h-11",
        gridGap: "gap-6",
      },
      lg: {
        // 750-900px height
        headerHeight: "220px",
        headerMinHeight: "200px",
        headerMaxHeight: "240px",
        logoSize: "w-18 h-18 sm:w-20 sm:h-20 md:w-24 md:h-24",
        titleSize: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
        subtitleSize: "text-sm sm:text-base md:text-lg",
        navTextSize: "text-xl sm:text-2xl md:text-3xl lg:text-4xl",
        ctaTextSize: "text-xl sm:text-2xl md:text-3xl lg:text-4xl",
        spacing: "space-y-3 sm:space-y-4",
        padding: "p-6 sm:p-8",
        buttonSize: "px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg",
        socialSize: "w-10 h-10 sm:w-12 sm:h-12",
        gridGap: "gap-8",
      },
      xl: {
        // > 900px height
        headerHeight: "280px",
        headerMinHeight: "240px",
        headerMaxHeight: "320px",
        logoSize: "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28",
        titleSize: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
        subtitleSize: "text-sm sm:text-base md:text-lg",
        navTextSize: "text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl",
        ctaTextSize: "text-xl sm:text-2xl md:text-3xl lg:text-4xl",
        spacing: "space-y-3 sm:space-y-4 md:space-y-5",
        padding: "p-6 sm:p-8 md:p-10",
        buttonSize: "px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg",
        socialSize: "w-10 h-10 sm:w-12 sm:h-12",
        gridGap: "gap-10",
      },
    };
    return values[heightBreakpoint] || values.md;
  };

  const responsive = getResponsiveValues();

  useEffect(() => {
    if (isOpen) {
      setIsLoaded(true);
      initializeParticleSystem();
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

  const initializeParticleSystem = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const particles = [];

    // Responsive particle count based on screen size and height
    const getParticleCount = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const area = width * height;

      if (area < 300000) return 20; // Very small screens
      if (area < 500000) return 30; // Small screens
      if (area < 800000) return 40; // Medium screens
      if (area < 1200000) return 50; // Large screens
      return 60; // Very large screens
    };

    let particleCount = getParticleCount();

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particleCount = getParticleCount();

      // Reinitialize particles on resize
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    resizeCanvas();

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Responsive connection distance
      const connectionDistance =
        window.innerWidth < 768 ? 80 : window.innerHeight < 600 ? 100 : 150;

      // Draw connecting lines
      ctx.strokeStyle = "rgba(255, 215, 0, 0.1)";
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 0, ${particle.opacity})`;
        ctx.fill();

        // Update particle position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
      });

      animationFrameRef.current = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      url: "https://facebook.com/nivaasa",
    },
    {
      name: "Instagram",
      icon: (
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      url: "https://instagram.com/nivaasa",
    },
    {
      name: "LinkedIn",
      icon: (
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      url: "https://linkedin.com/company/nivaasa",
    },
  ];

  const handleNavClick = (item) => {
    onClose();
    navigate(item.url);
  };

  const handleCTAClick = () => {
    onClose();
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
      className="fixed inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-800 text-white z-[60] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-blue-500/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      />

      {/* Container with height-responsive layout */}
      <div
        className="relative z-10"
        style={{
          width: "100%",
          height: "100vh",
          height: "100dvh",
          maxHeight: "100vh",
          maxHeight: "100dvh",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Header - Height-responsive */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className={responsive.padding}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: responsive.headerHeight,
            minHeight: responsive.headerMinHeight,
            maxHeight: responsive.headerMaxHeight,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxSizing: "border-box",
          }}
        >
          <motion.div
            className="flex flex-col items-center text-center md:mt-20 md:ml-20 lg:mt-22 lg:ml-22"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "backOut" }}
          >
            <motion.div
              className={`flex items-center ${
                heightBreakpoint === "xs" ? "mb-1" : "mb-2"
              }`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className={`flex items-center justify-center overflow-hidden rounded-xl ${responsive.logoSize}`}
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="logo.png"
                  alt=""
                  className="object-contain w-full h-full"
                />
              </motion.div>
            </motion.div>

            <motion.div>
              <motion.h1
                className={`${
                  heightBreakpoint === "xs" ? "mb-0" : "mb-1"
                } font-bold tracking-wider text-transparent bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text ${
                  responsive.titleSize
                }`}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                NIVAASA
              </motion.h1>
              <motion.p
                className={`w-full font-light tracking-wide text-transparent bg-gradient-to-r from-amber-700 via-yellow-400 to-amber-700 bg-clip-text ${responsive.subtitleSize}`}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                Beyond Spaces, Building Legacies
              </motion.p>
            </motion.div>
          </motion.div>

          <motion.button
            onClick={onClose}
            className={`relative flex items-center justify-center text-white transition-all duration-300 border rounded-full group hover:text-amber-400 border-white/20 hover:border-amber-400/50 backdrop-blur-sm ${
              heightBreakpoint === "xs"
                ? "w-8 h-8"
                : "w-10 h-10 sm:w-12 sm:h-12"
            }`}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: "backOut" }}
          >
            <motion.div
              className="absolute inset-0 rounded-full opacity-0 bg-gradient-to-r from-amber-400/20 to-transparent group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            <svg
              className={`relative z-10 ${
                heightBreakpoint === "xs" ? "w-4 h-4" : "w-5 h-5 sm:w-6 sm:h-6"
              }`}
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
        </motion.div>

        {/* Content - Height-responsive */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 ${responsive.gridGap} ${responsive.padding}`}
          style={{
            position: "absolute",
            top: responsive.headerHeight,
            left: 0,
            right: 0,
            bottom: 0,
            minHeight: `calc(100vh - ${responsive.headerHeight})`,
            maxHeight: `calc(100vh - ${responsive.headerMinHeight})`,
            boxSizing: "border-box",
            alignItems: "center",
          }}
        >
          {/* Navigation Section */}
          <motion.div
            className="flex flex-col justify-center order-2 md:order-1"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className={`${
                heightBreakpoint === "xs"
                  ? "w-12 h-px mb-2"
                  : "w-16 h-px mb-4 sm:w-20 md:w-24 sm:mb-6"
              } bg-gradient-to-r from-amber-400 to-transparent`}
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              transition={{ delay: 1, duration: 1 }}
            />

            <nav className={responsive.spacing}>
              {navigationItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                >
                  <motion.button
                    onClick={() => handleNavClick(item)}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`relative w-full font-light text-left transition-all duration-500 group-hover:text-amber-400 ${responsive.navTextSize}`}
                    whileHover={{ x: 10, scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <motion.span
                      className="relative z-10"
                      animate={{
                        backgroundImage:
                          hoveredItem === index
                            ? "linear-gradient(45deg, #f59e0b, #fbbf24, #f59e0b)"
                            : "none",
                      }}
                      style={{
                        backgroundClip:
                          hoveredItem === index ? "text" : "initial",
                        WebkitBackgroundClip:
                          hoveredItem === index ? "text" : "initial",
                        color:
                          hoveredItem === index ? "transparent" : "inherit",
                      }}
                    >
                      {item.name}
                    </motion.span>

                    <motion.div
                      className={`absolute transform -translate-y-1/2 rounded-full top-1/2 bg-amber-400 ${
                        heightBreakpoint === "xs"
                          ? "w-1.5 h-1.5 -left-3"
                          : "w-2 h-2 -left-4 sm:-left-6 md:-left-8 sm:w-3 sm:h-3 md:w-4 md:h-4"
                      }`}
                      initial={{ scale: 0, x: -10 }}
                      animate={{
                        scale: hoveredItem === index ? 1 : 0,
                        x: hoveredItem === index ? 0 : -10,
                      }}
                      transition={{ duration: 0.3, ease: "backOut" }}
                    />
                  </motion.button>

                  <motion.div
                    className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-amber-400 to-transparent"
                    initial={{ width: 0 }}
                    animate={{ width: hoveredItem === index ? "100%" : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="flex flex-col justify-center order-1 md:order-2"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className={`${
                heightBreakpoint === "xs"
                  ? "w-12 h-px mb-2"
                  : "w-16 h-px mb-4 sm:w-20 md:w-24 sm:mb-6"
              } bg-gradient-to-r from-amber-400 to-transparent md:ml-auto`}
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              transition={{ delay: 1.2, duration: 1 }}
            />

            <div
              className={
                heightBreakpoint === "xs"
                  ? "space-y-2"
                  : "space-y-3 sm:space-y-4"
              }
            >
              <motion.h2
                className={`font-light leading-tight ${responsive.ctaTextSize}`}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <span className="text-white">Know More</span>
                <br />
                <span className="text-transparent bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text">
                  About Projects?
                </span>
              </motion.h2>

              <motion.p
                className={`max-w-lg font-light leading-relaxed text-slate-300 ${
                  heightBreakpoint === "xs"
                    ? "text-xs"
                    : "text-sm sm:text-base md:text-lg"
                }`}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                Through a unique combination of engineering, construction and
                design disciplines and expertise, we create exceptional living
                spaces.
              </motion.p>

              <motion.button
                onClick={handleCTAClick}
                className={`relative overflow-hidden font-bold tracking-wider text-black rounded-lg group bg-gradient-to-r from-amber-400 to-yellow-500 ${responsive.buttonSize}`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-400"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">LET'S BUILD</span>
              </motion.button>

              <motion.div
                className={`flex space-x-4 ${
                  heightBreakpoint === "xs"
                    ? "pt-2"
                    : "pt-3 sm:space-x-6 sm:pt-4"
                }`}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.8 }}
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative flex items-center justify-center text-white transition-all duration-300 border rounded-full group bg-white/10 backdrop-blur-sm border-white/20 hover:border-amber-400/50 ${responsive.socialSize}`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 1.8 + index * 0.1,
                      duration: 0.5,
                      ease: "backOut",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full opacity-0 bg-gradient-to-r from-amber-400/20 to-transparent group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-amber-400">
                      {social.icon}
                    </span>
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

const ElegantNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavigationOverlayOpen, setIsNavigationOverlayOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.95, 1]);
  const headerBlur = useTransform(scrollY, [0, 100], [8, 20]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handleNavClick = (path) => {
    // Close mobile menu first
    setIsMobileMenuOpen(false);
    // Navigate immediately
    navigate(path);
  };

  const handleLogoClick = () => {
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  const toggleMobileMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileBackdropClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        style={{
          backdropFilter: `blur(${isMobileMenuOpen ? 4 : headerBlur}px)`,
          opacity: headerOpacity,
        }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700 bg-black/90"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-blue-500/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled ? 1 : 0.5 }}
          transition={{ duration: 0.5 }}
        />

        <div className="container relative px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <motion.div
              className="flex items-center space-x-3 cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: "backOut" }}
              onClick={handleLogoClick}
            >
              <motion.div
                className="relative flex items-center justify-center w-10 h-10 overflow-hidden rounded-xl"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <img src="logo.png" alt="Nivaasa Logo" />
              </motion.div>

              <motion.div>
                <motion.h1
                  className="text-2xl font-bold tracking-wider text-transparent bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  NIVAASA
                </motion.h1>
                <motion.div
                  className="h-px opacity-0 bg-gradient-to-r from-transparent via-amber-400 to-transparent group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.nav
              className="items-center hidden space-x-8 lg:flex"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                >
                  <motion.button
                    onClick={() => handleNavClick(item.to)}
                    className={`relative cursor-pointer px-6 py-3 text-sm font-medium tracking-wide rounded-full transition-all duration-500 ${
                      item.active
                        ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-lg shadow-amber-400/25"
                        : "text-white hover:text-amber-400"
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {!item.active && (
                      <motion.div
                        className="absolute inset-0 rounded-full opacity-0 bg-gradient-to-r from-white/10 to-white/5"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    <span className="relative z-10">{item.name}</span>

                    {!item.active && (
                      <motion.div
                        className="absolute bottom-0 h-px transform -translate-x-1/2 left-1/2 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                </motion.div>
              ))}
            </motion.nav>

            {/* Desktop Menu Button */}
            <motion.button
              className="items-center hidden px-4 py-2 space-x-3 transition-all duration-300 border rounded-full lg:flex border-white/20 hover:border-amber-400/50 backdrop-blur-sm group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              onClick={() => setIsNavigationOverlayOpen(true)}
            >
              <motion.div
                className="absolute inset-0 rounded-full opacity-0 bg-gradient-to-r from-amber-400/10 to-transparent group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />

              <motion.div className="relative z-10 flex flex-col space-y-1">
                {[14, 18, 16].map((width, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-r from-white to-slate-300 rounded-full h-0.5"
                    style={{ width: `${width}px` }}
                    whileHover={{
                      width: "18px",
                      background: "linear-gradient(to right, #f59e0b, #fbbf24)",
                    }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  />
                ))}
              </motion.div>

              <motion.span
                className="relative z-10 text-xs font-semibold tracking-wider text-white transition-colors duration-300 group-hover:text-amber-400"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                MENU
              </motion.span>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMobileMenu}
              className="lg:hidden flex items-center space-x-3 p-3 rounded-xl border border-white/20 hover:border-amber-400/50 backdrop-blur-sm transition-all duration-300 group relative z-[60]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5, ease: "backOut" }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 bg-gradient-to-r from-amber-400/10 to-transparent rounded-xl group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />

              <div className="flex flex-col space-y-1.5 relative z-10">
                <motion.div
                  className="w-5 h-0.5 bg-white rounded-full"
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 6 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="w-5 h-0.5 bg-white rounded-full"
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="w-5 h-0.5 bg-white rounded-full"
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -6 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <span className="relative z-10 text-xs font-medium tracking-wider text-white">
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
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="lg:hidden overflow-hidden relative z-[55]"
              >
                <motion.div
                  className="py-6 border-t border-white/10 bg-black/95 backdrop-blur-md"
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <nav className="flex flex-col space-y-2">
                    {navigationItems.map((item, index) => (
                      <motion.button
                        key={item.name}
                        onClick={() => handleNavClick(item.to)}
                        className={`px-6 py-4 text-base font-medium tracking-wide rounded-xl transition-all duration-300 text-left ${
                          item.active
                            ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-lg"
                            : "text-white hover:bg-white/10 hover:text-amber-400"
                        }`}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        whileHover={{ x: 10, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between">
                          <span>{item.name}</span>
                          <motion.div
                            className="w-2 h-2 rounded-full bg-amber-400"
                            initial={{ scale: 0 }}
                            animate={{ scale: item.active ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </motion.button>
                    ))}

                    <motion.button
                      onClick={() => {
                        setIsNavigationOverlayOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        delay: navigationItems.length * 0.1,
                        duration: 0.4,
                      }}
                      whileHover={{ x: 10, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-4 text-base font-medium tracking-wide transition-all duration-300 border rounded-xl text-amber-400 hover:bg-amber-400/10 border-amber-400/30"
                    >
                      <div className="flex items-center justify-between">
                        <span>FULL MENU</span>
                        <motion.div
                          className="w-2 h-2 rounded-full bg-amber-400"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        />
                      </div>
                    </motion.button>
                  </nav>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleMobileBackdropClick}
          />
        )}
      </AnimatePresence>

      {/* Navigation Overlay */}
      <AnimatePresence>
        {isNavigationOverlayOpen && (
          <NavigationOverlay
            isOpen={isNavigationOverlayOpen}
            onClose={() => setIsNavigationOverlayOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ElegantNavbar;
