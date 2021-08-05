import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import useStyles from "./style";
import { useState, useEffect } from "react";
import Switches from "../Switch";
import Carregando from "../Carregando";
import AlertaDeErro from "../AlertaDeErro";
import InputImagem from "../InputImagem";
import { postProduto } from "../../servicos/requisicaoAPI";
import useAuth from "../../hooks/useAuth";

export default function Modal({ listaDeProdutos }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [produtoAtivo, setProdutoAtivo] = useState(true);
  const [permiteObservacoes, setPermiteObservacoes] = useState(true);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [base64Imagem, setBase64Imagem] = useState("");
  const [preco, setPreco] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const { token } = useAuth();

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
    setErro("");
    setNome("");
    setDescricao("");
    setPreco("");
    setBase64Imagem("");
    setProdutoAtivo(true);
    setPermiteObservacoes(true);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    const data = {
      nome: nome,
      descricao: descricao,
      preco: preco,
      imagem: base64Imagem,
      permiteObservacoes,
      ativo: produtoAtivo,
    };

    try {
      const { dados, erro } = await postProduto("produtos", data, token);

      setCarregando(false);

      if (erro) {
        return setErro(dados);
      }

      await listaDeProdutos();
      fecharModal();
      setOpen(false);
    } catch (error) {
      setCarregando(false);
      setErro(error.message);
    }
  }

  return (
    <div className={classes.container}>
      <button className="button bt-lg" type="button" onClick={abrirModal}>
        Adicionar produto ao cardápio
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
            Novo produto
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
            <InputImagem setBase64Imagem={setBase64Imagem}/>
          </DialogContent>
          <DialogActions className={classes.botoes}>
            <button
              className={classes.botaoCancelar}
              type="button"
              onClick={fecharModal}
            >
              Cancelar
            </button>
            <button type="submit" className="button bt-lg">
              Adicionar produto ao cardápio
            </button>
          </DialogActions>
          <AlertaDeErro erro={erro} />
          <Carregando open={carregando} />
        </form>
      </Dialog>
    </div>
  );
}
