import { CircularProgress } from 'material-ui';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import SenhaInput from '../../InputSenha';


function DadosUsuario() {
    const { register, handleSubmit } = useForm();
    const history = useHistory();
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');

    async function onSubmit(data) {
        setCarregando(true);
        setErro('');
    
        try {
          const response = await fetch('http://localhost:3000/cadastro', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-type': 'application/json'
            }
          })
          
          const userData = await response.json();
          console.log(userData);
    
          history.push('/')
        } catch (error) {
          setErro(error.message);
        }
        
        setCarregando(false);
      }

    return (
        <div className="container-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Cadastro</h1>
                <div className="flex-column form">
                    <label htmlFor="nome">Nome de usuário</label>
                    <input 
                        id="nome" 
                        type="text"
                        {...register("nome")} 
                    />
                    <label htmlFor="email">E-mail</label>
                    <input 
                        id="email" 
                        type="text"
                        {...register("email")} 
                    />
                    <SenhaInput
                        id="senha"
                        label="Senha"
                        value={senha}
                        setValue={setSenha} 
                        {...register("senha")}
                    />
                    <SenhaInput
                        id="senha"
                        label="Repita a senha"
                        value={confirmarSenha}
                        setValue={setConfirmarSenha} 
                        {...register("confirmar_senha")}
                    />
                    {carregando && <CircularProgress />}
                    {erro}
                </div>
            </form>
        </div>
    )
}

export default DadosUsuario;