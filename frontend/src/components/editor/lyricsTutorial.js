import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const steps = [
    {
        img: '/images/tutorial/Step1.png',
        description: `Primero revisa que tienes el audio activado y buen volumen para escuchar el audio`,
    },
    {
        img: '/images/tutorial/Step2.png',
        description:
            'La idea es que cada vez que empiece la frase que esta seleccionada des al boton de siguiente',
    },
    {
        img: '/images/tutorial/Step3.png',
        description: `Asi avanzaras por cada linea de la letra poniendo el tiempo donde empieza cada linea`,
    },
];


function LyricsTutorial({ onOpenChange }) {

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        if (activeStep === 3 - 1) {
            onOpenChange(false)
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Box padding={2}>
            <Grid container alignItems="center" justifyContent="center">
                <p>{steps[activeStep].description}</p>
                <img className="tutorial" src={steps[activeStep].img} alt="step"></img>
            </Grid>
            <MobileStepper
                variant="dots"
                steps={3}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                    >{activeStep === 3 - 1 ? 'Empezar' : 'Siguiente'} <KeyboardArrowRight /></Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        <KeyboardArrowLeft /> Atrás
                    </Button>
                }
            />
        </Box>
    );
}

export default LyricsTutorial;