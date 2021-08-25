import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import useStyles from "./style";
import { useState, useEffect } from "react";
import Carregando from "../Carregando";
import AlertaDeErro from "../AlertaDeErro";
import useAuth from "../../hooks/useAuth";
import { postAtivar } from "../../servicos/requisicaoAPI";

export default function ModalDetalhePedido({
  id,
  pedidos,
  endereco,
  complemento,
  cep,
  nome,
  total,
  saiuParaEntrega
}) {
  const classes = useStyles();
  const { token } = useAuth();
  const [open, setOpen] = useState(false);
  const [pedidoEnviado, setPedidoEnviado] = useState(saiuParaEntrega);
  const [itensPedido, setItensPedido] = useState([{}]);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErro("");
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [erro]);

  async function onSubmit(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {

      const resposta = await postAtivar(`entregas/${id}/ativar`, token);

      if (resposta.erro) {
        setCarregando(false);
        return setErro(resposta.dados);
      }

      setCarregando(false);
    
    } catch (error) {
      setCarregando(false);
      setErro(error.message);
    }
  }

  function abrirModal() {
    setOpen(true);
    setItensPedido(pedidos);
    setPedidoEnviado(saiuParaEntrega);
  }

  function fecharModal() {
    setOpen(false);
    setItensPedido(pedidos);
    setPedidoEnviado(saiuParaEntrega);
  }

  return (
    <div className={classes.container}>
      <div onClick={abrirModal} className={classes.modalPedido}>
      </div>
      <Dialog
        open={open}
        onClose={fecharModal}
        aria-labelledby="form-dialog-title"
        maxWidth={false}
        scroll="body"
      >
        <DialogContent className={classes.conteudoDetalhesPedido}>
          <h3 className={classes.botaoFechar} onClick={fecharModal}>x</h3>
          <span className={classes.tituloDetalhes}>
            {id <= 9 && (
              <span>000{id}</span>
            )}
            {id >= 10 && id <= 90 && (
              <span>00{id}</span>
            )}
            {id >= 100 && id <= 999 && (
              <span>0{id}</span>
            )}
            {id > 1000 && (
              <span>{id}</span>
            )}
          </span>
          <span className={classes.nomeUsuario}>{nome}</span>
          <div className={classes.enderecoEntrega}>
            <span className={classes.enderecoLaranja}>Endereço de entrega: </span>
            <span>{endereco}, {complemento}, {cep}</span>
          </div>
          {itensPedido.map((item) => (
            <div className={classes.containerInfoPedido}>
              <div className={classes.infoPedido}>
                <img src={item.imagemProduto} alt="imagem produto restaurante" className={classes.imagemProduto} />
                <div className={classes.detalhesPedido}>
                  <span className={classes.nomeProduto}>{item.nomeProduto}</span>
                  <div>
                    <span className={classes.quantidadeProduto}>{item.quantidade}</span>
                    {item.quantidade <= 1 ? (
                      <span className={classes.quantidadeProduto}> unidade</span>
                    ) : (
                      <span className={classes.quantidadeProduto}> unidades</span>
                    )}
                  </div>
                  <span className={classes.valorProduto}>
                    {(item.valor / 100).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div className={classes.linhaDivisao}>
            <hr className={classes.hr} />
          </div>
          <div className={classes.totalPedido}>
            <span className={classes.total}>Total</span>
            <span className={classes.valor}>
              {(total / 100).toLocaleString("pt-BR",
                {
                  style: "currency",
                  currency: "BRL",
                })}
            </span>
          </div>
        </DialogContent>
        <DialogActions className={classes.botaoEnviarPedido}>
          {pedidoEnviado ? (
            <span className={classes.desativado}>
              Enviar Pedido
            </span>
          ) : (
            <button type="submit" className="button bt-md ativado" onClick={(e) => onSubmit(e)}>
              Enviar Pedido
            </button>
          )}
        </DialogActions>
        <AlertaDeErro erro={erro} />
        <Carregando open={carregando} />
      </Dialog>
    </div>
  );
}
