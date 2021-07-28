import "./style.css";
import logo from "../../assets/pizzaria.png";
import ModalProduto from "../../componentes/ModalProduto";
import ilustracao from "../../assets/illustration-2.svg";

export default function Produtos() {
  return (
    <div className="container-produtos">
      <img className="ilustracao2" src={ilustracao} alt="ilustracao" />
      <div className="header-produtos">
        <img className="logo" src={logo} alt="logo pizzaria" />
        <h1>Pizza Pizzaria & Delivery</h1>
        <button>Logout</button>
      </div>
      <div className="conteudo-pagina">
        <p>
          Você ainda não tem nenhum produto no seu cardápio.
          <br />
          Gostaria de adicionar um novo produto?
        </p>
        <ModalProduto
          textoBotao="Adicionar produto ao cardápio"
          textoBotaoSubmit="Adicionar produto ao cardápio"
        />
      </div>
    </div>
  );
}
