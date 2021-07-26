import './style.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ilustracao from '../../assets/illustration.svg';


export default function Login () {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return(
    <div className="container-login">
      <img className="ilustracao" src={ilustracao} alt="ilustração"/>
      <form className="form-login">
        <h1>Login</h1>
        <div className="div-input">
          <label htmlFor="email">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email"/>
        </div>
        <div className="div-input">
          <label htmlFor="senha">Senha</label>
          <input value={senha} onChange={(e) => setSenha(e.target.value)} type="password" id="senha"/>
        </div>
        <button type="submit">Entrar</button>
        <p>Ainda não tem uma conta? <Link to="/cadastro">Cadastre-se</Link></p>
      </form>
    </div>
  );
}