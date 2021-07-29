import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import './style.css'

function SenhaInput({ label }) {
    const [mostrarSenha, setMostrarSenha] = useState(false);

        return (
            <div className="flex-column input-senha">
                <label htmlFor="senha">{label}</label>
                <input 
                    id={{label} === "Senha" ? "senha" : "confirmar_senha"} 
                    type={mostrarSenha ? "text" : "password"}
                />
                <FontAwesomeIcon 
                    icon={mostrarSenha ? faEye : faEyeSlash} 
                    className="visualizar-senha" 
                    size="md" 
                    onClick={() => setMostrarSenha(!mostrarSenha)} 
                />
            </div>
        )
    }

export default SenhaInput;