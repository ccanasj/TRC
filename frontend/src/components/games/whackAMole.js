import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function WhackAMole() {

    const [score, setScore] = useState(0);
    const [time, setTime] = useState(45);
    const [hitPosition, setHitPosition] = useState(0);
    const [holes, setHoles] = useState([]);

    useEffect(() => {

        let randomMole = null

        const squares = [{
            mole: false,
            id: '1'
        }, {
            mole: false,
            id: '2'
        }, {
            mole: false,
            id: '3'
        }, {
            mole: false,
            id: '4'
        }, {
            mole: false,
            id: '5'
        }, {
            mole: false,
            id: '6'
        }, {
            mole: false,
            id: '7'
        }, {
            mole: false,
            id: '8'
        }, {
            mole: false,
            id: '9'
        }]

        setHoles(squares)

        function randomSquare() {
            squares.forEach(square => {
                square.mole = false
            })

            setTime(time - 1)

            let randomSquare = squares[Math.floor(Math.random() * 9)]
            randomSquare.mole = true

            setHitPosition(randomSquare.id)
        }



        if (time > 0) {
            randomMole = setInterval(randomSquare, 1000);
        } else {
            clearInterval(randomMole)
        }

        return () => {
            clearInterval(randomMole);
        };

    }, [time]);

    function mouseDown(e) {
        if (e.target.id === hitPosition) {
            setScore(score + 1)
            setHitPosition(null)
        }
    }

    return (
        <Grid padding={10} direction="row" alignItems="center" justifyContent="space-between" container spacing={2} >
            <Grid item>
                <h2 className="App-header" style={{ textAlign: "center" }}>Puntaje: {score}</h2>

                <h2 className="App-header" style={{ textAlign: "center" }}>Tiempo restante: {time}</h2>
                {score >= 30 ?
                    <Typography variant='h5' style={{ textAlign: "center" }}>
                        El kirbo murio y solto una nota "dhr" Posdata:'Poyo'
                    </Typography> : null}

            </Grid>
            <Grid item>
                <div className="grid">
                    {
                        holes.map((val, key) => (
                            <div key={key} id={val.id} className={val.mole ? "square mole" : "square"} onMouseDown={mouseDown} ></div>
                        ))
                    }
                </div>
            </Grid>
        </Grid>
    );
}

export default WhackAMole;