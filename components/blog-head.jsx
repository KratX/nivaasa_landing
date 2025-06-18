"use client";

import { useState, useEffect } from "react";

/**
 * Call-to-Action Button Component
 * Reusable button with hover effects
 */
const CTAButton = ({
  children,
  variant = "primary",
  onClick,
  className = "",
}) => {
  const baseClasses =
    "px-8 py-4 font-semibold text-lg transition-all duration-300 transform hover:scale-105";
  const variants = {
    primary:
      "bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg shadow-lg hover:shadow-xl",
    secondary:
      "border-2 border-white text-white hover:bg-white hover:text-black rounded-lg",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

/**
 * Animated Text Component
 * Creates typewriter effect for dynamic content
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
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

/**
 * Feature Card Component
 * Displays key features with icons
 */
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
    <div className="text-yellow-400 mb-4 flex justify-center">{icon}</div>
    <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-300 text-sm">{description}</p>
  </div>
);

/**
 * Main Hero Section Component
 * Replicates the luxury real estate hero section
 */
const BlogHead = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Handle component mount animation
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
    "WHERE YOUR LEGACY BEGINS",
    "WHERE DREAMS COME TRUE",
    "WHERE LUXURY MEETS COMFORT",
    "WHERE MEMORIES ARE MADE",
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('blog-head.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen pt-0">
        <div className="container mx-auto px-4 text-center">
          {/* Main Heading */}
          <div
            className={`transform transition-all duration-1000 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="block mb-2">NIVAASA IS NOT JUST</span>
              <span className="block mb-2">WHERE YOU LIVE</span>
              <span className="block text-yellow-400">IT'S WHERE YOUR</span>
              <AnimatedText
                texts={dynamicTexts}
                className="block text-yellow-400"
              />
            </h1>
          </div>

          {/* Subtitle */}
          <div
            className={`transform transition-all duration-1000 delay-300 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Experience unparalleled luxury and sophistication in our premium
              residential properties. Where every detail is crafted to
              perfection.
            </p>
          </div>

          {/* Call-to-Action Buttons */}
          <div
            className={`transform transition-all duration-1000 delay-500 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <CTAButton onClick={() => console.log("Explore Properties")}>
                Explore Properties
              </CTAButton>
              <CTAButton
                variant="secondary"
                onClick={() => console.log("Schedule Tour")}
              >
                Schedule a Tour
              </CTAButton>
            </div>
          </div>

          {/* Feature Cards */}
          <div
            className={`transform transition-all duration-1000 delay-700 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-4 w-1 h-32 bg-gradient-to-b from-yellow-400/30 to-transparent" />
      <div className="absolute top-1/3 right-4 w-1 h-24 bg-gradient-to-b from-yellow-400/30 to-transparent" />
      <div className="absolute bottom-1/4 left-1/2 w-32 h-1 bg-gradient-to-r from-yellow-400/30 to-transparent" />
    </div>
  );
};

export default BlogHead;
