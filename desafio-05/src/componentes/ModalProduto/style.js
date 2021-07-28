import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "min-content",
  },
  form: {
    padding: "64px",
  },
  conteudoForm: {
    display: "flex",
    gap: 48,
    maxWidth: 872,
    maxHeight: 557,
    padding: 0,
    marginTop: 40,
    marginBottom: 70,
  },
  titulo: {
    fontFamily: "'Baloo 2', cursive",
    fontSize: "32px",
    lineHeight: "150%",
    color: "#D13201",
    fontWeight: 700,
  },
  listaInputs: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  divInput: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  label: {
    color: "#393C40",
    fontWeight: 600,
    fontSize: 16,
    marginLeft: 16,
  },
  input: {
    border: "1px solid #BEBEBE",
    borderRadius: "7px",
    height: "47px",
    fontSize: "18px",
    padding: "3px 0 3px 10px",
    width: 408,
  },
  inputNumber: {
    border: "1px solid #BEBEBE",
    borderRadius: "7px",
    height: "47px",
    fontSize: "18px",
    padding: "3px 0 3px 10px",
    maxWidth: 176,
  },
  span: {
    fontFamily: "'Montserrat', sans-serif",
    color: "#6F7377",
    marginLeft: 24,
  },
  imagem: {
    width: 384,
    heigth: 384,
    marginBottom: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    background: "linear-gradient(177.64deg, rgba(18, 18, 18, 0.2) 1.98%, rgba(18, 18, 18, 0.8) 98.3%)",
    border: "2px solid rgba(251, 59, 0, 0.2)",
    borderRadius: 16,
  },
  labelImagem: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: 600,
    fontSize: 14,
    position: "absolute",
    top: 0,
    lefth: 0,
    rigth: 0,
    bottom: 0,
  },
  inputImagem: {
    position: "absolute",
    top: 0,
    lefth: 0,
    rigth: 0,
    bottom: 0,
    opacity: 0,
    cursor: "pointer",
  },
  upload: {
    color: "white",
    fontSize: 30,
    marginTop: "250px"
  },
  botoes: {
    display: "flex",
    gap: 16,
  },
  botaoCancelar: {
    all: "unset",
    color: "#D13201",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
  },
}));

export default useStyles;
