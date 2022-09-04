import React from "react"

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';

import T from '../../images/T.jpeg';
import R from '../../images/R.jpeg';
import C from '../../images/C.jpeg';

function About() {

    return (
        <Stack padding={2}>
            <Typography variant='h5' align="center" style={{ fontFamily: "Impact", fontSize: "calc(20px + 2vmin)" }}>
                Sobre Nosotros
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-evenly" padding={5} spacing={5}>
                <Grow in={true} timeout={400}>
                    <Stack alignItems="center" justifyContent="center" spacing={2}>
                        <img src={T} alt="T" width="50%" height="50%" style={{ borderRadius: "50%", boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)" }}></img>
                        <Typography variant='h5' align="center">
                            Felipe Tejada
                        </Typography>
                        <Typography variant='h6' align="center">
                            Ingeniero Financiero
                        </Typography>
                        <Button sx={{ color: "black" }} target="_blank" href="https://www.instagram.com/felipe_tejada24/">
                            <SvgIcon>
                                <path fill="currentColor" d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
                            </SvgIcon>
                        </Button>
                    </Stack>
                </Grow>
                <Grow in={true} timeout={600}>
                    <Stack alignItems="center" justifyContent="center" spacing={2}>
                        <img src={R} alt="R" width="50%" height="50%" style={{ borderRadius: "50%", boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)" }}></img>
                        <Typography variant='h5' align="center">
                            Robinson García
                        </Typography>
                        <Typography variant='h6' align="center">
                            Productor Musical
                        </Typography>
                        <Button sx={{ color: "black" }} target="_blank" href="https://www.instagram.com/robin_hood1502/">
                            <SvgIcon>
                                <path fill="currentColor" d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
                            </SvgIcon>
                        </Button>
                    </Stack>
                </Grow>
                <Grow in={true} timeout={800}>
                    <Stack alignItems="center" justifyContent="center" spacing={2}>
                        <img src={C} alt="C" width="50%" height="50%" style={{ borderRadius: "50%", boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)" }}></img>
                        <Typography variant='h5' align="center">
                            Camilo Cañas
                        </Typography>
                        <Typography variant='h6' align="center">
                            Ingeniero de Sistemas
                        </Typography>
                        <Button sx={{ color: "black" }} target="_blank" href="https://www.instagram.com/camilo_zxc/">
                            <SvgIcon>
                                <path fill="currentColor" d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
                            </SvgIcon>
                        </Button>
                    </Stack>
                </Grow>
            </Stack>
        </Stack>
    );
}

export default About;