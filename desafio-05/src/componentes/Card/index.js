import "./style.css";
import pizza from "../../assets/pizza.png";
import ModalProduto from "../../componentes/ModalProduto";
import useAuth from "../../hooks/useAuth";
import { putProduto } from "../../servicos/requisicaoAPI";

export default function Card({
  nome,
  descricao,
  preco,
  listaDeProdutos,
  id,
  produtoAtivado,
  observacoesAtivada,
}) {
  const { token } = useAuth();

  async function atualizarProduto(data) {
    console.log(data);
    try {
      const { dados, erro } = await putProduto(`produtos/${id}`, data, token);

      if (erro) {
        return { erro: dados };
      }

      await listaDeProdutos();

      return { erro: false };
    } catch (error) {
      throw error;
    }
  }

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
        <button className="botao-excluir" type="button">
          Excluir produto do catálogo
        </button>
        <ModalProduto
          nomeModal="Editar produto"
          textoBotao="Editar produto"
          textoBotaoSubmit="Salvar alterações"
          classeBotao="bt-md"
          requisicaoProduto={atualizarProduto}
          produtoAtivado={produtoAtivado}
          observacoesAtivada={observacoesAtivada}
        />
      </div>
    </div>
  );
}
