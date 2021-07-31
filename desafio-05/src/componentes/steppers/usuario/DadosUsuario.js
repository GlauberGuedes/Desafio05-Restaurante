import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import './style.css';

function DadosUsuario() {
    const { register } = useFormContext();
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

    return (
        <div className="container-form">
            <form>
                <h1>Cadastro</h1>
                <div className="flex-column form">
                    <label className="label-cadastro" htmlFor="nome">Nome de usuário</label>
                    <input 
                        className="input-cadastro"
                        id="nome" 
                        type="text"
                        {...register("nome")} 
                    />
                    <label className="label-cadastro" htmlFor="email">E-mail</label>
                    <input
                        className="input-cadastro" 
                        id="email" 
                        type="text"
                        {...register("email")} 
                    />
                    <div className="flex-column input-senha">
                        <div className="div-inputSenha flex-column">
                        <label className="label-cadastro" htmlFor="senha">Senha</label>
                        <input
                            className="input-cadastro" 
                            id="senha" 
                            type={mostrarSenha ? "text" : "password"}
                            {...register("senha")}
                        />
                        <FontAwesomeIcon 
                            icon={mostrarSenha ? faEye : faEyeSlash} 
                            className="visualizar-senha" 
                            size="lg" 
                            onClick={() => setMostrarSenha(!mostrarSenha)} 
                        />
                        </div>
                        <div className="div-inputSenha flex-column">
                        <label className="label-cadastro" htmlFor="confirmar_senha">Confirmar Senha</label>
                        <input 
                            className="input-cadastro"
                            id="confirmar_senha" 
                            type={mostrarSenha ? "text" : "password"}
                            {...register("confirmar_senha")}
                        />
                        <FontAwesomeIcon 
                            icon={mostrarConfirmarSenha ? faEye : faEyeSlash} 
                            className="visualizar-confirmaSenha" 
                            size="lg" 
                            onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)} 
                        />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default DadosUsuario;