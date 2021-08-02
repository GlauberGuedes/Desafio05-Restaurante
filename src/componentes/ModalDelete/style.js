import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container:{
    width: 'min-content',
  },
  botao: {
    all: "unset",
    color: "#f21b1b",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    width: 216,
  },
  botoes: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    padding: 20,
    marginTop: 20,
  },
  botaoRemover: {
      background: "#d13201",
      borderRadius: 20,
      padding: "11px 40px",
      color: "#ffffff",
      fontWeight: 600,
      fontSize: 14,
      lineHeight: "100%",
      border: "unset",
      margin: 0,
      cursor: "pointer",
  }
}));

export default useStyles;
