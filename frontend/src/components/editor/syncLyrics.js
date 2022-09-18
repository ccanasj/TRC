import React, { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import ReplayIcon from '@mui/icons-material/Replay';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

function SyncLyrics({ lyrics, setLyrics, source, setOpen }) {

    const [syncedLyrics, setSyncedLyrics] = useState(lyrics.split('\n'));
    const [position, setPosition] = useState(0);
    const [paused, setPaused] = useState(false);
    const [audio, setAudio] = useState(new Audio());
    const autoScroll = useRef(null);

    function audioControl(e) {
        if (paused) {
            audio.pause();
        } else {
            audio.play();
        }
        setPaused(!paused)
    }

    function rewind(e) {
        audio.currentTime = 0;
        setPosition(0)
        setSyncedLyrics(lyrics.split('\n'))
    }

    function nextLine(e) {
        let newArray = [...syncedLyrics]
        newArray[position] = `[${fancyTime(audio.currentTime)}] ${syncedLyrics[position]}`
        if (position + 1 !== syncedLyrics.length) {
            setPosition(position + 1)
            setSyncedLyrics(newArray)
            autoScroll.current.scrollIntoView({block: "center", behavior: "smooth"})
        } else {
            setLyrics(newArray.join('\n'))
            setOpen(false)
            audio.pause()
        }
    }

    function fancyTime(time) {
        return Math.floor(time % 3600 / 60).toString().padStart(2, '0') + ((time % 60) >= 10 ? ':' : ':0') + ((time % 60) - (time > 1 ? 1 : 0)).toFixed(3).toString()
    }

    useEffect(() => {
        const blob = new Blob([source], { type: "audio/mpeg" });
        const url = URL.createObjectURL(blob);
        audio.src = url;
    }, [audio, source]);

    return (
        <Box>
            <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                <List>
                    {syncedLyrics.map((value, index) => {
                        return <ListItem key={index} sx={index === position ? { backgroundColor: 'black', color: 'white' } : {}}>
                            {index === position ? <ListItemIcon ref={autoScroll}>
                                <ArrowForwardIosRoundedIcon sx={{ color: 'white' }} />
                            </ListItemIcon> : null}
                            <ListItemText primary={value} />
                        </ListItem>
                    })
                    }
                </List>

            </Box>
            <Grid width="100%" padding={2}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <IconButton size="large" sx={{ backgroundColor: 'black', color: 'white', ':hover': { backgroundColor: '#c55a10' } }} onClick={rewind}>
                        <ReplayIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton size="large" sx={{ backgroundColor: 'black', color: 'white', ':hover': { backgroundColor: '#c55a10' } }} onClick={audioControl}>
                        {paused ? <PauseRoundedIcon fontSize="inherit" /> : <PlayArrowRoundedIcon fontSize="inherit" />}
                    </IconButton>
                    <IconButton size="large" sx={{ backgroundColor: 'black', color: 'white', ':hover': { backgroundColor: '#c55a10' } }} onClick={nextLine}>
                        <SkipNextRoundedIcon fontSize="inherit" />
                    </IconButton>
                </Stack>
            </Grid>
        </Box>
    );
}

export default SyncLyrics;