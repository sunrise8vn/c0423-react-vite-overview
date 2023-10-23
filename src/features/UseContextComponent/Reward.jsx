import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../../App';

const Reward = () => {
  const { rewards } = useContext(AppContext);

  return (
    <ul>
      {rewards.map((item, index) => (
        <li key={item + index}>{item}</li>
      ))}
    </ul>
  );
};

export default Reward;
