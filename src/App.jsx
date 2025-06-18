import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUsSection from "../components/about-section";
import BlogHead from "../components/blog-head";
import BlogSection from "../components/blog-section";
import ExploreSection from "../components/explore-section";
import Footer from "../components/footer";
import HeroSection from "../components/hero-section";
import Navbar from "../components/Navbar";
import Para1 from "../components/para1-section";
import Para2 from "../components/para2-section";
import PropertyShowcase from "../components/properties-section";
import TestimonialsSection from "../components/testimonials-section";
import VisionSection from "../components/vision-section";
import WhyNivaasaSection from "../components/why-section";

// const MainApp = () => {
//   return (
//     <>
//       <Navbar />
//       <HeroSection />
//       <Para1 />
//       <Para2 />
//       <ExploreSection />
//       <AboutUsSection />
//       <WhyNivaasaSection />
//       <VisionSection />
//       <BlogHead />
//       <BlogSection />
//       <PropertyShowcase />
//       <TestimonialsSection />
//       <Footer />
//     </>
//   );
// };

const HomePage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Para1 />
      <Para2 />
      <ExploreSection />
      <TestimonialsSection />
      <Footer />
    </>
  );
};

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <AboutUsSection />
      <WhyNivaasaSection />
      <VisionSection />
      <Footer />
    </>
  );
};

const PropertyPage = () => {
  return (
    <>
      <Navbar />
      <PropertyShowcase />
      <Footer />
    </>
  );
};

const BlogPage = () => {
  return (
    <>
      <Navbar />
      <BlogHead />
      <BlogSection />
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/properties" element={<PropertyPage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
    </Router>
  );
}

export default App;
