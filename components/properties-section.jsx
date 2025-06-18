"use client";

import { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

/**
 * Enhanced Property Card Component with Framer Motion
 */
const PropertyCard = ({ property, index, onPropertyClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, threshold: 0.3 });
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const imageVariants = {
    rest: {
      scale: 1,
      rotateY: 0,
    },
    hover: {
      scale: 1.05,
      rotateY: 5,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const overlayVariants = {
    rest: {
      opacity: 0,
      scale: 0.8,
    },
    hover: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      x: property.imagePosition === "left" ? 50 : -50,
      y: 30,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(255, 193, 7, 0.3)",
    },
    tap: { scale: 0.95 },
  };

  return (
    <motion.section
      ref={cardRef}
      className="min-h-screen flex items-center justify-center p-8 lg:p-16 relative"
      style={{ y, opacity }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Floating Particles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/60 rounded-full"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      {/* Property Content Grid */}
      <div
        className={`container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
          property.imagePosition === "right" ? "lg:grid-flow-col-dense" : ""
        }`}
      >
        {/* Property Image */}
        <motion.div
          className={`relative group cursor-pointer perspective-1000 ${
            property.imagePosition === "right" ? "lg:col-start-2" : ""
          }`}
          variants={imageVariants}
          initial="rest"
          whileHover="hover"
          onClick={() => onPropertyClick(property.id)}
        >
          {/* Image Container */}
          <motion.div
            className="relative overflow-hidden rounded-2xl shadow-2xl"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <motion.img
              src={property.image || "/placeholder.svg?height=500&width=700"}
              alt={`${property.name} - ${property.type}`}
              className="w-full h-96 lg:h-[500px] object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />

            {/* Gradient Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
              variants={overlayVariants}
            />

            {/* Hover Content */}
            <motion.div
              className="absolute bottom-6 left-6 right-6"
              variants={overlayVariants}
            >
              <motion.button
                className="bg-yellow-400 text-black px-6 py-3 font-bold text-sm tracking-wider hover:bg-yellow-300 transition-colors duration-300"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                EXPLORE PROJECT
              </motion.button>
            </motion.div>

            {/* Animated Border */}
            <motion.div
              className="absolute inset-0 border-2 border-yellow-400/50 rounded-2xl"
              initial={{ opacity: 0, scale: 1.05 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Decorative Frame */}
          <motion.div
            className="absolute -inset-4 border border-yellow-400/30 rounded-2xl pointer-events-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          />
        </motion.div>

        {/* Property Information */}
        <motion.div
          className={`space-y-8 ${
            property.imagePosition === "right"
              ? "lg:col-start-1 lg:row-start-1"
              : ""
          }`}
          variants={contentVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Decorative Line */}
          <motion.div
            className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 64 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          />

          {/* Property Name */}
          <motion.h2
            className="text-4xl lg:text-5xl xl:text-6xl font-light text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text leading-tight tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {property.name}
          </motion.h2>

          {/* Property Description */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <p className="text-white text-lg lg:text-xl leading-relaxed font-light max-w-2xl">
              {property.description}
            </p>

            {/* Property Details */}
            <div className="space-y-4">
              {[
                { label: "Location", value: property.location },
                { label: "Type", value: property.type },
              ].map((detail, idx) => (
                <motion.div
                  key={detail.label}
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + idx * 0.1 }}
                >
                  <motion.div
                    className="w-3 h-3 bg-yellow-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: idx * 0.5,
                    }}
                  />
                  <span className="text-gray-300 text-base">
                    <span className="text-yellow-400 font-medium">
                      {detail.label}:
                    </span>{" "}
                    {detail.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <motion.button
              onClick={() => onPropertyClick(property.id)}
              className="bg-yellow-400 text-black px-8 py-4 font-bold text-sm tracking-wider hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              VIEW DETAILS
            </motion.button>

            <motion.button
              className="border border-white text-white px-8 py-4 font-medium text-sm tracking-wider hover:bg-white hover:text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              SCHEDULE VISIT
            </motion.button>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            className="pt-8 border-t border-yellow-400/20"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span className="text-yellow-400/80">
                Premium Development by Nivaasa
              </span>
              <div className="flex space-x-4 items-center">
                {["Luxury Living", "Prime Location"].map((item, idx) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 + idx * 0.2 }}
                  >
                    {idx > 0 && <span className="mr-4">•</span>}
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

/**
 * Enhanced Background Effects Component
 */
const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Ambient Light Effects */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.5, 0.2],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-full bg-yellow-400"
            style={{ left: `${i * 5}%` }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 2, delay: i * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * Main Enhanced Property Showcase Component
 */
const PropertyShowcase = () => {
  const [activeSection, setActiveSection] = useState(null);

  const properties = [
    {
      id: "elan",
      name: "NIVAASA ELAN",
      image: "/1.jpg",
      description:
        "Nivaasa Elan is the crown jewel of Nivaasa, located on the prestigious Golf Course Road in Gurgaon. These premium high-rise residences redefine luxury with expansive layouts, world-class amenities, and panoramic views of the city skyline and lush green golf course.",
      location: "Golf Course Road, Gurgaon",
      type: "High-Rise Luxury Residences",
      imagePosition: "left",
    },
    {
      id: "verve",
      name: "NIVAASA VERVE",
      image: "/2.jpg",
      description:
        "Nestled in Green Tech City, Gurgaon Sector 22, Nivaasa Verve is an elegant residential enclave that offers a perfect blend of contemporary design and modern low-rise buildings framed by lush landscaping and tree-lined walkways.",
      location: "Green Tech City, Gurgaon Sector 22",
      type: "Low-Rise Residential Enclave",
      imagePosition: "right",
    },
    {
      id: "axis",
      name: "NIVAASA AXIS",
      image: "/3.png",
      description:
        "Nivaasa Axis is an upscale residential enclave located in Noida's Sector 117—a rapidly evolving corridor known for its excellent infrastructure and connectivity. This premium gated community offers spacious apartments with high-end finishes.",
      location: "Noida Sector 117",
      type: "Upscale Residential Enclave",
      imagePosition: "left",
    },
    {
      id: "retreat",
      name: "NIVAASA RETREAT",
      image: "/4.png",
      description:
        "Nivaasa Retreat in Sector 56, nestled in the scenic Aravalli hills of Gurgaon, is an exclusive Airbnb gateway that offers a serene escape from city life. This charming villa-style retreat features spacious accommodations with premium amenities.",
      location: "Sector 56, Aravalli Hills, Gurgaon",
      type: "Exclusive Retreat & Airbnb Gateway",
      imagePosition: "right",
    },
    {
      id: "serene",
      name: "NIVAASA SERENE",
      image: "/5.png",
      description:
        "Nestled in the heart of Sector 62, Noida, Nivaasa Serene is a refined residential venture designed for modern urban living. This thoughtfully crafted community offers premium residences with elegant interiors and world-class amenities.",
      location: "Sector 62, Noida",
      type: "Modern Urban Residential Community",
      imagePosition: "left",
    },
    {
      id: "live",
      name: "LIVE NIVAASA",
      image: "/6.png",
      description:
        "Live Nivaasa is a stylish BnB retreat nestled on the serene slopes of the Aravalli hills in Sector 56, Gurgaon. Designed as an exclusive haven, this home-away-from-home blends contemporary comforts with nature-inspired charm.",
      location: "Sector 56, Aravalli Hills, Gurgaon",
      type: "Stylish BnB Retreat",
      imagePosition: "right",
    },
  ];

  const handlePropertyClick = (propertyId) => {
    setActiveSection(propertyId);
    console.log(`Viewing details for: ${propertyId}`);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background Effects */}
      <BackgroundEffects />

      {/* Main Content */}
      <div className="relative z-10">
        {properties.map((property, index) => (
          <div key={property.id}>
            <PropertyCard
              property={property}
              index={index}
              onPropertyClick={handlePropertyClick}
            />
            {index < properties.length - 1 && (
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent mx-8"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.5 }}
                viewport={{ once: true }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyShowcase;
