import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faRibbon, faBoxesStacked, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';

// Counter component
const Counter = ({ targetCount, label, icon }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0; 
    const end = targetCount;
    const duration = 10000; // Duration for animation in milliseconds
    const incrementTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      if (start < end) {
        start += 1;
        setCount(start);
      } else {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [targetCount]);

  return (
    <div className="counter">
      <FontAwesomeIcon icon={icon} id="icons" />
      <h1>
        <span>{label === "Customers" && count >= 1000000 ? "1" : count}</span>
        {label === "Customers" ? "M +" : "+"}
      </h1>
      <h3>{label}</h3>
    </div>
  );
};

// Counters component
const Counters = () => {
  return (
    <div className="counters">
      <div>
        <Counter targetCount={5} label="Countries" icon={faGlobe} />
        <Counter targetCount={5} label="Brands" icon={faRibbon} />
        <Counter targetCount={1000} label="Products" icon={faBoxesStacked} />
        <Counter targetCount={25} label="Distributors" icon={faHandshake} />
        <Counter targetCount={1} label="Customers" icon={faUsers} /> {/* Updated to 1M */}
      </div>
    </div>
  );
};

export default Counters;
