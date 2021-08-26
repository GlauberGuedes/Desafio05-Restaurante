import "./style.css";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { post } from "../../servicos/requisicaoAPI";
import ilustracao from "../../assets/illustration.svg";
import Carregando from "../../componentes/Carregando";
import AlertaDeErro from "../../componentes/AlertaDeErro";
import useAuth from "../../hooks/useAuth";
import AlertaDeConfirmacao from "../../componentes/AlertaDeConfirmacao";

export default function SolicitarAlteracao() {
  const history = useHistory();
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const { token } = useAuth();
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");


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
    if (!email) {
      return setErro("O email é obrigatório.");
    }
    setCarregando(true);

    const data = {
      email,
    }

    try {
      const { dados, erro } = await post("solicitar-alteracao", data);

      setCarregando(false);
      if (erro) {
        return setErro(dados);
      }

      setMensagem(dados);
 
    } catch (error) {
      setCarregando(false);
      return setErro(error.message);
    }
  }

  return (
    <div className="container-recuperar-senha">
      <img className="ilustracao-recuperar-senha" src={ilustracao} alt="ilustração" />
      <form onSubmit={(e) => onSubmit(e)} className="form-recuperar-senha">
        <h1>ESQUECEU SUA SENHA DE ACESSO?</h1>
        <div className="div-input">
          <label htmlFor="email">Informe seu e-mail de cadastro</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" />
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