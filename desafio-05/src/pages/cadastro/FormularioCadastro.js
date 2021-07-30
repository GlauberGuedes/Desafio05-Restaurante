import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import Stepper from '@material-ui/core/Stepper';
import { Step } from '@material-ui/core/';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import DadosUsuario from '../../componentes/steppers/usuario/DadosUsuario';
import DadosRestaurante from '../../componentes/steppers/restaurante/DadosRestaurante';
import DadosEntrega from '../../componentes/steppers/entrega/DadosEntrega';
import Login from '../../pages/login';

import './style.css';

function getSteps() {
  return ['', '', ''];
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
      return <Login />
  }
}

function FormularioCadastro() {
  const methods = useForm();
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
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
          valorMinimoPedido: data.valorMinimoPedido
        }
      }

      console.log(dadosCadastro);

    try {
      const response = await fetch('http://localhost:8000/usuarios', {
        method: 'POST',
        body: JSON.stringify(dadosCadastro),
        headers: {
          'Content-type': 'application/json'
        }
      })
      
      const dataCadastro = await response.json();

      console.log(dataCadastro);

      history.push('/')
    } catch (error) {
      console.log(error.message);
    }
    
  }
  
  function handleNext(data) {
    if(data.senha) {
      if(data.senha !== data.confirmar_senha) {
        return console.log(data.confirmar_senha)
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <FormProvider {...methods} >
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
        <div className="form-submits" >
          <div className="botoes-steppers">
            <Typography className="steps">{getStepContent(activeStep)}</Typography>
              <button className={activeStep === 0 ? "desativado" : "botao-voltar"} disabled={activeStep === 0} onClick={handleBack}>
                Anterior
              </button>
              <button className="botao-ativado"
                type={activeStep === steps.length ? 'submit' : 'button'}
                onClick={activeStep === steps.length ? onsubmit : methods.handleSubmit(handleNext)}
              >
                {activeStep === steps.length - 1 ? 'Criar conta' : 'Próximo'}
              </button>
          </div>
          <div className="links">
            <span>Já tem uma conta?</span>
            <Link className="link-login" to="/">Login</Link>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

export default FormularioCadastro;