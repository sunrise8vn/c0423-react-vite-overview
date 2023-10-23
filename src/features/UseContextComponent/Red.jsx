import React, { useContext } from 'react';

import { AppContext } from '../../App';
import Blue from './Blue';

const Red = () => {
  const { state } = useContext(AppContext);

  return (
    <div>
      <p>Red</p>
      <p>{state.message + state.money}</p>
      <Blue />
    </div>
  );
};

export default Red;
