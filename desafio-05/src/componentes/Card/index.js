import "./style.css";
import pizza from "../../assets/pizza.png";
import ModalProduto from "../../componentes/ModalProduto";
import useAuth from "../../hooks/useAuth";
import {
  putProduto,
  del,
  postDesativar,
  postAtivar,
} from "../../servicos/requisicaoAPI";
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
}) {
  const { token } = useAuth();
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function atualizarProduto(data) {
    try {
      const { dados, erro } = await putProduto(
        `produtos/${id}`,
        data.informacoes,
        token
      );

      if (erro) {
        return { erro: dados };
      }

      if (data.ativo) {
        const resposta = await postAtivar(`produtos/${id}/ativar`, token);

        if (resposta.erro) {
          return { erro: resposta.dados };
        }
      } else {
        const resposta = await postDesativar(`produtos/${id}/desativar`, token);

        if (resposta.erro) {
          return { erro: resposta.dados };
        }
      }

      await listaDeProdutos();

      return { erro: false };
    } catch (error) {
      throw error;
    }
  }

  async function excluirProduto() {
    setErro("");
    setCarregando(true);
    try {
      const { dados, erro } = await del(`produtos/${id}`, token);

      setCarregando(false);

      if (erro) {
        return setErro(dados);
      }

      await listaDeProdutos();

      return;
    } catch (error) {
      setCarregando(false);
      return setErro(error.message);
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
        <button
          className="botao-excluir"
          type="button"
          onClick={excluirProduto}
        >
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
          imagem={pizza}
        />
      </div>
      <AlertaDeErro erro={erro} />
      <Carregando open={carregando} />
    </div>
  );
}
