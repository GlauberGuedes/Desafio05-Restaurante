import useStyles from "./style";
import pizza from "../../assets/pizza.png";

export default function ListaProdutos(
  nome,
  quantidade,
  valor
) {
  const classes = useStyles();

  return (
    <div className={classes.containerInfoPedido}>
      <div className={classes.infoPedido}>
        <img src={pizza} alt="imagem produto restaurante" className={classes.imagemProduto} />
        <div className={classes.detalhesPedido}>
          <span className={classes.nomeProduto}>{nome}</span>
          <span className={classes.quantidadeProduto}>{quantidade}</span>
          <span className={classes.valorProduto}>{valor}</span>
        </div>
      </div>
    </div>
  );
}