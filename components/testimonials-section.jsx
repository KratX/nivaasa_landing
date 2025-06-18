"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TestimonialsSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const testimonialsData = [
    {
      id: 1,
      name: "KHUSHI GUPTA",
      title: "GRAPHIC DESIGNER",
      image: "/khushi.jpg",
      testimonial:
        "NIVAASA MADE OUR HOME BUYING JOURNEY INCREDIBLY SMOOTH. THEIR EXPERTISE AND DEDICATION EXCEEDED OUR EXPECTATIONS.",
      gradient: "from-gray-900 to-gray-800",
    },
    {
      id: 2,
      name: "KRITIKA GROVER",
      title: "CONTENT WRITER",
      image: "/kritika.jpg",
      testimonial:
        "EXCEPTIONAL SERVICE, DEEP MARKET KNOWLEDGE, AND SEAMLESS TRANSACTIONS MADE MY HOME PURCHASE A BREEZE.",
      gradient: "from-gray-900 to-gray-800",
    },
    {
      id: 3,
      name: "SANIA KHAN",
      title: "ARCHITECT",
      image: "/sania.jpg",
      testimonial:
        "FROM THE FIRST SHOWING TO CLOSING, EVERY STEP WAS MANAGED WITH OUTSTANDING PROFESSIONALISM AND SERVICE.",
      gradient: "from-gray-900 to-gray-800",
    },
  ];

  // Advanced animation variants
  const explosivePopVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      y: 100,
      rotateX: -90,
      rotateZ: -180,
      filter: "blur(20px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      rotateZ: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 8,
        stiffness: 200,
        duration: 1.5,
      },
    },
  };

  const letterBurstVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      rotateX: -90,
      scale: 0.3,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 400,
        duration: 1.2,
      },
    },
  };

  const glowExplosionVariants = {
    hidden: {
      opacity: 0,
      scale: 0.3,
      filter: "blur(30px) brightness(0.2)",
      textShadow: "0 0 0px #fdc700",
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px) brightness(1)",
      textShadow: "0 0 40px #fdc700, 0 0 80px #fdc700, 0 0 120px #fdc700",
      transition: {
        duration: 2.5,
        ease: "easeOut",
      },
    },
  };

  const cascadeFadeVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
      filter: "blur(5px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const wordContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.3,
      },
    },
  };

  const ExplosiveAnimatedText = ({
    text,
    className,
    delay = 0,
    variant = "explosivePop",
    style = {},
  }) => {
    const letters = text.split("");

    const getVariant = () => {
      switch (variant) {
        case "explosivePop":
          return explosivePopVariants;
        case "letterBurst":
          return letterBurstVariants;
        case "glowExplosion":
          return glowExplosionVariants;
        case "cascadeFade":
          return cascadeFadeVariants;
        default:
          return explosivePopVariants;
      }
    };

    if (variant === "letterBurst") {
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
              variants={letterBurstVariants}
              style={{
                display: "inline-block",
                marginRight: letter === " " ? "0.25em" : "0",
              }}
              transition={{
                delay: delay + index * 0.04,
                type: "spring",
                damping: 8 + Math.random() * 6,
                stiffness: 300 + Math.random() * 200,
              }}
              whileHover={{
                scale: 1.3,
                color: "#fdc700",
                textShadow: "0 0 25px #fdc700",
                y: -5,
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

  const ExplosiveAnimatedParagraph = ({ text, className, delay = 0 }) => {
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
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.7,
              rotateX: -45,
              filter: "blur(3px)",
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 0.8 + Math.random() * 0.4,
              delay: delay + index * 0.05,
              type: "spring",
              damping: 12,
              stiffness: 200,
            }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.1,
              color: "#fdc700",
              y: -2,
              transition: { duration: 0.2 },
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.8,
      rotateY: -30,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const FloatingParticles = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
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
            duration: 4 + Math.random() * 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <FloatingParticles />

      {/* Static Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23fdc700' strokeWidth='1'%3E%3Cpath d='M10 10 L90 10 L90 90 L10 90 Z'/%3E%3Cpath d='M20 20 L80 20 L80 80 L20 80 Z'/%3E%3Cpath d='M30 30 L70 30 L70 70 L30 70 Z'/%3E%3Cpath d='M10 10 L90 90'/%3E%3Cpath d='M90 10 L10 90'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "150px 150px",
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Section Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <ExplosiveAnimatedText
              text="WHAT PEOPLE SAY"
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-allenoire font-bold mb-8 tracking-wider"
              delay={0.8}
              variant="glowExplosion"
              style={{
                color: "#fdc700",
                textShadow: "0 0 50px #fdc700, 0 0 100px #fdc700",
              }}
            />

            <motion.div
              className="w-32 h-1 bg-[#fdc700] mx-auto"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 128, opacity: 1 }}
              transition={{ duration: 1.5, delay: 2 }}
              viewport={{ once: true }}
              style={{
                boxShadow: "0 0 20px #fdc700",
              }}
            />
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {testimonialsData.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="relative group cursor-pointer"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.3 }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                onClick={() => setSelectedTestimonial(index)}
              >
                {/* Card Background with Gradient */}
                <motion.div
                  className={`bg-gradient-to-br ${testimonial.gradient} rounded-2xl p-8 h-full min-h-[500px] relative overflow-hidden border-2 transition-all duration-500`}
                  style={{
                    borderColor:
                      selectedTestimonial === index
                        ? "#fdc700"
                        : "rgba(253, 199, 0, 0.3)",
                    boxShadow:
                      selectedTestimonial === index
                        ? "0 0 30px rgba(253, 199, 0, 0.5)"
                        : "none",
                  }}
                  whileHover={{
                    borderColor: "#fdc700",
                    boxShadow: "0 0 40px rgba(253, 199, 0, 0.6)",
                  }}
                >
                  {/* Decorative Corner Elements */}
                  <motion.div
                    className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-[#fdc700]/50 rounded-tl-2xl"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.3 + 0.5, duration: 0.8 }}
                    viewport={{ once: true }}
                  />
                  <motion.div
                    className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-[#fdc700]/50 rounded-br-2xl"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.3 + 0.7, duration: 0.8 }}
                    viewport={{ once: true }}
                  />

                  {/* Profile Image */}
                  <motion.div
                    className="flex justify-center mb-8"
                    initial={{ opacity: 0, scale: 0.5, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      delay: index * 0.3 + 0.8,
                      duration: 1,
                      type: "spring",
                      damping: 15,
                      stiffness: 200,
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="relative">
                      <motion.div
                        className="w-40 h-40 rounded-full overflow-hidden border-3 shadow-lg"
                        style={{
                          borderColor: "#fdc700",
                          boxShadow: "0 0 25px rgba(253, 199, 0, 0.4)",
                        }}
                        whileHover={{
                          scale: 1.1,
                          boxShadow: "0 0 40px rgba(253, 199, 0, 0.6)",
                        }}
                      >
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={`${testimonial.name} profile`}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Client Information */}
                  <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.3 + 1, duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <ExplosiveAnimatedText
                      text={testimonial.name}
                      className="text-xl font-bold mb-3 tracking-wide"
                      delay={index * 0.3 + 1.2}
                      variant="letterBurst"
                      style={{
                        color: "#fdc700",
                        textShadow: "0 0 15px rgba(253, 199, 0, 0.5)",
                      }}
                    />

                    <ExplosiveAnimatedText
                      text={testimonial.title}
                      className="text-gray-300 text-sm font-medium tracking-wider uppercase"
                      delay={index * 0.3 + 1.5}
                      variant="cascadeFade"
                    />
                  </motion.div>

                  {/* Testimonial Quote */}
                  <div className="relative">
                    {/* Quote marks */}
                    <motion.div
                      className="absolute -top-4 -left-2 text-6xl text-[#fdc700]/40 font-serif"
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{
                        delay: index * 0.3 + 1.8,
                        duration: 0.8,
                        type: "spring",
                        damping: 15,
                      }}
                      viewport={{ once: true }}
                    >
                      "
                    </motion.div>

                    <ExplosiveAnimatedParagraph
                      text={testimonial.testimonial}
                      className="text-white text-base leading-relaxed font-light relative z-10 text-center px-4"
                      delay={index * 0.3 + 2}
                    />

                    <motion.div
                      className="absolute -bottom-8 -right-2 text-6xl text-[#fdc700]/40 font-serif rotate-180"
                      initial={{ opacity: 0, scale: 0, rotate: 0 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 180 }}
                      transition={{
                        delay: index * 0.3 + 2.5,
                        duration: 0.8,
                        type: "spring",
                        damping: 15,
                      }}
                      viewport={{ once: true }}
                    >
                      "
                    </motion.div>
                  </div>

                  {/* Hover Overlay Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-[#fdc700]/10 to-transparent rounded-2xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="group relative px-12 py-5 bg-transparent border-2 border-[#fdc700] text-[#fdc700] font-bold tracking-wide uppercase transition-all duration-300 overflow-hidden rounded-lg"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(253, 199, 0, 0.5)",
                y: -3,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">SHARE YOUR EXPERIENCE</span>
              <motion.div
                className="absolute inset-0 bg-[#fdc700]"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-1/4 right-20 w-40 h-40 border border-[#fdc700]/20 rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-20 w-32 h-32 border border-[#fdc700]/15 rounded-full"
        animate={{ rotate: -360 }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default TestimonialsSection;
