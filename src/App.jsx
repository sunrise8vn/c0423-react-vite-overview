import { Provider } from 'react-redux';
import store from './redux/store';
import { Route, Routes } from 'react-router-dom';

// import './App.css';
import CountColor from './components/CountColor';
import ChatRoom from './components/ChatRoom';
import UseEffectWithDependencies from './components/UseEffectWithDependencies';
import UseContentComponent from './features/UseContextComponent';
import UseRefComponent from './features/UseRefComponent';
import { createContext, useState } from 'react';
import Red from './features/UseContextComponent/Red';

import Music from './features/music';
import AddMusic from './features/music/AddMusic';
import EditMusic from './features/music/EditMusic';
import PlayMusic from './features/music/PlayMusic';

import Customer from './features/customer';
import AddCustomer from './features/customer/AddCustomer';
import EditCustomer from './features/customer/EditCustomer';

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
          <Route path="music" element={<Music />} />
          <Route path="music/add" element={<AddMusic />} />
          <Route path="music/edit/:songId" element={<EditMusic />} />
          <Route path="music/watch" element={<PlayMusic />} />

          <Route path="customers" element={<Customer />} />
          <Route path="customers/add" element={<AddCustomer />} />
          <Route path="customers/edit/:customerId" element={<EditCustomer />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
