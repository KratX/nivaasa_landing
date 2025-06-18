// Eye icon component
const EyeIcon = () => (
  <svg
    className="w-12 h-12 text-yellow-400"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
);

// People/Group icon component
const PeopleIcon = () => (
  <svg
    className="w-12 h-12 text-yellow-400"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01.99L14 10l-1.99-1.01A2.5 2.5 0 0 0 10 8H8.46c-.8 0-1.49.59-1.42 1.37L9.5 16H12v6h8zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zm-6-7c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm0 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 6.54 8H5c-.8 0-1.54.37-2.01.99L2 10l-1.99-1.01A2.5 2.5 0 0 0-2 8h-1.46c-.8 0-1.49.59-1.42 1.37L-2.5 16H0v6h8z" />
  </svg>
);

// Medal/Award icon component
const MedalIcon = () => (
  <svg
    className="w-12 h-12 text-yellow-400"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

/**
 * VisionCard Component
 * Renders individual vision cards with icon, title, and description
 */
const VisionCard = ({ icon, title, description }) => (
  <div className="bg-black/40 backdrop-blur-sm border border-gray-600/30 rounded-3xl p-8 flex flex-col items-center text-center h-full transition-all duration-300 hover:bg-black/50 hover:border-gray-500/50 hover:transform hover:scale-105">
    <div className="mb-6">{icon}</div>
    <h3 className="text-yellow-400 text-xl font-bold mb-6 tracking-wider">
      {title}
    </h3>
    <p className="text-gray-300 text-base leading-relaxed">{description}</p>
  </div>
);

/**
 * Main Vision Section Component
 * Replicates the "Our Vision" section with three core values
 */
const VisionSection = () => {
  const visionData = [
    {
      icon: <EyeIcon />,
      title: "TRANSPARENCY",
      description:
        "We believe in complete transparency in all our dealings, ensuring our clients make informed decisions",
    },
    {
      icon: <PeopleIcon />,
      title: "INNOVATION",
      description:
        "Continuously evolving our technology and processes to provide the best real estate experience.",
    },
    {
      icon: <MedalIcon />,
      title: "CUSTOMER-FIRST",
      description:
        "Every decision we make is centered around providing exceptional value and service to our clients.",
    },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundColor: "black",
          //   backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Shared%20EDITT.jpg-MKEqltk6jSLbPKTQR8KhHYwnD5qgEP.jpeg')`,
        }}
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
        {/* Header Section */}
        <div className="text-center mb-16 lg:mb-20">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-yellow-400 mb-8 tracking-wider">
            OUR VISION
          </h1>
          <p className="text-white text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed">
            Our vision is to become a trusted name in real estate by delivering
            exceptional property solutions focusing on transparency, innovation,
            and customer-first service.
          </p>
        </div>

        {/* Vision Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {visionData.map((item, index) => (
            <VisionCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-32 bg-gradient-to-b from-yellow-400/20 to-transparent transform rotate-45" />
        <div className="absolute top-1/3 right-1/4 w-1 h-24 bg-gradient-to-b from-yellow-400/20 to-transparent transform -rotate-45" />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-28 bg-gradient-to-b from-yellow-400/20 to-transparent transform rotate-12" />
      </div>
    </div>
  );
};

export default VisionSection;
