import "./style.css";
import { useEffect, useState } from "react";
import ModalDetalhePedido from "../ModalDetalhePedido";

export default function ListaPedidos({
  id,
  produtos,
  endereco,
  complemento,
  cep,
  nome,
  total,
  saiuParaEntrega,
  dadosPedido,
  setConfirmacao
}) {
  const [enderecoConsumidor, setEnderecoConsumidor] = useState("");
  const [verMais, setVerMais] = useState(false);
  const [verMaisEndereco, setVerMaisEndereco] = useState(false);

  useEffect(() => {
    if (complemento) {
      const enderecoConsumidor = endereco + ", " + complemento + ", " + cep;
      return setEnderecoConsumidor(enderecoConsumidor);
    }

    const enderecoConsumidor = endereco + ", " + cep;
    setEnderecoConsumidor(enderecoConsumidor);
  }, []);

  return (
    <div className="conteudo-lista-pedidos">
      <div className="div-modal-pedido">
      <p className="bold">{id}</p>    
      <div className="produtos-pedido">
        {produtos.length < 3
          ? produtos.map((produto) => (
              <p>
                {produto.nomeProduto} - {produto.quantidade} uni
              </p>
            ))
          : produtos
              .filter((produto, indice) => {
                if (verMais) {
                  return produto;
                } else {
                  return indice < 2;
                }
              })
              .map((produto) => (
                <p>
                  {produto.nomeProduto} - {produto.quantidade} uni
                </p>
              ))}
        {produtos.length > 2 && (
          <button onClick={() => setVerMais(!verMais)} className={"ver-mais"}>
            {verMais ? "ver menos" : "ver mais"}
          </button>
        )}
      </div>
      <p>
        {!verMaisEndereco && enderecoConsumidor.length > 60
          ? enderecoConsumidor.slice(0, 60) + "..."
          : enderecoConsumidor}
        <button
          onClick={() => setVerMaisEndereco(!verMaisEndereco)}
          className={
            enderecoConsumidor.length < 60 ? "ver-mais-desativado" : "ver-mais"
          }
        >
          {verMaisEndereco ? "ver menos" : "ver mais"}
        </button>
      </p>
      <p>{nome}</p>
      <p className="bold">
        {Number(total / 100).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </p>
      <ModalDetalhePedido
          id={id}
          pedidos={produtos}
          endereco={endereco}
          complemento={complemento}
          cep={cep}
          nome={nome}
          total={total}
          saiuParaEntrega={saiuParaEntrega}
          dadosPedido={dadosPedido}
          setConfirmacao={setConfirmacao}
      />
      </div>
    </div>
  );
}
