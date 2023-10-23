import React, { useContext } from 'react';
import { AppContext } from '../../App';
import Reward from './Reward';

const Green = () => {
  const { state } = useContext(AppContext);

  return (
    <div>
      <p>Green</p>
      <p>{state.message + state.money}</p>
      <Reward />
    </div>
  );
};

export default Green;
