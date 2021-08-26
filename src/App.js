import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { AuthContextProvider } from "./contexto/AuthContext";
import useAuth from "./hooks/useAuth";
import Login from "./paginas/Login";
import SolicitarAlteracao from "./paginas/SolicitarAlteracao";
import RedefinirSenha from "./paginas/RedefinirSenha";
import FormularioCadastro from "./paginas/Cadastro";
import "./styles/global.css";
import Produtos from "./paginas/Produtos";
import Pedidos from "./paginas/Pedidos";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const outerTheme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
});

function RotasProtegidas(props) {
  const { token } = useAuth();
  return (
    <Route render={() => (token ? props.children : <Redirect to="/" />)} />
  );
}

function App() {
  return (
    <ThemeProvider theme={outerTheme}>
      <AuthContextProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/redefinir-senha" exact component={SolicitarAlteracao}/>
            <Route path="/redefinir-senha/:tokenRecuperacao" component={RedefinirSenha}/>
            <Route path="/cadastro" component={FormularioCadastro} />
            <RotasProtegidas>
              <Route path="/pedidos" component={Pedidos} />
              <Route path="/produtos" component={Produtos} />
            </RotasProtegidas>
          </Switch>
        </Router>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
