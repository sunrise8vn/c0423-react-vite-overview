import React, { useRef, useState } from 'react';
import { randomColor } from '../utils/appUtils';

const CountColor = () => {
  const [person, setPerson] = useState({
    count: 0,
    backgroundColor: '#fff',
  });

  const colorRef = useRef(person.backgroundColor);

  const handleChange = () => {
    while (colorRef.current === person.backgroundColor) {
      colorRef.current = randomColor();
    }

    setPerson((prev) => ({
      count: prev.count + 1,
      backgroundColor: colorRef.current,
    }));
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: person.backgroundColor,
          width: '250px',
          height: '250px',
          border: 'solid 1px brown',
        }}
      >
        <button style={{ marginTop: '50%' }} onClick={handleChange}>
          Count: {person.count}
        </button>
      </div>
    </div>
  );
};

export default CountColor;
