import React from 'react';
import './style.css';

function DadosRestaurante() {

    return (
        <div className="container-form">
        <form>
            <h1>Cadastro</h1>
            <div className="flex-column form">
                <label htmlFor="nome">Nome do restaurante</label>
                <input 
                    id="nome" 
                    type="text"
                    className="inputs" 
                />
                <label htmlFor="categoria">Categoria do restaurante</label>
                <select 
                    id="categoria" 
                    type="text"
                    placeholder="Escolha uma categoria"
                    className="inputs"
                >
                    <option value selected="categoria">Escolha uma categoria</option>
                    <hr />
                    <option value="diversos">Diversos</option>
                    <option value="Lanches">Lanches</option>
                    <option value="Carnes">Carnes</option>
                    <option value="Massas">Massas</option>
                    <option value="Pizzas">Pizzas</option>
                    <option value="Japonesa">Japonesa</option>
                    <option value="Chinesa">Chinesa</option>
                    <option value="Mexicano">Mexicano</option>
                    <option value="Brasileira">Brasileira</option>
                    <option value="Italiana">Italiana</option>
                    <option value="Árabe">Árabe</option>
                </select>
                <label htmlFor="descricao">Descrição</label>
                <textarea 
                    id="categoria"
                    type="text"
                    className="inputs"
                />
                <span className="text-area-legenda">Máx: 50 caracteres</span> 
            </div>
        </form>
    </div>
    )
}

export default DadosRestaurante;