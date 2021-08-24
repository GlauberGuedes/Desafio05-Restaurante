import "./style.css";

export default function ListaPedidos() {
  return(
    <div className="conteudo-lista-pedidos">
      <p className="bold">0001</p>
      <div className="produtos-pedido">
        <p>Pizza Marguerita Grande - 1 uni</p>
        <p>Pizza Portuguesa Média - 1uni</p>
      </div>
      <p>Av. Tancredo Neves, 2227, ed. Salvador Prime, sala 901:906; 917:920 - Caminho das Árvores, Salvador - BA, 41820-021</p>
      <p>Cláudia Lemos</p>
      <p className="bold">R$ 199,98</p>
    </div>
  );
}