"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AboutUsSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Simple, stable animation variants
  const fadeUpVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const scaleInVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const slideInLeftVariants = {
    hidden: {
      opacity: 0,
      x: -50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const slideInRightVariants = {
    hidden: {
      opacity: 0,
      x: 50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const galleryImages = [
    {
      id: "exterior",
      src: "/grid-1.jpg",
      alt: "Modern luxury house exterior with pool and palm trees",
      title: "Architectural Excellence",
      position: "left-tall",
    },
    {
      id: "living",
      src: "/grid-2.jpg",
      alt: "Elegant interior living room with curved walls",
      title: "Sophisticated Interiors",
      position: "top-wide",
    },
    {
      id: "lounge",
      src: "/grid-3.jpg",
      alt: "Bright modern living space with white furniture",
      title: "Contemporary Living",
      position: "bottom-left-square",
    },
    {
      id: "kitchen",
      src: "/grid-4.jpg",
      alt: "Modern kitchen with white cabinets and lighting",
      title: "Gourmet Kitchen",
      position: "bottom-right-square",
    },
    {
      id: "bedroom",
      src: "/grid-5.jpg",
      alt: "Luxury bedroom with warm lighting and elegant design",
      title: "Serene Bedrooms",
      position: "right-tall",
    },
  ];

  const handleImageHover = (imageId) => {
    setHoveredImage(imageId);
  };

  const handleImageClick = (imageId, index) => {
    setActiveImageIndex(index);
  };

  const FloatingParticles = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#fdc700]/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 2, 1],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );

  return (
    <section className="min-h-screen bg-black text-white relative overflow-hidden">
      <FloatingParticles />

      {/* Static Background Geometric Pattern */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-900/20 to-transparent"></div>
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute border-l border-[#fdc700]/5"
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
              className="absolute border-t border-[#fdc700]/5"
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
          <motion.div
            className="space-y-10"
            variants={slideInLeftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* About Us Heading */}
            <div className="space-y-6">
              <div className="relative">
                <motion.h1
                  className="text-5xl lg:text-6xl xl:text-7xl font-light tracking-wider"
                  style={{
                    color: "#fdc700",
                    textShadow: "0 0 40px #fdc700, 0 0 80px #fdc700",
                  }}
                  variants={scaleInVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  ABOUT US
                </motion.h1>

                {/* Decorative underline with accent */}
                <motion.div
                  className="flex items-center mt-6 space-x-4"
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="flex-1 h-px bg-[#fdc700]"
                    style={{
                      boxShadow: "0 0 10px #fdc700",
                    }}
                  />
                  <motion.div
                    className="w-3 h-3 bg-[#fdc700] transform rotate-45"
                    style={{
                      boxShadow: "0 0 15px #fdc700",
                    }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Main Description */}
            <div className="space-y-8">
              <motion.p
                className="text-white text-lg lg:text-xl leading-relaxed font-light"
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 1 }}
              >
                Nivaasa, derived from the Sanskrit word for residence, is a
                luxury real estate brand creating more than just spaces—we build
                legacies. With a focus on timeless design, urban innovation, and
                premium living experiences, Nivaasa delivers homes that reflect
                elegance, comfort, and lasting value.
              </motion.p>

              {/* Tagline */}
              <motion.div
                className="pt-6"
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 1.2 }}
              >
                <p className="text-white text-xl lg:text-2xl font-light italic">
                  Tagline:{" "}
                  <span
                    className="text-xl lg:text-2xl font-light italic"
                    style={{
                      color: "#fdc700",
                      textShadow: "0 0 20px rgba(253, 199, 0, 0.6)",
                    }}
                  >
                    Beyond Spaces. Building Legacies.
                  </span>
                </p>
              </motion.div>
            </div>

            {/* Additional Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
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
                <motion.div
                  key={index}
                  variants={fadeUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                >
                  <div className="flex items-start space-x-4">
                    <motion.div
                      className="w-2 h-2 bg-[#fdc700] rounded-full mt-2 flex-shrink-0"
                      style={{
                        boxShadow: "0 0 10px #fdc700",
                      }}
                    />
                    <div>
                      <h3
                        className="font-bold text-sm tracking-wide mb-2"
                        style={{
                          color: "#fdc700",
                          textShadow: "0 0 15px rgba(253, 199, 0, 0.4)",
                        }}
                      >
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Image Gallery Section */}
          <motion.div
            variants={slideInRightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex gap-3 h-96">
              {/* Left Tall Image - Exterior */}
              <div className="w-42 h-full">
                <motion.div
                  className="relative group cursor-pointer h-full"
                  onMouseEnter={() => handleImageHover("exterior")}
                  onMouseLeave={() => handleImageHover(null)}
                  onClick={() => handleImageClick("exterior", 0)}
                  variants={scaleInVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl h-full border-2 border-[#fdc700]/20">
                    <img
                      src={galleryImages[0].src || "/placeholder.svg"}
                      alt={galleryImages[0].alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="absolute bottom-4 left-3 right-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <h3 className="text-white font-medium text-sm">
                        {galleryImages[0].title}
                      </h3>
                    </div>

                    <div
                      className={`absolute top-3 right-3 w-2 h-2 rounded-full transition-all duration-300`}
                      style={{
                        backgroundColor:
                          activeImageIndex === 0
                            ? "#fdc700"
                            : "rgba(255,255,255,0.5)",
                        boxShadow:
                          activeImageIndex === 0 ? "0 0 15px #fdc700" : "none",
                        transform:
                          activeImageIndex === 0 ? "scale(1.5)" : "scale(1)",
                      }}
                    />
                  </div>
                </motion.div>
              </div>

              {/* Center Column */}
              <div className="flex flex-col gap-3 w-66">
                {/* Top Wide Image - Living Room */}
                <div className="h-44">
                  <motion.div
                    className="relative group cursor-pointer h-full"
                    onMouseEnter={() => handleImageHover("living")}
                    onMouseLeave={() => handleImageHover(null)}
                    onClick={() => handleImageClick("living", 1)}
                    variants={scaleInVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="relative overflow-hidden rounded-2xl shadow-xl h-full border-2 border-[#fdc700]/20">
                      <img
                        src={galleryImages[1].src || "/placeholder.svg"}
                        alt={galleryImages[1].alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div
                        className={`absolute top-2 right-2 w-2 h-2 rounded-full transition-all duration-300`}
                        style={{
                          backgroundColor:
                            activeImageIndex === 1
                              ? "#fdc700"
                              : "rgba(255,255,255,0.5)",
                          boxShadow:
                            activeImageIndex === 1
                              ? "0 0 15px #fdc700"
                              : "none",
                          transform:
                            activeImageIndex === 1 ? "scale(1.5)" : "scale(1)",
                        }}
                      />

                      <div
                        className={`absolute inset-0 border-2 rounded-2xl transition-all duration-300 ${
                          hoveredImage === "living"
                            ? "border-[#fdc700]/60"
                            : "border-transparent"
                        }`}
                      ></div>
                    </div>
                  </motion.div>
                </div>

                {/* Bottom Row - Two Square Images */}
                <div className="flex gap-3 flex-1">
                  {/* Bottom Left Square - Lounge */}
                  <div className="flex-1">
                    <motion.div
                      className="relative group cursor-pointer h-full"
                      onMouseEnter={() => handleImageHover("lounge")}
                      onMouseLeave={() => handleImageHover(null)}
                      onClick={() => handleImageClick("lounge", 2)}
                      variants={scaleInVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ delay: 1 }}
                    >
                      <div className="relative overflow-hidden rounded-2xl shadow-xl h-full border-2 border-[#fdc700]/20">
                        <img
                          src={galleryImages[2].src || "/placeholder.svg"}
                          alt={galleryImages[2].alt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <div
                          className={`absolute top-2 right-2 w-2 h-2 rounded-full transition-all duration-300`}
                          style={{
                            backgroundColor:
                              activeImageIndex === 2
                                ? "#fdc700"
                                : "rgba(255,255,255,0.5)",
                            boxShadow:
                              activeImageIndex === 2
                                ? "0 0 15px #fdc700"
                                : "none",
                            transform:
                              activeImageIndex === 2
                                ? "scale(1.5)"
                                : "scale(1)",
                          }}
                        />

                        <div
                          className={`absolute inset-0 border-2 rounded-2xl transition-all duration-300 ${
                            hoveredImage === "lounge"
                              ? "border-[#fdc700]/60"
                              : "border-transparent"
                          }`}
                        ></div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Bottom Right Square - Kitchen */}
                  <div className="flex-1">
                    <motion.div
                      className="relative group cursor-pointer h-full"
                      onMouseEnter={() => handleImageHover("kitchen")}
                      onMouseLeave={() => handleImageHover(null)}
                      onClick={() => handleImageClick("kitchen", 3)}
                      variants={scaleInVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ delay: 1.2 }}
                    >
                      <div className="relative overflow-hidden rounded-2xl shadow-xl h-full border-2 border-[#fdc700]/20">
                        <img
                          src={galleryImages[3].src || "/placeholder.svg"}
                          alt={galleryImages[3].alt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <div
                          className={`absolute top-2 right-2 w-2 h-2 rounded-full transition-all duration-300`}
                          style={{
                            backgroundColor:
                              activeImageIndex === 3
                                ? "#fdc700"
                                : "rgba(255,255,255,0.5)",
                            boxShadow:
                              activeImageIndex === 3
                                ? "0 0 15px #fdc700"
                                : "none",
                            transform:
                              activeImageIndex === 3
                                ? "scale(1.5)"
                                : "scale(1)",
                          }}
                        />

                        <div
                          className={`absolute inset-0 border-2 rounded-2xl transition-all duration-300 ${
                            hoveredImage === "kitchen"
                              ? "border-[#fdc700]/60"
                              : "border-transparent"
                          }`}
                        ></div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Right Tall Image - Bedroom */}
              <div className="w-42">
                <motion.div
                  className="relative group cursor-pointer h-full"
                  onMouseEnter={() => handleImageHover("bedroom")}
                  onMouseLeave={() => handleImageHover(null)}
                  onClick={() => handleImageClick("bedroom", 4)}
                  variants={scaleInVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 1.4 }}
                >
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl h-full border-2 border-[#fdc700]/20">
                    <img
                      src={galleryImages[4].src || "/placeholder.svg"}
                      alt={galleryImages[4].alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="absolute bottom-4 left-3 right-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <h3 className="text-white font-medium text-sm">
                        {galleryImages[4].title}
                      </h3>
                    </div>

                    <div
                      className={`absolute top-3 right-3 w-2 h-2 rounded-full transition-all duration-300`}
                      style={{
                        backgroundColor:
                          activeImageIndex === 4
                            ? "#fdc700"
                            : "rgba(255,255,255,0.5)",
                        boxShadow:
                          activeImageIndex === 4 ? "0 0 15px #fdc700" : "none",
                        transform:
                          activeImageIndex === 4 ? "scale(1.5)" : "scale(1)",
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Statistics Section */}
        <motion.div
          className="mt-24 pt-12 pb-10 border-t border-[#fdc700]/30"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{
            borderTopColor: "#fdc700",
            borderTopWidth: "1px",
          }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "15+", label: "Years of Excellence" },
              { number: "50+", label: "Premium Projects" },
              { number: "10,000+", label: "Happy Families" },
              { number: "5", label: "Cities Presence" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={scaleInVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div
                  className="text-3xl lg:text-4xl font-light mb-3"
                  style={{
                    color: "#fdc700",
                    textShadow: "0 0 30px rgba(253, 199, 0, 0.6)",
                  }}
                >
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 right-20 w-40 h-40 border border-[#fdc700]/20 rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 50,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-32 h-32 border border-[#fdc700]/15 rounded-full"
        animate={{ rotate: -360 }}
        transition={{
          duration: 45,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </section>
  );
};

export default AboutUsSection;
