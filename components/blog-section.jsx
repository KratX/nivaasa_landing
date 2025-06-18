"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Enhanced Article Card Component with Framer Motion
 */
const ArticleCard = ({ image, title, excerpt, onReadMore, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, threshold: 0.2 });

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const imageVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const overlayVariants = {
    rest: { opacity: 0 },
    hover: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const contentVariants = {
    rest: { y: 0 },
    hover: {
      y: -5,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-lg rounded-2xl overflow-hidden border border-yellow-400/20 group"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Animated Border Glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background:
            "linear-gradient(45deg, transparent, rgba(255, 193, 7, 0.3), transparent)",
          padding: "2px",
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Article Image */}
      <div className="relative overflow-hidden h-80 md:h-96">
        <motion.img
          src={image || "/placeholder.svg?height=400&width=600"}
          alt={title}
          className="w-full h-full object-cover"
          variants={imageVariants}
        />

        {/* Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
          variants={overlayVariants}
        />

        {/* Floating Golden Particles */}
        <motion.div
          className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: index * 0.5,
          }}
        />

        <motion.div
          className="absolute bottom-6 left-6 w-1 h-1 bg-yellow-400 rounded-full"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: index * 0.7,
          }}
        />
      </div>

      {/* Article Content */}
      <motion.div className="p-8 relative z-10" variants={contentVariants}>
        <motion.h3
          className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight line-clamp-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.1 }}
        >
          {title}
        </motion.h3>

        <motion.p
          className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 line-clamp-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + index * 0.1 }}
        >
          {excerpt}
        </motion.p>

        {/* Enhanced Read More Button */}
        <motion.button
          onClick={onReadMore}
          className="relative overflow-hidden border-2 border-yellow-400 text-yellow-400 px-8 py-3 rounded-full font-medium text-lg group"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 30px rgba(255, 193, 7, 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + index * 0.1 }}
        >
          <motion.div
            className="absolute inset-0 bg-yellow-400"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
          <span className="relative z-10 group-hover:text-black transition-colors duration-300">
            Read More
          </span>
        </motion.button>
      </motion.div>

      {/* Corner Accent */}
      <motion.div
        className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-yellow-400/30"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 + index * 0.2 }}
      />
    </motion.div>
  );
};

/**
 * Enhanced Discover More Button with Framer Motion
 */
const DiscoverMoreButton = ({ onClick }) => {
  const buttonRef = useRef(null);
  const isInView = useInView(buttonRef, { once: true, threshold: 0.5 });

  return (
    <div className="flex justify-center" ref={buttonRef}>
      <motion.button
        onClick={onClick}
        className="relative overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold text-xl px-12 py-4 rounded-lg shadow-lg group"
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={
          isInView
            ? {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.8, ease: "easeOut" },
              }
            : {}
        }
        whileHover={{
          scale: 1.05,
          boxShadow: "0 20px 40px rgba(255, 193, 7, 0.4)",
          transition: { duration: 0.3 },
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Animated Background Shine */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
        />

        <span className="relative z-10">DISCOVER MORE</span>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-yellow-300/30 rounded-lg"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    </div>
  );
};

/**
 * Enhanced Background Pattern with Animation
 */
const BackgroundPattern = () => {
  const patternVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.1,
      transition: { duration: 2, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="absolute inset-0"
      variants={patternVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated Vertical Lines */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute bg-yellow-400/20"
          style={{
            left: `${i * 7}%`,
            top: 0,
            width: "1px",
            height: "100%",
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{
            duration: 1.5,
            delay: i * 0.1,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Animated Horizontal Lines */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute bg-yellow-400/20"
          style={{
            top: `${i * 10}%`,
            left: 0,
            height: "1px",
            width: "100%",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1.5,
            delay: 0.5 + i * 0.1,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Floating Geometric Shapes */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute w-2 h-2 bg-yellow-400/30 rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + i,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.5,
          }}
        />
      ))}
    </motion.div>
  );
};

/**
 * Main Enhanced Blog Section Component
 */
const BlogSection = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  // Enhanced article data
  const articles = [
    {
      id: 1,
      image: "/blog-1.jpg",
      title:
        "The Shift Towards Open Spaces and Amenities: How Developers Are Meeting Homebuyer",
      excerpt:
        "The Indian real estate landscape has experienced a significant shift in recent years. In addition to factors like affordability and prime location, and modification of modern living spaces...",
    },
    {
      id: 2,
      image: "/blog-2.jpg",
      title: "Beyond the Tech: The Wellbeing Approach to Smart Offices",
      excerpt:
        "India has been steadily moving towards the construction of smart buildings. Over two decades after the IT boom in the late 1990s, numerous IT parks, special economic zones, and smart cities have emerged...",
    },
  ];

  const handleReadMore = (articleId) => {
    setSelectedArticle(articleId);
    console.log(`Reading article ${articleId}`);
  };

  const handleDiscoverMore = () => {
    console.log("Discover more articles");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div
      className="min-h-screen bg-black relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Enhanced Background Pattern */}
      <BackgroundPattern />

      {/* Main Content Container */}
      <motion.div
        className="relative z-10 container mx-auto px-8 py-20 lg:py-28"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20 px-4">
          {articles.map((article, index) => (
            <ArticleCard
              key={article.id}
              image={article.image}
              title={article.title}
              excerpt={article.excerpt}
              onReadMore={() => handleReadMore(article.id)}
              index={index}
            />
          ))}
        </div>

        {/* Discover More Section */}
        <DiscoverMoreButton onClick={handleDiscoverMore} />
      </motion.div>

      {/* Enhanced Decorative Elements */}
      <motion.div
        className="absolute top-1/4 left-8 w-2 h-40 bg-gradient-to-b from-yellow-400/50 to-transparent rounded-full"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 160, opacity: 1 }}
        transition={{ duration: 1.5, delay: 2 }}
      />

      <motion.div
        className="absolute top-1/3 right-8 w-2 h-32 bg-gradient-to-b from-yellow-400/50 to-transparent rounded-full"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 128, opacity: 1 }}
        transition={{ duration: 1.5, delay: 2.2 }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/2 w-40 h-2 bg-gradient-to-r from-yellow-400/50 to-transparent rounded-full transform -translate-x-1/2"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 160, opacity: 1 }}
        transition={{ duration: 1.5, delay: 2.4 }}
      />

      {/* Enhanced Corner Accents */}
      {[
        { position: "top-0 left-0", borders: "border-l-2 border-t-2" },
        { position: "top-0 right-0", borders: "border-r-2 border-t-2" },
        { position: "bottom-0 left-0", borders: "border-l-2 border-b-2" },
        { position: "bottom-0 right-0", borders: "border-r-2 border-b-2" },
      ].map((corner, index) => (
        <motion.div
          key={index}
          className={`absolute ${corner.position} w-32 h-32 ${corner.borders} border-yellow-400/30`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.5 + index * 0.1 }}
        />
      ))}

      {/* Ambient Light Effects */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
};

export default BlogSection;
