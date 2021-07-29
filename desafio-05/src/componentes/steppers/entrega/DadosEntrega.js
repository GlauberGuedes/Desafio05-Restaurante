import React from 'react';
import { useFormContext } from 'react-hook-form';
import './style.css';

function DadosEntrega() {
    const { register } = useFormContext();

    return (
        <div className="container-form">
            <form>
                <h1>Cadastro</h1>
                <div className="flex-column form">
                    <label htmlFor="taxa_entrega">Taxa de Entrega</label>
                    <input 
                        id="taxa_entrega" 
                        type="number"
                        {...register("taxa_entrega")} 
                    />
                    <label htmlFor="tempo_entrega">Tempo estimado de entrega</label>
                    <input 
                        id="tempo_entrega" 
                        type="number"
                        {...register("tempo_entrega")} 
                    />
                    <label htmlFor="valor_pedido">Valor mínimo do pedido</label>
                    <input 
                        id="valor-pedido" 
                        type="number" 
                        placeholder="R$ 00,00"
                        {...register("valor_pedido")} 
                    />
                </div>
            </form>
        </div>
    )
}

export default DadosEntrega;