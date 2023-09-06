import logo from './logo.svg';
import './App.css';
import {Greet} from './components/Greet';
import Welcome from './components/Welcome';
import {Hello} from './components/Hello'
import Message from './components/Message'
import Counter from './components/Counter';

function App() {
  return (
    <div className="App">
      <Counter    />
        {/* <Welcome/> <Greet/> */}
       {/* <Hello name = "Bruce" heroName="Batman" htmlcontent="This is Childern props"/>
       <Hello name = "Clark" heroName="Superman">
        <button> Hello </button> </Hello> <Hello name = "Diana" heroName="WonderWoman"/> */}

    </div>
  );
}

export default App;
