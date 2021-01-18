import logo from './logo.svg';
import './App.css';
import SignIn from "./components/sign_in";
import Home from "./components/home"
import { BrowserRouter as Router, Route } from 'react-router-dom';
function App() {

  return (
    <div className="App">
        <Router>
            <Route exact path="/" component={SignIn} />
            <Route path="/home" component={Home} />
        </Router>

    </div>
  );
}

export default App;
