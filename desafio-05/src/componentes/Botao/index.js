import "./style.css";

export default function Botao({ texto, onclick, type }) {
 
  
  return (
    <button
      className="button"
      type={type}
      onClick={onclick}
    >
      {texto}
    </button>
  );
}
