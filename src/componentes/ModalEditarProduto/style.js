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