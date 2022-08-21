import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';

function Ruleta() {

    const [deg, setDeg] = useState(0);
    const [disable, setDisable] = useState(false);
    const [message, setMessage] = useState('');

    function end() {
        setDisable(false)
        setDeg(deg % 360)
        console.log(deg % 360)
        if ((deg % 360) < 90) {
            const audio = new Audio(window.location.origin + "/Premio.mp3");
            audio.play();
            setMessage("Te la comiste entera")
        } else if ((deg % 360) >= 90 && (deg % 360) < 180) {
            const audio = new Audio(window.location.origin + "/F.mp3");
            audio.play();
            setMessage("F")
        } else if ((deg % 360) >= 180 && (deg % 360) <= 270) {
            setMessage("Nose pa que es pero esto salio 'Chgb'")
        } else {
            const audio = new Audio(window.location.origin + "/Poyo.mp3");
            audio.play();
            setMessage("Poyo")
        }
    }

    useEffect(() => {
        setDeg(Math.floor(8000 + Math.random() * 8000))
        setDisable(true)
    }, [])

    return (
        <Grid padding={10} direction="column" alignItems="center" justifyContent="space-between" container spacing={2}>
            {message ? message : null}
            <img width="5%" height="10%" style={{ zIndex: 2 }} src={window.location.origin + "/images/marker.png"} alt="Palito" />
            <img width="50%" height="50%" style={{ transition: disable ? "all 20s ease-out" : "none", transform: `rotate(${deg}deg)` }} src={window.location.origin + "/images/Ruleta.png"} alt="kirbo" onTransitionEnd={end} />
        </Grid>
    );
}

export default Ruleta;