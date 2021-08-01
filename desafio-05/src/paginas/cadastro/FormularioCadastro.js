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
import DadosUsuario from "../../componentes/steppers/usuario/DadosUsuario";
import DadosRestaurante from "../../componentes/steppers/restaurante/DadosRestaurante";
import DadosEntrega from "../../componentes/steppers/entrega/DadosEntrega";
import Login from "../Login";
import useAuth from "../../hooks/useAuth";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import "./style.css";

const outerTheme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
});

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
  const steps = getSteps();
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      history.push("/produtos");
    }
  }, []);

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

      history.push("/");
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
      <ThemeProvider theme={outerTheme}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="form-cadastro"
        >
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
                type={activeStep === steps.length - 1 ? "submit" : "button"}
                onClick={
                  activeStep === steps.length - 1
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
      </ThemeProvider>
      <AlertaDeErro erro={erro} />
      <Carregando open={carregando} />
    </FormProvider>
  );
}

export default FormularioCadastro;
