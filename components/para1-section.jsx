"use client";
import { useState, useEffect } from "react";

/**
 * Main architectural website component
 * Replicates the sophisticated design with responsive layout
 * Features elegant typography, architectural imagery, and smooth animations
 */
export default function Para1() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation effect on component mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden pt-10">
      {/* Main Container with responsive grid layout */}
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-h-screen items-center">
          {/* Left Architectural Image */}
          <div
            className={`lg:col-span-3 transform transition-all duration-1000 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="relative group">
              <div className="border-2 border-white/20 rounded-lg overflow-hidden hover:border-white/40 transition-all duration-500">
                <div className="aspect-[3/4] relative">
                  <img
                    src="grey-1.jpg"
                    alt="Modern architectural perspective showing geometric building structures"
                    fill
                    className="object-cover h-full group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Central Content Area */}
          <div
            className={`lg:col-span-6 text-center px-4 lg:px-8 transform transition-all duration-1000 delay-300 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {/* Header Text */}
            <div className="mb-8 lg:mb-12">
              <h2 className="text-sm lg:text-base font-light tracking-[0.2em] uppercase mb-2 text-gray-300">
                Legacy Rooted in Vision
              </h2>
              <h3 className="text-sm lg:text-base font-light tracking-[0.2em] uppercase text-gray-300">
                Future Built on Excellence
              </h3>
            </div>

            {/* Main Heading */}
            <div className="mb-8 lg:mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight">
                <span className="block mb-2">Crafting</span>
                <span className="block text-yellow-400 font-normal mb-2">
                  Tomorrow's
                </span>
                <span className="block">Landmark Today</span>
              </h1>
            </div>

            {/* Description Text */}
            <div className="mb-8 lg:mb-12 max-w-2xl mx-auto">
              <p className="text-sm lg:text-base leading-relaxed text-gray-300 font-light">
                At Nivaasa, we don't just build spaces — we shape legacy-driven
                lifestyles. As a leading name in Gurugram's luxury real estate
                landscape, Nivaasa stands apart through its commitment to
                architectural brilliance, timeless design, and sustainable
                innovation. Each of our developments is a collaboration with
                renowned architects and global consultants, resulting in bespoke
                residences and landmark commercial spaces that redefine urban
                living. With transparency, integrity, and purpose at the heart
                of everything we do, Nivaasa is more than a builder — it is the
                curator of India's future cities.
              </p>
            </div>

            {/* Tagline */}
            <div className="relative">
              <p className="text-base lg:text-lg font-light tracking-wide text-gray-200">
                Beyond Spaces. Building Legacies.
              </p>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-yellow-400 opacity-60" />
            </div>
          </div>

          {/* Right Architectural Image */}
          <div
            className={`lg:col-span-3 transform transition-all duration-1000 delay-500 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="relative group">
              <div className="border-2 border-white/20 rounded-lg overflow-hidden hover:border-white/40 transition-all duration-500">
                <div className="aspect-[3/4] relative">
                  <img
                    src="grey-2.jpg"
                    alt="Contemporary skyscraper architecture with dramatic upward perspective"
                    fill
                    className="object-cover h-full object-center group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
      </div>

      {/* Background Pattern Overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_0%,transparent_50%)]" />
      </div>
    </div>
  );
}
