import React, { useEffect, useRef } from 'react';
import './ppc.css'; // Ensure this contains the necessary styles for the Banner

const Banner = () => {
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const content = contentRef.current;
    const image = imageRef.current;

    const options = {
      threshold: 0.5 // Trigger when 50% of the element is visible
    };

    const callback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Stop observing once animation is triggered
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    if (content) observer.observe(content);
    if (image) observer.observe(image);

    return () => {
      if (content) observer.unobserve(content);
      if (image) observer.unobserve(image);
    };
  }, []);

  return (
    <div className="banner1">
      <div className="banner1-content" ref={contentRef}>
        <p>Sweeten your day with</p>
        <p>our finest Chocolates...</p>
      </div>
      <div className="banner1-img" ref={imageRef}>
        <img src="/images/products/chocolate-girl.png" className="img-fluid" alt="Chocolate Girl" />
      </div>
    </div>
  );
};

export default Banner;
