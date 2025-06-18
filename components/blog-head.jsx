"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Call-to-Action Button Component with Framer Motion
 */
const CTAButton = ({
  children,
  variant = "primary",
  onClick,
  className = "",
}) => {
  return (
    <motion.button
      className={`
        px-8 py-4 font-semibold text-lg rounded-lg relative overflow-hidden
        ${
          variant === "primary"
            ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg"
            : "border-2 border-yellow-400 text-yellow-400 bg-transparent"
        }
        ${className}
      `}
      onClick={onClick}
      whileHover={{
        scale: 1.05,
        boxShadow:
          variant === "primary"
            ? "0 20px 40px rgba(255, 193, 7, 0.3)"
            : "0 10px 30px rgba(255, 193, 7, 0.2)",
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 opacity-0"
        whileHover={{ opacity: variant === "secondary" ? 0.1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

/**
 * Enhanced Animated Text Component with Framer Motion
 */
const AnimatedText = ({ texts, className = "" }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentText.length) {
            setDisplayText(currentText.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex, texts]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
        className="text-yellow-400"
      >
        |
      </motion.span>
    </motion.span>
  );
};

/**
 * Enhanced Feature Card with Framer Motion
 */
const FeatureCard = ({ icon, title, description, index }) => (
  <motion.div
    className="relative bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-yellow-400/20 overflow-hidden group"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    whileHover={{
      scale: 1.05,
      borderColor: "rgba(255, 193, 7, 0.5)",
    }}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100"
      transition={{ duration: 0.3 }}
    />

    <motion.div
      className="text-yellow-400 mb-4 flex justify-center relative z-10"
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.6 }}
    >
      {icon}
    </motion.div>

    <motion.h3
      className="text-white text-xl font-semibold mb-2 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {title}
    </motion.h3>

    <motion.p
      className="text-gray-300 text-sm relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      {description}
    </motion.p>
  </motion.div>
);

/**
 * Floating Particles Background
 */
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-1 h-1 bg-yellow-400/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

/**
 * Main BlogHead Component with Enhanced Animations
 */
const BlogHead = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
        </svg>
      ),
      title: "Premium Security",
      description: "State-of-the-art security systems for your peace of mind",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      title: "Luxury Living",
      description: "Exceptional amenities and world-class finishes",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      ),
      title: "Prime Location",
      description: "Strategically located in the heart of the city",
    },
  ];

  const dynamicTexts = [
    "LEGACY BEGINS",
    "DREAMS COME TRUE",
    "LUXURY MEETS COMFORT",
    "MEMORIES ARE MADE",
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/blog-head.jpg')`,
          }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
      </motion.div>

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="container mx-auto px-4 text-center">
          {/* Main Heading with Staggered Animation */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-6xl pt-10 font-bold text-white mb-6 leading-tight">
              <motion.span
                className="block mb-2"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                NIVAASA IS NOT JUST
              </motion.span>

              <motion.span
                className="block mb-2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                WHERE YOU LIVE
              </motion.span>

              <motion.span
                className="block text-yellow-400 mb-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                IT'S WHERE YOUR
              </motion.span>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <AnimatedText
                  texts={dynamicTexts}
                  className="block text-yellow-400 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent"
                />
              </motion.div>
            </motion.h1>
          </motion.div>

          {/* Subtitle with Fade In */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Experience unparalleled luxury and sophistication in our premium
              residential properties. Where every detail is crafted to
              perfection.
            </p>
          </motion.div>

          {/* Call-to-Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <CTAButton onClick={() => console.log("Explore Properties")}>
              Explore Properties
            </CTAButton>
            <CTAButton
              variant="secondary"
              onClick={() => console.log("Schedule Tour")}
            >
              Schedule a Tour
            </CTAButton>
          </motion.div>

          {/* Feature Cards with Staggered Animation */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <motion.svg
          className="w-6 h-6 text-yellow-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          whileHover={{ scale: 1.2 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </motion.svg>
      </motion.div>

      {/* Enhanced Decorative Elements */}
      <motion.div
        className="absolute top-1/4 left-4 w-1 h-32 bg-gradient-to-b from-yellow-400/50 to-transparent rounded-full"
        initial={{ height: 0 }}
        animate={{ height: 128 }}
        transition={{ duration: 1.5, delay: 2 }}
      />

      <motion.div
        className="absolute top-1/3 right-4 w-1 h-24 bg-gradient-to-b from-yellow-400/50 to-transparent rounded-full"
        initial={{ height: 0 }}
        animate={{ height: 96 }}
        transition={{ duration: 1.5, delay: 2.2 }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-yellow-400/50 to-transparent rounded-full"
        initial={{ width: 0 }}
        animate={{ width: 128 }}
        transition={{ duration: 1.5, delay: 2.4 }}
      />

      {/* Golden Accent Lines */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 1.8 }}
      />

      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 2 }}
      />
    </div>
  );
};

export default BlogHead;
