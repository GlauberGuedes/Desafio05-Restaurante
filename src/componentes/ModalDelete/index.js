import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import useStyles from "./style";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { del } from "../../servicos/requisicaoAPI";

export default function ModalDelete({
  id,
  setErro,
  setCarregando,
  listaDeProdutos,
  setConfirmacao,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { token } = useAuth();

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function stop(e) {
    e.stopPropagation();
  }

  async function removerProduto() {
    setConfirmacao("");
    setErro("");
    setCarregando(true);
    try {
      const { dados, erro } = await del(`produtos/${id}`, token);

      setCarregando(false);

      if (erro) {
        setOpen(false);
        return setErro(dados);
      }

      await listaDeProdutos();

      setConfirmacao("Produto deletado com sucesso.");
      return;
    } catch (error) {
      setCarregando(false);
      return setErro(error.message);
    }
  }

  return (
    <div onClick={(e) => stop(e)} className={classes.container}>
      <button className={classes.botao} onClick={handleClickOpen}>
        Excluir produto do catálogo
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Remover produto do catálogo?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" component="p">
            Esta ação não poderá ser desfeita.
          </Typography>
        </DialogContent>
        <DialogActions className={classes.botoes}>
          <button variant="contained" className={classes.botao} onClick={handleClose} color="primary">
            Manter produto
          </button>
          <button
            className={classes.botaoRemover}
            variant="contained"
            type="submit"
            color="secondary"
            onClick={removerProduto}
          >
            Remover
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
