import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import useStyles from "./style";
import { useState } from "react";
import Switches from "../Switch";
import PublishIcon from "@material-ui/icons/Publish";
import imagemVazia from "../../assets/imagem-vazia.svg";

export default function Modal({ textoBotao, textoBotaoSubmit }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [produtoAtivo, setProdutoAtivo] = useState(true);
  const [observacaoAtiva, setObservacaoAtiva] = useState(true);

  function abrirModal() {
    setOpen(true);
  }

  function fecharModal() {
    setOpen(false);
  }

  return (
    <div className={classes.container}>
      <button className="buttonLG" type="button" onClick={abrirModal}>{textoBotao}</button>
      <Dialog
        open={open}
        onClose={fecharModal}
        aria-labelledby="form-dialog-title"
        maxWidth={false}
        scroll="body"
      >
        <form className={classes.form}>
          <Typography variant="h1" className={classes.titulo}>
            Novo produto
          </Typography>
          <DialogContent className={classes.conteudoForm}>
            <div className={classes.listaInputs}>
              <div className={classes.divInput}>
                <label className={classes.label} htmlFor="nome">
                  Nome
                </label>
                <input className={classes.input} type="text" id="nome" />
              </div>
              <div className={classes.divInput}>
                <label className={classes.label} htmlFor="descricao">
                  Descrição
                </label>
                <input className={classes.input} type="text" id="descricao" />
                <Typography variant="subtitle2" className={classes.span}>
                  Máx: 80 caracteres
                </Typography>
              </div>
              <div className={classes.divInput}>
                <label className={classes.label} htmlFor="valor">
                  Valor
                </label>
                <input
                  className={classes.inputNumber}
                  type="number"
                  id="valor"
                />
              </div>
              <Switches
                texto="Ativar produto"
                ativo={produtoAtivo}
                setAtivo={setProdutoAtivo}
              />
              <Switches
                texto="Permitir observações"
                ativo={observacaoAtiva}
                setAtivo={setObservacaoAtiva}
              />
            </div>
            <div className={classes.imagem}>
              <img src={imagemVazia} alt="imagem do produto" width="150" heigth="150"/>
              <label className={classes.labelImagem} htmlFor="file">
                <PublishIcon className={classes.upload} />
                <br />
                Clique ou arraste <br />
                para adicionar uma imagem
              </label>
              <input className={classes.inputImagem} onChange={(e) => console.log(e.target.files)} type="file" id="file" />
            </div>
          </DialogContent>
          <DialogActions className={classes.botoes}>
            <button className={classes.botaoCancelar} type="button" onClick={fecharModal}>Cancelar</button>
            <button type="submit" className="buttonLG">{textoBotaoSubmit}</button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
