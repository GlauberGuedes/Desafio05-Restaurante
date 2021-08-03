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
import useAuth from "../../hooks/useAuth";
import {
  putProduto,
  postDesativar,
  postAtivar,
} from "../../servicos/requisicaoAPI";

export default function ModalEditar({
  produtoAtivado,
  observacoesAtivada,
  nomeProduto,
  descricaoProduto,
  precoProduto,
  imagem,
  id,
  listaDeProdutos,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [produtoAtivo, setProdutoAtivo] = useState(produtoAtivado);
  const [permiteObservacoes, setPermiteObservacoes] =
    useState(observacoesAtivada);
  const [nome, setNome] = useState(nomeProduto);
  const [descricao, setDescricao] = useState(descricaoProduto);
  const [preco, setPreco] = useState(precoProduto);
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
    setNome(nomeProduto);
    setDescricao(descricaoProduto);
    setPreco(precoProduto);
    setProdutoAtivo(produtoAtivado);
    setPermiteObservacoes(observacoesAtivada);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    const data = {
      informacoes: {
        nome: nome,
        descricao: descricao,
        preco: preco,
        permiteObservacoes,
      },
      ativo: produtoAtivo,
    };

    try {
      const { dados, erro } = await putProduto(
        `produtos/${id}`,
        data.informacoes,
        token
      );

      if (erro) {
        setCarregando(false);
        return setErro(dados);
      }

      if (data.ativo) {
        const resposta = await postAtivar(`produtos/${id}/ativar`, token);

        if (resposta.erro) {
          setCarregando(false);
          return setErro(resposta.dados);
        }
      } else {
        const resposta = await postDesativar(`produtos/${id}/desativar`, token);

        if (resposta.erro) {
          setCarregando(false);
          return setErro(resposta.dados);
        }
      }

      await listaDeProdutos();
      setCarregando(false);
      setOpen(false);
    } catch (error) {
      setCarregando(false);
      setErro(error.message);
    }
  }

  return (
    <div className={classes.container}>
      <button className="button bt-md" type="button" onClick={abrirModal}>
        Editar produto
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
            Editar produto
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
            <InputImagem imagem={imagem} />
          </DialogContent>
          <DialogActions className={classes.botoes}>
            <button
              className={classes.botaoCancelar}
              type="button"
              onClick={fecharModal}
            >
              Cancelar
            </button>
            <button type="submit" className="button bt-md">
              Salvar alterações
            </button>
          </DialogActions>
          <AlertaDeErro erro={erro} />
          <Carregando open={carregando} />
        </form>
      </Dialog>
    </div>
  );
}
