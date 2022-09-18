import React, { useState, useRef } from "react"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Switch from '@mui/material/Switch';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';

import ClearIcon from '@mui/icons-material/Clear';
import UploadRoundedIcon from '@mui/icons-material/UploadRounded';
import SearchIcon from '@mui/icons-material/Search';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import FAB from "../FAB";
import LyricsTutorial from "../editor/lyricsTutorial";
import SyncLyrics from "../editor/syncLyrics";

import MP3Tag from "mp3tag.js";
import { Buffer } from "buffer";

const syltRegex = /^((\[\d{1,}:\d{2}\.\d{3}\]) (.*))/

const options = ["Blues", "Classic Rock", "Country", "Dance", "Disco", "Funk", "Grunge",
  "Hip-Hop", "Jazz", "Metal", "New Age", "Oldies", "Other", "Pop", "R&B",
  "Rap", "Reggae", "Rock", "Techno", "Industrial", "Alternative", "Ska",
  "Death Metal", "Pranks", "Soundtrack", "Euro-Techno", "Ambient",
  "Trip-Hop", "Vocal", "Jazz+Funk", "Fusion", "Trance", "Classical",
  "Instrumental", "Acid", "House", "Game", "Sound Clip", "Gospel",
  "Noise", "AlternRock", "Bass", "Soul", "Punk", "Space", "Meditative",
  "Instrumental Pop", "Instrumental Rock", "Ethnic", "Gothic",
  "Darkwave", "Techno-Industrial", "Electronic", "Pop-Folk",
  "Eurodance", "Dream", "Southern Rock", "Comedy", "Cult", "Gangsta",
  "Top 40", "Christian Rap", "Pop/Funk", "Jungle", "Native American",
  "Cabaret", "New Wave", "Psychadelic", "Rave", "Showtunes", "Trailer",
  "Lo-Fi", "Tribal", "Acid Punk", "Acid Jazz", "Polka", "Retro",
  "Musical", "Rock & Roll", "Hard Rock", "Folk", "Folk-Rock",
  "National Folk", "Swing", "Fast Fusion", "Bebob", "Latin", "Revival",
  "Celtic", "Bluegrass", "Avantgarde", "Gothic Rock", "Progressive Rock",
  "Psychedelic Rock", "Symphonic Rock", "Slow Rock", "Big Band",
  "Chorus", "Easy Listening", "Acoustic", "Humour", "Speech", "Chanson",
  "Opera", "Chamber Music", "Sonata", "Symphony", "Booty Bass", "Primus",
  "Porn Groove", "Satire", "Slow Jam", "Club", "Tango", "Samba",
  "Folklore", "Ballad", "Power Ballad", "Rhythmic Soul", "Freestyle",
  "Duet", "Punk Rock", "Drum Solo", "Acapella", "Euro-House", "Dance Hall"];


