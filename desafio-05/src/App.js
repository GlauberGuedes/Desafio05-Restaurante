import './styles/global.css';
import { 
        BrowserRouter as Router, 
        Route, 
        Switch 
      } from 'react-router-dom'
import FormularioCadastro from './pages/cadastro/FormularioCadastro';
import Login from './pages/login';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/cadastro" component={FormularioCadastro} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
