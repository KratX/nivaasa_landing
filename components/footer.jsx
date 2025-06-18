"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Advanced animation variants
  const explosiveTextVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      y: 80,
      rotateX: -90,
      rotateZ: -45,
      filter: "blur(15px)",
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
        damping: 10,
        stiffness: 200,
        duration: 1.5,
      },
    },
  };

  const letterPopVariants = {
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
        damping: 12,
        stiffness: 400,
        duration: 1,
      },
    },
  };

  const glowBurstVariants = {
    hidden: {
      opacity: 0,
      scale: 0.2,
      filter: "blur(25px) brightness(0.3)",
      textShadow: "0 0 0px #fdc700",
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px) brightness(1)",
      textShadow: "0 0 50px #fdc700, 0 0 100px #fdc700, 0 0 150px #fdc700",
      transition: {
        duration: 2.5,
        ease: "easeOut",
      },
    },
  };

  const cascadeVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.9,
      filter: "blur(4px)",
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
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const wordContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3,
      },
    },
  };

  const ExplosiveAnimatedText = ({
    text,
    className,
    delay = 0,
    variant = "explosiveText",
    style = {},
  }) => {
    const letters = text.split("");

    const getVariant = () => {
      switch (variant) {
        case "explosiveText":
          return explosiveTextVariants;
        case "letterPop":
          return letterPopVariants;
        case "glowBurst":
          return glowBurstVariants;
        case "cascade":
          return cascadeVariants;
        default:
          return explosiveTextVariants;
      }
    };

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
              variants={letterPopVariants}
              style={{
                display: "inline-block",
                marginRight: letter === " " ? "0.25em" : "0",
              }}
              transition={{
                delay: delay + index * 0.03,
                type: "spring",
                damping: 10 + Math.random() * 8,
                stiffness: 350 + Math.random() * 200,
              }}
              whileHover={{
                scale: 1.2,
                color: "#fdc700",
                textShadow: "0 0 20px #fdc700",
                y: -3,
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
              y: 30,
              scale: 0.8,
              rotateX: -30,
              filter: "blur(2px)",
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 0.6 + Math.random() * 0.3,
              delay: delay + index * 0.04,
              type: "spring",
              damping: 15,
              stiffness: 200,
            }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              color: "#fdc700",
              y: -1,
              transition: { duration: 0.2 },
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      url: "#",
    },
    {
      name: "Instagram",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      url: "#",
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      url: "#",
    },
  ];

  const navLinks = [
    { name: "Privacy Policy", url: "#" },
    { name: "Experience Center", url: "#" },
    { name: "Media&News", url: "#" },
  ];

  const FloatingParticles = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(25)].map((_, i) => (
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
            duration: 5 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 4,
          }}
        />
      ))}
    </div>
  );

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      <FloatingParticles />

      {/* Static Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-8">
        <div
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23fdc700' strokeWidth='0.5'%3E%3Crect x='10' y='10' width='80' height='100'/%3E%3Cpath d='M50 10 L50 -40 L120 -15'/%3E%3Cpath d='M10 110 L90 10'/%3E%3Cpath d='M90 60 L120 60'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "120px 120px",
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* Top Border Line */}
        <motion.div
          className="w-full h-px bg-[#fdc700]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          viewport={{ once: true }}
          style={{
            boxShadow: "0 0 10px #fdc700",
          }}
        />

        {/* Main Footer Section */}
        <div className="container mx-auto px-6 py-16">
          {/* Header */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <ExplosiveAnimatedText
              text="Stay Updated with our Projects"
              className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6"
              delay={0.5}
              variant="letterPop"
            />

            <motion.div
              className="w-24 h-1 bg-[#fdc700]"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 96, opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.5 }}
              viewport={{ once: true }}
              style={{
                boxShadow: "0 0 15px #fdc700",
              }}
            />
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left Section - Newsletter */}
            <motion.div
              initial={{ opacity: 0, x: -60, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.8,
                type: "spring",
                damping: 15,
                stiffness: 200,
              }}
              viewport={{ once: true }}
            >
              <ExplosiveAnimatedText
                text="Let's Talk"
                className="text-4xl md:text-5xl lg:text-6xl font-light mb-12"
                delay={1}
                variant="glowBurst"
                style={{
                  color: "#fdc700",
                  textShadow: "0 0 60px #fdc700, 0 0 120px #fdc700",
                }}
              />

              {/* Email Subscription Form */}
              <motion.form
                onSubmit={handleSubscribe}
                className="mb-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1">
                    <motion.input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Your Email Address"
                      className="w-full bg-transparent border-b-2 border-white pb-4 text-white placeholder-gray-400 focus:border-[#fdc700] focus:outline-none transition-all duration-300 text-lg"
                      required
                      whileFocus={{
                        borderColor: "#fdc700",
                        boxShadow: "0 2px 10px rgba(253, 199, 0, 0.3)",
                      }}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="px-10 py-4 bg-transparent border-2 border-white text-white hover:bg-[#fdc700] hover:text-black hover:border-[#fdc700] transition-all duration-300 font-bold tracking-wide rounded-lg"
                    disabled={isSubscribed}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 25px rgba(253, 199, 0, 0.4)",
                      y: -2,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSubscribed ? "Subscribed!" : "Subscribe"}
                  </motion.button>
                </div>
              </motion.form>

              <ExplosiveAnimatedParagraph
                text="Don't worry, we won't spam your inbox"
                className="text-gray-400 text-sm"
                delay={2}
              />
            </motion.div>

            {/* Right Section - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                duration: 1.2,
                delay: 1,
                type: "spring",
                damping: 15,
                stiffness: 200,
              }}
              viewport={{ once: true }}
            >
              {/* Address */}
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                viewport={{ once: true }}
              >
                <ExplosiveAnimatedParagraph
                  text="Elan Tower, Golf course Road, sector 42, Gurgaon, 122002"
                  className="text-white text-lg leading-relaxed"
                  delay={1.5}
                />
              </motion.div>

              {/* Contact Details */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.8 }}
                  viewport={{ once: true }}
                >
                  <ExplosiveAnimatedText
                    text="EMAIL US"
                    className="font-bold mb-3 tracking-wide"
                    delay={2}
                    variant="cascade"
                    style={{
                      color: "#fdc700",
                      textShadow: "0 0 15px rgba(253, 199, 0, 0.5)",
                    }}
                  />
                  <motion.a
                    href="mailto:nivaasasupport@gmail.com"
                    className="text-white hover:text-[#fdc700] transition-colors duration-300 text-lg"
                    whileHover={{
                      scale: 1.05,
                      textShadow: "0 0 10px #fdc700",
                    }}
                  >
                    nivaasasupport@gmail.com
                  </motion.a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2.2 }}
                  viewport={{ once: true }}
                >
                  <ExplosiveAnimatedText
                    text="CALL US"
                    className="font-bold mb-3 tracking-wide"
                    delay={2.4}
                    variant="cascade"
                    style={{
                      color: "#fdc700",
                      textShadow: "0 0 15px rgba(253, 199, 0, 0.5)",
                    }}
                  />
                  <motion.a
                    href="tel:7045682162"
                    className="text-white hover:text-[#fdc700] transition-colors duration-300 text-lg"
                    whileHover={{
                      scale: 1.05,
                      textShadow: "0 0 10px #fdc700",
                    }}
                  >
                    7045682162
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-6 py-8">
            {/* Navigation Links */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-8 mb-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  className="text-white hover:text-[#fdc700] transition-colors duration-300 font-medium text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    textShadow: "0 0 10px #fdc700",
                    y: -2,
                  }}
                >
                  {link.name}
                </motion.a>
              ))}
            </motion.div>

            {/* Bottom Row */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
              {/* Copyright */}
              <motion.div
                className="text-gray-400 text-sm text-center lg:text-left"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                viewport={{ once: true }}
              >
                <ExplosiveAnimatedParagraph
                  text="© 2024 Nivaasa. All rights reserved."
                  className="mb-1"
                  delay={1.2}
                />
                <ExplosiveAnimatedParagraph
                  text="Designed with excellence for luxury real estate."
                  className=""
                  delay={1.5}
                />
              </motion.div>

              {/* Company Logo and Branding */}
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 1,
                  delay: 1.3,
                  type: "spring",
                  damping: 15,
                  stiffness: 200,
                }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-2">
                  <motion.div
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-3"
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 0 20px rgba(253, 199, 0, 0.5)",
                    }}
                    style={{
                      boxShadow: "0 0 15px rgba(253, 199, 0, 0.3)",
                    }}
                  >
                    <img src="/logo.png" alt="Nivaasa Logo" />
                  </motion.div>
                  <div>
                    <ExplosiveAnimatedText
                      text="NIVAASA"
                      className="font-bold text-xl tracking-wider"
                      delay={1.8}
                      variant="letterPop"
                      style={{
                        color: "#fdc700",
                        textShadow: "0 0 20px rgba(253, 199, 0, 0.6)",
                      }}
                    />
                    <ExplosiveAnimatedText
                      text="Beyond Spaces. Building Legacies"
                      className="text-gray-400 text-xs"
                      delay={2.2}
                      variant="cascade"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Social Media Icons */}
              <motion.div
                className="flex space-x-4"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                viewport={{ once: true }}
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-[#fdc700] transition-all duration-300"
                    title={social.name}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 1.7 + index * 0.1,
                      type: "spring",
                      damping: 15,
                      stiffness: 200,
                    }}
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.2,
                      boxShadow: "0 0 20px rgba(253, 199, 0, 0.6)",
                      y: -3,
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 border border-[#fdc700]/20 rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 40,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-24 h-24 border border-[#fdc700]/15 rounded-full"
        animate={{ rotate: -360 }}
        transition={{
          duration: 35,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </footer>
  );
};

export default Footer;