function Editor() {

  const [audio, setAudio] = useState('');
  const [fileName, setFileName] = useState('');
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [track, setTrack] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [source, setSource] = useState('');
  const [metadata, setMetadata] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [tutorial, setOpenTutorial] = useState(true);
  const download = useRef(null);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const handleChange = (event) => {
    if (event.target.checked) {
      setOpen(true)
    }
    setChecked(event.target.checked);
  };

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function displayImage(buffer) {
    // console.log(buffer)
    if (buffer) {
      const base64 = `data:${buffer[0].format};base64,${Buffer.from(buffer[0].data).toString('base64')}`
      setImage(base64)
    } else {
      setImage("/images/NotImageFound.png")
    }
  }

  function getImage(e) {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = function () {
      setImage(reader.result)
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  async function getAudioMetada(e) {
    const file = e.target.files[0]

    const reader = new FileReader()
    reader.onloadend = function () {

      const mp3tag = new MP3Tag(reader.result)

      mp3tag.read({
        id3v1: false
      })

      if (mp3tag.error !== '') throw new Error(mp3tag.error)

      displayImage(mp3tag.tags.v2.APIC)
      setTitle(mp3tag.tags.title)
      setArtist(mp3tag.tags.artist)
      setAlbum(mp3tag.tags.album)
      setGenre(mp3tag.tags.genre)
      setYear(mp3tag.tags.year)
      setTrack(mp3tag.tags.track)
      if (mp3tag.tags.v2.SYLT) {
        setLyrics(mp3tag.tags.v2.SYLT[0].lyrics.slice(0, -1))
      } else if (mp3tag.tags.v2.USLT) {
        setLyrics(mp3tag.tags.v2.USLT[0].text)
      } else {
        setLyrics('')
      }
      setSource(mp3tag.getAudio())
      setMetadata(mp3tag)
      console.log(mp3tag)
    }
    if (file) {
      reader.readAsArrayBuffer(file)
      setFileName(file.name)
    }
  }

  async function saveTags() {

    if (title) {
      metadata.tags.title = title
    }
    if (artist) {
      metadata.tags.artist = artist
    }
    if (album) {
      metadata.tags.album = album
    }
    if (genre) {
      metadata.tags.genre = genre
    }
    if (year) {
      metadata.tags.year = year
    }
    if (track) {
      metadata.tags.track = track
    }
    if (lyrics) {
      if (checked) {
        if (lyrics.split('\n').every(entry => syltRegex.test(entry))) {
          metadata.tags.v2.SYLT = [{
            language: 'eng',
            format: 1,
            type: 1,
            descriptor: 'Synced lyrics',
            lyrics: lyrics
          }]
        } else {
          setAlertMessage('La letra sincronizada debe tener el formato: [m:ss.xxx]')
          setOpenAlert(true)
          return
        }
      } else {
        metadata.tags.v2.USLT = [{
          language: 'eng',
          descriptor: `lyrics`,
          text: lyrics
        }]
      }
    }


    if (!image.startsWith('/images/')) {
      const base64 = image.split(',')
      const mimeType = base64[0].substring(base64[0].indexOf(":") + 1, base64[0].indexOf(";"))

      metadata.tags.v2.APIC = [{
        format: mimeType,
        type: 3,
        description: `cover image`,
        data: Uint8Array.from(Buffer.from(base64[1], 'base64'))
      }]
    }


    const file = metadata.save({
      //strict: true, // Use strict mode when validating
      id3v1: { include: false }
    })

    if (metadata.error !== '') {
      throw new Error(metadata.error)
    }

    const url = URL.createObjectURL(new Blob([file]));
    setAudio(url)
    await sleep(500);
    download.current.click()
    await sleep(500);
    URL.revokeObjectURL(url);
    window.location.reload();
  }

  function pasteImage(event) {
    var items = (event.clipboardData || event.originalEvent.clipboardData).items;
    var blob = null;
    for (var i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") === 0) {
        blob = items[i].getAsFile();
      }
    }

    if (blob !== null) {
      var reader = new FileReader();
      reader.onload = function (event) {
        setImage(event.target.result)
      };
      reader.readAsDataURL(blob);
    }
  }

  return (
    <Box sx={{ border: 10, borderTop: 0, borderBottom: 0 }}>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert variant="filled" severity="error" onClose={handleClose} sx={{ mb: 2 }}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          {tutorial ?
            <IconButton size="large" onClick={() => { setOpenTutorial(false) }}>
              <CloseRoundedIcon fontSize="inherit" />
            </IconButton> : null}
          Sincronizar letra
        </DialogTitle>
        {tutorial ?
          <LyricsTutorial onOpenChange={setOpenTutorial} />
          : <SyncLyrics lyrics={lyrics} setLyrics={setLyrics} source={source} setOpen={setOpen} />
        }
      </Dialog>
      <FAB />
      <Fade in={true} timeout={500}>
      <Grid container
        direction="column"
        alignItems="center"
        justifyContent="center" padding={1}>
        <h1 className="App-header">
          Editor de datos archivos Audio(MP3)
        </h1>
        <Button variant="contained" component="label" sx={{ bgcolor: "#94440C" }}>
          Subir archivo de audio
          <input hidden accept="audio/mp3" type="file" onChange={getAudioMetada} />
        </Button>
      </Grid>
      </Fade>
      {fileName ?
        <Grid container
          direction="column"
          alignItems="center"
          justifyContent="center" padding={1}>
          <Typography variant="h1" sx={{ wordBreak: 'break-all' }}>
            {fileName}
          </Typography>
          <Grid container direction={{ xs: 'column', sm: 'row' }} item padding={1}>
            <Grid item container border={3} xs={5} alignItems="center" justifyContent="center" sx={{ boxShadow: 3 }} padding={1} onPaste={pasteImage}>
              <img border={10} width="85%" src={image} alt="Album Cover" />
              <Button variant="contained" component="label" endIcon={<UploadRoundedIcon />} style={{ textAlign: 'center', textTransform: "capitalize", margin: 10 }}>
                Cambiar imagen de portada
                <input hidden accept="image/*" type="file" onChange={getImage} />
              </Button>
            </Grid>
            <Grid padding={1} container border={3} xs sx={{ boxShadow: 3 }} alignItems="center" justifyContent="center" item direction="column" component="form" autoComplete="off" noValidate>
              <TextField margin="normal" label="Título" sx={{ bgcolor: "#ffffff", width: { xs: "95%", sm: "80%" } }} value={title} onChange={e => setTitle(e.target.value)} />
              <TextField margin="normal" label="Artista" sx={{ bgcolor: "#ffffff", width: { xs: "95%", sm: "80%" } }} value={artist} onChange={e => setArtist(e.target.value)} />
              <TextField margin="normal" label="Álbum" sx={{ bgcolor: "#ffffff", width: { xs: "95%", sm: "80%" } }} value={album} onChange={e => setAlbum(e.target.value)} />
              <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ width: { xs: "100%", sm: "80%" } }} justifyContent="center" alignItems="center">
                <Autocomplete
                  value={genre}
                  onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                      setGenre(newValue);
                    } else if (newValue && newValue.inputValue) {
                      setGenre(newValue.inputValue);
                    }
                  }}
                  selectOnFocus
                  autoSelect
                  autoComplete
                  options={options}
                  renderOption={(props, option) => <li {...props}>{option}</li>}
                  sx={{ width: { xs: "95%", sm: "80%" } }}
                  freeSolo
                  renderInput={(params) => (
                    <TextField {...params} margin="normal" label="Género" sx={{ bgcolor: "#ffffff" }} />
                  )}
                />
                <TextField margin="normal" label="Año" sx={{ bgcolor: "#ffffff", width: { xs: "95%", sm: "80%" } }} value={year}
                  onChange={e => {
                    const parsedInt = parseInt(e.target.value)
                    if (parsedInt) {
                      setYear(String(parsedInt).padStart(4, '0').slice(0, 4))
                    } else {
                      setYear('')
                    }

                  }} />
              </Stack>
              <TextField margin="normal" placeholder="ej:5" label="Track" sx={{ bgcolor: "#ffffff", width: { xs: "60%", sm: "40%" } }} value={track}
                onChange={e => {
                  const parsedInt = parseInt(e.target.value)
                  if (parsedInt > 0) {
                    setTrack(String(parsedInt).slice(0, 2))
                  } else {
                    setTrack('')
                  }

                }} />
              {lyrics ?
                <Stack direction="row" justifyContent="center" alignItems="center">
                  <Switch
                    checked={checked}
                    onChange={handleChange}
                  />
                  <Typography>
                    Letra sincronizada
                  </Typography>
                </Stack>
                : null
              }
              <Stack width="100%" justifyContent="center" alignItems="center">
                <TextField
                  margin="normal"
                  label="Letra de la canción"
                  multiline
                  rows={10}
                  sx={{ bgcolor: "#ffffff", width: { xs: "100%", sm: "80%" } }}
                  value={lyrics}
                  onChange={e => {
                    setLyrics(e.target.value)
                    if (!lyrics) {
                      setChecked(false)
                    }
                  }
                  }
                />
                <IconButton sx={{ backgroundColor: '#c55a10', color: 'white', ':hover': { backgroundColor: 'black' }, marginBottom: 5 }} onClick={e => setLyrics('')}>
                  <ClearIcon />
                </IconButton>
              </Stack>
              <Button href={`https://www.google.com/search?q=${artist}+${title}+lyrics`} target="_blank" variant="contained" sx={{ bgcolor: "#94440C", textAlign: 'center', textTransform: "capitalize" }} startIcon={<SearchIcon />}>
                Buscar letra de {title}
              </Button>
            </Grid>
          </Grid>
          <a ref={download} href={audio} download={fileName} hidden>No deverias de ver esto 2 xddd</a>
          <Button variant="contained" sx={{ bgcolor: "#94440C" }} onClick={saveTags} endIcon={<SaveRoundedIcon />}>
            Guardar
          </Button>
        </Grid> : null
      }
    </Box>
  );
}

export default Editor;