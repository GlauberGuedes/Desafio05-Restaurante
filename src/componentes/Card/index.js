import "./style.css";
import ModalEditarProduto from "../../componentes/ModalEditarProduto";
import ModalDelete from "../../componentes/ModalDelete";
import Carregando from "../../componentes/Carregando";
import AlertaDeErro from "../../componentes/AlertaDeErro";
import { useState, useEffect } from "react";

export default function Card({
  nome,
  descricao,
  preco,
  listaDeProdutos,
  id,
  produtoAtivado,
  observacoesAtivada,
  imagem,
  setConfirmacao,
}) {
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErro("");
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [erro]);

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
        {imagem && <img src={imagem} alt="imagem do produto" />}
      </div>
      <div className="botoes-card">
        <ModalDelete
          setErro={setErro}
          setCarregando={setCarregando}
          id={id}
          listaDeProdutos={listaDeProdutos}
          setConfirmacao={setConfirmacao}
        />
        <ModalEditarProduto
          id={id}
          produtoAtivado={produtoAtivado}
          observacoesAtivada={observacoesAtivada}
          nomeProduto={nome}
          descricaoProduto={descricao}
          precoProduto={preco}
          imagem={imagem}
          listaDeProdutos={listaDeProdutos}
        />
      </div>
      <AlertaDeErro erro={erro} />
      <Carregando open={carregando} />
    </div>
  );
}
