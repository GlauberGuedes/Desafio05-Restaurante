import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import Stepper from "@material-ui/core/Stepper";
import { Step } from "@material-ui/core/";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import { post } from "../../servicos/requisicaoAPI";
import Carregando from "../../componentes/Carregando";
import AlertaDeErro from "../../componentes/AlertaDeErro";
import AlertaDeConfirmacao from "../../componentes/AlertaDeConfirmacao";
import DadosUsuario from "../../componentes/Steppers/usuario/DadosUsuario";
import DadosRestaurante from "../../componentes/Steppers/restaurante/DadosRestaurante";
import DadosEntrega from "../../componentes/Steppers/entrega/DadosEntrega";
import Login from "../Login";
import useAuth from "../../hooks/useAuth";
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

function FormularioCadastro() {
  const methods = useForm();
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [confirmacaoCadastro, setConfirmacaoCadastro] = useState("");
  const steps = getSteps();
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      history.push("/produtos");
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErro("");
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [erro]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setConfirmacaoCadastro("");
    }, 4000);
    return () => {
      clearTimeout(timeout);
    };
  }, [confirmacaoCadastro]);

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

    setErro("");

    setCarregando(true);

    try {
      const { dados, erro } = await post("usuarios", dadosCadastro);

      setCarregando(false);

      if (erro) {
        return setErro(dados);
      }

      setConfirmacaoCadastro("Usuário e Restaurante cadastrados com sucesso!");
      setCarregando(true);

      history.push("/");
      setCarregando(false);
    } catch (error) {
      setCarregando(false);
      setErro(error.message);
    }
  }

  function handleNext(data) {
    setErro("");
    if (data.senha) {
      if (data.senha !== data.confirmar_senha) {
        setErro("Senha e confirmar senha devem ser iguais!");
        return;
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="form-cadastro"
        >
          <Stepper className="steppers" activeStep={activeStep}>
            {steps.map((label) => {      
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
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
                type="button"
                className={
                  activeStep === 0
                    ? "botao-cadastro desativado"
                    : "botao-cadastro botao-voltar"
                }
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Anterior
              </button>
              <button
                className="botao-ativado botao-cadastro"
                type={
                  activeStep === steps.length - 1 
                  ? 
                  "submit" 
                  : "button"
                }
                onClick={
                    activeStep === steps.length - 1
                    ? onsubmit
                    : methods.handleSubmit(handleNext)
                }
              >
                {
                  activeStep === steps.length - 1 
                  ? "Criar conta" 
                  : "Próximo"
                }
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
      <AlertaDeErro erro={erro} />
      <Carregando open={carregando} />
      <AlertaDeConfirmacao message={confirmacaoCadastro} />
    </FormProvider>
  );
}

export default FormularioCadastro;
