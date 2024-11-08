import React, { useState, useEffect } from 'react';

const MarqueeComponent = () => {
  const [isFirstMarqueeVisible, setFirstMarqueeVisible] = useState(true); // Manage marquee visibility
  const marqueeDuration = 20000; // 20 seconds for the first marquee

  useEffect(() => {
    // Set a timer to switch to the second marquee after the duration
    const timer = setTimeout(() => {
      setFirstMarqueeVisible(false); // Hide first marquee, show second marquee
    }, marqueeDuration);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, [marqueeDuration]);

  return (
    <div>
      {/* Title for Our Brands */}
      <p className={`offer-title ${isFirstMarqueeVisible ? 'visible' : 'hidden'}`} id="title1">
        OUR BRANDS
      </p>

      {/* Title for Other Brands We Carry */}
      <p className={`offer-title ${!isFirstMarqueeVisible ? 'visible' : 'hidden'}`} id="title2">
        OTHER BRANDS WE CARRY
      </p>

      <br />

      <div className="brand-img-container">
        {/* First Marquee (Our Brands) */}
        {isFirstMarqueeVisible && (
          <div className="brand-img" id="marquee1">
            <marquee behavior="scroll" scrollamount="7">
              <img src="/images/iyappaa.jpg" className="image" alt="Iyappaa" />
              <img src="/images/products/amrith.jpg" className="image" alt="Amrith" />
              <img src="/images/products/venbaa1.jpg" className="image" alt="Venbaa" />
            </marquee>
          </div>
        )}

        {/* Second Marquee (Other Brands) */}
        {!isFirstMarqueeVisible && (
          <div className="brand-img" id="marquee2">
            <marquee behavior="scroll" scrollamount="3">
              <img src="/images/products/a2b.png" className="image" alt="A2B" />
              <img src="/images/products/haldiram.png" className="image" alt="Haldiram" />
              <img src="/images/products/narasus.jpeg" className="image" alt="Narasus" />
              <img src="/images/products/cothas.jpg" className="image" alt="Cothas" />
              <img src="/images/products/manna.avif" className="image" alt="Manna" />
              <img src="/images/products/rajam.jpg" className="image" alt="Rajam" />
              <img src="/images/products/lion.avif" className="image" alt="Lion" />
              <img src="/images/products/anil.png" className="image" alt="Anil" />
              <img src="/images/products/tata.jpg" className="image" alt="Tata" />
              <img src="/images/products/idhayam.jpg" className="image" alt="Idhayam" />
              <img src="/images/products/goldwinner.png" className="image" alt="Gold Winner" />
              <img src="/images/products/gokulsantol.png" className="image" alt="Gokul Santol" />
              <img src="/images/products/preethi.webp" className="image" alt="Preethi" />
              <img src="/images/products/prestige.png" className="image" alt="Prestige" />
              <img src="/images/products/milton.png" className="image" alt="Milton" />
            </marquee>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarqueeComponent;
