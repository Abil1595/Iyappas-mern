import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import core Swiper styles
import 'swiper/css/pagination'; // Import pagination styles
import './ppc.css'; // Custom CSS

const TrendingSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null); // Reference to Swiper instance

  const slides = [
    { id: 1, name: "Potato Chips", price: "$20", rating: 4.5, imgSrc: "/images/products/2.jpg" },
    { id: 2, name: "Ribbon Murukku", price: "$20", rating: 4.5, imgSrc: "/images/products/4.jpg" },
    { id: 3, name: "Kai Murukku", price: "$20", rating: 4.5, imgSrc: "/images/products/1.jpg" },
    { id: 4, name: "Garlic Murukku", price: "$20", rating: 4.5, imgSrc: "/images/products/7.jpg" },
    { id: 5, name: "Kai Murukku", price: "$20", rating: 4.5, imgSrc: "/images/products/3.jpg" },
    { id: 6, name: "Spicy Chips", price: "$25", rating: 4.8, imgSrc: "/images/products/5.jpg" },
    { id: 7, name: "Cheese Balls", price: "$15", rating: 4.7, imgSrc: "/images/products/6.jpg" }
  ];

  useEffect(() => {
    // Set up autoplay with setInterval
    const autoPlay = setInterval(() => {
      if (swiperRef.current) {
        swiperRef.current.swiper.slideNext(); // Move to the next slide
      }
    }, 5000); // Change slide every 5 seconds

    // Clear interval on component unmount
    return () => clearInterval(autoPlay);
  }, []);

  return (
    <section id="trending">
      <p className="offer-title">POPULAR PRODUCTS</p>
      <div className="container">
        <Swiper
          ref={swiperRef} // Attach the ref to Swiper
          grabCursor={true}
          centeredSlides={true} // Keep the center slide in focus
          loop={true}
          slidesPerView={3} // Show three slides at a time
          spaceBetween={0} // No space between slides
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className}">${index + 1}</span>`;
            }
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide 
              key={slide.id} 
              className={`swiper-slide trending-slide ${activeIndex === index ? 'active' : ''}`}
              style={{
                transform: activeIndex === index ? 'scale(1.2)' : 'scale(0.9)', // Scale center slide larger
                transition: 'transform 0.3s ease-in-out' // Smooth scaling transition
              }}
            >
              <div className="trending-slide-img">
                <img src={slide.imgSrc} className="img-fluid" alt={slide.name} />
              </div>
              <div className="trending-slide-content">
                <h1 className="food-price">{slide.price}</h1>
                <div className="trending-slide-content-bottom">
                  <h2 className="food-name">{slide.name}</h2>
                  <h3 className="food-rating">
                    <span>{slide.rating}</span>
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <ion-icon
                          key={i}
                          name={i < Math.floor(slide.rating) ? 'star' : 'star-outline'}
                        />
                      ))}
                    </div>
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TrendingSlider;
