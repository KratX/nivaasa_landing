"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
  useAnimation,
  AnimatePresence,
} from "framer-motion";

/**
 * Ultra-Advanced Architectural Development Presentation Component
 * Features cutting-edge Framer Motion animations, 3D effects, and interactive elements
 */

const Para2 = () => {
  // State management for animations and interactions
  const [isLoaded, setIsLoaded] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    residential: 0,
    retail: 0,
    acres: 0,
  });
  const [hoveredStat, setHoveredStat] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const controls = useAnimation();

  // Advanced scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Mouse tracking for 3D effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMouseX = useSpring(mouseX, { stiffness: 150, damping: 30 });
  const springMouseY = useSpring(mouseY, { stiffness: 150, damping: 30 });

  // Parallax transformations
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.3, 0.6, 0.9]
  );

  // 3D transformations for image
  const rotateX = useTransform(springMouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(springMouseX, [-300, 300], [-15, 15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1]);

  // Advanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      rotateX: -45,
      filter: "blur(20px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 1.5,
      },
    },
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      y: 50,
      filter: "blur(15px)",
    },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
        delay: i * 0.3,
        duration: 1.2,
      },
    }),
  };

  const statVariants = {
    hidden: {
      opacity: 0,
      x: -100,
      scale: 0.8,
      rotateY: -90,
    },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: i * 0.2 + 0.8,
        duration: 1,
      },
    }),
    hover: {
      scale: 1.05,
      x: 10,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      boxShadow: "0 20px 40px rgba(250, 204, 21, 0.2)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.6,
      rotateY: 45,
      filter: "blur(20px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        delay: 1.2,
        duration: 2,
      },
    },
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 1.8,
      },
    },
  };

  // Mouse movement handler for 3D effects
  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const x = e.clientX - rect.left - centerX;
      const y = e.clientY - rect.top - centerY;

      mouseX.set(x);
      mouseY.set(y);
      setMousePosition({ x, y });
    }
  };

  // Advanced statistics animation
  useEffect(() => {
    if (!isInView) return;

    setIsLoaded(true);

    const animateStats = () => {
      const duration = 3000;
      const steps = 120;
      const stepDuration = duration / steps;

      const targets = {
        residential: 6,
        retail: 2,
        acres: 300,
      };

      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        // Advanced easing function
        const easeOutElastic = (t) => {
          const c4 = (2 * Math.PI) / 3;
          return t === 0
            ? 0
            : t === 1
            ? 1
            : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
        };

        const easedProgress = easeOutElastic(progress);

        setAnimatedStats({
          residential: Math.round(targets.residential * easedProgress),
          retail: Math.round(targets.retail * easedProgress),
          acres: Math.round(targets.acres * easedProgress),
        });

        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);
    };

    setTimeout(animateStats, 800);
  }, [isInView]);

  // Advanced canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId;

    const drawAdvancedPattern = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001;
      const mouseInfluence = {
        x: mousePosition.x * 0.01,
        y: mousePosition.y * 0.01,
      };

      // Dynamic grid with mouse interaction
      ctx.strokeStyle = `rgba(250, 204, 21, ${0.1 + Math.sin(time) * 0.05})`;
      ctx.lineWidth = 1;

      for (let i = 0; i < canvas.width; i += 80) {
        for (let j = 0; j < canvas.height; j += 80) {
          const distanceFromMouse = Math.sqrt(
            Math.pow(i - canvas.width / 2 - mousePosition.x, 2) +
              Math.pow(j - canvas.height / 2 - mousePosition.y, 2)
          );

          const influence = Math.max(0, 1 - distanceFromMouse / 300);
          const offset =
            Math.sin(time + i * 0.01 + j * 0.01) * (20 + influence * 30);
          const opacity = 0.1 + influence * 0.3;

          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.moveTo(i, j);
          ctx.lineTo(
            i + 40 + offset + mouseInfluence.x,
            j + 40 + offset + mouseInfluence.y
          );
          ctx.stroke();

          // Add pulsing dots
          if (influence > 0.3) {
            ctx.fillStyle = `rgba(250, 204, 21, ${influence * 0.5})`;
            ctx.beginPath();
            ctx.arc(i, j, 2 + influence * 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Flowing lines
      ctx.globalAlpha = 0.2;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 2;

      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2 + Math.sin(time + i) * 100);

        for (let x = 0; x < canvas.width; x += 10) {
          const y =
            canvas.height / 2 +
            Math.sin(time + x * 0.01 + i) * 50 +
            Math.sin(time * 2 + x * 0.005) * 30 +
            mouseInfluence.y * 20;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animationId = requestAnimationFrame(drawAdvancedPattern);
    };

    drawAdvancedPattern();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [mousePosition]);

  // Statistics data with enhanced configuration
  const statisticsData = [
    {
      id: "residential",
      icon: (
        <motion.svg
          className="w-8 h-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          animate={{
            rotate: hoveredStat === "residential" ? 360 : 0,
            scale: hoveredStat === "residential" ? 1.2 : 1,
          }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9,22 9,12 15,12 15,22" />
        </motion.svg>
      ),
      value: animatedStats.residential,
      label: "Mn. Sq. Ft.",
      description: "of Residential",
      color: "text-yellow-400",
    },
    {
      id: "retail",
      icon: (
        <motion.svg
          className="w-8 h-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          animate={{
            rotate: hoveredStat === "retail" ? 360 : 0,
            scale: hoveredStat === "retail" ? 1.2 : 1,
          }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27,6.96 12,12.01 20.73,6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </motion.svg>
      ),
      value: animatedStats.retail,
      label: "Mn. Sq. Ft.",
      description: "of Retail & Office",
      color: "text-yellow-400",
    },
    {
      id: "acres",
      icon: (
        <motion.svg
          className="w-8 h-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          animate={{
            rotate: hoveredStat === "acres" ? 360 : 0,
            scale: hoveredStat === "acres" ? 1.2 : 1,
          }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </motion.svg>
      ),
      value: animatedStats.acres,
      label: "acres",
      description: "plotted",
      color: "text-yellow-400",
    },
  ];

  const getStatStyle = (index) => {
    const x = useTransform(springMouseX, [-300, 300], [index * -2, index * 2]);
    const rotateY = useTransform(springMouseX, [-300, 300], [2, -2]);
    return {
      x: x,
      rotateY: rotateY,
    };
  };

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen bg-[url(/para-2.png)] bg-cover text-white overflow-hidden relative"
      onMouseMove={handleMouseMove}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{
        backgroundPositionY: backgroundY,
      }}
    >
      {/* Advanced Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Dynamic Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/80"
        style={{
          opacity: overlayOpacity,
        }}
      />

      {/* Main Content Container */}
      <motion.div
        className="relative z-10 min-h-screen flex items-center"
        style={{ y: contentY }}
      >
        <div className="container mx-auto px-4 py-8 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content Section */}
            <motion.div className="space-y-8">
              {/* Header Section */}
              <motion.div
                className="space-y-4"
                variants={headerVariants}
                style={{
                  x: useTransform(springMouseX, [-300, 300], [-10, 10]),
                }}
              >
                <motion.h2
                  className="text-lg lg:text-xl font-safira font-light tracking-wide text-gray-300"
                  whileHover={{
                    color: "#ffffff",
                    textShadow: "0 0 10px rgba(255,255,255,0.5)",
                    transition: { duration: 0.3 },
                  }}
                >
                  Next 5 year Plan
                </motion.h2>
                <motion.h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl space-x-2 font-light leading-tight">
                  <motion.span
                    className="text-yellow-400 font-normal font-allenoire inline-block"
                    variants={titleVariants}
                    custom={0}
                    whileHover={{
                      scale: 1.05,
                      textShadow: "0 0 20px rgba(250, 204, 21, 0.8)",
                      transition: { duration: 0.3 },
                    }}
                  >
                    Looking
                  </motion.span>
                  <motion.span
                    className="text-white font-allenoire inline-block"
                    variants={titleVariants}
                    custom={1}
                    whileHover={{
                      scale: 1.05,
                      textShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
                      transition: { duration: 0.3 },
                    }}
                  >
                    Forward
                  </motion.span>
                </motion.h1>
              </motion.div>

              {/* Description */}
              <motion.div
                className="max-w-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ delay: 0.6, duration: 1 }}
                style={{
                  x: useTransform(springMouseX, [-300, 300], [-5, 5]),
                }}
              >
                <motion.p
                  className="text-base lg:text-lg leading-relaxed text-gray-300 font-light"
                  whileHover={{
                    color: "#ffffff",
                    transition: { duration: 0.3 },
                  }}
                >
                  The journey continues with visionary spaces on the horizon.
                  Get ready to experience Nivaasa Axis, Retreat, and Serene —
                  where the future of refined living unfolds.
                </motion.p>
              </motion.div>

              {/* Advanced Statistics Section */}
              <div className="space-y-1 pt-8">
                <AnimatePresence>
                  {statisticsData.map((stat, index) => (
                    <motion.div
                      key={stat.id}
                      className="flex items-center space-x-6 p-4 rounded-lg cursor-pointer relative overflow-hidden"
                      variants={statVariants}
                      custom={index}
                      whileHover="hover"
                      onHoverStart={() => setHoveredStat(stat.id)}
                      onHoverEnd={() => setHoveredStat(null)}
                      style={getStatStyle(index)}
                    >
                      {/* Animated Background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: hoveredStat === stat.id ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ originX: 0 }}
                      />

                      {/* Icon */}
                      <motion.div
                        className={`${stat.color} transition-colors duration-300 relative z-10`}
                        animate={{
                          filter:
                            hoveredStat === stat.id
                              ? "drop-shadow(0 0 10px rgba(250, 204, 21, 0.8))"
                              : "none",
                        }}
                      >
                        {stat.icon}
                      </motion.div>

                      {/* Statistics Content */}
                      <div className="flex-1 relative z-10">
                        <div className="flex items-baseline space-x-2">
                          <motion.span
                            className={`text-4xl lg:text-5xl font-light ${stat.color} transition-colors duration-300`}
                            animate={{
                              scale: hoveredStat === stat.id ? 1.1 : 1,
                              textShadow:
                                hoveredStat === stat.id
                                  ? "0 0 15px rgba(250, 204, 21, 0.6)"
                                  : "none",
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                            }}
                          >
                            {stat.value}
                          </motion.span>
                          <span className="text-lg lg:text-xl text-gray-300 font-light">
                            {stat.label}
                          </span>
                        </div>
                        <p className="text-sm lg:text-base text-gray-400 mt-1">
                          {stat.description}
                        </p>
                      </div>

                      {/* Advanced Hover Indicator */}
                      <motion.div
                        className="w-2 h-8 bg-yellow-400 rounded-full relative z-10"
                        initial={{ opacity: 0, scale: 0.5, x: 20 }}
                        animate={{
                          opacity: hoveredStat === stat.id ? 1 : 0,
                          scale: hoveredStat === stat.id ? 1 : 0.5,
                          x: hoveredStat === stat.id ? 0 : 20,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      />

                      {/* Particle Effect */}
                      {hoveredStat === stat.id && (
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                              initial={{
                                x: Math.random() * 100,
                                y: Math.random() * 50,
                                opacity: 0,
                              }}
                              animate={{
                                x: Math.random() * 200,
                                y: Math.random() * 100,
                                opacity: [0, 1, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: i * 0.2,
                              }}
                            />
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Advanced Call to Action */}
              <motion.div className="pt-8" variants={buttonVariants}>
                <button className="group relative px-8 py-4 border border-yellow-400/50 rounded-sm hover:border-yellow-400 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10 text-sm lg:text-base tracking-wide font-light group-hover:text-black transition-colors duration-300">
                    Explore Development Plans
                  </span>
                  <div className="absolute inset-0 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
              </motion.div>
            </motion.div>

            {/* Right Architectural Wireframe Section */}
            <motion.div
              className="relative"
              variants={imageVariants}
              style={{
                y: imageY,
                rotateX: rotateX,
                rotateY: rotateY,
                scale: scale,
              }}
            >
              {/* Advanced 3D Container */}
              <motion.div
                className="bg-transparent relative p-8 lg:p-12"
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
              >
                <motion.div
                  className="aspect-square bg-transparent lg:aspect-[4/3] relative"
                  whileHover={{
                    rotateX: 5,
                    rotateY: 5,
                    scale: 1.02,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <motion.img
                    ref={imageRef}
                    src="test.png"
                    alt="Detailed architectural wireframe showing modern building complex"
                    className="w-full h-full object-contain"
                    style={{
                      filter: useTransform(
                        scrollYProgress,
                        [0, 0.5, 1],
                        [
                          "blur(5px) brightness(0.8)",
                          "blur(0px) brightness(1)",
                          "blur(2px) brightness(1.1)",
                        ]
                      ),
                    }}
                    animate={{
                      filter: hoveredStat
                        ? "brightness(1.2) contrast(1.1)"
                        : "brightness(1) contrast(1)",
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Advanced Holographic Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-blue-400/20 opacity-0"
                    animate={{
                      opacity: hoveredStat ? 0.3 : 0,
                      background: [
                        "linear-gradient(45deg, rgba(250, 204, 21, 0.2), transparent, rgba(59, 130, 246, 0.2))",
                        "linear-gradient(135deg, rgba(59, 130, 246, 0.2), transparent, rgba(250, 204, 21, 0.2))",
                        "linear-gradient(45deg, rgba(250, 204, 21, 0.2), transparent, rgba(59, 130, 246, 0.2))",
                      ],
                    }}
                    transition={{
                      opacity: { duration: 0.3 },
                      background: {
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                      },
                    }}
                  />
                </motion.div>

                {/* Enhanced Technical Details Overlay */}
                <motion.div
                  className="absolute top-4 right-4 bg-black/90 backdrop-blur-md rounded-lg p-4 border border-yellow-400/30"
                  initial={{ opacity: 0, scale: 0.8, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  whileHover={{
                    scale: 1.05,
                    borderColor: "rgba(250, 204, 21, 0.6)",
                    boxShadow: "0 10px 30px rgba(250, 204, 21, 0.2)",
                  }}
                >
                  <div className="text-xs text-gray-400 space-y-1">
                    <motion.div
                      animate={{ color: hoveredStat ? "#ffffff" : "#9ca3af" }}
                      transition={{ duration: 0.3 }}
                    >
                      Scale: 1:500
                    </motion.div>
                    <motion.div
                      animate={{ color: hoveredStat ? "#ffffff" : "#9ca3af" }}
                      transition={{ duration: 0.3 }}
                    >
                      Total Area: 308 acres
                    </motion.div>
                    <motion.div
                      animate={{ color: hoveredStat ? "#ffffff" : "#9ca3af" }}
                      transition={{ duration: 0.3 }}
                    >
                      Phases: 3
                    </motion.div>
                  </div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -left-4 w-8 h-8 border-2 border-yellow-400/50 rounded-full"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    rotate: {
                      duration: 10,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    },
                    scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                  }}
                />
                <motion.div
                  className="absolute -bottom-4 -right-4 w-6 h-6 bg-yellow-400/30 rounded-full"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Advanced Decorative Elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]),
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 0.7 }}
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]),
        }}
      />

      {/* Enhanced Corner Decorations */}
      {[
        { position: "top-8 left-8", borders: "border-l-2 border-t-2" },
        { position: "top-8 right-8", borders: "border-r-2 border-t-2" },
        { position: "bottom-8 left-8", borders: "border-l-2 border-b-2" },
        { position: "bottom-8 right-8", borders: "border-r-2 border-b-2" },
      ].map((corner, index) => (
        <motion.div
          key={index}
          className={`absolute ${corner.position} w-16 h-16 ${corner.borders} border-yellow-400/30`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2 + index * 0.1, duration: 0.8 }}
          whileHover={{
            borderColor: "rgba(250, 204, 21, 0.8)",
            scale: 1.1,
            boxShadow: "0 0 20px rgba(250, 204, 21, 0.3)",
          }}
        />
      ))}
    </motion.div>
  );
};

export default Para2;
