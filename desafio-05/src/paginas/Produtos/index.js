import "./style.css";
import logo from "../../assets/pizzaria.png";
import ModalProduto from "../../componentes/ModalProduto";
import ilustracao from "../../assets/illustration-2.svg";
import useAuth from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { postProduto, get } from "../../servicos/requisicaoAPI";
import Card from "../../componentes/Card";
import { useState, useEffect } from "react";
import Carregando from "../../componentes/Carregando";
import AlertaDeErro from "../../componentes/AlertaDeErro";

export default function Produtos() {
  const { setToken, token } = useAuth();
  const [produtos, setProdutos] = useState([]);
  const history = useHistory();
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function listaDeProdutos() {
    setCarregando(true);
    setErro("");
    try {
      const { dados, erro } = await get("produtos", token);

      setCarregando(false);

      if (erro) {
        return setErro(dados);
      }

      return setProdutos(dados);

    } catch (error) {
      setCarregando(false);
      setErro(error.message);
    }
  }

  useEffect(() => {
    listaDeProdutos();
  }, []);

  function logout() {
    setToken("");
    history.push("/");
  }

  async function cadastrarProduto(data) {
    try {
      const { dados, erro } = await postProduto("produtos", data, token);

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
    <div className="container-produtos">
      <img className="ilustracao2" src={ilustracao} alt="ilustracao" />
      <div className="header-produtos">
        <img className="logo" src={logo} alt="logo pizzaria" />
        <h1>Pizza Pizzaria & Delivery</h1>
        <button onClick={logout}>Logout</button>
      </div>
      <div className="conteudo-pagina">
        {produtos.length === 0 && (
          <p>
            Você ainda não tem nenhum produto no seu cardápio.
            <br />
            Gostaria de adicionar um novo produto?
          </p>
        )}
        <div className={produtos.length === 0 ? "" : "botao-modal"}>
          <ModalProduto
            nomeModal="Novo produto"
            classeBotao="bt-lg"
            textoBotao="Adicionar produto ao cardápio"
            textoBotaoSubmit="Adicionar produto ao cardápio"
            requisicaoProduto={cadastrarProduto}
          />
        </div>
        <div className="container-cards">
          {produtos.map((produto) => (
            <Card
              key={produto.id}
              preco={produto.preco}
              nome={produto.nome}
              descricao={produto.descricao}
              listaDeProdutos={listaDeProdutos}
              id={produto.id}
              produtoAtivado={produto.ativo}
              observacoesAtivada={produto.permite_observacoes}
            />
          ))}
        </div>
      </div>
      <AlertaDeErro erro={erro} />
      <Carregando open={carregando} />
    </div>
  );
}
