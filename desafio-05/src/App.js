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
          <Route path="/usuarios" component={FormularioCadastro} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
