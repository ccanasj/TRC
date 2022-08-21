import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const MemoryGame = props => {

    const [cards, setCards] = useState([]);
    const [message, setMessage] = useState('Encuentra los kirbos');

    let cardsChosenId = []

    function flipCard(e) {

        const cardId = e.target.attributes.alt.value
        cardsChosenId.push(e.target)
        e.target.setAttribute('src', cards[cardId].img);
        if (cardsChosenId.length === 2) {
            setTimeout(checkForMatch, 500)
        }
    }

    function checkForMatch() {

        const optionOneId = cardsChosenId.shift()
        const optionTwoId = cardsChosenId.shift()

        let temp = [...cards]

        optionOneId.setAttribute('src', window.location.origin + '/images/blank.jpg')
        optionTwoId.setAttribute('src', window.location.origin + '/images/blank.jpg')

        if (optionOneId.attributes.alt.value === optionTwoId.attributes.alt.value) {
            setMessage('Quiuvo pues bobo no ves que le diste al mismo cuadro')
            console.log()
        } else if (optionOneId.attributes.name.value === optionTwoId.attributes.name.value) {
            setMessage('Piola xd')
            setCards(temp.filter(value => value.name !== optionOneId.attributes.name.value || value.name !== optionTwoId.attributes.name.value))
        } else {
            setMessage('Casi')
        }

        if (cards.length === 2) {
            setMessage('Felicidades encontraste todos lo kibos, un kirbo se te acerca y te dice "poyo" o traducido "ry"')
        }
    }

    useEffect(() => {

        const cardArray = [
            {
                name: 'Kirbo',
                img: '/images/Kirbo.png'
            },
            {
                name: 'KirboCristiano',
                img: '/images/KirboCristiano.png'
            },
            {
                name: 'KirboSpin',
                img: '/images/KirboSpin.webp'
            },
            {
                name: 'KirboMago',
                img: '/images/KirboMago.png'
            },
            {
                name: 'KirboAtraco',
                img: '/images/KirboAtraco.png'
            },
            {
                name: 'KirboCagaste',
                img: '/images/KirboCagaste.png'
            },
            {
                name: 'Kirbo',
                img: '/images/Kirbo.png'
            },
            {
                name: 'KirboCristiano',
                img: '/images/KirboCristiano.png'
            },
            {
                name: 'KirboSpin',
                img: '/images/KirboSpin.webp'
            },
            {
                name: 'KirboMago',
                img: '/images/KirboMago.png'
            },
            {
                name: 'KirboAtraco',
                img: '/images/KirboAtraco.png'
            },
            {
                name: 'KirboCagaste',
                img: '/images/KirboCagaste.png'
            }]

        cardArray.sort(() => 0.5 - Math.random())

        setCards(cardArray)

    }, [])

    return (

        <Grid padding={10} alignItems="center" justifyContent="center" container spacing={2} >
            <Typography variant='h5'>
                {message}
            </Typography>
            {cards.map((val, key) => (
                <Grid item>
                    <img key={key} name={val.name} width={150} height={150} src={window.location.origin + "/images/blank.jpg"} alt={key} onClick={flipCard} />
                </Grid>
            ))}
        </Grid>
    );
}

export default MemoryGame