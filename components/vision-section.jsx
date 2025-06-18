"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Eye icon component
const EyeIcon = () => (
  <svg
    className="w-12 h-12 text-[#fdc700]"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
);

// People/Group icon component
const PeopleIcon = () => (
  <svg
    className="w-12 h-12 text-[#fdc700]"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01.99L14 10l-1.99-1.01A2.5 2.5 0 0 0 10 8H8.46c-.8 0-1.49.59-1.42 1.37L9.5 16H12v6h8zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zm-6-7c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm0 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 6.54 8H5c-.8 0-1.54.37-2.01.99L2 10l-1.99-1.01A2.5 2.5 0 0 0-2 8h-1.46c-.8 0-1.49.59-1.42 1.37L-2.5 16H0v6h8z" />
  </svg>
);

// Medal/Award icon component
const MedalIcon = () => (
  <svg
    className="w-12 h-12 text-[#fdc700]"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const VisionSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const visionData = [
    {
      id: "transparency",
      icon: <EyeIcon />,
      title: "TRANSPARENCY",
      description:
        "We believe in complete transparency in all our dealings, ensuring our clients make informed decisions",
    },
    {
      id: "innovation",
      icon: <PeopleIcon />,
      title: "INNOVATION",
      description:
        "Continuously evolving our technology and processes to provide the best real estate experience.",
    },
    {
      id: "customer",
      icon: <MedalIcon />,
      title: "CUSTOMER-FIRST",
      description:
        "Every decision we make is centered around providing exceptional value and service to our clients.",
    },
  ];

  return (
    <section className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#fdc700]/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 2.5, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`line-${i}`}
              className="absolute border-l border-[#fdc700]/20"
              style={{
                left: `${i * 6.67}%`,
                height: "100%",
                transform: `skewX(${Math.sin(i * 0.5) * 3}deg)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-light mb-8 tracking-wider text-[#fdc700]"
            style={{ textShadow: "0 0 80px #fdc700, 0 0 160px #fdc700" }}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            viewport={{ once: true }}
          >
            OUR VISION
          </motion.h1>

          <motion.p
            className="text-white text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
          >
            Our vision is to become a trusted name in real estate by delivering
            exceptional property solutions focusing on transparency, innovation,
            and customer-first service.
          </motion.p>

          {/* Golden Divider */}
          <motion.div
            className="w-32 h-1 bg-[#fdc700] mx-auto mt-8"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.3 }}
            viewport={{ once: true }}
            style={{
              boxShadow: "0 0 20px #fdc700",
            }}
          />
        </div>

        {/* Vision Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {visionData.map((item, index) => (
            <motion.div
              key={item.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              {/* Card Container */}
              <div className="relative bg-gradient-to-b from-[#fdc700]/10 to-[#fdc700]/5 backdrop-blur-sm border border-[#fdc700]/20 rounded-3xl p-8 flex flex-col items-center text-center h-full transition-all duration-300 hover:border-[#fdc700]/50 hover:bg-[#fdc700]/15">
                {/* Icon */}
                <motion.div
                  className="mb-6"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  <motion.div
                    style={{
                      filter:
                        hoveredCard === item.id
                          ? "drop-shadow(0 0 20px #fdc700)"
                          : "none",
                    }}
                    animate={{
                      filter:
                        hoveredCard === item.id
                          ? "drop-shadow(0 0 20px #fdc700)"
                          : "none",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.icon}
                  </motion.div>
                </motion.div>

                {/* Title */}
                <motion.h3
                  className="text-[#fdc700] text-xl font-bold mb-6 tracking-wider group-hover:text-white transition-colors duration-300"
                  style={{
                    textShadow:
                      hoveredCard === item.id
                        ? "0 0 20px rgba(253, 199, 0, 0.8)"
                        : "none",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 1 }}
                  viewport={{ once: true }}
                >
                  {item.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  className="text-gray-300 text-base leading-relaxed group-hover:text-white transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 1.2 }}
                  viewport={{ once: true }}
                >
                  {item.description}
                </motion.p>

                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredCard === item.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    boxShadow: "0 0 40px rgba(253, 199, 0, 0.3)",
                  }}
                />

                {/* Bottom Accent Line */}
                <motion.div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-[#fdc700] rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: hoveredCard === item.id ? "80%" : "0%",
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    boxShadow:
                      hoveredCard === item.id ? "0 0 15px #fdc700" : "none",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center space-x-4 bg-[#fdc700]/10 border border-[#fdc700]/30 rounded-full px-10 py-5 cursor-pointer group"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(253, 199, 0, 0.2)",
              boxShadow: "0 0 30px rgba(253, 199, 0, 0.4)",
              y: -3,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span
              className="text-[#fdc700] font-medium tracking-wide"
              style={{ textShadow: "0 0 15px rgba(253, 199, 0, 0.5)" }}
            >
              Join Our Vision
            </span>
            <motion.svg
              className="w-5 h-5 text-[#fdc700]"
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
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-1 h-32 bg-gradient-to-b from-[#fdc700]/30 to-transparent"
        style={{ transform: "rotate(45deg)" }}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-1 h-24 bg-gradient-to-b from-[#fdc700]/30 to-transparent"
        style={{ transform: "rotate(-45deg)" }}
        animate={{ opacity: [0.8, 0.3, 0.8] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-1 h-28 bg-gradient-to-b from-[#fdc700]/30 to-transparent"
        style={{ transform: "rotate(12deg)" }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
      />

      {/* Rotating Decorative Circles */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 border border-[#fdc700]/20 rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 60,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-24 h-24 border border-[#fdc700]/15 rounded-full"
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

export default VisionSection;
