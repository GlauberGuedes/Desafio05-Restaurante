import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { AuthContextProvider } from "./contexto/AuthContext";
import useAuth from "./hooks/useAuth";
import Login from "./paginas/Login";
import FormularioCadastro from "./paginas/cadastro/FormularioCadastro";
import "./styles/global.css";
import Produtos from "./paginas/Produtos";

function RotasProtegidas(props) {
  const { token } = useAuth();
  return (
    <Route render={() => (token ? props.children : <Redirect to="/" />)} />
  );
}

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/cadastro" component={FormularioCadastro} />
          <RotasProtegidas>
            <Route path="/produtos" component={Produtos} />
          </RotasProtegidas>
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
