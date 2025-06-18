"use client";
import { useState, useEffect } from "react";

/**
 * Luxury Real Estate Showcase - Exact Image Replication
 * Three premium property developments with precise layout matching
 */
const ExploreSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  /**
   * Property data matching the exact image content
   */
  const properties = [
    {
      id: "axis",
      location: "NOIDA",
      title: "NIVAASA AXIS",
      description:
        "Nivaasa Axis is a curated collection of contemporary Villas in Noida, designed to offer a rare blend of privacy, natural light, and architectural clarity. With open courtyards, large windows, and thoughtfully planned layouts. Surrounded by greenery and calm, it's a modern sanctuary crafted for those who value space, design, and serenity in everyday living.",
      image: "/explore-1.png",
      bgPattern: "geometric-dark",
    },
    {
      id: "retreat",
      location: "GURGAON",
      title: "NIVAASA RETREAT",
      description:
        "Nivaasa Retreat is a premium Airbb getaway nestled in the tranquil embrace of the Aravalli Hills. Designed for those seeking quiet luxury, it offers a perfect blend of nature, comfort, and curated experiences. Surrounded by rolling greens and panoramic hill views, each stay is crafted to bring a sense of calm and connection-with beautifully designed interiors, open-air spaces, and personalized hospitality.",
      image: "/explore-2.png",
      bgPattern: "geometric-warm",
    },
    {
      id: "serene",
      location: "NOIDA",
      title: "NIVAASA SERENE",
      description:
        "Nivaasa Serene is a modern apartment community in Noida, designed for those who value calm, comfort, and thoughtful living. With well-planned homes, landscaped open spaces, and a focus on natural light and ventilation, Serene offers a balanced lifestyle away from the city's noise, yet close to everything you need. It's a place where everyday living feels peaceful, easy, and elevated.",
      image: "/explore-3.png",
      bgPattern: "geometric-gold",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {properties.map((property, index) => (
        <section
          key={property.id}
          className="relative min-h-screen flex items-center bg-black overflow-hidden"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
              url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23333' strokeWidth='1' opacity='0.3'%3E%3Cpath d='M10 10 L90 10 L90 90 L10 90 Z'/%3E%3Cpath d='M20 20 L80 20 L80 80 L20 80 Z'/%3E%3Cpath d='M30 30 L70 30 L70 70 L30 70 Z'/%3E%3Cpath d='M10 10 L90 90'/%3E%3Cpath d='M90 10 L10 90'/%3E%3C/g%3E%3C/svg%3E")
            `,
            backgroundSize: "200px 200px",
            backgroundRepeat: "repeat",
          }}
        >
          <div className="container mx-auto px-8 py-16">
            <div className="grid grid-cols-12 gap-8 items-center min-h-[80vh]">
              {/* Left Image Section */}
              <div className="col-span-12 lg:col-span-5">
                <div
                  className={`relative transform transition-all duration-1000 ${
                    isLoaded
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="aspect-square relative">
                    <img
                      src={property.image || "/placeholder.svg"}
                      alt={`${property.title} luxury development`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Right Content Section */}
              <div className="col-span-12 lg:col-span-7 relative">
                {/* Location Badge */}
                <div className="absolute top-0 right-0">
                  <div className="bg-white text-black px-4 py-2 text-sm font-medium tracking-wider">
                    {property.location}
                  </div>
                </div>

                {/* Main Content */}
                <div
                  className={`pt-16 text-center transform transition-all duration-1000 ${
                    isLoaded
                      ? "translate-x-0 opacity-100"
                      : "translate-x-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 200 + 300}ms` }}
                >
                  {/* Project Title */}
                  <h1 className="text-5xl lg:text-6xl xl:text-7xl font-light text-yellow-400 mb-8 leading-tight">
                    {property.title}
                  </h1>

                  {/* Description */}
                  <div className=" mb-12">
                    <p className="text-white text-base lg:text-lg leading-relaxed font-light">
                      {property.description}
                    </p>
                  </div>

                  {/* Discover More Button */}
                  <button className="bg-yellow-400 text-black px-8 py-4 font-medium tracking-wider uppercase hover:bg-yellow-300 transition-colors duration-300">
                    DISCOVER MORE
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Subtle separator line between sections */}
          {index < properties.length - 1 && (
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
          )}
        </section>
      ))}
    </div>
  );
};

export default ExploreSection;
