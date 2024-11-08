import React, { useState, useEffect } from 'react';

const ScrollCounter = () => {
  const [countValues, setCountValues] = useState([0, 0, 0]);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const container = document.querySelector('.counters');
    const counters = document.querySelectorAll('.counters span');
    const targets = [500, 1000, 1500]; // Example target values
 
    const handleScroll = () => {
      if (window.pageYOffset > container.offsetTop - window.innerHeight && !activated) {
        counters.forEach((counter, index) => {
          let count = 0;
          const updateCount = () => {
            if (count < targets[index]) {
              count++;
              setCountValues((prevValues) => {
                const newValues = [...prevValues];
                newValues[index] = count;
                return newValues;
              });
              setTimeout(updateCount, 20);
            }
          };
          updateCount();
        });
        setActivated(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activated]);

  return (
    <div className="countdown">
      
    </div>
  );
};

export default ScrollCounter;
