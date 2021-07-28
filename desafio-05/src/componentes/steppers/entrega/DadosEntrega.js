import React from 'react';
import './style.css';

function DadosEntrega() {

    return (
        <div className="container-form">
            <form>
                <h1>Cadastro</h1>
                <div className="flex-column form">
                    <label htmlFor="taxa-entrega">Taxa de Entrega</label>
                    <input 
                        id="taxa-entrega" 
                        type="number" 
                    />
                    <label htmlFor="tempo-entrega">Tempo estimado de entrega</label>
                    <input 
                        id="tempo-entrega" 
                        type="number" 
                    />
                    <label htmlFor="valor-pedido">Valor mínimo do pedido</label>
                    <input 
                        id="valor-pedido" 
                        type="number" 
                        placeholder="R$ 00,00"
                    />
                </div>
            </form>
        </div>
    )
}

export default DadosEntrega;