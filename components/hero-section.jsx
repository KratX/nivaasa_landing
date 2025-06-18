"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Carousel Component
 * A responsive, interactive carousel with smooth transitions
 * Features: Auto-play, manual navigation, touch/swipe support, responsive design
 */
const HeroSection = () => {
  // Sample carousel data - you can replace with your own content
  const slides = [
    {
      id: 1,
      backgroundImage: "/hero-1.png",
      subtitle: "DESIGNED FOR TODAY, BUILT TO LAST A LIFETIME",
      title: "HOMES THAT INSPIRE",
      description: "Discover architectural excellence in every detail",
    },
    {
      id: 2,
      backgroundImage: "/hero-2.png",
      subtitle: "BEYOND SPACES BUILDING LEGACIES",
      title: "NIVAASA",
      description: "Experience the pinnacle of modern living",
    },
  ];

  // State management
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Touch/swipe handlers
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Mouse handlers for desktop interaction
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Carousel Container */}
      <div
        className="relative w-full h-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 transform translate-x-0"
                : index < currentSlide
                ? "opacity-0 transform -translate-x-full"
                : "opacity-0 transform translate-x-full"
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${slide.backgroundImage})`,
              }}
            >
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-opacity-30"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col justify-center items-start h-full px-4 sm:px-6 lg:px-8">
              <div className="text-left max-w-4xl ml-0 pl-8 sm:pl-12 md:pl-16 lg:pl-20">
                {/* Subtitle */}
                <div className="mb-4 sm:mb-6">
                  <p
                    className="text-sm sm:text-base text-white md:text-lg font-bold tracking-wider uppercase opacity-90 bg-clip-text text-left"
                    style={{
                      backgroundImage: `url(${slide.backgroundImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundAttachment: "fixed",
                      WebkitBackgroundClip: "text",
                    }}
                  >
                    {slide.subtitle}
                  </p>
                </div>

                {/* Main Title */}
                <div className="mb-6 sm:mb-8 bg-white w-fit py-1 px-10">
                  <h1
                    className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl w-full xl:text-8xl font-bold tracking-tight leading-tight text-nowrap text-transparent bg-clip-text text-left"
                    style={{
                      backgroundImage: `url(${slide.backgroundImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundAttachment: "fixed",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {slide.title}
                  </h1>
                </div>

                {/* Description */}
                <div>
                  <p className="text-gray-100 text-base sm:text-lg md:text-xl font-base max-w-2xl text-left">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Horizontal Navigation (Bottom) - Hidden on mobile, visible on larger screens */}
        <div className="hidden sm:flex absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-4">
            <button
              onClick={prevSlide}
              className="p-3 text-white hover:text-gray-300 transition-colors duration-200 hover:bg-white hover:bg-opacity-20 rounded-full"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 text-white hover:text-gray-300 transition-colors duration-200 hover:bg-white hover:bg-opacity-20 rounded-full"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
