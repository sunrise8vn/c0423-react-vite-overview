import React, { useContext, useState } from 'react';
import Green from './Green';
import { AppContext } from '../../App';

const Blue = () => {
  const { state, setState, rewards, setRewards } = useContext(AppContext);
  const [newMoney, setNewMoney] = useState();

  const handleChangeMoney = (e) => {
    const money = +e.target.value;
    setNewMoney(money);
  };

  const handleClickReward = () => {
    const currentRewards = rewards;
    currentRewards.push(newMoney);

    setRewards(currentRewards);

    setState({
      ...state,
      money: state.money + newMoney,
      // rewards: currentRewards,
    });
  };

  return (
    <div>
      <div>
        <input type="text" name={newMoney} onChange={handleChangeMoney} />
        <button onClick={handleClickReward}>Thưởng tiền</button>
      </div>
      <Green />
    </div>
  );
};

export default Blue;
