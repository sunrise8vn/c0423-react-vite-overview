import './App.css';
import CountColor from './components/CountColor';
import ChatRoom from './components/ChatRoom';
import UseEffectWithDependencies from './components/UseEffectWithDependencies';
import UseContentComponent from './features/UseContextComponent';

function App() {
  return (
    <>
      {/* <CountColor /> */}
      {/* <UseEffectWithDependencies /> */}
      <UseContentComponent />
    </>
  );
}

export default App;
