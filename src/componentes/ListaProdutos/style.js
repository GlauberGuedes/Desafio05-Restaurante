import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    containerInfoPedido: {
        height: 360
    },
    infoPedido: {
      display: "flex",
      maxWidth: 346,
      marginTop: 10,
      marginBottom: 28
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
        paddingLeft: 15,
    },
}))

export default useStyles;