import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import useStyles from "./style";
import { useState, useEffect } from "react";
import Switches from "../Switch";
import PublishIcon from "@material-ui/icons/Publish";
import imagemVazia from "../../assets/imagem-vazia.svg";
import Carregando from "../../componentes/Carregando";
import AlertaDeErro from "../../componentes/AlertaDeErro";

export default function Modal({
  textoBotao,
  textoBotaoSubmit,
  requisicaoProduto,
  classeBotao,
  nomeModal,
  produtoAtivado,
  observacoesAtivada,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [produtoAtivo, setProdutoAtivo] = useState();
  const [permiteObservacoes, setPermiteObservacoes] = useState();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  function abrirModal() {
    setOpen(true);
  }

  useEffect(() => {
    setErro("");
    setNome("");
    setDescricao("");
    setPreco("");
    setProdutoAtivo(produtoAtivado === undefined ? true : produtoAtivado);
    setPermiteObservacoes(observacoesAtivada === undefined ? true : observacoesAtivada);
  }, [])

  function fecharModal() {
    setOpen(false);
    
  }

  async function onSubmit(e) {
    e.preventDefault();

    setErro("");

    const dados = {
      nome: nome || undefined,
      descricao: descricao || undefined,
      preco: preco || undefined,
      ativo: produtoAtivo,
      permiteObservacoes,
    };
    
    try {
      setCarregando(true);

      const { erro } = await requisicaoProduto(dados);

      setCarregando(false);

      if (erro) {
        return setErro(erro);
      }

      fecharModal();
    } catch (error) {
      setCarregando(false);
      setErro(error.message);
    }
  }

  return (
    <div className={classes.container}>
      <button
        className={"button " + classeBotao}
        type="button"
        onClick={abrirModal}
      >
        {textoBotao}
      </button>
      <Dialog
        open={open}
        onClose={fecharModal}
        aria-labelledby="form-dialog-title"
        maxWidth={false}
        scroll="body"
      >
        <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
          <Typography variant="h1" className={classes.titulo}>
            {nomeModal}
          </Typography>
          <DialogContent className={classes.conteudoForm}>
            <div className={classes.listaInputs}>
              <div className={classes.divInput}>
                <label className={classes.label} htmlFor="nome">
                  Nome
                </label>
                <input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className={classes.input}
                  type="text"
                  id="nome"
                />
              </div>
              <div className={classes.divInput}>
                <label className={classes.label} htmlFor="descricao">
                  Descrição
                </label>
                <input
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className={classes.input}
                  type="text"
                  id="descricao"
                />
                <Typography variant="subtitle2" className={classes.span}>
                  Máx: 80 caracteres
                </Typography>
              </div>
              <div className={classes.divInput}>
                <label className={classes.label} htmlFor="valor">
                  Valor
                </label>
                <input
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
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
                setAtivo={setPermiteObservacoes}
                ativo={permiteObservacoes}
              />
            </div>
            <div className={classes.imagem}>
              <img
                src={imagemVazia}
                alt="imagem do produto"
                width="150"
                heigth="150"
              />
              <label className={classes.labelImagem} htmlFor="file">
                <PublishIcon className={classes.upload} />
                <br />
                Clique ou arraste <br />
                para adicionar uma imagem
              </label>
              <input
                className={classes.inputImagem}
                onChange={(e) => console.log(e.target.files)}
                type="file"
                id="file"
              />
            </div>
          </DialogContent>
          <DialogActions className={classes.botoes}>
            <button
              className={classes.botaoCancelar}
              type="button"
              onClick={fecharModal}
            >
              Cancelar
            </button>
            <button type="submit" className={"button " + classeBotao}>
              {textoBotaoSubmit}
            </button>
          </DialogActions>
          <AlertaDeErro erro={erro} />
          <Carregando open={carregando} />
        </form>
      </Dialog>
    </div>
  );
}
