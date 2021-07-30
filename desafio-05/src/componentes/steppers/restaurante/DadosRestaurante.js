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
                    {...register("nomeRestaurante")} 
                />
                <label htmlFor="categoria">Categoria do restaurante</label>
                <select 
                    id="categoria" 
                    type="text"
                    placeholder="Escolha uma categoria"
                    className="inputs"
                    {...register("idCategoria")}
                >
                    <option value selected="categoria">Escolha uma categoria</option>
                    <hr />
                    <option value="1">Diversos</option>
                    <option value="2">Lanches</option>
                    <option value="3">Carnes</option>
                    <option value="4">Massas</option>
                    <option value="5">Pizzas</option>
                    <option value="6">Japonesa</option>
                    <option value="7">Chinesa</option>
                    <option value="8">Mexicano</option>
                    <option value="9">Brasileira</option>
                    <option value="10">Italiana</option>
                    <option value="11">Árabe</option>
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