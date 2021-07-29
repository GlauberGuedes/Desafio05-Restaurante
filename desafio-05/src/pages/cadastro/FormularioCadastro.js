import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Stepper from '@material-ui/core/Stepper';
import { Step } from '@material-ui/core/';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import DadosUsuario from '../../componentes/steppers/usuario/DadosUsuario';
import DadosRestaurante from '../../componentes/steppers/restaurante/DadosRestaurante';
import DadosEntrega from '../../componentes/steppers/entrega/DadosEntrega';
import { makeStyles } from '@material-ui/styles';

import './style.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  steppers: {
    position: 'absolute',
    marginTop: '6rem',
    marginLeft: '19rem',
    zIndex: '1'
  },
}));

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
      return 'Unknown step';
  }
}

function FormularioCadastro() {
  const classes = useStyles();
  const methods = useForm();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const onSubmit = data => console.log(data);
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <FormProvider {...methods} >
      <form onSubmit={methods.handleSubmit(onSubmit)} className="form-cadastro">
        <Stepper className={classes.steppers} activeStep={activeStep}>
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
            <Typography>{getStepContent(activeStep)}</Typography>
            <div>
              <button disabled={activeStep === 0} onClick={handleBack}>
                Anterior
              </button>
              <button
                type={activeStep === steps.length ? 'submit' : 'button'}
                onClick={activeStep === steps.length ? onsubmit : handleNext}
              >
                {activeStep === steps.length - 1 ? 'Criar conta' : 'Próximo'}
              </button>
            </div>
          </div>
          <div className="links">
            <span>Já tem uma conta?</span>
            <a href="#">Login</a>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

export default FormularioCadastro;