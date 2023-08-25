import './App.css';
import { Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ChatPage from './Pages/ChatPage';

function App() {
  return (
    <div className="App"> 
      <Route exact path='/' component = {HomePage} />
      <Route exact path='/chat' component = {ChatPage} />
    </div>
  );
}

export default App;

// import "./App.css";
// import { Route } from 'react-router-dom';
// import HomePage from './Pages/HomePage';
// import Chatpage from "./Pages/ChatPage";

// function App() {
//   return (
//     <div className="App">
//       <Route path="/" component={HomePage} exact />
//       <Route path="/chat" component={Chatpage} />
//     </div>
//   );
// }

// export default App;
