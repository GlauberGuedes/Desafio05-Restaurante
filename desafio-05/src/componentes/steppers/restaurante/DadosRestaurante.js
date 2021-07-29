import React from 'react';
import { useFormContext } from 'react-hook-form';
import './style.css';

function DadosRestaurante() {
    const { register } = useFormContext();

    return (
        <div className="container-form">
        <form>
            <h1>Cadastro</h1>
            <div className="flex-column form">
                <label htmlFor="nome_restaurante">Nome do restaurante</label>
                <input 
                    id="nome_restaurante" 
                    type="text"
                    className="inputs"
                    {...register("nome_restaurante")} 
                />
                <label htmlFor="categoria">Categoria do restaurante</label>
                <select 
                    id="categoria" 
                    type="text"
                    placeholder="Escolha uma categoria"
                    className="inputs"
                    {...register("categoria")}
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
                    id="descricao"
                    type="text"
                    className="inputs"
                    {...register("descricao")}
                />
                <span className="text-area-legenda">Máx: 50 caracteres</span> 
            </div>
        </form>
    </div>
    )
}

export default DadosRestaurante;