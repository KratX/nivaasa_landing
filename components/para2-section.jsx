"use client";

import { div } from "framer-motion/client";
import { useState, useEffect, useRef } from "react";

/**
 * Architectural Development Presentation Component
 * Features sophisticated dark theme with geometric patterns,
 * animated statistics, and detailed architectural wireframe
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
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // X position within image
    const y = e.clientY - rect.top; // Y position within image

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10; // Tilt sensitivity
    const rotateY = ((x - centerX) / centerX) * -10;

    imageRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };
  const handleMouseLeave = () => {
    imageRef.current.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
  };

  // Animation effect on component mount

  useEffect(() => {
    setIsLoaded(true);

    // Animate statistics counters
    const animateStats = () => {
      const duration = 2000;
      const steps = 60;
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
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        setAnimatedStats({
          residential: Math.round(targets.residential * easeOutQuart),
          retail: Math.round(targets.retail * easeOutQuart),
          acres: Math.round(targets.acres * easeOutQuart),
        });

        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);
    };

    // Start animation after component loads
    setTimeout(animateStats, 500);

    // Initialize canvas for geometric patterns
    initializeCanvas();
  }, []);

  /**
   * Initialize canvas for animated geometric background patterns
   */
  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Draw animated geometric lines
    const drawGeometricPattern = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1;

      const time = Date.now() * 0.001;

      // Draw grid pattern
      for (let i = 0; i < canvas.width; i += 50) {
        for (let j = 0; j < canvas.height; j += 50) {
          const offset = Math.sin(time + i * 0.01 + j * 0.01) * 10;
          ctx.beginPath();
          ctx.moveTo(i, j);
          ctx.lineTo(i + 30 + offset, j + 30 + offset);
          ctx.stroke();
        }
      }

      requestAnimationFrame(drawGeometricPattern);
    };

    drawGeometricPattern();
  };

  /**
   * Handle window resize for canvas
   */
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   * Statistics data configuration
   */
  const statisticsData = [
    {
      id: "residential",
      icon: (
        <svg
          className="w-8 h-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9,22 9,12 15,12 15,22" />
        </svg>
      ),
      value: animatedStats.residential,
      label: "Mn. Sq. Ft.",
      description: "of Residential",
      color: "text-yellow-400",
    },
    {
      id: "retail",
      icon: (
        <svg
          className="w-8 h-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27,6.96 12,12.01 20.73,6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
      value: animatedStats.retail,
      label: "Mn. Sq. Ft.",
      description: "of Retail & Office",
      color: "text-yellow-400",
    },
    {
      id: "acres",
      icon: (
        <svg
          className="w-8 h-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      value: animatedStats.acres,
      label: "acres",
      description: "plotted",
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="min-h-screen bg-[url(/para-2.png)] bg-cover text-white overflow-hidden relative">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{ zIndex: 1 }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-8 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content Section */}
            <div
              className={`space-y-8 transform transition-all duration-1000 ${
                isLoaded
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              {/* Header Section */}
              <div className="space-y-4">
                <h2 className="text-lg lg:text-xl font-light tracking-wide text-gray-300">
                  Next 5 year Plan
                </h2>
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl space-x-2 font-light leading-tight">
                  <span className="text-yellow-400 font-normal">Looking</span>
                  <span className="text-white">Forward</span>
                </h1>
              </div>

              {/* Description */}
              <div className="max-w-lg">
                <p className="text-base lg:text-lg leading-relaxed text-gray-300 font-light">
                  The journey continues with visionary spaces on the horizon.
                  Get ready to experience Nivaasa Axis, Retreat, and Serene —
                  where the future of refined living unfolds.
                </p>
              </div>

              {/* Statistics Section */}
              <div className="space-y-1 pt-8">
                {statisticsData.map((stat, index) => (
                  <div
                    key={stat.id}
                    className={`flex items-center space-x-6 p-4 rounded-lg transition-all duration-300 cursor-pointer transform ${
                      hoveredStat === stat.id
                        ? "bg-white/5 scale-105 shadow-lg"
                        : "hover:bg-white/3"
                    } ${
                      isLoaded
                        ? "translate-y-0 opacity-100"
                        : "translate-y-5 opacity-0"
                    }`}
                    style={{
                      transitionDelay: `${500 + index * 200}ms`,
                      animationDelay: `${500 + index * 200}ms`,
                    }}
                    onMouseEnter={() => setHoveredStat(stat.id)}
                    onMouseLeave={() => setHoveredStat(null)}
                  >
                    {/* Icon */}
                    <div
                      className={`${stat.color} transition-colors duration-300`}
                    >
                      {stat.icon}
                    </div>

                    {/* Statistics Content */}
                    <div className="flex-1">
                      <div className="flex items-baseline space-x-2">
                        <span
                          className={`text-4xl lg:text-5xl font-light ${stat.color} transition-colors duration-300`}
                        >
                          {stat.value}
                        </span>
                        <span className="text-lg lg:text-xl text-gray-300 font-light">
                          {stat.label}
                        </span>
                      </div>
                      <p className="text-sm lg:text-base text-gray-400 mt-1">
                        {stat.description}
                      </p>
                    </div>

                    {/* Hover Indicator */}
                    <div
                      className={`w-2 h-8 bg-yellow-400 rounded-full transition-all duration-300 ${
                        hoveredStat === stat.id
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-75"
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* Call to Action */}
              <div className="pt-8">
                <button className="group relative px-8 py-4 border border-yellow-400/50 rounded-sm hover:border-yellow-400 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10 text-sm lg:text-base tracking-wide font-light group-hover:text-black transition-colors duration-300">
                    Explore Development Plans
                  </span>
                  <div className="absolute inset-0 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
              </div>
            </div>

            {/* Right Architectural Wireframe Section */}

            <div
              className={`relative transform transition-all duration-1000 delay-300 ${
                isLoaded
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
              }`}
            >
              {/* Architectural Drawing Container */}
              <div className="bg-transparent relative p-8 lg:p-12">
                <div className="aspect-square bg-transparent lg:aspect-[4/3] relative perspective-[1000px]">
                  <img
                    ref={imageRef}
                    src="test.png"
                    alt="Detailed architectural wireframe showing modern building complex with multiple structures and levels"
                    className="w-full h-full object-contain transition-transform duration-300 ease-out will-change-transform"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  />
                </div>

                {/* Technical Details Overlay */}
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-xs text-gray-400 space-y-1">
                    <div>Scale: 1:500</div>
                    <div>Total Area: 308 acres</div>
                    <div>Phases: 3</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-yellow-400/30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-yellow-400/30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-yellow-400/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-yellow-400/30" />
    </div>
  );
};

export default Para2;
