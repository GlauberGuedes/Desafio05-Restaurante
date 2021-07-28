import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import './style.css'

function SenhaInput({ label, value, setValue }) {
    const [mostrarSenha, setMostrarSenha] = useState(false);

        return (
            <div className="flex-column input-senha">
                <label htmlFor="senha">{label}</label>
                <input 
                    id="senha" 
                    type={mostrarSenha ? "text" : "password"} 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)} 
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