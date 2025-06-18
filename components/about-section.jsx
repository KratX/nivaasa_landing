"use client";

import { useState, useEffect } from "react";

/**
 * Luxury Real Estate About Us Section Component
 * Features sophisticated design with golden typography, image gallery,
 * and elegant animations matching the provided design
 */
const AboutUsSection = () => {
  // State management for animations and interactions
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Initialize component
  useEffect(() => {
    setIsLoaded(true);

    // Auto-rotate through images for subtle animation
    const imageRotationInterval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % 5);
    }, 4000);

    return () => clearInterval(imageRotationInterval);
  }, []);

  /**
   * Image gallery data configuration
   */
  const galleryImages = [
    {
      id: "exterior",
      src: "grid-1.jpg",
      alt: "Modern luxury house exterior with pool and palm trees",
      title: "Architectural Excellence",
      position: "left-tall",
    },
    {
      id: "living",
      src: "grid-2.jpg",
      alt: "Elegant interior living room with curved walls",
      title: "Sophisticated Interiors",
      position: "top-wide",
    },
    {
      id: "lounge",
      src: "grid-3.jpg",
      alt: "Bright modern living space with white furniture",
      title: "Contemporary Living",
      position: "bottom-left-square",
    },
    {
      id: "kitchen",
      src: "grid-4.jpg",
      alt: "Modern kitchen with white cabinets and lighting",
      title: "Gourmet Kitchen",
      position: "bottom-right-square",
    },
    {
      id: "bedroom",
      src: "grid-5.jpg",
      alt: "Luxury bedroom with warm lighting and elegant design",
      title: "Serene Bedrooms",
      position: "right-tall",
    },
  ];

  /**
   * Handle image hover interactions
   */
  const handleImageHover = (imageId) => {
    setHoveredImage(imageId);
  };

  const handleImageClick = (imageId, index) => {
    setActiveImageIndex(index);
    console.log(`Viewing image: ${imageId}`);
  };

  return (
    <section className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Geometric Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-900/20 to-transparent"></div>

        {/* Subtle wireframe pattern */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute border-l border-white/5"
              style={{
                left: `${i * 5}%`,
                height: "100%",
                transform: `skewX(${Math.sin(i * 0.5) * 2}deg)`,
              }}
            />
          ))}
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute border-t border-white/5"
              style={{
                top: `${i * 6.67}%`,
                width: "100%",
                transform: `skewY(${Math.cos(i * 0.3) * 1}deg)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Content Section */}
          <div
            className={`space-y-8 transform transition-all duration-1000 ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            {/* About Us Heading */}
            <div className="space-y-4">
              <div className="relative">
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-light text-yellow-400 tracking-wider">
                  ABOUT US
                </h1>

                {/* Decorative underline with accent */}
                <div className="flex items-center mt-4 space-x-4">
                  <div className="flex-1 h-px bg-yellow-400"></div>
                  <div className="w-3 h-3 bg-yellow-400 transform rotate-45"></div>
                </div>
              </div>
            </div>

            {/* Main Description */}
            <div className="space-y-6">
              <p className="text-white text-lg lg:text-xl leading-relaxed font-light">
                Nivaasa, derived from the Sanskrit word for residence, is a
                luxury real estate brand creating more than just spaces—we build
                legacies. With a focus on timeless design, urban innovation, and
                premium living experiences, Nivaasa delivers homes that reflect
                elegance, comfort, and lasting value.
              </p>

              {/* Tagline */}
              <div className="pt-6">
                <p className="text-white text-xl lg:text-2xl font-light italic">
                  Tagline:{" "}
                  <span className="text-yellow-400">
                    Beyond Spaces. Building Legacies.
                  </span>
                </p>
              </div>
            </div>

            {/* Additional Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
              {[
                {
                  title: "Timeless Design",
                  desc: "Architectural excellence that endures",
                },
                {
                  title: "Urban Innovation",
                  desc: "Modern solutions for contemporary living",
                },
                {
                  title: "Premium Living",
                  desc: "Luxury experiences in every detail",
                },
                {
                  title: "Lasting Value",
                  desc: "Investments that appreciate over time",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`transform transition-all duration-700 ${
                    isLoaded
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 200 + 800}ms` }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-yellow-400 font-medium text-sm tracking-wide">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 text-sm mt-1">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Gallery Section - Exact Layout Match */}
          <div
            className={`transform transition-all duration-1000 delay-300 ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <div className="flex gap-3 h-96">
              {/* Left Tall Image - Exterior */}
              <div className="w-42 h-full">
                <div
                  className="relative group cursor-pointer h-full"
                  onMouseEnter={() => handleImageHover("exterior")}
                  onMouseLeave={() => handleImageHover(null)}
                  onClick={() => handleImageClick("exterior", 0)}
                >
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl h-full">
                    <img
                      src={galleryImages[0].src || "/placeholder.svg"}
                      alt={galleryImages[0].alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Hover Content */}
                    <div className="absolute bottom-4 left-3 right-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <h3 className="text-white font-medium text-sm">
                        {galleryImages[0].title}
                      </h3>
                    </div>

                    {/* Active indicator */}
                    <div
                      className={`absolute top-3 right-3 w-2 h-2 rounded-full transition-all duration-300 ${
                        activeImageIndex === 0
                          ? "bg-yellow-400 scale-125"
                          : "bg-white/50"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Center Column - Top Wide + Bottom Two Squares */}
              <div className="flex flex-col gap-3 w-66">
                {/* Top Wide Image - Living Room */}
                <div className="h-44">
                  <div
                    className="relative group cursor-pointer h-full"
                    onMouseEnter={() => handleImageHover("living")}
                    onMouseLeave={() => handleImageHover(null)}
                    onClick={() => handleImageClick("living", 1)}
                  >
                    <div className="relative overflow-hidden rounded-2xl shadow-xl h-full">
                      <img
                        src={galleryImages[1].src || "/placeholder.svg"}
                        alt={galleryImages[1].alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      {/* Image Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Active indicator */}
                      <div
                        className={`absolute top-2 right-2 w-2 h-2 rounded-full transition-all duration-300 ${
                          activeImageIndex === 1
                            ? "bg-yellow-400 scale-125"
                            : "bg-white/50"
                        }`}
                      ></div>

                      {/* Hover border effect */}
                      <div
                        className={`absolute inset-0 border-2 rounded-2xl transition-all duration-300 ${
                          hoveredImage === "living"
                            ? "border-yellow-400/60"
                            : "border-transparent"
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Two Square Images */}
                <div className="flex gap-3 flex-1">
                  {/* Bottom Left Square - Lounge */}
                  <div className="flex-1">
                    <div
                      className="relative group cursor-pointer h-full"
                      onMouseEnter={() => handleImageHover("lounge")}
                      onMouseLeave={() => handleImageHover(null)}
                      onClick={() => handleImageClick("lounge", 2)}
                    >
                      <div className="relative overflow-hidden rounded-2xl shadow-xl h-full">
                        <img
                          src={galleryImages[2].src || "/placeholder.svg"}
                          alt={galleryImages[2].alt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Image Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Active indicator */}
                        <div
                          className={`absolute top-2 right-2 w-2 h-2 rounded-full transition-all duration-300 ${
                            activeImageIndex === 2
                              ? "bg-yellow-400 scale-125"
                              : "bg-white/50"
                          }`}
                        ></div>

                        {/* Hover border effect */}
                        <div
                          className={`absolute inset-0 border-2 rounded-2xl transition-all duration-300 ${
                            hoveredImage === "lounge"
                              ? "border-yellow-400/60"
                              : "border-transparent"
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Right Square - Kitchen */}
                  <div className="flex-1">
                    <div
                      className="relative group cursor-pointer h-full"
                      onMouseEnter={() => handleImageHover("kitchen")}
                      onMouseLeave={() => handleImageHover(null)}
                      onClick={() => handleImageClick("kitchen", 3)}
                    >
                      <div className="relative overflow-hidden rounded-2xl shadow-xl h-full">
                        <img
                          src={galleryImages[3].src || "/placeholder.svg"}
                          alt={galleryImages[3].alt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Image Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Active indicator */}
                        <div
                          className={`absolute top-2 right-2 w-2 h-2 rounded-full transition-all duration-300 ${
                            activeImageIndex === 3
                              ? "bg-yellow-400 scale-125"
                              : "bg-white/50"
                          }`}
                        ></div>

                        {/* Hover border effect */}
                        <div
                          className={`absolute inset-0 border-2 rounded-2xl transition-all duration-300 ${
                            hoveredImage === "kitchen"
                              ? "border-yellow-400/60"
                              : "border-transparent"
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Tall Image - Bedroom */}
              <div className="w-42">
                <div
                  className="relative group cursor-pointer h-full"
                  onMouseEnter={() => handleImageHover("bedroom")}
                  onMouseLeave={() => handleImageHover(null)}
                  onClick={() => handleImageClick("bedroom", 4)}
                >
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl h-full">
                    <img
                      src={galleryImages[4].src || "/placeholder.svg"}
                      alt={galleryImages[4].alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Hover Content */}
                    <div className="absolute bottom-4 left-3 right-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <h3 className="text-white font-medium text-sm">
                        {galleryImages[4].title}
                      </h3>
                    </div>

                    {/* Active indicator */}
                    <div
                      className={`absolute top-3 right-3 w-2 h-2 rounded-full transition-all duration-300 ${
                        activeImageIndex === 4
                          ? "bg-yellow-400 scale-125"
                          : "bg-white/50"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Statistics Section */}
        <div
          className={`mt-20 pt-12 border-t border-white/20 transform transition-all duration-1000 delay-700 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "15+", label: "Years of Excellence" },
              { number: "50+", label: "Premium Projects" },
              { number: "10,000+", label: "Happy Families" },
              { number: "5", label: "Cities Presence" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-light text-yellow-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
