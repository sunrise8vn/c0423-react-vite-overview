import './App.css';
import CountColor from './components/CountColor';
import ChatRoom from './components/ChatRoom';
import UseEffectWithDependencies from './components/UseEffectWithDependencies';
import UseContentComponent from './features/UseContextComponent';
import UseRefComponent from './features/UseRefComponent';
import { createContext, useState } from 'react';
import Red from './features/UseContextComponent/Red';

import Music from './features/music';

import { Provider } from 'react-redux';
import store from './redux/store';
import { Route, Routes } from 'react-router-dom';
import AddMusic from './features/music/AddMusic';
import EditMusic from './features/music/EditMusic';
import PlayMusic from './features/music/PlayMusic';

export const AppContext = createContext();

function App() {
  const [state, setState] = useState({
    message: 'Bạn đã trúng thưởng với số tiền là: ',
    money: 0,
    rewards: [],
  });

  const [rewards, setRewards] = useState([]);

  return (
    <>
      {/* <AppContext.Provider value={{ state, setState, rewards, setRewards }}> */}
      {/* <CountColor /> */}
      {/* <UseEffectWithDependencies /> */}
      {/* <UseContentComponent /> */}
      {/* <UseRefComponent /> */}
      {/* <Red /> */}
      {/* </AppContext.Provider> */}

      <Provider store={store}>
        <Routes>
          <Route path="" element={<Music />}></Route>
          <Route path="music/add" element={<AddMusic />}></Route>
          <Route path="music/edit/:songId" element={<EditMusic />}></Route>
          <Route path="music/watch" element={<PlayMusic />}></Route>
        </Routes>
      </Provider>
    </>
  );
}

export default App;
