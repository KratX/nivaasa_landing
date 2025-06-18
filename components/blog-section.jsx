"use client";

import { useState, useEffect } from "react";

/**
 * Article Card Component
 * Displays individual blog articles with image, title, excerpt, and read more button
 */
const ArticleCard = ({ image, title, excerpt, onReadMore, index }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-700 hover:scale-105 hover:shadow-2xl m-4 ${
        isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Article Image */}
      <div className="relative overflow-hidden h-80 md:h-96">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Article Content */}
      <div className="p-10">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight line-clamp-3">
          {title}
        </h3>

        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6 line-clamp-4">
          {excerpt}
        </p>

        {/* Read More Button */}
        <button
          onClick={onReadMore}
          className="border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-full font-medium text-lg hover:bg-gray-900 hover:text-white transition-all duration-300 transform hover:scale-105"
        >
          Read More
        </button>
      </div>
    </div>
  );
};

/**
 * Discover More Button Component
 * Prominent call-to-action button
 */
const DiscoverMoreButton = ({ onClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        className={`bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xl px-12 py-4 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        DISCOVER MORE
      </button>
    </div>
  );
};

/**
 * Background Pattern Component
 * Creates the architectural wireframe background effect
 */
const BackgroundPattern = () => (
  <div className="absolute inset-0 opacity-10">
    {/* Vertical Lines */}
    {Array.from({ length: 20 }).map((_, i) => (
      <div
        key={`v-${i}`}
        className="absolute bg-white/20"
        style={{
          left: `${i * 5}%`,
          top: 0,
          width: "1px",
          height: "100%",
          transform: `skewX(${Math.random() * 10 - 5}deg)`,
        }}
      />
    ))}

    {/* Horizontal Lines */}
    {Array.from({ length: 15 }).map((_, i) => (
      <div
        key={`h-${i}`}
        className="absolute bg-white/20"
        style={{
          top: `${i * 7}%`,
          left: 0,
          height: "1px",
          width: "100%",
          transform: `skewY(${Math.random() * 5 - 2.5}deg)`,
        }}
      />
    ))}

    {/* Diagonal Lines */}
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={`d-${i}`}
        className="absolute bg-white/10"
        style={{
          top: `${i * 12}%`,
          left: `${i * 10}%`,
          width: "200px",
          height: "1px",
          transform: `rotate(${45 + Math.random() * 20}deg)`,
          transformOrigin: "left center",
        }}
      />
    ))}
  </div>
);

/**
 * Main Real Estate Blog Component
 * Replicates the sophisticated blog section layout
 */
const BlogSection = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Article data matching the provided image
  const articles = [
    {
      id: 1,
      image: "/blog-1.jpg",
      title:
        "The Shift Towards Open Spaces and Amenities: How Developers Are Meeting Homebuyer",
      excerpt:
        "The Indian real estate landscape has experienced a significant shift in recent years. In addition to factors like affordability and prime location, and modification of ...",
    },
    {
      id: 2,
      image: "/blog-2.jpg",
      title: "Beyond the Tech: The Wellbeing Approach to Smart Offices",
      excerpt:
        "India has been steadily moving towards the construction of smart buildings. Over two decades after the IT boom in the late 1990s, numerous IT parks, special economic zones, and smart cities have ...",
    },
  ];

  const handleReadMore = (articleId) => {
    setSelectedArticle(articleId);
    console.log(`Reading article ${articleId}`);
    // Here you would typically navigate to the full article
  };

  const handleDiscoverMore = () => {
    console.log("Discover more articles");
    // Here you would typically navigate to the blog listing page
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <BackgroundPattern />

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-8 py-20 lg:py-28">
        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16 px-4">
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
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-8 w-2 h-40 bg-gradient-to-b from-yellow-500/30 to-transparent transform rotate-12" />
      <div className="absolute top-1/3 right-8 w-2 h-32 bg-gradient-to-b from-yellow-500/30 to-transparent transform -rotate-12" />
      <div className="absolute bottom-1/4 left-1/2 w-40 h-2 bg-gradient-to-r from-yellow-500/30 to-transparent transform -translate-x-1/2" />

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-yellow-500/20" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-yellow-500/20" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-yellow-500/20" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-yellow-500/20" />
    </div>
  );
};

export default BlogSection;
