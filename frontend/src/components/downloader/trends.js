import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import Button from '@mui/material/Button';

import useMediaQuery from '@mui/material/useMediaQuery';

import YoutubeAudio from "../../services/audio.js";

function Trends({ onSelect, tab, setTab }) {
    let formatter = Intl.NumberFormat('es', { notation: 'compact' });

    const [trendResults, setTrendResults] = useState([]);
    const matches = useMediaQuery('(min-width:481px)');

    useEffect(() => {
        YoutubeAudio.trends().then(response => {
            console.log(response.data);
            setTrendResults(response.data)
        }).catch(e => {
            console.log(e.response.data.message)
        });
    }, []);

    const handleClick = event => {
        window.open(`https://youtu.be/${trendResults[event.currentTarget.getAttribute("data-id")].id}`, '_blank', 'noopener,noreferrer');
    };

    const handleDownload = event => {
        onSelect(`https://youtu.be/${trendResults[event.currentTarget.getAttribute("data-id")].id}`)
        setTab(1)
    };

    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={tab === 0 ? {} : { display: "none" }}>
            <h1 className="App-header">
                Tendencias Muciales En Colombia
            </h1>
            {trendResults.length ?
                <ImageList cols={matches ? 3 : 1} gap={12}>
                    {trendResults.map((video, index) => {
                        return <Stack key={index}>
                            <ImageListItem data-id={index} onClick={handleClick}>
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    title={video.title}
                                    subtitle={
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography>
                                                {formatter.format(video.views)} vistas
                                            </Typography>
                                            <Typography>
                                                {video.duration}
                                            </Typography>
                                            <Typography>
                                                {video.published}
                                            </Typography>
                                        </Stack>
                                    }
                                />
                            </ImageListItem>
                            <Button variant="contained" data-id={index} sx={{ bgcolor: "#94440C" }} endIcon={<FileDownloadRoundedIcon />} onClick={handleDownload}>
                                Descargar
                            </Button>
                        </Stack>
                    })}
                </ImageList> : null}
        </Grid>
    );
}

export default Trends;