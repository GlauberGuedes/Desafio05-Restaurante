import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './paginas/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login}/>
      </Switch>
    </Router>
  );
}

export default App;
