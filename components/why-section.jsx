"use client";

import { useState, useEffect } from "react";

/**
 * Why Nivaasa Section Component
 * Features sophisticated design with golden typography, architectural wireframe background,
 * and four key value propositions with icons and descriptions
 */
const WhyNivaasaSection = () => {
  // State management for animations and interactions
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [activeFeature, setActiveFeature] = useState(null);

  // Initialize component with staggered animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  /**
   * Feature data configuration matching the provided design
   */
  const features = [
    {
      id: "legacy",
      title: "Legacy-Focused Living",
      description:
        "We craft more than homes—we build spaces that carry meaning, value, and legacy.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7V9C15 9.55 14.55 10 14 10S13 9.55 13 9V7H11V9C11 9.55 10.45 10 10 10S9 9.55 9 9V7H3V9C3 10.1 3.9 11 5 11V20C5 21.1 5.9 22 7 22H9C10.1 22 11 21.1 11 20V16H13V20C13 21.1 13.9 22 15 22H17C18.1 22 19 21.1 19 20V11C20.1 11 21 10.1 21 9Z" />
        </svg>
      ),
      delay: 0,
    },
    {
      id: "smart",
      title: "Smart Urban Living",
      description:
        "Integration of modern amenities, green technology, and wellness-centric planning.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7V10C2 16 6 20.9 12 22C18 20.9 22 16 22 10V7L12 2ZM12 4.3L20 8.2V10C20 15.5 16.4 19.9 12 20.9C7.6 19.9 4 15.5 4 10V8.2L12 4.3ZM7 14L12 9L17 14H14V18H10V14H7Z" />
        </svg>
      ),
      delay: 200,
    },
    {
      id: "luxury",
      title: "Luxury with Purpose",
      description:
        "Thoughtfully designed residences that blend elegance, comfort, and functionality.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 2L3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6L18 2H6ZM6.5 4H17.5L19.5 6.5V20H4.5V6.5L6.5 4ZM12 6L8 10H11V16H13V10H16L12 6Z" />
        </svg>
      ),
      delay: 400,
    },
    {
      id: "tailored",
      title: "Tailored Experiences",
      description:
        "Flexible investment plans and personalized lifestyle options for discerning buyers.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM9 7H15L13.5 7.5C13.1 7.7 12.6 8 12.3 8.3L15 11H13L11.2 9.2C10.9 8.9 10.4 8.9 10.1 9.2L8.3 11H6.5L9.2 8.3C8.9 8 8.4 7.7 8 7.5L9 7ZM2 12C2 10.9 2.9 10 4 10S6 10.9 6 12S5.1 14 4 14S2 13.1 2 12ZM18 12C18 10.9 18.9 10 20 10S22 10.9 22 12S21.1 14 20 14S18 13.1 18 12ZM12 14C10.9 14 10 14.9 10 16S10.9 18 12 18S14 17.1 14 16S13.1 14 12 14Z" />
        </svg>
      ),
      delay: 600,
    },
  ];

  /**
   * Handle feature interactions
   */
  const handleFeatureHover = (featureId) => {
    setHoveredFeature(featureId);
  };

  const handleFeatureClick = (featureId) => {
    setActiveFeature(activeFeature === featureId ? null : featureId);
    console.log(`Feature clicked: ${featureId}`);
  };

  /**
   * Architectural wireframe background component
   */
  const ArchitecturalBackground = () => (
    <div className="absolute inset-0 opacity-30">
      {/* Building wireframe outlines */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Main building structure */}
        <g
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          className="text-gray-600"
        >
          {/* Building 1 - Left */}
          <rect x="100" y="300" width="200" height="400" />
          <rect x="120" y="320" width="30" height="40" />
          <rect x="170" y="320" width="30" height="40" />
          <rect x="220" y="320" width="30" height="40" />
          <rect x="120" y="380" width="30" height="40" />
          <rect x="170" y="380" width="30" height="40" />
          <rect x="220" y="380" width="30" height="40" />
          <rect x="120" y="440" width="30" height="40" />
          <rect x="170" y="440" width="30" height="40" />
          <rect x="220" y="440" width="30" height="40" />

          {/* Building 2 - Center */}
          <rect x="400" y="200" width="300" height="500" />
          <rect x="420" y="220" width="40" height="50" />
          <rect x="480" y="220" width="40" height="50" />
          <rect x="540" y="220" width="40" height="50" />
          <rect x="600" y="220" width="40" height="50" />
          <rect x="660" y="220" width="40" height="50" />

          {/* Building 3 - Right */}
          <rect x="800" y="250" width="250" height="450" />
          <rect x="820" y="270" width="35" height="45" />
          <rect x="870" y="270" width="35" height="45" />
          <rect x="920" y="270" width="35" height="45" />
          <rect x="970" y="270" width="35" height="45" />

          {/* Connecting lines and structural elements */}
          <line x1="0" y1="700" x2="1200" y2="700" />
          <line x1="300" y1="400" x2="400" y2="350" />
          <line x1="700" y1="300" x2="800" y2="350" />

          {/* Additional architectural details */}
          <polygon points="100,300 150,250 200,250 300,300" />
          <polygon points="400,200 500,150 600,150 700,200" />
          <polygon points="800,250 900,200 1000,200 1050,250" />
        </g>
      </svg>

      {/* Grid overlay */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute border-l border-gray-800/20"
            style={{
              left: `${i * 5}%`,
              height: "100%",
            }}
          />
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute border-t border-gray-800/20"
            style={{
              top: `${i * 6.67}%`,
              width: "100%",
            }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <section className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Architectural Background */}
      <ArchitecturalBackground />

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
          {/* Left Side - Main Heading */}
          <div
            className={`transform transition-all duration-1000 ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <h1 className="text-6xl lg:text-7xl xl:text-8xl font-light text-yellow-400 leading-tight tracking-wide">
              Why
              <br />
              <span className="block">Nivaasa</span>
            </h1>
          </div>

          {/* Right Side - Description */}
          <div
            className={`flex items-center transform transition-all duration-1000 delay-300 ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <p className="text-white text-xl lg:text-2xl leading-relaxed font-light">
              At Nivaasa, we don't just build homes — we create spaces where
              stories begin, legacies grow, and every corner reflects timeless
              luxury.
            </p>
          </div>
        </div>

        {/* Golden Divider Line */}
        <div
          className={`w-full h-px bg-yellow-400 mb-16 transform transition-all duration-1000 delay-500 ${
            isLoaded ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
          }`}
          style={{ transformOrigin: "left" }}
        />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`group cursor-pointer transform transition-all duration-700 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              } ${hoveredFeature === feature.id ? "scale-105" : ""} ${
                activeFeature === feature.id
                  ? "bg-white/5 rounded-2xl p-6 -m-6"
                  : ""
              }`}
              style={{ transitionDelay: `${feature.delay + 700}ms` }}
              onMouseEnter={() => handleFeatureHover(feature.id)}
              onMouseLeave={() => handleFeatureHover(null)}
              onClick={() => handleFeatureClick(feature.id)}
            >
              {/* Feature Icon */}
              <div className="mb-6">
                <div
                  className={`w-16 h-16 flex items-center justify-center rounded-2xl transition-all duration-300 ${
                    hoveredFeature === feature.id ||
                    activeFeature === feature.id
                      ? "bg-yellow-400 text-black scale-110"
                      : "bg-yellow-400/20 text-yellow-400"
                  }`}
                >
                  {feature.icon}
                </div>
              </div>

              {/* Feature Title */}
              <h3
                className={`text-xl lg:text-2xl font-medium mb-4 transition-colors duration-300 ${
                  hoveredFeature === feature.id || activeFeature === feature.id
                    ? "text-yellow-400"
                    : "text-white"
                }`}
              >
                {feature.title}
              </h3>

              {/* Feature Description */}
              <p
                className={`text-gray-300 leading-relaxed transition-all duration-300 ${
                  hoveredFeature === feature.id || activeFeature === feature.id
                    ? "text-white"
                    : ""
                }`}
              >
                {feature.description}
              </p>

              {/* Hover Indicator */}
              <div
                className={`mt-6 w-12 h-1 bg-yellow-400 rounded-full transition-all duration-300 ${
                  hoveredFeature === feature.id || activeFeature === feature.id
                    ? "w-full opacity-100"
                    : "w-0 opacity-0"
                }`}
              />

              {/* Interactive Border */}
              <div
                className={`absolute inset-0 border-2 border-yellow-400/30 rounded-2xl transition-all duration-300 ${
                  hoveredFeature === feature.id ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Bottom Call-to-Action */}
        <div
          className={`text-center mt-20 transform transition-all duration-1000 delay-1000 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-flex items-center space-x-4 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-8 py-4 hover:bg-yellow-400/20 transition-all duration-300 cursor-pointer group">
            <span className="text-yellow-400 font-medium tracking-wide">
              Discover Our Legacy
            </span>
            <svg
              className="w-5 h-5 text-yellow-400 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-60" />
        <div className="absolute bottom-32 left-16 w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-40" />
        <div className="absolute top-1/2 left-8 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse opacity-50" />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40 pointer-events-none" />
    </section>
  );
};

export default WhyNivaasaSection;
