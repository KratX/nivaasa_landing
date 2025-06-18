"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
} from "framer-motion";

/**
 * Enhanced architectural website component with advanced animations
 * Features sophisticated Framer Motion animations, parallax effects, and interactive elements
 */
export default function Para1() {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Mouse tracking for parallax effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMouseX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springMouseY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  // Parallax transformations
  const leftImageY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rightImageY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  // Text animation variants
  const headerVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      filter: "blur(10px)",
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: i * 0.2 + 0.5,
      },
    }),
  };

  const descriptionVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 1.2,
      },
    },
  };

  const taglineVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 1.5,
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 50,
    },
    visible: (delay) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: delay,
      },
    }),
    hover: {
      scale: 1.05,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
      borderColor: "rgba(255, 255, 255, 0.4)",
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const decorativeLineVariants = {
    hidden: {
      scaleX: 0,
      opacity: 0,
    },
    visible: (delay) => ({
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        delay: delay,
      },
    }),
  };

  // Handle mouse movement for parallax effect
  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      mouseX.set((e.clientX - rect.left - centerX) / 30);
      mouseY.set((e.clientY - rect.top - centerY) / 30);
    }
  };

  // Animation effect on component mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen bg-black text-white overflow-hidden pt-10"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        backgroundPositionY: backgroundY,
      }}
    >
      {/* Main Container with responsive grid layout */}
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-h-screen items-center">
          {/* Left Architectural Image */}
          <motion.div
            className="lg:col-span-3"
            variants={imageVariants}
            custom={0.3}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover="hover"
            style={{ y: leftImageY }}
          >
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="border-2 border-white/20 rounded-lg overflow-hidden"
                animate={{
                  borderColor: isInView
                    ? "rgba(255, 255, 255, 0.2)"
                    : "rgba(255, 255, 255, 0)",
                }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{
                  x: useTransform(springMouseX, [-50, 50], [5, -5]),
                  y: useTransform(springMouseY, [-50, 50], [5, -5]),
                  rotateY: useTransform(springMouseX, [-50, 50], [2, -2]),
                  rotateX: useTransform(springMouseY, [-50, 50], [-2, 2]),
                }}
              >
                <div className="aspect-[3/4] relative">
                  <motion.img
                    src="grey-1.jpg"
                    alt="Modern architectural perspective showing geometric building structures"
                    className="object-cover h-full w-full"
                    initial={{ scale: 1.2, filter: "blur(5px)" }}
                    animate={{
                      scale: 1,
                      filter: "blur(0px)",
                    }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    style={{
                      x: useTransform(springMouseX, [-50, 50], [-10, 10]),
                      y: useTransform(springMouseY, [-50, 50], [-10, 10]),
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    whileHover={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>

              {/* Image glow effect */}
              <motion.div
                className="absolute -inset-1 rounded-lg bg-gradient-to-r from-yellow-400/10 via-white/5 to-yellow-400/10 opacity-0 group-hover:opacity-100 blur-xl"
                animate={{
                  background: [
                    "linear-gradient(to right, rgba(250, 204, 21, 0.1), rgba(255, 255, 255, 0.05), rgba(250, 204, 21, 0.1))",
                    "linear-gradient(to right, rgba(255, 255, 255, 0.05), rgba(250, 204, 21, 0.1), rgba(255, 255, 255, 0.05))",
                    "linear-gradient(to right, rgba(250, 204, 21, 0.1), rgba(255, 255, 255, 0.05), rgba(250, 204, 21, 0.1))",
                  ],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Central Content Area */}
          <motion.div
            className="lg:col-span-6 text-center px-4 lg:px-8"
            style={{
              y: contentY,
              x: useTransform(springMouseX, [-50, 50], [-5, 5]),
            }}
          >
            {/* Header Text */}
            <motion.div
              className="mb-8 lg:mb-12"
              variants={headerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.h2
                className="text-sm lg:text-base font-light tracking-[0.2em] uppercase mb-2 text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{
                  color: "#ffffff",
                  textShadow: "0 0 8px rgba(255,255,255,0.5)",
                  transition: { duration: 0.3 },
                }}
              >
                Legacy Rooted in Vision
              </motion.h2>
              <motion.h3
                className="text-sm lg:text-base font-light tracking-[0.2em] uppercase text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{
                  color: "#ffffff",
                  textShadow: "0 0 8px rgba(255,255,255,0.5)",
                  transition: { duration: 0.3 },
                }}
              >
                Future Built on Excellence
              </motion.h3>
            </motion.div>

            {/* Main Heading */}
            <div className="mb-8 lg:mb-12">
              <motion.h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight">
                <motion.span
                  className="block mb-2"
                  variants={titleVariants}
                  custom={0}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                >
                  Crafting
                </motion.span>
                <motion.span
                  className="block text-yellow-400 font-normal mb-2"
                  variants={titleVariants}
                  custom={1}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover={{
                    scale: 1.02,
                    textShadow: "0 0 15px rgba(250, 204, 21, 0.5)",
                    transition: { duration: 0.3 },
                  }}
                >
                  Tomorrow's
                </motion.span>
                <motion.span
                  className="block"
                  variants={titleVariants}
                  custom={2}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                >
                  Landmark Today
                </motion.span>
              </motion.h1>
            </div>

            {/* Description Text */}
            <motion.div
              className="mb-8 lg:mb-12 max-w-2xl mx-auto"
              variants={descriptionVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.p
                className="text-sm lg:text-base leading-relaxed text-gray-300 font-light"
                whileHover={{
                  color: "#ffffff",
                  transition: { duration: 0.3 },
                }}
                style={{
                  textShadow: useTransform(
                    scrollYProgress,
                    [0, 0.5, 1],
                    [
                      "0 0 0px rgba(255,255,255,0)",
                      "0 0 5px rgba(255,255,255,0.2)",
                      "0 0 0px rgba(255,255,255,0)",
                    ]
                  ),
                }}
              >
                At Nivaasa, we don't just build spaces — we shape legacy-driven
                lifestyles. As a leading name in Gurugram's luxury real estate
                landscape, Nivaasa stands apart through its commitment to
                architectural brilliance, timeless design, and sustainable
                innovation. Each of our developments is a collaboration with
                renowned architects and global consultants, resulting in bespoke
                residences and landmark commercial spaces that redefine urban
                living. With transparency, integrity, and purpose at the heart
                of everything we do, Nivaasa is more than a builder — it is the
                curator of India's future cities.
              </motion.p>
            </motion.div>

            {/* Tagline */}
            <motion.div
              className="relative"
              variants={taglineVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.p
                className="text-base lg:text-lg font-light tracking-wide text-gray-200"
                whileHover={{
                  scale: 1.05,
                  color: "#ffffff",
                  textShadow: "0 0 8px rgba(255,255,255,0.5)",
                  transition: { duration: 0.3 },
                }}
              >
                Beyond Spaces. Building Legacies.
              </motion.p>
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-yellow-400"
                variants={decorativeLineVariants}
                custom={1.8}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover={{
                  scaleX: 1.5,
                  opacity: 0.8,
                  boxShadow: "0 0 10px rgba(250, 204, 21, 0.7)",
                  transition: { duration: 0.3 },
                }}
              />
            </motion.div>
          </motion.div>

          {/* Right Architectural Image */}
          <motion.div
            className="lg:col-span-3"
            variants={imageVariants}
            custom={0.6}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover="hover"
            style={{ y: rightImageY }}
          >
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="border-2 border-white/20 rounded-lg overflow-hidden"
                animate={{
                  borderColor: isInView
                    ? "rgba(255, 255, 255, 0.2)"
                    : "rgba(255, 255, 255, 0)",
                }}
                transition={{ duration: 1, delay: 0.7 }}
                style={{
                  x: useTransform(springMouseX, [-50, 50], [-5, 5]),
                  y: useTransform(springMouseY, [-50, 50], [-5, 5]),
                  rotateY: useTransform(springMouseX, [-50, 50], [-2, 2]),
                  rotateX: useTransform(springMouseY, [-50, 50], [2, -2]),
                }}
              >
                <div className="aspect-[3/4] relative">
                  <motion.img
                    src="grey-2.jpg"
                    alt="Contemporary skyscraper architecture with dramatic upward perspective"
                    className="object-cover h-full w-full object-center"
                    initial={{ scale: 1.2, filter: "blur(5px)" }}
                    animate={{
                      scale: 1,
                      filter: "blur(0px)",
                    }}
                    transition={{ duration: 1.5, delay: 0.6 }}
                    style={{
                      x: useTransform(springMouseX, [-50, 50], [10, -10]),
                      y: useTransform(springMouseY, [-50, 50], [10, -10]),
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    whileHover={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>

              {/* Image glow effect */}
              <motion.div
                className="absolute -inset-1 rounded-lg bg-gradient-to-r from-yellow-400/10 via-white/5 to-yellow-400/10 opacity-0 group-hover:opacity-100 blur-xl"
                animate={{
                  background: [
                    "linear-gradient(to right, rgba(250, 204, 21, 0.1), rgba(255, 255, 255, 0.05), rgba(250, 204, 21, 0.1))",
                    "linear-gradient(to right, rgba(255, 255, 255, 0.05), rgba(250, 204, 21, 0.1), rgba(255, 255, 255, 0.05))",
                    "linear-gradient(to right, rgba(250, 204, 21, 0.1), rgba(255, 255, 255, 0.05), rgba(250, 204, 21, 0.1))",
                  ],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          style={{
            scaleX: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]),
            opacity: useTransform(
              scrollYProgress,
              [0, 0.5, 1],
              [0.3, 0.5, 0.3]
            ),
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          style={{
            scaleX: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]),
            opacity: useTransform(
              scrollYProgress,
              [0, 0.5, 1],
              [0.3, 0.5, 0.3]
            ),
          }}
        />
      </div>

      {/* Background Pattern Overlay with Animation */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          x: useTransform(springMouseX, [-50, 50], [-10, 10]),
          y: useTransform(springMouseY, [-50, 50], [-10, 10]),
        }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 50%)",
          }}
        />

        {/* Additional subtle animated patterns */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 30% 30%, rgba(250, 204, 21, 0.01) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 70%, rgba(250, 204, 21, 0.01) 0%, transparent 50%)",
              "radial-gradient(circle at 30% 30%, rgba(250, 204, 21, 0.01) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
