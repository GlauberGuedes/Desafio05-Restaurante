import "./style.css";
import ModalProduto from "../../componentes/ModalProduto";
import ilustracao from "../../assets/illustration-2.svg";
import useAuth from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { get } from "../../servicos/requisicaoAPI";
import Card from "../../componentes/Card";
import { useState, useEffect } from "react";
import Carregando from "../../componentes/Carregando";
import AlertaDeErro from "../../componentes/AlertaDeErro";
import AlertaDeConfirmacao from "../../componentes/AlertaDeConfirmacao";
import ModalEditarUsuario from "../../componentes/ModalEditarUsuario";

export default function Produtos() {
  const { setToken, token } = useAuth();
  const [produtos, setProdutos] = useState([]);
  const history = useHistory();
  const [erro, setErro] = useState("");
  const [restaurante, setRestaurante] = useState("");
  const [usuario, setUsuario] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [confirmacao, setConfirmacao] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErro("");
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [erro]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setConfirmacao("");
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [confirmacao]);

  async function dadosUsuario () {
    setErro("");
    setCarregando(true);
    try {
      const { dados, erro } = await get('usuarios', token);

      setCarregando(false);
      if (erro) {
        return setErro(dados);
      }

      setRestaurante(dados.restaurante);
      setUsuario(dados.usuario);
    } catch (error) {
      setCarregando(false);
      setErro(error.message);
    }
  }

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
    dadosUsuario();
  }, []);

  function logout() {
    setToken("");
    history.push("/");
  }

  return (
    <div className="container-produtos">
      <img className="ilustracao2" src={ilustracao} alt="ilustracao" />
      <div
        className="header-produtos"
        style={{
          backgroundImage: `linear-gradient(
      205.02deg,
      rgba(18, 18, 18, 0.2) 36.52%,
      rgba(18, 18, 18, 0.8) 77.14%
    ), url(${restaurante.imagemCategoria})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <ModalEditarUsuario
          setConfirmacaoCadastro={setConfirmacao}
          usuario={usuario}
          restaurante={restaurante}
          dadosUsuario={dadosUsuario}
        />
        <div className="titulo-restaurante">
          <h1>{restaurante.nome}</h1>
          <button className="botao-link" onClick={() => history.push("/pedidos")}>Pedidos</button>
        </div>
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
          <ModalProduto listaDeProdutos={listaDeProdutos} setConfirmacao={setConfirmacao}/>
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
              setConfirmacao={setConfirmacao}
              imagem={produto.imagem}
            />
          ))}
        </div>
      </div>
      <AlertaDeErro erro={erro} />
      <AlertaDeConfirmacao mensagem={confirmacao} />
      <Carregando open={carregando} />
    </div>
  );
}
