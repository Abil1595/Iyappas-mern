import React, { useEffect, useRef, useState, useCallback } from 'react';
import 'swiper/css'; // Import core Swiper styles if needed
import 'swiper/css/navigation'; // Import navigation styles if needed
import 'swiper/css/pagination'; // Import pagination styles if needed
import './ppc.css'; // Custom CSS
import ScrollCounter from './ScrollCounter';
import OfferList from './offerList';
import Banner from './Banner'; // Import Banner component
import TrendingSlider from './TrendingSlider';
import AboutUsHome from './AboutUsHome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons'; // FontAwesome icon
import Counters from './Counters';
import MarqueeComponent from './MarqueeComponent';
import { Link } from 'react-router-dom'; 

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoPlayRef = useRef();

  const items = [
    {
      title: 'Cassava Chips, most selling product',
      description:
        'Cassava chips are a crunchy, delicious snack made from fresh, handpicked cassava roots. Carefully sliced and fried to perfection, these chips offer a unique, satisfying flavor. Rich in natural fibers and gluten-free, they are a healthier alternative to traditional potato chips.',
      image: '/Images/products/chips.png',
      figcaption: 'Cassava Chips, most selling product',
    },
    {
      title: 'Garlic Murukku, a new product',
      description:
        'Garlic Mini Murukku is a crispy, bite-sized traditional snack infused with the bold flavor of garlic. Made from rice flour and aromatic spices, each murukku is hand-twisted and fried to golden perfection.',
      image: '/Images/products/savory.png',
      figcaption: 'Garlic Murukku, a new product',
    },
    {
      title: 'Cassava Finger Chips, popular product',
      description:
        'Cassava Finger Chips are a tasty and crispy snack made from fresh cassava roots, cut into long strips and perfectly fried. These crunchy treats are a great gluten-free alternative to regular fries.',
      image: '/Images/products/thinchips.png',
      figcaption: 'Cassava Finger Chips, popular product',
    },
    {
      title: 'Orange Candy, a new product',
      description:
        'Orange Candy offers a burst of tangy citrus flavor in every bite, delivering the refreshing taste of ripe, juicy oranges. These sweet and tangy treats are perfect for satisfying your candy cravings while giving a zesty twist to your day.',
      image: '/Images/products/orangecandy.png',
      figcaption: 'Orange Candy, a new product',
    },
  ];

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    autoPlayRef.current = setInterval(nextSlide, 5000);
    return () => clearInterval(autoPlayRef.current);
  }, [nextSlide]);

  return (
    <div>
      <section className="carousel">
        <div className="list">
          {items.map((item, index) => (
            <article key={index} className={`item ${activeIndex === index ? 'active' : ''}`}>
              <div className="main-content">
                <div className="content">
                  <h2>{item.title}</h2>
                  <p className="description">{item.description}</p>
                  <button className="addToCard">Add To Cart</button>
                </div>
                <figure className="image">
                  <img src={item.image} alt={item.figcaption} />
                  <figcaption>{item.figcaption}</figcaption>
                </figure>
              </div>
            </article>
          ))}
        </div>
        <div className="arrows">
          
        </div>
      </section>

      <p className="offer-title">DELIGHTFUL DISCOUNTS</p>
      <OfferList />
      <ScrollCounter />
      <br />
      <Banner />
      <br />
      <br />
      <p className="offer-title">SHOP BY CATEGORIES</p>
      <br />
      <br />
      <div className="container1">
        <div className="sweet">
          <div className="sweet1">
           <Link to="/search?category=SWEETS">
              <img src="/images/products/sweet-category.png" alt="sweet-cat" className="sweet-img" />
              </Link>
          </div>
          <div className="sweet-caption">Sweet</div>
        </div>
        <div className="snack">
          <div className="snack1">
          <Link to="/search?category=SNACKS">
              <img src="/images/products/snack-category.png" alt="snacks-cat" className="snack-img" />
           </Link>
          </div>
          <div className="snack-caption">Snacks</div>
        </div>
        <div className="candy">
          <div className="candy1">
          <Link to="/search?category=CANDIES">
              <img src="/images/products/candy-category.png" alt="candy-cat" className="candy-img" />
            </Link>
          </div>
          <div className="candy-caption">Candies</div>
        </div>
        <div className="grocery">
          <div className="grocery1">
          <Link to="/search?category=GROCERIES">
              <img src="/images/products/grocery-category.png" alt="groceries-cat" className="grocery-img" />
            </Link>
          </div>
          <div className="grocery-caption">Groceries</div>
        </div>
      </div>
      <br />
      <div className="container1">
        <div className="rice">
          <div className="rice1">
          <Link to="/search?category=RICE">
              <img src="/images/products/rice-category.png" alt="rice-cat" className="rice-img" />
            </Link>
          </div>
          <div className="rice-caption">Rice</div>
        </div>
        <div className="oil">
          <div className="oil1">
          <Link to="/search?category=OIL">
              <img src="/images/products/oil-category.png" alt="oil-cat" className="oil-img" />
            </Link>
          </div>
          <div className="oil-caption">Oil</div>
        </div>
        <div className="herbal">
          <div className="herbal1">
          <Link to="/search?category=HERBAL">
              <img src="/images/products/herbal-category.png" alt="herbal-cat" className="herbal-img" />
            </Link>
          </div>
          <div className="herbal-caption">Herbal & Organic</div>
        </div>
        <div className="homeappliances">
          <div className="homeappliances1">
          <Link to="/search?category=HOMEAPPLIANCES">
              <img src="/images/products/homeappliance-category.png" alt="home-cat" className="homeappliances-img" />
            </Link>
          </div>
          <div className="homeappliances-caption">Home Appliances</div>
        </div>
      </div>
      <br />
      <br />
      <TrendingSlider />
      <br />
      <br />
      <AboutUsHome />
      <br />
      <br />
      <div className="advantages">
        <div className="home-made"> 
          <img src="/images/products/home-img.png" alt="homeimage" className="home-img" />
          <h3 className="head-home">Home made</h3>
          <p className="para-home">Fresh, tasty treats made at home with simple ingredients</p>
        </div>
        <div className="organic">
          <img src="/images/products/organic-img.png" alt="organic" className="organic-img" />
          <h3 className="head-organic">100% Organic</h3>
          <p className="para-organic">Prioritize purity and natural ingredients for healthier choices</p>
        </div>
        <div className="quality">
          <FontAwesomeIcon icon={faMedal} style={{ fontSize: '20px' }} />
          <h3 className="head-quality">Premium Quality</h3>
          <p className="para-quality">Highest standards of freshness, taste, and reliability</p>
        </div>
      </div>
      <br />
      <br />
      <br />
      <Counters/><br/><br/>
      
      <MarqueeComponent/>
    </div> 
  );
};

export default Home; 
 