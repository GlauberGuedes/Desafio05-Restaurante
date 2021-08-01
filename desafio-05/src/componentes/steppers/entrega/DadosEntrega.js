import React from "react";
import { useFormContext } from "react-hook-form";
import "./style.css";

function DadosEntrega() {
  const { register } = useFormContext();

  return (
    <div className="container-form">
      <form>
        <h1>Cadastro</h1>
        <div className="flex-column form">
          <label className="label-cadastro" htmlFor="taxa_entrega">
            Taxa de Entrega
          </label>
          <input
            id="taxa_entrega"
            className="input-cadastro"
            type="number"
            {...register("taxaEntrega")}
          />
          <label className="label-cadastro" htmlFor="tempo_entrega_minutos">
            Tempo estimado de entrega
          </label>
          <input
            id="tempo_entrega_minutos"
            type="number"
            className="input-cadastro"
            {...register("tempoEntregaEmMinutos")}
          />
          <label className="label-cadastro" htmlFor="valor_minimo_pedido">
            Valor mínimo do pedido
          </label>
          <input
            id="valor_minimo_pedido"
            type="number"
            className="input-cadastro"
            placeholder="R$ 00,00"
            {...register("valorMinimoPedido")}
          />
        </div>
      </form>
    </div>
  );
}

export default DadosEntrega;
