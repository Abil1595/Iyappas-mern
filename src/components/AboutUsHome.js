import React, { useEffect, useRef } from 'react';


const AboutUsHome = () => {
  const contentRef = useRef(null); // Reference to the glass container

  useEffect(() => {
    const content = contentRef.current;

    // Intersection Observer options
    const options = {
      threshold: 0.5, // Trigger when 50% of the element is visible
    };

    // Intersection Observer callback
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate'); // Add animation class
          observer.unobserve(entry.target); // Stop observing once animation is triggered
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    if (content) {
      observer.observe(content); // Observe the content
    }

    // Cleanup on unmount
    return () => {
      if (content) {
        observer.unobserve(content);
      }
    };
  }, []);

  return (
    <div>
      <p className="offer-title">ABOUT US</p>
      <div className="background-1">
        <div className="glass-container" ref={contentRef}>
          <p>
            Founded in 2007, Iyappaa Sweets and Snacks expanded rapidly across Canada,
            reaching international markets by 2019. It maintained stable prices during
            the COVID-19 pandemic and expanded to France in 2023 and the UK in 2024. 
            By 2026, it aims to introduce 1,500 new products globally, focusing on
            sustainability and innovation. <a href="">Read More...</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsHome;
