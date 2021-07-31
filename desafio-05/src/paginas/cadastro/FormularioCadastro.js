import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";

import Stepper from "@material-ui/core/Stepper";
import { Step } from "@material-ui/core/";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import { toast } from "react-toastify";

import Carregando from "../../componentes/Carregando";
import AlertaDeErro from "../../componentes/AlertaDeErro";
import DadosUsuario from "../../componentes/steppers/usuario/DadosUsuario";
import DadosRestaurante from "../../componentes/steppers/restaurante/DadosRestaurante";
import DadosEntrega from "../../componentes/steppers/entrega/DadosEntrega";
import Login from "../Login";

import "./style.css";

function getSteps() {
  return ["", "", ""];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <DadosUsuario />;
    case 1:
      return <DadosRestaurante />;
    case 2:
      return <DadosEntrega />;
    default:
      return <Login />;
  }
}

toast.error('Senha e confirmar senha devem ser iguais!', {
  position: "bottom-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});

function FormularioCadastro() {
  const methods = useForm();
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const steps = getSteps();

  async function onSubmit(data) {
    const dadosCadastro = {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      restaurante: {
        nome: data.nomeRestaurante,
        idCategoria: data.idCategoria,
        descricao: data.descricao,
        taxaEntrega: data.taxaEntrega,
        tempoEntregaEmMinutos: data.tempoEntregaEmMinutos,
        valorMinimoPedido: data.valorMinimoPedido,
      },
    };

    setErro('');

    if(!data.nome || !data.email || !data.senha || !data.nomeRestaurante || !data.idCategoria || !data.descricao || !data.taxaEntrega || !data.tempoEntregaEmMinutos || !data.valorMinimoPedido) {
      return setErro("Todos os campos são obrigatórios.")
    }

    setCarregando(true);

    try {
      const response = await fetch("http://localhost:8000/usuarios", {
        method: "POST",
        body: JSON.stringify(dadosCadastro),
        headers: {
          "Content-type": "application/json",
        },
      });

      const dataCadastro = await response.json();

      setCarregando(false);

      console.log(dataCadastro);

      history.push("/");
    } catch (error) {
      setCarregando(false);
      setErro(error.message);
    }
  }

  function handleNext(data) {
    if (data.senha) {
      if (data.senha !== data.confirmar_senha) {
        toast.error("Senha e confirmar senha devem ser iguais!")
        return
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="form-cadastro">
        <Stepper className="steppers" activeStep={activeStep}>
          {steps.map((label) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div className="form-submits">
          <div className="botoes-steppers">
            <Typography className="steps">
              {getStepContent(activeStep)}
            </Typography>
            <button
              className={activeStep === 0 ? "botao-cadastro desativado" : "botao-cadastro botao-voltar"}
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Anterior
            </button>
            <button
              className="botao-ativado botao-cadastro"
              type={activeStep === steps.length - 1 ? "submit" : "button"}
              onClick={
                activeStep === steps.length -1
                  ? onsubmit
                  : methods.handleSubmit(handleNext)
              }
            >
              {activeStep === steps.length - 1 ? "Criar conta" : "Próximo"}
            </button>
          </div>
          <div className="links">
            <span>Já tem uma conta?</span>
            <Link className="link-login" to="/">
              Login
            </Link>
          </div>
        </div>
      </form>
      <AlertaDeErro erro={erro}/>
      <Carregando open={carregando}/>
    </FormProvider>
  );
}

export default FormularioCadastro;
