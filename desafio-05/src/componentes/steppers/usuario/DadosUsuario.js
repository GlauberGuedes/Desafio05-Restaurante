import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import '../../InputSenha/style.css';

function DadosUsuario() {
    const { register } = useFormContext();
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

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
                    <div className="flex-column input-senha">
                        <label htmlFor="senha">Senha</label>
                        <input 
                            id="senha" 
                            type={mostrarSenha ? "text" : "password"}
                            {...register("senha")}
                        />
                        <FontAwesomeIcon 
                            icon={mostrarSenha ? faEye : faEyeSlash} 
                            className="visualizar-senha" 
                            size="md" 
                            onClick={() => setMostrarSenha(!mostrarSenha)} 
                        />
                        <label htmlFor="confirmar_senha">Confirmar Senha</label>
                        <input 
                            id="confirmar_senha" 
                            type={mostrarSenha ? "text" : "password"}
                        />
                        <FontAwesomeIcon 
                            icon={mostrarConfirmarSenha ? faEye : faEyeSlash} 
                            className="visualizar-senha" 
                            size="md" 
                            onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)} 
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default DadosUsuario;