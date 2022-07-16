import './App.css';
import Navbar from './components/Core/Navbar';
import { BrowserRouter as Router} from 'react-router-dom';
//import { Router } from 'react-router-dom';
import history from './history';

// all chnages

function App() {

  return (
    <Router history={history}>
      <Navbar></Navbar>
    </Router>

  );
}

export default App;
