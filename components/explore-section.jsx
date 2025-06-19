"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const ExploreSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const properties = [
    {
      id: "axis",
      location: "NOIDA",
      title: "NIVAASA AXIS",
      subtitle: "Contemporary Villas",
      description:
        "Nivaasa Axis is a curated collection of contemporary Villas in Noida, designed to offer a rare blend of privacy, natural light, and architectural clarity. With open courtyards, large windows, and thoughtfully planned layouts.",
      image: "/explore-1.png",
      accent: "#fdc700",
      gradient: "from-yellow-900/20 via-yellow-800/10 to-transparent",
      features: ["Private Courtyards", "Natural Light", "Modern Architecture"],
    },
    {
      id: "retreat",
      location: "GURGAON",
      title: "NIVAASA RETREAT",
      subtitle: "Aravalli Hills Getaway",
      description:
        "Nivaasa Retreat is a premium Airbnb getaway nestled in the tranquil embrace of the Aravalli Hills. Designed for those seeking quiet luxury, it offers a perfect blend of nature, comfort, and curated experiences.",
      image: "/explore-2.png",
      accent: "#fdc700",
      gradient: "from-yellow-900/20 via-yellow-800/10 to-transparent",
      features: ["Hill Views", "Luxury Comfort", "Curated Experiences"],
    },
    {
      id: "serene",
      location: "NOIDA",
      title: "NIVAASA SERENE",
      subtitle: "Modern Apartments",
      description:
        "Nivaasa Serene is a modern apartment community in Noida, designed for those who value calm, comfort, and thoughtful living. With well-planned homes, landscaped open spaces, and natural ventilation.",
      image: "/explore-3.png",
      accent: "#fdc700",
      gradient: "from-yellow-900/20 via-yellow-800/10 to-transparent",
      features: [
        "Landscaped Spaces",
        "Natural Ventilation",
        "Thoughtful Design",
      ],
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Advanced text animation variants
  const elasticPopVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      y: 100,
      rotateX: -90,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
        duration: 1.2,
      },
    },
  };

  const bouncePopVariants = {
    hidden: {
      opacity: 0,
      scale: 0.3,
      y: 50,
      rotateZ: -180,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateZ: 0,
      transition: {
        type: "spring",
        damping: 8,
        stiffness: 300,
        duration: 1.5,
      },
    },
  };

  const fadeSlideVariants = {
    hidden: {
      opacity: 0,
      x: -100,
      scale: 0.8,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const glowFadeVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      filter: "blur(20px) brightness(0.3)",
      textShadow: "0 0 0px #fdc700",
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px) brightness(1)",
      textShadow: "0 0 30px #fdc700, 0 0 60px #fdc700, 0 0 90px #fdc700",
      transition: {
        duration: 2,
        ease: "easeOut",
      },
    },
  };

  const typewriterAdvancedVariants = {
    hidden: {
      width: 0,
      opacity: 0,
    },
    visible: {
      width: "100%",
      opacity: 1,
      transition: {
        width: {
          duration: 2.5,
          ease: "easeInOut",
        },
        opacity: {
          duration: 0.5,
          delay: 0.2,
        },
      },
    },
  };

  const letterPopVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      rotateX: -90,
      scale: 0.3,
      filter: "blur(5px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 400,
        duration: 1,
      },
    },
  };

  const wordFadeVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
      filter: "blur(3px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const wordContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const AdvancedAnimatedText = ({
    text,
    className,
    delay = 0,
    variant = "elasticPop",
    style = {},
  }) => {
    const letters = text.split("");

    const getVariant = () => {
      switch (variant) {
        case "elasticPop":
          return elasticPopVariants;
        case "bouncePop":
          return bouncePopVariants;
        case "fadeSlide":
          return fadeSlideVariants;
        case "glowFade":
          return glowFadeVariants;
        default:
          return elasticPopVariants;
      }
    };

    if (variant === "typewriterAdvanced") {
      return (
        <div className="relative overflow-hidden">
          <motion.div
            className={`${className} relative`}
            variants={typewriterAdvancedVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              ...style,
            }}
          >
            {text}
            <motion.span
              className="absolute right-0 top-0 w-1 h-full bg-[#fdc700]"
              animate={{
                opacity: [1, 0, 1],
                scaleY: [1, 0.8, 1],
              }}
              transition={{
                duration: 1,
                repeat: 4,
                delay: delay,
              }}
            />
          </motion.div>
        </div>
      );
    }

    if (variant === "letterPop") {
      return (
        <motion.div
          className={className}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ display: "inline-block", ...style }}
        >
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              className={className} // ✅ Apply font styles to each animated letter
              variants={letterPopVariants}
              style={{
                display: "inline-block",
                marginRight: letter === " " ? "0.25em" : "0",
              }}
              transition={{
                delay: delay + index * 0.05,
                type: "spring",
                damping: 12 + Math.random() * 8,
                stiffness: 300 + Math.random() * 200,
              }}
              whileHover={{
                scale: 1.2,
                color: "#fdc700",
                textShadow: "0 0 20px #fdc700",
                transition: { duration: 0.2 },
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.div>
      );
    }

    return (
      <motion.div
        className={className}
        variants={getVariant()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={style}
        transition={{ delay }}
      >
        {text}
      </motion.div>
    );
  };

  const AdvancedAnimatedParagraph = ({
    text,
    className,
    delay = 0,
    variant = "wordFade",
  }) => {
    const words = text.split(" ");

    return (
      <motion.div
        className={className}
        variants={wordContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            className="inline-block mr-2"
            variants={wordFadeVariants}
            transition={{
              delay: delay + index * 0.06,
              duration: 0.8 + Math.random() * 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={{
              scale: 1.05,
              color: "#fdc700",
              transition: { duration: 0.2 },
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const imageVariants = {
    hidden: {
      scale: 1.2,
      opacity: 0,
      rotateY: -15,
      filter: "blur(10px)",
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    hover: {
      scale: 1.05,
      rotateY: 5,
      filter: "brightness(1.1)",
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const FloatingElements = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#fdc700]/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.4, 1, 0.4],
            scale: [1, 2, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="relative bg-black">
      <FloatingElements />

      {/* Hero Section */}
      <motion.section
        className="relative flex items-center justify-center min-h-screen overflow-hidden bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

        <motion.div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(circle at 60% 40%, #fdc700 0%, transparent 50%)`,
          }}
        />

        <motion.div
          className="z-10 px-8 text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          <motion.div className="mb-16">
            <AdvancedAnimatedText
              text="NIVAASA"
              className="mb-8 text-6xl font-thin tracking-wider md:text-8xl font-allenoire lg:text-9xl"
              delay={0.5}
              variant="glowFade"
              style={{
                color: "#fdc700",
                textShadow:
                  "0 0 40px #fdc700, 0 0 80px #fdc700, 0 0 120px #fdc700",
              }}
            />

            <AdvancedAnimatedText
              text="LUXURY LIVING REDEFINED"
              className="text-xl md:text-2xl font-light tracking-widest text-[#fdc700]/90"
              delay={2}
              variant="typewriterAdvanced"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 1.2,
              delay: 3.5,
              type: "spring",
              damping: 10,
              stiffness: 200,
            }}
          >
            <motion.button
              className="bg-gradient-to-r from-[#fdc700] to-[#fdc700]/80 text-black px-12 py-4 text-lg font-bold tracking-wider uppercase relative overflow-hidden group rounded-lg"
              whileHover={{
                scale: 1.08,
                boxShadow: "0 25px 50px rgba(253, 199, 0, 0.5)",
                y: -5,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById("section-0")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              <span className="relative z-10">EXPLORE COLLECTION</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#fdc700]/80 to-[#fdc700]"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute transform -translate-x-1/2 bottom-8 left-1/2"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-6 h-10 border-2 border-[#fdc700]/60 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-[#fdc700] rounded-full mt-2"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Property Sections */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {properties.map((property, index) => (
          <motion.section
            key={property.id}
            id={`section-${index}`}
            className="relative flex items-center min-h-screen overflow-hidden bg-black"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${property.gradient}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 2 }}
              viewport={{ once: true }}
            />

            <div className="container relative z-10 px-8 py-16 mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
                {/* Image Section */}
                <motion.div
                  className={`${
                    index % 2 === 0 ? "order-1" : "order-2"
                  } relative`}
                  variants={imageVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                >
                  <motion.div className="relative group">
                    <motion.div
                      className="absolute -inset-4 bg-gradient-to-r from-transparent via-[#fdc700]/20 to-transparent rounded-2xl"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    />

                    <motion.img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-[600px] object-cover rounded-2xl shadow-2xl border border-[#fdc700]/30"
                      whileHover={{
                        boxShadow: "0 30px 60px rgba(253, 199, 0, 0.4)",
                        borderColor: "#fdc700",
                      }}
                      transition={{ duration: 0.4 }}
                    />

                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-2xl"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.div>
                </motion.div>

                {/* Content Section */}
                <motion.div
                  className={`${
                    index % 2 === 0 ? "order-2" : "order-1"
                  } space-y-10`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="inline-block"
                    initial={{ opacity: 0, x: -30, scale: 0.7 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{
                      duration: 1,
                      delay: 0.2,
                      type: "spring",
                      damping: 15,
                      stiffness: 300,
                    }}
                    viewport={{ once: true }}
                  >
                    <motion.span
                      className="px-6 py-3 text-sm font-bold tracking-widest uppercase border-2 rounded-full bg-black/60 backdrop-blur-sm text-[#fdc700] border-[#fdc700]"
                      style={{
                        textShadow: "0 0 15px #fdc700",
                      }}
                      whileHover={{
                        scale: 1.1,
                        boxShadow: "0 0 30px rgba(253, 199, 0, 0.6)",
                        backgroundColor: "rgba(253, 199, 0, 0.1)",
                      }}
                    >
                      {property.location}
                    </motion.span>
                  </motion.div>

                  <motion.div>
                    <AdvancedAnimatedText
                      text={property.title}
                      className="mb-6 text-5xl leading-tight lg:text-7xl font-allenoire"
                      delay={0.5}
                      variant="letterPop"
                      style={{
                        color: "#fdc700",
                        textShadow: "0 0 40px rgba(253, 199, 0, 0.8)",
                      }}
                    />

                    <AdvancedAnimatedText
                      text={property.subtitle}
                      className="text-xl font-light font-poppins mb-8 text-[#fdc700]/80"
                      delay={1.5}
                      variant="fadeSlide"
                    />
                  </motion.div>

                  <AdvancedAnimatedParagraph
                    text={property.description}
                    className="max-w-2xl text-lg font-light leading-relaxed text-gray-200 font-safira"
                    delay={2}
                  />

                  <motion.div
                    className="flex flex-wrap gap-4 mb-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 2.5 }}
                    viewport={{ once: true }}
                  >
                    {property.features.map((feature, featureIndex) => (
                      <motion.span
                        key={feature}
                        className="px-5 py-3 bg-gradient-to-r from-[#fdc700]/20 to-[#fdc700]/10 text-[#fdc700] text-sm rounded-full backdrop-blur-sm border border-[#fdc700]/40"
                        initial={{
                          opacity: 0,
                          scale: 0.5,
                          y: 30,
                          rotateZ: -45,
                        }}
                        whileInView={{
                          opacity: 1,
                          scale: 1,
                          y: 0,
                          rotateZ: 0,
                        }}
                        transition={{
                          duration: 0.8,
                          delay: 2.7 + featureIndex * 0.15,
                          type: "spring",
                          damping: 12,
                          stiffness: 200,
                        }}
                        viewport={{ once: true }}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "rgba(253, 199, 0, 0.3)",
                          boxShadow: "0 0 20px rgba(253, 199, 0, 0.4)",
                          y: -3,
                        }}
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </motion.div>

                  <motion.div
                    className="flex flex-col gap-6 sm:flex-row"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 1.2,
                      delay: 3.2,
                      type: "spring",
                      damping: 15,
                      stiffness: 200,
                    }}
                    viewport={{ once: true }}
                  >
                    <motion.button
                      className="px-10 py-4 text-black font-bold tracking-wider uppercase transition-all duration-300 relative overflow-hidden group rounded-lg bg-[#fdc700]"
                      whileHover={{
                        scale: 1.08,
                        boxShadow: "0 25px 50px rgba(253, 199, 0, 0.5)",
                        y: -5,
                      }}
                      whileTap={{ scale: 0.92 }}
                    >
                      <Link to="/properties">
                        <span className="relative z-10">DISCOVER MORE</span>
                      </Link>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[#fdc700]/80 to-[#fdc700]"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.4 }}
                      />
                    </motion.button>

                    <motion.button
                      className="px-10 py-4 border-2 text-[#fdc700] font-bold tracking-wider uppercase hover:bg-[#fdc700] hover:text-black transition-all duration-300 rounded-lg backdrop-blur-sm border-[#fdc700]"
                      whileHover={{
                        scale: 1.08,
                        boxShadow: "0 0 30px rgba(253, 199, 0, 0.4)",
                        y: -5,
                      }}
                      whileTap={{ scale: 0.92 }}
                    >
                      VIEW GALLERY
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute top-1/4 right-10 w-32 h-32 border border-[#fdc700]/40 rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 25,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 left-10 w-24 h-24 border border-[#fdc700]/30 rounded-full"
              animate={{ rotate: -360 }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          </motion.section>
        ))}
      </motion.div>

      {/* Footer Section */}
      <motion.section
        className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-t from-black via-gray-900 to-black"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="z-10 px-8 text-center"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <AdvancedAnimatedText
            text="BEGIN YOUR JOURNEY"
            className="mb-12 text-6xl font-thin tracking-wider md:text-8xl"
            delay={0.3}
            variant="glowFade"
            style={{
              color: "#fdc700",
              textShadow: "0 0 50px #fdc700, 0 0 100px #fdc700",
            }}
          />

          <AdvancedAnimatedParagraph
            text="Experience luxury living like never before. Contact our team to schedule your private viewing."
            className="text-xl text-[#fdc700]/80 font-light mb-16 max-w-2xl mx-auto"
            delay={1.5}
          />

          <motion.button
            className="bg-gradient-to-r from-[#fdc700] to-[#fdc700]/80 text-black px-20 py-6 text-xl font-bold tracking-wider uppercase relative overflow-hidden group rounded-lg"
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 1.5,
              delay: 2.5,
              type: "spring",
              damping: 10,
              stiffness: 200,
            }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 30px 60px rgba(253, 199, 0, 0.6)",
              y: -8,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">CONTACT US TODAY</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#fdc700]/80 to-[#fdc700]"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.4 }}
            />
          </motion.button>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default ExploreSection;
