import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import useStyles from "./style";
import { useState, useEffect } from "react";
import Carregando from "../Carregando";
import AlertaDeErro from "../AlertaDeErro";
import useAuth from "../../hooks/useAuth";
import pizza from "../../assets/pizza.png";

export default function ModalDetalhePedido() {
  const classes = useStyles();
  const { token } = useAuth();
  const [open, setOpen] = useState(false);
  const [pedidoEnviado, setPedidoEnviado] = useState(false);
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

  function abrirModal() {
    setOpen(true);
  }

  function fecharModal() {
    setOpen(false);
  }

  function handleSubmit() {
    setPedidoEnviado(true);
  }

  return (
    <div className={classes.container}>
      <button onClick={abrirModal}>Detalhes Pedido</button>
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
            0001
          </span>
          <div className={classes.enderecoEntrega}>
            <span className={classes.enderecoLaranja}>Endereço de entrega: </span>
            <span>Av. Tancredo Neves, 227, ed. Salvador Primes, sala 901:906 - Caminho das árvores, Salvador - BA, 41820-021</span>
          </div>
          <div className={classes.containerInfoPedido}>
            <div className={classes.infoPedido}>
              <img src={pizza} alt="imagem produto restaurante" className={classes.imagemProduto} />
              <div className={classes.detalhesPedido}>
                <span className={classes.nomeProduto}>Pizza Portuguesa</span>
                <span className={classes.quantidadeProduto}>01 unidade</span>
                <span className={classes.valorProduto}>R$ 99.99</span>
              </div>
            </div>
            <div className={classes.infoPedido}>
              <img src={pizza} alt="imagem produto restaurante" className={classes.imagemProduto} />
              <div className={classes.detalhesPedido}>
                <span className={classes.nomeProduto}>Pizza Marguerita</span>
                <span className={classes.quantidadeProduto}>02 unidades</span>
                <span className={classes.valorProduto}>R$ 199.98</span>
              </div>
            </div>
          </div>
          <div className={classes.linhaDivisao}>
            <hr className={classes.hr}/>
          </div>
          <div className={classes.totalPedido}>
            <span className={classes.total}>Total</span>
            <span className={classes.valor}>R$ 308,87</span>
          </div>
        </DialogContent>
        <DialogActions className={classes.botaoEnviarPedido}>
          {pedidoEnviado ? (
            <span className={classes.desativado}>
              Enviar Pedido
            </span>
          ) : (
            <button type="submit" className="button bt-md ativado" onClick={handleSubmit}>
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
