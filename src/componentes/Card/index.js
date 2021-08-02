import "./style.css";
import pizza from "../../assets/pizza.png";
import ModalEditarProduto from "../../componentes/ModalEditarProduto";
import ModalDelete from "../../componentes/ModalDelete";
import Carregando from "../../componentes/Carregando";
import AlertaDeErro from "../../componentes/AlertaDeErro";
import { useState } from "react";

export default function Card({
  nome,
  descricao,
  preco,
  listaDeProdutos,
  id,
  produtoAtivado,
  observacoesAtivada,
  setErro,
  erro,
}) {
  const [carregando, setCarregando] = useState(false);

  return (
    <div className="container-card">
      <div className="conteudo-card">
        <div className="informacao-card">
          <h3>{nome}</h3>
          <p>{descricao}</p>
          <span>
            {Number(preco / 100).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
        <img src={pizza} alt="imagem do produto" />
      </div>
      <div className="botoes-card">
        <ModalDelete
          setErro={setErro}
          setCarregando={setCarregando}
          id={id}
          listaDeProdutos={listaDeProdutos}
        />
        <ModalEditarProduto
          id={id}
          produtoAtivado={produtoAtivado}
          observacoesAtivada={observacoesAtivada}
          nomeProduto={nome}
          descricaoProduto={descricao}
          precoProduto={preco}
          imagem={pizza}
          listaDeProdutos={listaDeProdutos}
        />
      </div>
      <AlertaDeErro erro={erro} />
      <Carregando open={carregando} />
    </div>
  );
}
