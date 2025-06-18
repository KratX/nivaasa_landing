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

  // Scroll-based parallax
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -300]);
  const contentY = useTransform(scrollY, [0, 1000], [0, 150]);
  const overlayOpacity = useTransform(scrollY, [0, 500], [0.3, 0.7]);

  // Mouse tracking for advanced parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMouseX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springMouseY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      mouseX.set((e.clientX - rect.left - centerX) / 20);
      mouseY.set((e.clientY - rect.top - centerY) / 20);
    }
  };

  // Advanced slide variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
      filter: "blur(10px)",
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
      scale: 1.2,
      rotateY: direction < 0 ? 45 : -45,
      filter: "blur(10px)",
    }),
  };

  // Text animation variants
  const textVariants = {
    subtitle: {
      hidden: {
        x: -200,
        opacity: 0,
        rotateX: -90,
        filter: "blur(20px)",
      },
      visible: {
        x: 0,
        opacity: 1,
        rotateX: 0,
        filter: "blur(0px)",
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: 0.2,
          duration: 1.2,
        },
      },
      exit: {
        x: 200,
        opacity: 0,
        rotateX: 90,
        filter: "blur(20px)",
        transition: { duration: 0.6 },
      },
    },
    title: {
      hidden: {
        y: 150,
        opacity: 0,
        scale: 0.3,
        filter: "blur(30px)",
      },
      visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.5,
          duration: 1.2,
        },
      },
      exit: {
        y: -100,
        opacity: 0,
        scale: 0.8,
        filter: "blur(20px)",
        transition: {
          duration: 0.6,
          ease: "easeInOut",
        },
      },
    },
    description: {
      hidden: {
        x: 300,
        opacity: 0,
        rotateY: 90,
        filter: "blur(15px)",
      },
      visible: {
        x: 0,
        opacity: 1,
        rotateY: 0,
        filter: "blur(0px)",
        transition: {
          type: "spring",
          stiffness: 120,
          damping: 25,
          delay: 0.8,
          duration: 1,
        },
      },
      exit: {
        x: -300,
        opacity: 0,
        rotateY: -90,
        filter: "blur(15px)",
        transition: { duration: 0.5 },
      },
    },
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setSlideDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

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

  // Define these outside the component to avoid recreating them on every render
  const dynamicScale = useTransform(scrollY, [0, 1000], [1, 1.2]);
  const dynamicX = useTransform(springMouseX, [-50, 50], [-30, 30]);
  const dynamicY = useTransform(springMouseY, [-50, 50], [-20, 20]);

  const subtitleX = useTransform(springMouseX, [-50, 50], [-5, 5]);

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
      style={{ perspective: "1000px" }}
    >
      {/* Advanced Parallax Background */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          y: backgroundY,
          x: useTransform(springMouseX, [-50, 50], [-20, 20]),
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
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.8 },
                    scale: { duration: 1.2 },
                    rotateY: { duration: 1 },
                    filter: { duration: 0.8 },
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  {/* Dynamic Background with Advanced Parallax */}
                  <motion.div
                    className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${slide.backgroundImage})`,
                      scale: dynamicScale,
                      x: dynamicX,
                      y: dynamicY,
                    }}
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      scale: {
                        duration: 20,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    {/* Dynamic Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"
                      style={{ opacity: overlayOpacity }}
                      animate={{
                        background: [
                          "linear-gradient(45deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1), rgba(0,0,0,0.3))",
                          "linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.3), rgba(0,0,0,0.1))",
                          "linear-gradient(45deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1), rgba(0,0,0,0.3))",
                        ],
                      }}
                      transition={{
                        duration: 8,
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

      {/* Advanced Content with Scroll Parallax */}
      <motion.div
        className="relative z-10 flex flex-col justify-center items-start h-full px-4 sm:px-6 lg:px-8"
        style={{
          y: contentY,
          x: useTransform(springMouseX, [-50, 50], [-10, 10]),
        }}
      >
        <div className="text-left max-w-4xl ml-0 pl-8 sm:pl-12 md:pl-16 lg:pl-20">
          <AnimatePresence mode="wait">
            {slides.map(
              (slide, index) =>
                index === currentSlide && (
                  <motion.div key={slide.id} className="space-y-6">
                    {/* Advanced Subtitle Animation */}
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
                        className="text-sm sm:text-base text-white md:text-lg font-bold tracking-wider uppercase opacity-90 text-left"
                        animate={{
                          textShadow: [
                            "0 0 10px rgba(255,255,255,0.5)",
                            "0 0 20px rgba(255,255,255,0.8)",
                            "0 0 10px rgba(255,255,255,0.5)",
                          ],
                        }}
                        transition={{
                          textShadow: {
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          },
                        }}
                        whileHover={{
                          scale: 1.05,
                          x: 10,
                          transition: { duration: 0.3 },
                        }}
                      >
                        {slide.subtitle}
                      </motion.p>
                    </motion.div>

                    {/* Advanced Title Animation */}
                    <motion.div
                      variants={textVariants.title}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="mb-6 sm:mb-8 bg-white w-fit py-1 px-10"
                      style={{
                        rotateX: useTransform(springMouseY, [-50, 50], [-2, 2]),
                        rotateY: useTransform(springMouseX, [-50, 50], [-2, 2]),
                      }}
                    >
                      <motion.h1
                        className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl w-full xl:text-8xl font-bold tracking-tight leading-tight text-nowrap text-transparent bg-clip-text text-left"
                        style={{
                          backgroundImage: `url(${slide.backgroundImage})`,
                          backgroundSize: "300% 300%",
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
                            duration: 15,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          },
                        }}
                        whileHover={{
                          scale: 1.05,
                          y: -5,
                          transition: {
                            type: "spring",
                            stiffness: 400,
                            damping: 20,
                          },
                        }}
                      >
                        {slide.title}
                      </motion.h1>
                    </motion.div>

                    {/* Advanced Description Animation */}
                    <motion.div
                      variants={textVariants.description}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      style={{
                        y: useTransform(springMouseY, [-50, 50], [-3, 3]),
                      }}
                    >
                      <motion.p
                        className="text-gray-100 text-base sm:text-lg md:text-xl font-base max-w-2xl text-left"
                        animate={{
                          opacity: [0.8, 1, 0.8],
                        }}
                        transition={{
                          opacity: {
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          },
                        }}
                        whileHover={{
                          x: 15,
                          scale: 1.02,
                          color: "#ffffff",
                          transition: {
                            type: "spring",
                            stiffness: 400,
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

      {/* Advanced Navigation Controls */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{
          y: isInView ? 0 : 50,
          opacity: isInView ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: 1.5,
        }}
        className="hidden sm:flex absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        style={{
          x: useTransform(springMouseX, [-50, 50], [-5, 5]),
        }}
      >
        <div className="flex space-x-6">
          <motion.button
            onClick={prevSlide}
            className="p-4 text-white transition-colors duration-300 rounded-full backdrop-blur-md bg-white/10 border border-white/20"
            whileHover={{
              scale: 1.2,
              rotate: -10,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderColor: "rgba(255, 255, 255, 0.4)",
              boxShadow: "0 10px 30px rgba(255, 255, 255, 0.2)",
            }}
            whileTap={{
              scale: 0.9,
              rotate: -15,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 17,
            }}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            onClick={nextSlide}
            className="p-4 text-white transition-colors duration-300 rounded-full backdrop-blur-md bg-white/10 border border-white/20"
            whileHover={{
              scale: 1.2,
              rotate: 10,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderColor: "rgba(255, 255, 255, 0.4)",
              boxShadow: "0 10px 30px rgba(255, 255, 255, 0.2)",
            }}
            whileTap={{
              scale: 0.9,
              rotate: 15,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 17,
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
