import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import useStyles from "./style";
import { useState, useEffect } from "react";
import Carregando from "../Carregando";
import AlertaDeErro from "../AlertaDeErro";
import InputImagem from "../InputImagem";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/pizzaria.png";

export default function ModalEditarUsuario({
  nomeUsuario,
  emailUsuario,
  nomeRestaurante,
  categoriaRestaurante,
  descricaoRestaurante,
  taxaEntrega,
  tempoEntrega,
  valorMinimoEntrega,
  senhaCadastro,
  confirmaSenhaCadastro,
  imagemUsuario,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState(nomeUsuario);
  const [email, setEmail] = useState(emailUsuario);
  const [restaurante, setRestaurante] = useState(nomeRestaurante);
  const [categoria, setCategoria] = useState(categoriaRestaurante);
  const [descricao, setDescricao] = useState(descricaoRestaurante);
  const [entrega, setEntrega] = useState(taxaEntrega);
  const [tempo, setTempo] = useState(tempoEntrega);
  const [valorMinimo, setValorMinimo] = useState(valorMinimoEntrega);
  const [senha, setSenha] = useState(senhaCadastro);
  const [confirmaSenha, setConfirmaSenha] = useState(confirmaSenhaCadastro);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
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
    setNome(nomeUsuario);
    setEmail(emailUsuario);
    setRestaurante(nomeRestaurante);
    setCategoria(categoriaRestaurante);
    setDescricao(descricaoRestaurante);
    setEntrega(taxaEntrega);
    setTempo(tempoEntrega);
    setValorMinimo(valorMinimoEntrega);
    setSenha(senhaCadastro);
    setConfirmaSenha(confirmaSenhaCadastro);
  }

  return (
    <div className={classes.container}>
      <img className={classes.logo} src={logo} alt="logo restaurante" onClick={abrirModal} />
      <Dialog
        open={open}
        onClose={fecharModal}
        aria-labelledby="form-dialog-title"
        maxWidth={false}
        scroll="body"
      >
        <form className={classes.form}>
          <Typography variant="h1" className={classes.tituloUsuario}>
            Editar perfil
          </Typography>
          <DialogContent className={classes.conteudoFormUsuario}>
            <div className={classes.listaInputs}>
              <div className={classes.divInput}>
                <label className={classes.label} htmlFor="nome">
                  Nome de usuário
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
                <label className={classes.label} htmlFor="email">
                  E-mail
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={classes.input}
                  type="text"
                  id="email"
                />
              </div>
              <div className={classes.divInput}>
                <label className={classes.label} htmlFor="nome_restaurante">
                  Nome do restaurante
                </label>
                <input
                  value={restaurante}
                  onChange={(e) => setRestaurante(e.target.value)}
                  className={classes.input}
                  type="text"
                  id="nome_restaurante"
                />
              </div>
              <div className={classes.divInput}>
                <label className={classes.label} htmlFor="categoria">
                  Categoria do restaurante
                </label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className={classes.selectCategoria}
                  type="text"
                  id="categoria"
                >
                  <option value="" selected="categoria">
                    Escolha uma categoria
                  </option>
                </select>
              </div>
              <div className={classes.divInput}>
                <label className={classes.label} htmlFor="descricao">
                  Descrição
                </label>
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className={classes.textArea}
                  type="text"
                  id="descricao"
                />
                <Typography variant="subtitle2" className={classes.span}>
                  Máx: 50 caracteres
                </Typography>
              </div>
              <div className={classes.divInput}>
                <label className={classes.label} htmlFor="taxa_entrega">
                  Taxa de entrega
                </label>
                <input
                  value={entrega}
                  onChange={(e) => setEntrega(e.target.value)}
                  className={classes.input}
                  type="number"
                  id="taxa_entrega"
                />
              </div>
              <div className={classes.divInput}>
                <label className={classes.label} htmlFor="tempo_entrega">
                  Tempo estimado de entrega
                </label>
                <input
                  value={tempo}
                  onChange={(e) => setTempo(e.target.value)}
                  className={classes.input}
                  type="number"
                  id="tempo_entrega"
                />
              </div>
              <div className={classes.divInput}>
                <label className={classes.label} htmlFor="valor_minimo">
                  Valor mínimo do pedido
                </label>
                <input
                  value={valorMinimo}
                  onChange={(e) => setValorMinimo(e.target.value)}
                  className={classes.input}
                  type="number"
                  id="valor_minimo"
                  placeholder="R$ 00,00"
                />
              </div>
              <div className={classes.divInput}>
                <label className={classes.label} htmlFor="senha">
                  Senha
                </label>
                <input
                  value={senhaCadastro}
                  onChange={(e) => setSenha(e.target.value)}
                  className={classes.input}
                  type={mostrarSenha ? "text" : "password"}
                  id="senha"
                />
                <FontAwesomeIcon
                  icon={mostrarSenha ? faEye : faEyeSlash}
                  className={classes.iconSenha}
                  size="lg"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
              />
              </div>
              <div className={classes.divInput}>
                <label className={classes.label} htmlFor="confirma_senha">
                  Repita a senha
                </label>
                <input
                  value={confirmaSenhaCadastro}
                  onChange={(e) => setConfirmaSenha(e.target.value)}
                  className={classes.input}
                  type={mostrarSenha ? "text" : "password"}
                  id="confirma_senha"
                />
                <FontAwesomeIcon
                  icon={mostrarConfirmarSenha ? faEye : faEyeSlash}
                  className={classes.iconConfirmaSenha}
                  size="lg"
                  onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                />
              </div>
            </div>
            <div className={classes.imagemPerfil}>
              <InputImagem imagem={imagemUsuario} />
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
