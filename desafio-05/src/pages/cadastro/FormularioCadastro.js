import React, { useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import { Step } from '@material-ui/core/';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DadosUsuario from '../../componentes/steppers/usuario/DadosUsuario';
import DadosRestaurante from '../../componentes/steppers/restaurante/DadosRestaurante';
import DadosEntrega from '../../componentes/steppers/entrega/DadosEntrega';

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
      return 'Unknown step';
  }
}

function FormularioCadastro() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="form-cadastro">
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Button onClick={handleReset}>
              Reset
            </Button>
          </div>
        ) : (
          <div className="botoes-steppers">
            <Typography>{getStepContent(activeStep)}</Typography>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Anterior
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? 'Criar conta' : 'Próximo'}
              </Button>
            </div>
          </div>
        )}
        <div className="links">
          <span>Já tem uma conta?</span>
          <a href="#">Login</a>
        </div>
      </div>
    </div>
  );
}

export default FormularioCadastro;