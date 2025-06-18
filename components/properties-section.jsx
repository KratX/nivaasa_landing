"use client";

import { useState, useEffect } from "react";

/**
 * Luxury Real Estate Property Showcase Component
 * Features two premium developments: Nivaasa Elan and Nivaasa Verve
 * with sophisticated design and interactive elements
 */
const PropertyShowcase = () => {
  // State management for animations and interactions
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredProperty, setHoveredProperty] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  // Initialize component
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  /**
   * Property data configuration
   */
  const properties = [
    {
      id: "elan",
      name: "NIVAASA ELAN",
      image: "/1.jpg",
      description:
        "Nivaasa Elan is the crown jewel of Nivaasa, located on the prestigious Golf Course Road in Gurgaon. These premium high-rise residences redefine luxury with expansive layouts, world-class amenities, and panoramic views of the city skyline and lush green golf course. Nivaasa Elan blends elegance, comfort, and convenience in one of the most sought-after addresses in the NCR.",
      location: "Golf Course Road, Gurgaon",
      type: "High-Rise Luxury Residences",
      imagePosition: "left",
    },
    {
      id: "verve",
      name: "NIVAASA VERVE",
      image: "/2.jpg",
      description:
        "Nestled in Green Tech City, Gurgaon Sector 22, Nivaasa Verve is an elegant residential enclave by Nivaasa that offers a perfect blend of contemporary design and modern low-rise buildings framed by lush landscaping and tree-lined walkways. With its close proximity to essential amenities, schools, hospitals, and downtown Gurgaon, Verve offers a refined yet convenient lifestyle for discerning homeowners.",
      location: "Green Tech City, Gurgaon Sector 22",
      type: "Low-Rise Residential Enclave",
      imagePosition: "right",
    },
    {
      id: "axis",
      name: "NIVAASA AXIS",
      image: "/3.png",
      description:
        "Nivaasa Axis is an upscale residential enclave located in Noida's Sector 117—a rapidly evolving corridor known for its excellent infrastructure and connectivity. This premium gated community offers a curated collection of spacious 2, 3, and 4BHK apartments, crafted with high-end finishes, modern fixtures, and thoughtfully designed layouts.",
      location: "Noida Sector 117",
      type: "Upscale Residential Enclave",
      imagePosition: "left",
    },
    {
      id: "retreat",
      name: "NIVAASA RETREAT",
      image: "/4.png",
      description:
        "Nivaasa Retreat in Sector 56, nestled in the scenic Aravalli hills of Gurgaon, is an exclusive Airbnb gateway that offers a serene escape from city life. This charming villa-style retreat features spacious, thoughtfully designed accommodations with a swimming pool and lush outdoor spaces perfect for unwinding with friends or family.",
      location: "Sector 56, Aravalli Hills, Gurgaon",
      type: "Exclusive Retreat & Airbnb Gateway",
      imagePosition: "right",
    },
    {
      id: "serene",
      name: "NIVAASA SERENE",
      image: "/5.png",
      description:
        "Nestled in the heart of Sector 62, Noida, Nivaasa Serene is a refined residential venture designed for modern urban living. This thoughtfully crafted community offers premium residences finished with high-quality fixtures and elegant interiors. Residents enjoy a host of premium amenities, including a clubhouse, landscaped gardens, jogging tracks, and a fully equipped fitness center.",
      location: "Sector 62, Noida",
      type: "Modern Urban Residential Community",
      imagePosition: "left",
    },
    {
      id: "live",
      name: "LIVE NIVAASA",
      image: "/6.png",
      description:
        "Nivaasa Triangle is a stylish BnB retreat nestled on the serene slopes of the Aravalli hills in Sector 56, Gurgaon. Designed as an exclusive haven, this home-away-from-home blends contemporary comforts with nature-inspired charm. Guests can unwind in private outdoor spaces, enjoy relaxed evenings on the terrace, or stroll through lush greenery.",
      location: "Sector 56, Aravalli Hills, Gurgaon",
      type: "Stylish BnB Retreat",
      imagePosition: "right",
    },
  ];

  /**
   * Handle property interaction
   */
  const handlePropertyHover = (propertyId) => {
    setHoveredProperty(propertyId);
  };

  const handlePropertyClick = (propertyId) => {
    setActiveSection(propertyId);
    console.log(`Viewing details for: ${propertyId}`);
  };

  /**
   * Decorative corner elements
   */
  const CornerDecoration = ({ position, color = "bg-red-500" }) => (
    <div className={`absolute ${position} w-4 h-4 ${color} rounded-full z-10`}>
      <div
        className={`absolute inset-0 ${color} rounded-full animate-ping opacity-75`}
      ></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Main Content */}
      <div className="relative z-10">
        {properties.map((property, index) => (
          <section
            key={property.id}
            className={`min-h-screen flex items-center justify-center p-8 lg:p-16 relative ${
              index > 0 ? "border-t border-white/10" : ""
            }`}
            onMouseEnter={() => handlePropertyHover(property.id)}
            onMouseLeave={() => handlePropertyHover(null)}
          >
            {/* Corner Decorations */}
            <CornerDecoration
              position={
                property.imagePosition === "left"
                  ? "top-8 right-8"
                  : "bottom-8 left-8"
              }
            />

            {/* Property Content Grid */}
            <div
              className={`container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                property.imagePosition === "right"
                  ? "lg:grid-flow-col-dense"
                  : ""
              }`}
            >
              {/* Property Image */}
              <div
                className={`relative group cursor-pointer transform transition-all duration-700 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                } ${hoveredProperty === property.id ? "scale-105" : ""} ${
                  property.imagePosition === "right" ? "lg:col-start-2" : ""
                }`}
                style={{ transitionDelay: `${index * 300}ms` }}
                onClick={() => handlePropertyClick(property.id)}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-lg shadow-2xl">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={`${property.name} - ${property.type}`}
                    className="w-full h-96 lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Hover Content */}
                  <div className="absolute bottom-6 left-6 right-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <button className="bg-yellow-400 text-black px-6 py-3 font-bold text-sm tracking-wider hover:bg-yellow-300 transition-colors duration-300">
                      EXPLORE PROJECT
                    </button>
                  </div>
                </div>

                {/* Decorative Frame */}
                <div className="absolute -inset-4 border border-white/20 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Property Information */}
              <div
                className={`space-y-8 transform transition-all duration-700 ${
                  isLoaded
                    ? "translate-x-0 opacity-100"
                    : property.imagePosition === "left"
                    ? "translate-x-10 opacity-0"
                    : "-translate-x-10 opacity-0"
                } ${
                  property.imagePosition === "right"
                    ? "lg:col-start-1 lg:row-start-1"
                    : ""
                }`}
                style={{ transitionDelay: `${index * 300 + 200}ms` }}
              >
                {/* Decorative Line */}
                <div className="w-16 h-px bg-yellow-400"></div>

                {/* Property Name */}
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-light text-yellow-400 leading-tight tracking-wide">
                  {property.name}
                </h2>

                {/* Property Description */}
                <div className="space-y-6">
                  <p className="text-white text-lg lg:text-xl leading-relaxed font-light max-w-2xl">
                    {property.description}
                  </p>

                  {/* Property Details */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-gray-300 text-base">
                        <span className="text-yellow-400 font-medium">
                          Location:
                        </span>{" "}
                        {property.location}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-gray-300 text-base">
                        <span className="text-yellow-400 font-medium">
                          Type:
                        </span>{" "}
                        {property.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    onClick={() => handlePropertyClick(property.id)}
                    className="bg-yellow-400 text-black px-8 py-4 font-bold text-sm tracking-wider hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black"
                  >
                    VIEW DETAILS
                  </button>
                  <button className="border border-white text-white px-8 py-4 font-medium text-sm tracking-wider hover:bg-white hover:text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black">
                    SCHEDULE VISIT
                  </button>
                </div>

                {/* Additional Info */}
                <div className="pt-8 border-t border-white/20">
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>Premium Development by Nivaasa</span>
                    <div className="flex space-x-4">
                      <span>•</span>
                      <span>Luxury Living</span>
                      <span>•</span>
                      <span>Prime Location</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default PropertyShowcase;
