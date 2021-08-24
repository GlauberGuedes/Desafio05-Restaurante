import "./style.css";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { post } from "../../servicos/requisicaoAPI";
import ilustracao from "../../assets/illustration.svg";
import Carregando from "../../componentes/Carregando";
import AlertaDeErro from "../../componentes/AlertaDeErro";
import useAuth from "../../hooks/useAuth";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const { setToken, token } = useAuth();
  const [visivel, setVisivel] = useState(false);

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

  async function onSubmit(data) {
    setErro("");
    if (!data.email || !data.senha) {
      return setErro("Todos os campos são obrigatórios.");
    }
    setCarregando(true);

    try {
      const { dados, erro } = await post("login", data);

      setCarregando(false);
      if (erro) {
        return setErro(dados);
      }

      setToken(dados.token);

      history.push("/pedidos");
    } catch (error) {
      setCarregando(false);
      return setErro(error.message);
    }
  }

  return (
    <div className="container-login">
      <img className="ilustracao" src={ilustracao} alt="ilustração" />
      <form onSubmit={handleSubmit(onSubmit)} className="form-login">
        <h1>Login</h1>
        <div className="div-input">
          <label htmlFor="email">Email</label>
          <input {...register("email")} type="email" id="email" />
        </div>
        <div className="div-input">
          <label htmlFor="senha">Senha</label>
          <input
            {...register("senha")}
            type={visivel ? "text" : "password"}
            id="senha"
          />
          <div className="icone" onClick={() => setVisivel(!visivel)}>
            {visivel ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </div>
        </div>
        <button className="botao-login" type="submit">
          Entrar
        </button>
        <p>
          Ainda não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </form>
      <AlertaDeErro erro={erro} />
      <Carregando open={carregando} />
    </div>
  );
}
