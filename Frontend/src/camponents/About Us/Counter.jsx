import React, { useEffect, useRef, useState } from 'react';

// ✅ Counter Component (outside StatsCounter)
const Counter = ({ value, suffix, start }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let current = 0;
    const duration = 2000;
    const increment = value / (duration / 20);

    const interval = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(Math.ceil(current));
      }
    }, 20);

    return () => clearInterval(interval);
  }, [start, value]);

  return (
    <h5 className="fw-semibold  mb-1">
      {count}
      {suffix}
    </h5>
  );
};
export default  Counter;