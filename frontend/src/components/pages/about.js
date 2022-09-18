import React from "react"

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';

import InstagramIcon from '@mui/icons-material/Instagram';

import FAB from "../FAB";

function About() {

    return (
        <Stack padding={2}>
            <FAB />
            <Typography variant='h5' align="center" style={{ fontFamily: "Impact", fontSize: "calc(20px + 2vmin)" }}>
                Sobre Nosotros
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-evenly" padding={5} spacing={5}>
                <Grow in={true} timeout={400}>
                    <Stack alignItems="center" justifyContent="center" spacing={2}>
                        <img src="/images/team/T.jpeg" alt="T" width="50%" height="50%" style={{ borderRadius: "50%", boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)" }}></img>
                        <Typography variant='h5' align="center">
                            Felipe Tejada
                        </Typography>
                        <Typography variant='h6' align="center">
                            Ingeniero Financiero
                        </Typography>
                        <Button sx={{ color: "black" }} target="_blank" href="https://www.instagram.com/felipe_tejada24/">
                            <InstagramIcon />
                        </Button>
                    </Stack>
                </Grow>
                <Grow in={true} timeout={600}>
                    <Stack alignItems="center" justifyContent="center" spacing={2}>
                        <img src="/images/team/R.jpeg" alt="R" width="50%" height="50%" style={{ borderRadius: "50%", boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)" }}></img>
                        <Typography variant='h5' align="center">
                            Robinson García
                        </Typography>
                        <Typography variant='h6' align="center">
                            Productor Musical
                        </Typography>
                        <Button sx={{ color: "black" }} target="_blank" href="https://www.instagram.com/robin_hood1502/">
                            <InstagramIcon />
                        </Button>
                    </Stack>
                </Grow>
                <Grow in={true} timeout={800}>
                    <Stack alignItems="center" justifyContent="center" spacing={2}>
                        <img src="/images/team/C.jpeg" alt="C" width="50%" height="50%" style={{ borderRadius: "50%", boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)" }}></img>
                        <Typography variant='h5' align="center">
                            Camilo Cañas
                        </Typography>
                        <Typography variant='h6' align="center">
                            Ingeniero de Sistemas
                        </Typography>
                        <Button sx={{ color: "black" }} target="_blank" href="https://www.instagram.com/camilo_zxc/">
                            <InstagramIcon />
                        </Button>
                    </Stack>
                </Grow>
            </Stack>
        </Stack>
    );
}

export default About;