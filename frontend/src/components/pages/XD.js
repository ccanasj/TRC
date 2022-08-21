import React, { useState } from "react"

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";

function XD() {

    const [primero, setPrimero] = useState('');
    const [segundo, setSegundo] = useState('');
    const [tercero, setTercero] = useState('');
    const [cuarto, setCuarto] = useState('');
    const [quinto, setQuinto] = useState('');
    const [success, setSuccess] = useState(false);
    
    function checkSecret() {
        if ((primero + segundo + tercero + cuarto + quinto) === "Chgbrydhrybyrn") {
            setSuccess(true)
        }
        else {
        }
    }

    return (
        <div>
            <Typography sx={{ textAlign: "center" }} margin={1} variant='h5'>
                Que sera esto?
            </Typography>
            <Grid padding={5} direction="row" alignItems="center" justifyContent="space-evenly" container spacing={2} >
                <Grid item>
                    <Typography sx={{ textAlign: "center" }} variant='h5'>
                        1
                    </Typography>
                    <TextField required margin="normal" helperText="Con un poco de suerte lo conseguiras" value={primero} onChange={e => setPrimero(e.target.value)} />
                </Grid>

                <Grid item>
                    <Typography sx={{ textAlign: "center" }} variant='h5'>
                        2
                    </Typography>
                    <TextField required margin="normal" helperText="Los kirbos escondidos esconden algo" value={segundo} onChange={e => setSegundo(e.target.value)} />
                </Grid>
                <Grid item>
                    <Typography sx={{ textAlign: "center" }} variant='h5'>
                        3
                    </Typography>
                    <TextField required margin="normal" helperText="Toca al kirbo 50 veces y te dira un secreto" value={tercero} onChange={e => setTercero(e.target.value)} />
                </Grid>
                <Grid item>
                    <Typography sx={{ textAlign: "center" }} variant='h5'>
                        4
                    </Typography>
                    <TextField required margin="normal" helperText="Oculto en la oscuridad" value={cuarto} onChange={e => setCuarto(e.target.value)} />
                </Grid>
                <Grid item>
                    <Typography sx={{ textAlign: "center" }} variant='h5'>
                        5
                    </Typography>
                    <TextField required margin="normal" helperText="En el inicio, oculto de tus ojos" value={quinto} onChange={e => setQuinto(e.target.value)} />
                </Grid>
            </Grid >
            <Grid alignItems="center" justifyContent="center" container>
                <Button variant="contained" sx={{ bgcolor: "#94440C" }} onClick={checkSecret}>
                    Enviar
                </Button>
            </Grid>
            {success ?
                <Grid alignItems="center" justifyContent="center" container>
                    <Typography margin={5} variant='h5'>
                        ¡¡¡Felicidades!!! Lograste descrifrar el codigo
                    </Typography>
                    <Typography margin={5} variant='h5'>
                        Si tienes dudas de que significa puedes ir a <a rel="noreferrer" href="https://www.online-toolz.com/tools/rot13-encoder-decoder.php" target="_blank">Decrypt Text Online</a> y poner "Chgb ry dhr yb yrn"
                    </Typography>
                    <Typography margin={5} variant='h5'>
                        Tu recompensa te espera <a rel="noreferrer" href="http://www.hidelinks.com/?j9gkhp1bgho" target="_blank">Reclama tu recompensa</a>
                    </Typography>
                    <Typography margin={5} variant='h5'>
                        Si algo la contraseña es el mismo codigo xd "Chgb ry dhr yb yrn"
                    </Typography>
                </Grid> : null}

        </div>
    );
}

export default XD;