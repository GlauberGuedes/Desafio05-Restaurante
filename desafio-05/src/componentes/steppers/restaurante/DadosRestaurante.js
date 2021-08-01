import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import "./style.css";
import { get } from "../../../servicos/requisicaoAPI";
import Carregando from "../../../componentes/Carregando";
import AlertaDeErro from "../../../componentes/AlertaDeErro";

function DadosRestaurante() {
  const { register } = useFormContext();
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [categorias, setCategorias] = useState([]);

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

  return (
    <div className="container-form">
      <form>
        <h1>Cadastro</h1>
        <div className="flex-column form">
          <label className="label-cadastro" htmlFor="nome_restaurante">
            Nome do restaurante
          </label>
          <input
            id="nome_restaurante"
            type="text"
            className="input-cadastro"
            {...register("nomeRestaurante")}
          />
          <label className="label-cadastro" htmlFor="categoria">
            Categoria do restaurante
          </label>
          <select
            id="categoria"
            type="text"
            placeholder="Escolha uma categoria"
            className="input-cadastro"
            {...register("idCategoria")}
          >
            <option value="" selected="categoria">
              Escolha uma categoria
            </option>
            <hr />
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
          <label className="label-cadastro" htmlFor="descricao">
            Descrição
          </label>
          <textarea id="descricao" type="text" {...register("descricao")} />
          <span className="text-area-legenda">Máx: 50 caracteres</span>
        </div>
      </form>
      <AlertaDeErro erro={erro} />
      <Carregando open={carregando} />
    </div>
  );
}

export default DadosRestaurante;
