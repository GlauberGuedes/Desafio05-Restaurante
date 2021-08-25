import "./style.css";
import { Link, useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { post } from "../../servicos/requisicaoAPI";
import ilustracao from "../../assets/illustration.svg";
import Carregando from "../../componentes/Carregando";
import AlertaDeErro from "../../componentes/AlertaDeErro";
import useAuth from "../../hooks/useAuth";
import AlertaDeConfirmacao from "../../componentes/AlertaDeConfirmacao";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

export default function RedefinirSenha() {
  const history = useHistory();
  const { tokenRecuperacao } = useParams();
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const { token } = useAuth();
  const [mensagem, setMensagem] = useState("");
  const [senha, setSenha] = useState("");
  const [repetirSenha, setRepetirSenha] = useState("");
  const [visivel, setVisivel] = useState(false);
  const [repetirVisivel, setRepetirVisivel] = useState(false);


  useEffect(() => {
    if (token) {
      history.push("/pedidos");
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErro("");
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [erro]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMensagem("");
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [mensagem]);

  async function onSubmit(e) {
    e.preventDefault();
    setErro("");
    if(!senha || !repetirSenha) {
      return setErro("Senha e repetir senha são obrigatórios.");
    }
    if(senha !== repetirSenha) {
      return setErro("As senha devem ser iguais.");
    }
    if(senha.length < 6) {
      return setErro("Senha deve conter no mínimo 6 caracteres.");
    }

    setCarregando(true);

    const data = {
      senha,
      token: tokenRecuperacao
    }

    try {
      const { dados, erro } = await post("redefinir-senha", data);

      setCarregando(false);
      if (erro) {
        return setErro(dados);
      }

      setMensagem(dados);

      setTimeout(() => {
        history.push("/");
      }, 2000);
 
    } catch (error) {
      setCarregando(false);
      return setErro(error.message);
    }
  }

  return (
    <div className="container-recuperar-senha">
      <img className="ilustracao-recuperar-senha" src={ilustracao} alt="ilustração" />
      <form onSubmit={(e) => onSubmit(e)} className="form-recuperar-senha">
        <h1>Redefinir senha</h1>
        <div className="div-input">
          <label htmlFor="senha">Nova senha</label>
          <input
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            type={visivel ? "text" : "password"}
            id="senha"
          />
          <div className="icone" onClick={() => setVisivel(!visivel)}>
            {visivel ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </div>
        </div>
        <div className="div-input">
          <label htmlFor="repetirSenha">Repetir Nova senha</label>
          <input
            value={repetirSenha}
            onChange={(e) => setRepetirSenha(e.target.value)}
            type={repetirVisivel ? "text" : "password"}
            id="repetirSenha"
          />
          <div className="icone" onClick={() => setRepetirVisivel(!repetirVisivel)}>
            {visivel ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </div>
        </div>
        <button type="submit">
          Enviar
        </button>
        <p>
          Voltar para o login? <Link to="/">Login</Link>
        </p>
      </form>
      <AlertaDeErro erro={erro} />
      <Carregando open={carregando} />
      <AlertaDeConfirmacao mensagem={mensagem} />
    </div>
  );
}