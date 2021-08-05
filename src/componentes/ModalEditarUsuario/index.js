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
import { get, putUsuario } from "../../servicos/requisicaoAPI";
import logo from "../../assets/LogoRestaurante.png";

export default function ModalEditarUsuario({setConfirmacaoCadastro}) {
  const classes = useStyles();
  const { setToken, token, restaurante, setRestaurante, usuario, setUsuario } = useAuth();
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState(usuario.nome);
  const [email, setEmail] = useState(usuario.email);
  const [nomeUsuarioRestaurante, setNomeUsuarioRestaurante] = useState(restaurante.nome);
  const [categoria, setCategoria] = useState(restaurante.categoria_id);
  const [categorias, setCategorias] = useState([]);
  const [descricao, setDescricao] = useState(restaurante.descricao);
  const [entrega, setEntrega] = useState(restaurante.taxa_entrega);
  const [tempo, setTempo] = useState(restaurante.tempo_entrega_minutos);
  const [valorMinimo, setValorMinimo] = useState(restaurante.valor_minimo_pedido);
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const [base64Imagem, setBase64Imagem] = useState("");

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
    setNome(usuario.nome);
    setEmail(usuario.email);
    setNomeUsuarioRestaurante(restaurante.nome);
    setCategoria(restaurante.categoria_id);
    setDescricao(restaurante.descricao);
    setEntrega(restaurante.taxa_entrega);
    setTempo(restaurante.tempo_entrega_minutos);
    setValorMinimo(restaurante.valor_minimo_pedido);
    setBase64Imagem("");
    setSenha("");
    setConfirmaSenha("");
  }

  useEffect(() => {
    listaDeCategorias();
  }, []);

  async function listaDeCategorias() {
    setErro("");
    setCarregando(true);
    try {
      const { dados, erro } = await get("categorias");

      setCarregando(false);
      if (erro) {
        return setErro(dados);
      }

      setCategorias(dados);
    } catch (error) {
      setCarregando(false);
      setErro(error.message);
    }
  }
  
  async function onSubmit(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    const dadosCadastro = {
      nome: nome,
      email: email,
      senha: senha,
      restaurante: {
        nome: nomeUsuarioRestaurante,
        idCategoria: categoria,
        descricao: descricao,
        taxaEntrega: entrega,
        tempoEntregaEmMinutos: tempo,
        valorMinimoPedido: valorMinimo,
        imagem: base64Imagem
      },
    };

    try {
      const { dados, erro } = await putUsuario(
        'usuarios',
        dadosCadastro,
        token
      );
        
      setCarregando(false);
      if (senha) {
        if (senha !== confirmaSenha) {
          setErro("Senha e Repita a senha devem ser iguais!");
          return;
        }
      }
      
      if (erro) {
        setCarregando(false);
        return setErro(dados);
      }
      
      await dadosUsuario();
      setConfirmacaoCadastro("Alterações realizadas com sucesso!");

      setCarregando(false);
      setOpen(false);
    } catch (error) {
      setCarregando(false);
      setErro(error.message);
    }
  }

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

  return (
    <div className={classes.container}>
      <img className={classes.logo} src={restaurante.imagem ? restaurante.imagem : logo} alt="logo restaurante" onClick={abrirModal} />
      <Dialog
        open={open}
        onClose={fecharModal}
        aria-labelledby="form-dialog-title"
        maxWidth={false}
        scroll="body"
      >
        <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
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
                  value={nomeUsuarioRestaurante}
                  onChange={(e) => setNomeUsuarioRestaurante(e.target.value)}
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
                  placeholder="Escolha uma categoria"
                >
                  <option value={restaurante.categoria_id} selected="categoria">
                    {restaurante.nomeCategoria}
                  </option>
                  <hr />
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                  ))}
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
                  value={senha}
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
                  value={confirmaSenha}
                  onChange={(e) => setConfirmaSenha(e.target.value)}
                  className={classes.input}
                  type={mostrarConfirmarSenha ? "text" : "password"}
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
              <InputImagem imagem={restaurante.imagem} setBase64Imagem={setBase64Imagem}/>
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
