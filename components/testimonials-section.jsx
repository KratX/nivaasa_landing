"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Testimonials Section Component
 * Features client testimonials with sophisticated dark theme design,
 * animated geometric background, and responsive card layout
 */
const TestimonialsSection = () => {
  // State management for animations and interactions
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Initialize component with animations
  useEffect(() => {
    setIsLoaded(true);
    initializeGeometricBackground();

    // Auto-rotate testimonials every 8 seconds
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length);
    }, 8000);

    return () => {
      clearInterval(interval);
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

    const drawGeometricLines = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1;

      const time = Date.now() * 0.0003;

      // Draw interconnected geometric lines
      for (let i = 0; i < canvas.width; i += 100) {
        for (let j = 0; j < canvas.height; j += 100) {
          const offset = Math.sin(time + i * 0.01 + j * 0.01) * 20;

          // Draw grid lines
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, canvas.height);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(0, j);
          ctx.lineTo(canvas.width, j);
          ctx.stroke();

          // Draw diagonal connections
          ctx.beginPath();
          ctx.moveTo(i, j);
          ctx.lineTo(i + 80 + offset, j + 80 + offset);
          ctx.stroke();

          // Draw architectural-style connections
          if (i < canvas.width - 100 && j < canvas.height - 100) {
            ctx.beginPath();
            ctx.moveTo(i + 50, j);
            ctx.lineTo(i + 50 + offset, j + 100);
            ctx.lineTo(i + 100, j + 50);
            ctx.stroke();
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(drawGeometricLines);
    };

    drawGeometricLines();

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
   * Testimonials data exactly matching the image
   */
  const testimonialsData = [
    {
      id: 1,
      name: "KHUSHI GUPTA",
      title: "GRAPHIC DESIGNER",
      image: "/khushi.jpg",
      testimonial:
        "NIVAASA MADE OUR HOME BUYING JOURNEY INCREDIBLY SMOOTH. THEIR EXPERTISE AND DEDICATION EXCEEDED OUR EXPECTATIONS.",
      gradient: "from-gray-600 to-gray-800",
    },
    {
      id: 2,
      name: "KRITIKA GROVER",
      title: "CONTENT WRITER",
      image: "/kritika.jpg",
      testimonial:
        "EXCEPTIONAL SERVICE, DEEP MARKET KNOWLEDGE, AND SEAMLESS TRANSACTIONS MADE MY HOME PURCHASE A BREEZE.",
      gradient: "from-gray-600 to-gray-800",
    },
    {
      id: 3,
      name: "SANIA KHAN",
      title: "ARCHITECT",
      image: "/sania.jpg",
      testimonial:
        "FROM THE FIRST SHOWING TO CLOSING, EVERY STEP WAS MANAGED WITH OUTSTANDING PROFESSIONALISM AND SERVICE.",
      gradient: "from-gray-600 to-gray-800",
    },
  ];

  /**
   * Handle card interactions
   */
  const handleCardHover = (cardId) => {
    setHoveredCard(cardId);
  };

  const handleCardClick = (index) => {
    setCurrentTestimonial(index);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{ zIndex: 1 }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Section Header */}
          <div
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-yellow-400 mb-6 tracking-wider">
              WHAT PEOPLE SAY
            </h1>
            <div className="w-32 h-1 bg-yellow-400 mx-auto"></div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {testimonialsData.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`relative group cursor-pointer transform transition-all duration-700 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                } ${
                  hoveredCard === testimonial.id
                    ? "scale-105"
                    : "hover:scale-102"
                } ${
                  currentTestimonial === index
                    ? "ring-2 ring-yellow-400 ring-opacity-50"
                    : ""
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => handleCardHover(testimonial.id)}
                onMouseLeave={() => handleCardHover(null)}
                onClick={() => handleCardClick(index)}
              >
                {/* Card Background with Gradient */}
                <div
                  className={`bg-gradient-to-br ${testimonial.gradient} rounded-2xl p-8 h-full min-h-[400px] relative overflow-hidden border border-gray-600 hover:border-gray-500 transition-all duration-300`}
                >
                  {/* Decorative Corner Elements */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-yellow-400 opacity-30 rounded-tl-2xl"></div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-yellow-400 opacity-30 rounded-br-2xl"></div>

                  {/* Profile Image */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-40 h-40 rounded-full overflow-hidden border-3 border-yellow-400 shadow-lg">
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={`${testimonial.name} profile`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Client Information */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2 tracking-wide">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-300 text-sm font-medium tracking-wider uppercase">
                      {testimonial.title}
                    </p>
                  </div>

                  {/* Testimonial Quote */}
                  <div className="relative">
                    {/* Quote marks */}
                    <div className="absolute -top-4 -left-2 text-6xl text-yellow-400 opacity-30 font-serif">
                      "
                    </div>
                    <p className="text-white text-base leading-relaxed font-light relative z-10 text-center">
                      {testimonial.testimonial}
                    </p>
                    <div className="absolute -bottom-8 -right-2 text-6xl text-yellow-400 opacity-30 font-serif rotate-180">
                      "
                    </div>
                  </div>

                  {/* Hover Overlay Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-yellow-400/10 to-transparent rounded-2xl transition-opacity duration-300 ${
                      hoveredCard === testimonial.id
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <button className="group relative px-8 py-4 bg-transparent border-2 border-yellow-400 text-yellow-400 font-medium tracking-wide uppercase transition-all duration-300 overflow-hidden hover:text-black">
              <span className="relative z-10">Share Your Experience</span>
              <div className="absolute inset-0 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Background Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23FFD700' strokeWidth='1'%3E%3Cpath d='M10 10 L90 10 L90 90 L10 90 Z'/%3E%3Cpath d='M20 20 L80 20 L80 80 L20 80 Z'/%3E%3Cpath d='M30 30 L70 30 L70 70 L30 70 Z'/%3E%3Cpath d='M10 10 L90 90'/%3E%3Cpath d='M90 10 L10 90'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "150px 150px",
            backgroundRepeat: "repeat",
          }}
        />
      </div>
    </div>
  );
};

export default TestimonialsSection;
