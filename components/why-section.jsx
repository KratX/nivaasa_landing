"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const WhyNivaasaSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      id: "legacy",
      title: "Legacy-Focused Living",
      description:
        "We craft more than homes—we build spaces that carry meaning, value, and legacy.",
      icon: (
        <svg
          className="w-12 h-12  text-yellow-400"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
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
        <svg
          className="w-12 h-12 text-yellow-400"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
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
        <svg
          className="w-12 h-12 text-yellow-400"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
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
        <svg
          className="w-12 h-12 text-yellow-400"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM9 7H15L13.5 7.5C13.1 7.7 12.6 8 12.3 8.3L15 11H13L11.2 9.2C10.9 8.9 10.4 8.9 10.1 9.2L8.3 11H6.5L9.2 8.3C8.9 8 8.4 7.7 8 7.5L9 7ZM2 12C2 10.9 2.9 10 4 10S6 10.9 6 12S5.1 14 4 14S2 13.1 2 12ZM18 12C18 10.9 18.9 10 20 10S22 10.9 22 12S21.1 14 20 14S18 13.1 18 12ZM12 14C10.9 14 10 14.9 10 16S10.9 18 12 18S14 17.1 14 16S13.1 14 12 14Z" />
        </svg>
      ),
      delay: 600,
    },
  ];
  return (
    <section className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#fdc700]/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">
          {/* Left - Main Heading */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.h1
              className="text-6xl lg:text-7xl xl:text-8xl font-light leading-tight tracking-wide text-[#fdc700]"
              style={{ textShadow: "0 0 60px #fdc700" }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Why
              <br />
              Nivaasa
            </motion.h1>
          </motion.div>

          {/* Right - Description */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-white text-xl lg:text-2xl leading-relaxed font-light">
              At Nivaasa, we don't just build homes — we create spaces where
              stories begin, legacies grow, and every corner reflects timeless
              luxury.
            </p>
          </motion.div>
        </div>

        {/* Golden Divider */}
        <motion.div
          className="w-full h-px bg-[#fdc700] mb-20"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          viewport={{ once: true }}
          style={{
            transformOrigin: "left",
            boxShadow: "0 0 20px #fdc700",
          }}
        />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredFeature(feature.id)}
              onMouseLeave={() => setHoveredFeature(null)}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              {/* Feature Card */}
              <div className="relative p-6 rounded-2xl border border-[#fdc700]/20 bg-gradient-to-b from-[#fdc700]/5 to-transparent backdrop-blur-sm transition-all duration-300 hover:border-[#fdc700]/50 hover:bg-[#fdc700]/10">
                {/* Icon */}
                <motion.div
                  className="text-6xl mb-6"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                >
                  {feature.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-medium mb-4 text-white group-hover:text-[#fdc700] transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Hover Indicator */}
                <motion.div
                  className="mt-6 h-1 bg-[#fdc700] rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: hoveredFeature === feature.id ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    boxShadow:
                      hoveredFeature === feature.id
                        ? "0 0 15px #fdc700"
                        : "none",
                  }}
                />

                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredFeature === feature.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    boxShadow: "0 0 30px rgba(253, 199, 0, 0.3)",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="inline-flex items-center space-x-4 bg-[#fdc700]/10 border border-[#fdc700]/30 rounded-full px-10 py-5 text-[#fdc700] font-medium tracking-wide hover:bg-[#fdc700]/20 transition-all duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(253, 199, 0, 0.4)",
              y: -3,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Discover Our Legacy</span>
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </motion.svg>
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 border border-[#fdc700]/20 rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 50,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-24 h-24 border border-[#fdc700]/15 rounded-full"
        animate={{ rotate: -360 }}
        transition={{
          duration: 40,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </section>
  );
};

export default WhyNivaasaSection;
