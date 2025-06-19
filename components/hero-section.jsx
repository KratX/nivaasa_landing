"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
} from "framer-motion";

const HeroSection = () => {
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

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [slideDirection, setSlideDirection] = useState(1);

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  // Enhanced scroll-based parallax with natural smoothing
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -200]);
  const contentY = useTransform(scrollY, [0, 1000], [0, 100]);
  const overlayOpacity = useTransform(scrollY, [0, 500], [0.2, 0.5]);

  // Refined mouse tracking with smoother springs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMouseX = useSpring(mouseX, {
    stiffness: 50,
    damping: 50,
    mass: 0.5,
    restDelta: 0.001,
  });
  const springMouseY = useSpring(mouseY, {
    stiffness: 50,
    damping: 50,
    mass: 0.5,
    restDelta: 0.001,
  });

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const maxMove = 30; // Reduced for subtlety
      mouseX.set(((e.clientX - rect.left - centerX) / centerX) * maxMove);
      mouseY.set(((e.clientY - rect.top - centerY) / centerY) * maxMove);
    }
  };

  // Smoother slide variants with refined timing
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
      rotateY: direction > 0 ? 15 : -15,
      filter: "blur(8px)",
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      filter: "blur(0px)",
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.05,
      rotateY: direction < 0 ? 15 : -15,
      filter: "blur(8px)",
    }),
  };

  // Refined text animation variants with smoother transitions
  const textVariants = {
    subtitle: {
      hidden: {
        x: -100,
        opacity: 0,
        rotateX: -45,
        filter: "blur(10px)",
      },
      visible: {
        x: 0,
        opacity: 1,
        rotateX: 0,
        filter: "blur(0px)",
        transition: {
          type: "spring",
          stiffness: 80,
          damping: 25,
          mass: 0.8,
          delay: 0.3,
        },
      },
      exit: {
        x: 100,
        opacity: 0,
        rotateX: 45,
        filter: "blur(10px)",
        transition: {
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
    title: {
      hidden: {
        y: 80,
        opacity: 0,
        scale: 0.8,
        filter: "blur(15px)",
      },
      visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 0.6,
          delay: 0.6,
        },
      },
      exit: {
        y: -50,
        opacity: 0,
        scale: 0.9,
        filter: "blur(15px)",
        transition: {
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
    description: {
      hidden: {
        x: 150,
        opacity: 0,
        rotateY: 45,
        filter: "blur(8px)",
      },
      visible: {
        x: 0,
        opacity: 1,
        rotateY: 0,
        filter: "blur(0px)",
        transition: {
          type: "spring",
          stiffness: 90,
          damping: 30,
          mass: 0.7,
          delay: 0.9,
        },
      },
      exit: {
        x: -150,
        opacity: 0,
        rotateY: -45,
        filter: "blur(8px)",
        transition: {
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setSlideDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000); // Slightly longer for better UX

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  // Navigation functions
  const nextSlide = () => {
    setSlideDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setSlideDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Touch handlers
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

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // Smoother parallax transforms
  const dynamicScale = useTransform(scrollY, [0, 1000], [1, 1.1]);
  const dynamicX = useTransform(springMouseX, [-30, 30], [-15, 15]);
  const dynamicY = useTransform(springMouseY, [-30, 30], [-10, 10]);
  const subtitleX = useTransform(springMouseX, [-30, 30], [-3, 3]);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-gray-900"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ perspective: "1200px" }}
    >
      {/* Enhanced Parallax Background */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          y: backgroundY,
          x: dynamicX,
        }}
      >
        <AnimatePresence mode="wait" custom={slideDirection}>
          {slides.map(
            (slide, index) =>
              index === currentSlide && (
                <motion.div
                  key={slide.id}
                  custom={slideDirection}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: {
                      type: "spring",
                      stiffness: 200,
                      damping: 30,
                      mass: 0.8,
                    },
                    opacity: {
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                    scale: {
                      duration: 1,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                    rotateY: {
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                    filter: {
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  {/* Refined Background with Subtle Parallax */}
                  <motion.div
                    className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover"
                    style={{
                      backgroundImage: `url(${slide.backgroundImage})`,
                      scale: dynamicScale,
                      x: dynamicX,
                      y: dynamicY,
                    }}
                    animate={{
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      scale: {
                        duration: 25,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    {/* Smoother Overlay Animation */}
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        opacity: overlayOpacity,
                        background:
                          "linear-gradient(45deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1), rgba(0,0,0,0.3))",
                      }}
                      animate={{
                        background: [
                          "linear-gradient(45deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1), rgba(0,0,0,0.3))",
                          "linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.3), rgba(0,0,0,0.1))",
                          "linear-gradient(45deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1), rgba(0,0,0,0.3))",
                        ],
                      }}
                      transition={{
                        duration: 12,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                </motion.div>
              )
          )}
        </AnimatePresence>
      </motion.div>

      {/* Enhanced Content with Smooth Scroll Parallax */}
      <motion.div
        className="relative z-10 flex flex-col items-start justify-center h-full px-4 sm:px-6 lg:px-8"
        style={{
          y: contentY,
          x: dynamicX,
        }}
      >
        <div className="max-w-4xl pl-8 ml-0 text-left sm:pl-12 md:pl-16 lg:pl-20">
          <AnimatePresence mode="wait">
            {slides.map(
              (slide, index) =>
                index === currentSlide && (
                  <motion.div key={slide.id} className="space-y-6">
                    {/* Refined Subtitle Animation */}
                    <motion.div
                      variants={textVariants.subtitle}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="mb-4 sm:mb-6"
                      style={{
                        x: subtitleX,
                      }}
                    >
                      <motion.p
                        className="text-sm font-bold tracking-wider text-left text-white uppercase sm:text-base md:text-lg opacity-90"
                        animate={{
                          textShadow: [
                            "0 0 8px rgba(255,255,255,0.3)",
                            "0 0 12px rgba(255,255,255,0.5)",
                            "0 0 8px rgba(255,255,255,0.3)",
                          ],
                        }}
                        transition={{
                          textShadow: {
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          },
                        }}
                        whileHover={{
                          scale: 1.02,
                          x: 5,
                          transition: {
                            type: "spring",
                            stiffness: 400,
                            damping: 25,
                          },
                        }}
                      >
                        {slide.subtitle}
                      </motion.p>
                    </motion.div>

                    {/* Enhanced Title Animation */}
                    <motion.div
                      variants={textVariants.title}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="px-10 py-1 mb-6 bg-white sm:mb-8 w-fit"
                      style={{
                        rotateX: dynamicY,
                        rotateY: dynamicX,
                      }}
                    >
                      <motion.h3
                        className="w-full font-sans text-2xl font-bold leading-tight tracking-tight text-left text-transparent sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl text-nowrap bg-clip-text"
                        style={{
                          backgroundImage: `url(${slide.backgroundImage})`,
                          backgroundSize: "200% 200%",
                          backgroundPosition: "center",
                          backgroundAttachment: "fixed",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                        animate={{
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                          backgroundPosition: {
                            duration: 20,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          },
                        }}
                        whileHover={{
                          scale: 1.02,
                          y: -2,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          },
                        }}
                      >
                        {slide.title}
                      </motion.h3>
                    </motion.div>

                    {/* Refined Description Animation */}
                    <motion.div
                      variants={textVariants.description}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      style={{
                        y: dynamicY,
                      }}
                    >
                      <motion.p
                        className="max-w-2xl text-base text-left text-gray-100 sm:text-lg md:text-xl font-base"
                        animate={{
                          opacity: [0.85, 1, 0.85],
                        }}
                        transition={{
                          opacity: {
                            duration: 5,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          },
                        }}
                        whileHover={{
                          x: 8,
                          scale: 1.01,
                          color: "#ffffff",
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                          },
                        }}
                      >
                        {slide.description}
                      </motion.p>
                    </motion.div>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Refined Navigation Controls */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{
          y: isInView ? 0 : 30,
          opacity: isInView ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 20,
          delay: 1.8,
        }}
        className="absolute z-20 hidden transform -translate-x-1/2 sm:flex bottom-6 md:bottom-8 left-1/2"
        style={{
          x: dynamicX,
        }}
      >
        <div className="flex space-x-6">
          <motion.button
            onClick={prevSlide}
            className="p-4 text-white transition-colors duration-300 border rounded-full backdrop-blur-md bg-white/10 border-white/20"
            whileHover={{
              scale: 1.1,
              rotate: -5,
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              borderColor: "rgba(255, 255, 255, 0.3)",
              boxShadow: "0 8px 25px rgba(255, 255, 255, 0.15)",
            }}
            whileTap={{
              scale: 0.95,
              rotate: -8,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            onClick={nextSlide}
            className="p-4 text-white transition-colors duration-300 border rounded-full backdrop-blur-md bg-white/10 border-white/20"
            whileHover={{
              scale: 1.1,
              rotate: 5,
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              borderColor: "rgba(255, 255, 255, 0.3)",
              boxShadow: "0 8px 25px rgba(255, 255, 255, 0.15)",
            }}
            whileTap={{
              scale: 0.95,
              rotate: 8,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
