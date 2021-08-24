import "./style.css";
import ilustracao from "../../assets/illustration-2.svg";
import useAuth from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { get } from "../../servicos/requisicaoAPI";
import { useState, useEffect } from "react";
import Carregando from "../../componentes/Carregando";
import AlertaDeErro from "../../componentes/AlertaDeErro";
import AlertaDeConfirmacao from "../../componentes/AlertaDeConfirmacao";
import ModalEditarUsuario from "../../componentes/ModalEditarUsuario";
import ListaPedidos from "../../componentes/ListaPedidos";

export default function Pedidos() {
  const { setToken, token } = useAuth();
  const history = useHistory();
  const [erro, setErro] = useState("");
  const [restaurante, setRestaurante] = useState("");
  const [usuario, setUsuario] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [confirmacao, setConfirmacao] = useState("");
  const [entregue, setEntregue] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [pedidosFiltrados, setPedidosFiltrados] = useState([]);

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

  async function dadosUsuario() {
    setErro("");
    setCarregando(true);
    try {
      const { dados, erro } = await get("usuarios", token);

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

  async function dadosPedido() {
    setErro("");
    setCarregando(true);
    try {
      const { dados, erro } = await get("pedidos", token);

      setCarregando(false);
      if (erro) {
        return setErro(dados);
      }

      setPedidos(dados);
    } catch (error) {
      setCarregando(false);
      setErro(error.message);
    }
  }

  useEffect(() => {
    dadosUsuario();
    dadosPedido();
  }, []);

  useEffect(() => {
    if (entregue) {
      const todosPedidos = [...pedidos];
      const filtroPedidos = todosPedidos.filter((pedido) => pedido.entregue);
      return setPedidosFiltrados(filtroPedidos);
    }

    const filtroPedidos = pedidos.filter((pedido) => !pedido.saiuParaEntrega);
    setPedidosFiltrados(filtroPedidos);
  }, [entregue, pedidos]);

  function logout() {
    setToken("");
    history.push("/");
  }

  return (
    <div className="container-pedidos">
      <img className="ilustracao2" src={ilustracao} alt="ilustracao" />
      <div
        className="header-pedidos"
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
          <button
            className="botao-link"
            onClick={() => history.push("/produtos")}
          >
            Cardápio
          </button>
        </div>
        <button onClick={logout}>Logout</button>
      </div>
      <div className="conteudo-pedidos">
        <div className="botoes-entregas">
          <button
            className={
              entregue
                ? "button-nao-entregue"
                : "button-nao-entregue button-selecionado"
            }
            onClick={() => setEntregue(false)}
          >
            Não entregues
          </button>
          <button
            className={
              entregue
                ? "button-entregue button-selecionado"
                : "button-entregue"
            }
            onClick={() => setEntregue(true)}
          >
            Entregues
          </button>
        </div>
        <div className="pedidos">
          <div className="titulo-pedidos">
            <h5>Pedido</h5>
            <h5>Itens</h5>
            <h5>Endereço</h5>
            <h5>Cliente</h5>
            <h5>Total</h5>
          </div>
          {pedidosFiltrados.map((pedido) => (
            <ListaPedidos
              key={pedido.idPedido}
              id={pedido.idPedido}
              produtos={pedido.itensPedido}
              endereco={pedido.endereco}
              complemento={pedido.complemento}
              cep={pedido.cep}
              nome={pedido.nomeConsumidor}
              total={pedido.valorTotal}
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
