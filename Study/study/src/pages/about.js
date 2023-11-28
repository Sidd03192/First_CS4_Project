import React from "react";
import "../styles/AboutPage.css"; // Import your CSS file


export const About = () => {
  return (
    <div className="about-page-container bg-gradient-to-b from-purple-900 to-indigo-900">
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-purple-900 to-indigo-900">
        <div className="flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold flex">Discover the Future with Us</h1>
          <p className="text-lg mb-8 text-center max-w-md">
            At Brain Flow, we are dedicated to creating revolutionary technologies to shape the tomorrow you envision. Our team is driven by innovation, creativity, and a passion for the future.
          </p>
        </div>
        <img src="/Futuristic.avif" alt="Futuristic Space" className="rounded-lg shadow-xl mb-8" />
        <div className="scroll-down-prompt"></div>
      </div>

      <div className="futuristic-section">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Our Mission</h2>
        <p className="text-white mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, varius dui. Nulla nec purus feugiat, molestie ipsum et, varius dui.
        </p>
        <div className="futuristic-grid">
          <img src="/Futuristic.avif" alt="Futuristic Element 1" className="futuristic-element" />
          <div className="futuristic-panel">
            <h2 className="text-2xl font-medium mb-4">Advanced Technology</h2>
            <p className="text-white">
              Our cutting-edge technology is designed to push the boundaries of what's possible. From AI and quantum computing to space exploration, we're pioneering the way into the future.
            </p>
          </div>
          <img src="/Futuristic.avif" alt="Futuristic Element 2" className="futuristic-element" />
          <div className="futuristic-panel">
            <h2 className="text-2xl font-medium mb-4">Innovative Solutions</h2>
            <p className="text-white">
              We are committed to delivering innovative solutions that solve real-world problems. Our interdisciplinary approach ensures that we're always thinking outside the box.
            </p>
          </div>
          <img src="/Futuristic.avif" alt="Futuristic Element 3" className="futuristic-element" />
          <div className="futuristic-panel">
            <h2 className="text-2xl font-medium mb-4">Global Impact</h2>
            <p className="text-white">
              Our vision extends beyond borders. We're dedicated to making a global impact through sustainable practices and transformative technologies.
            </p>
          </div>
        </div>
        <div className="neon-button-container">
          <button className="neon-button">Explore More</button>
        </div>
      </div>
    </div>
  );
};

