import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";

import useMediaQuery from '@mui/material/useMediaQuery';

import YoutubeAudio from "../../services/audio.js";

function SearchResults({ onSelect, loading, alertText, alertOpen, tab, setTab }) {

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const matches = useMediaQuery('(min-width:481px)');

    function getSearch() {
        const req = { search: search };
        YoutubeAudio.search(req).then(response => {
            console.log(response.data);
            setSearchResults(response.data)
        }).catch(e => {
            console.log(e.response.data.message)
            alertText(e.response.data.message)
            alertOpen(true)
        });
    }

    const handleClick = event => {
        onSelect(searchResults[event.currentTarget.getAttribute("data-id")].url)
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
                Buscador de canciones
            </h1>
            <TextField disabled={loading} required margin="normal" sx={{ bgcolor: "#ffffff", width: "90%" }} onKeyPress={e => { if (e.key === 'Enter') { getSearch() } }} InputProps={{ autoComplete: 'off', endAdornment: (<IconButton disabled={loading} onClick={e => getSearch()}><SearchIcon /></IconButton>) }} value={search} onChange={e => setSearch(e.target.value)} />
            {searchResults.length ?
                <ImageList cols={matches ? 3 : 1} gap={12}>
                    {searchResults.map((video, index) => {
                        return <ImageListItem key={index} data-id={index} onClick={handleClick}>
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={video.title}
                                subtitle={video.duration}
                            />
                        </ImageListItem>
                    })}
                </ImageList> : null}
        </Grid>
    );
}

export default SearchResults;