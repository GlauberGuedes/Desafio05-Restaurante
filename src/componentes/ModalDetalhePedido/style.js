import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "min-content",
    borderRadius: 40
  },
  conteudoDetalhesPedido: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    maxWidth: 625,
    padding: 70,
  },
  modalPedido: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    cursor: "pointer"
  },
  botaoFechar: {
    cursor: "pointer",
    position: "relative",
    left: 490,
    top: 20,
    color: "#D13201",
    width: 19,
    height: 3.50,
  },
  tituloDetalhes: {
    fontFamily: "'Baloo 2', sans-serif",
    fontWeight: 500,
    fontSize: 40,
    color: "rgba(18, 18, 18, 0.8)",
    marginTop: 20,
    marginBottom: -15
  },
  nomeUsuario: {
    fontSize: 18,
    fontWeight: 600,
  },
  enderecoEntrega: {
    fontSize: 16
  },
  enderecoLaranja: {
    color: "#D13201",
    fontWeight: 700,
    width: 89
  },
  containerInfoPedido: {
    marginTop: 15,
},
  infoPedido: {
    display: "flex",
    maxWidth: 346,
  },
  imagemProduto: {
    width: 77,
    height: 77,
    border: "2px solid rgba(251, 59, 0, 0.2)",
    borderRadius: 16
  },
  nomeProduto: {
    fontSize: 20,
    fontWeight: 600,
    color: "#525459"
  },
  quantidadeProduto: {
    fontSize: 14,
    fontWeight: 500,
    color: "#525459"
  },
  valorProduto: {
    width: 80,
    height: 20,
    background: "linear-gradient(0deg, rgba(13, 138, 79, 0.1), rgba(13, 138, 79, 0.1)), #FFFFFF;",
    borderRadius: 4,
    color: "#006335",
    fontSize: 10,
    paddingTop: 4,
    paddingLeft: 17,
  },
  detalhesPedido: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      marginLeft: 24,
      fontSize: 14,
      gap: 8,
  },
  span: {
    fontFamily: "'Montserrat', sans-serif",
    color: "#6F7377",
    marginLeft: 24,
    marginTop: -47,
  },
  linhaDivisao: {
    display: "flex",
    justifyContent: "center"
  },
  hr: {
    width: 480
  },
  totalPedido: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "#525459"
  },
  total: {
    fontSize: 14,
    fontWeight: 400
  },
  valor: {
    fontSize: 24,
    fontWeight: 600
  },
  botaoEnviarPedido: {
      position: "relative",
      right: 195,
      bottom: 30
  },
  desativado: {
    width: 200,
    height: 40,
    backgroundColor: "#BABABA",
    color: "#ffffff",
    fontSize: 14,
    fontWeight: 700,
    paddingLeft: 50,
    paddingTop: 11,
    borderRadius: 20
  }
}));

export default useStyles;