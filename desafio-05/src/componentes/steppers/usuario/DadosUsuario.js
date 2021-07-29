import React from 'react';
import { useFormContext } from 'react-hook-form';
import SenhaInput from '../../InputSenha';


function DadosUsuario() {
    const { register } = useFormContext();

    return (
        <div className="container-form">
            <form>
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
                        {...register("senha")}
                    />
                    <SenhaInput
                        id="confirmar_senha"
                        label="Repita a senha"
                        {...register("confirmar_senha")}
                    />
                </div>
                
            </form>
        </div>
    )
}

export default DadosUsuario;