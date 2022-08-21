import React, { useState, useRef, useEffect } from "react"
//import axios from "axios";

import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Radio from '@mui/material/Radio';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
//import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import LinearProgress from '@mui/material/LinearProgress'

import Canvas from "../Canvas.js";
import Ruleta from "../games/ruleta.js";
import YoutubeAudio from "../../services/audio.js";

const minDistance = 30;


function Info() {

  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [lengthSeconds, setLengthSeconds] = useState(0);
  const [seconds, setSeconds] = useState([0, 0]);
  const [videoId, setVideoId] = useState('');
  const [quality, setQuality] = useState('highestaudio');
  const [image, setImage] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [blob, setBlob] = useState('');
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [wheel, setWheel] = useState(false);
  const download = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => setValue(value + 1), 1000);

    return () => {
      clearInterval(interval);
    };
  }, [value]);

  async function sendURL() {
    const req = { url: url };
    console.log(req)
    YoutubeAudio.audioInfo(req).then(response => {
      console.log(response.data);
      setTitle(response.data.title)
      setLengthSeconds(Number(response.data.lengthSeconds))
      setSeconds([0, Number(response.data.lengthSeconds)])
      setVideoId(response.data.videoId)
      setKeywords(response.data.keywords ? response.data.keywords : [])
      setImage(response.data.thumbnail.thumbnails[response.data.thumbnail.thumbnails.length - 1].url)
    }).catch(e => {
      setAlertMessage(e.response.data.message)
      setOpen(true)
    });
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function downloadAudio() {

    const req = {
      id: videoId,
      title: title,
      artist: artist,
      album: album,
      seconds: seconds,
      quality: quality,
      normLoud: checked,
      image: image.split(',')[1]
    };

    console.log(req)
    setLoading(true)
    setValue(0)
    YoutubeAudio.downloadAudio(req).then(async (response) => {
      console.log(response);
      const objectURL = URL.createObjectURL(response.data);
      setBlob(objectURL)
      await sleep(500);
      download.current.click()
      await sleep(500);
      window.location.reload();
    })
      .catch(e => {
        setAlertMessage('A ocurrido un error procesando el audio')
        setOpen(true)
        setLoading(false)
        console.log(e);
      });
  }

  const handleChangeSeconds = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setSeconds([Math.min(newValue[0], seconds[1] - minDistance), seconds[1]]);
    } else {
      setSeconds([seconds[0], Math.max(newValue[1], seconds[0] + minDistance)]);
    }
  };

  function getImage(e) {
    const file = e.target.files[0]
    if (file.size / 1024 / 1024 > 2) {
      setAlertMessage('La imagen debe pesar menos de 2 mb')
      setOpen(true)
    } else {
      const reader = new FileReader()
      reader.onloadend = function () {
        setImage(reader.result)
      }
      if (file) {
        reader.readAsDataURL(file)
      }
    }
  }

  function fancyTime(time) {
    return Math.floor(time % 3600 / 60).toString().padStart(2, '0') + ':' + Math.floor(time % 60).toString().padStart(2, '0')
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const copy = async (e) => {
    //console.log(await navigator.clipboard.readText())
    await navigator.clipboard.writeText(e.target.innerText);
  }

  return (
    <Box sx={{ border: 10 }}>
      {videoId ?
        <Typography sx={{ color: "white" }}>
          yrn
        </Typography>
        : null}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert variant="filled" severity="error" onClose={handleClose} sx={{ mb: 2 }}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Grid component="form"
        autoComplete="off"
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        noValidate
        color="#000000" sx={{ borderBottom: 10, margin: "1% auto", p: 1 }}>
        <h1 className="App-header">
          Ingresa el link de la canción
        </h1>
        <TextField disabled={loading} required margin="normal" sx={{ bgcolor: "#ffffff", width: "80%" }} value={url} onChange={e => setUrl(e.target.value)} />
        <Button disabled={loading} variant="contained" sx={{ bgcolor: "#94440C" }} onClick={sendURL}>
          Enviar
        </Button>
      </Grid>
      {videoId ?
        <Grid container alignItems="center"
          justifyContent="center"
          direction="column"
          spacing={2}>
          <Grid container alignItems="center"
            justifyContent="center" item>
            <Accordion defaultExpanded={true} sx={{ width: "97%", border: 1 }}>
              <AccordionSummary sx={{ backgroundColor: "#d46312", borderBottom: 1 }}>
                <Typography sx={{ color: "white" }}>Opciones generales</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid item>
                  <Typography variant='h5'>
                    {title}
                  </Typography>
                </Grid>
                <Grid container direction="row" item>
                  <Grid container border={3} xs alignItems="center" justifyContent="center" item direction="column" component="form" autoComplete="off" noValidate>
                    <TextField disabled={loading} required margin="normal" label="Titulo" sx={{ bgcolor: "#ffffff", width: "50%" }} value={title} onChange={e => setTitle(e.target.value)} />
                    <TextField disabled={loading} margin="normal" label="Artista" sx={{ bgcolor: "#ffffff", width: "50%" }} value={artist} onChange={e => setArtist(e.target.value)} />
                    <TextField disabled={loading} margin="normal" label="Album" sx={{ bgcolor: "#ffffff", width: "50%" }} value={album} onChange={e => setAlbum(e.target.value)} />
                  </Grid>
                  <Grid item border={3} xs={3}>
                    <Typography variant='h5' align="center">
                      Palabras clave
                    </Typography>
                    <List style={{ maxHeight: 250, overflow: 'auto' }} >
                      {keywords.map((value) => (
                        <ListItem key={value} divider>
                          <Button disabled={loading} variant="contained" sx={{ bgcolor: "#94440C", textTransform: "capitalize" }} onClick={copy}>
                            {value}
                          </Button>
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid container alignItems="center"
            justifyContent="center" item>
            <Accordion sx={{ width: "97%", border: 1 }}>
              <AccordionSummary sx={{ backgroundColor: "#d46312", borderBottom: 1 }}>
                <Typography sx={{ color: "white" }}>Opciones avanzadas</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container border={3} direction="column" alignItems="center" justifyContent="center" item>
                  <Typography variant='h5' align="center">
                    Tiempo incio - duracion del audio
                  </Typography>
                  <Typography variant='h6'>
                    El audio incia en el segundo {seconds[0]}s
                  </Typography>
                  <Box sx={{ width: "50%" }}>
                    <Slider
                      getAriaLabel={() => 'Minimum distance'}
                      value={seconds}
                      onChange={handleChangeSeconds}
                      valueLabelDisplay="auto"
                      min={0}
                      max={lengthSeconds}
                      disableSwap
                      disabled={loading}
                    />
                  </Box>
                  <Typography variant='h6'>
                    El audio tiene una duracion de {fancyTime(seconds[1] - seconds[0])}
                  </Typography>
                </Grid>

                <Grid margin={2} item>
                  <Typography variant='h5' align="center">
                    Calidad del audio
                  </Typography>
                  <Grid alignItems="center" container item>
                    <Radio
                      checked={quality === 'highestaudio'}
                      onChange={e => setQuality(e.target.value)}
                      disabled={loading}
                      value="highestaudio" />
                    <Tooltip disableFocusListener disableTouchListener arrow leaveDelay={300} placement="right" title="Entre mayor la calidad mejor se escuhara el audio pero  sera  mas pesado el archivo">
                      <Typography>
                        Mayor calidad
                      </Typography>
                    </Tooltip>
                  </Grid>

                  <Grid alignItems="center" container item>
                    <Radio
                      checked={quality === 'lowestaudio'}
                      onChange={e => setQuality(e.target.value)}
                      disabled={loading}
                      value="lowestaudio" />
                    <Tooltip disableFocusListener disableTouchListener arrow placement="right" title="Pues lo contrario al anterior boludo">
                      <Typography>
                        Menor calidad
                      </Typography>
                    </Tooltip>
                  </Grid>
                  <Grid alignItems="center" container item>
                    <Checkbox
                      checked={checked}
                      onChange={e => setChecked(e.target.checked)}
                      disabled={loading}
                    />
                    <Tooltip disableFocusListener disableTouchListener arrow placement="right" title="Ni yo lo entiendo xddd">
                      <Typography>
                        Normalizar ruido del audio
                      </Typography>
                    </Tooltip>
                  </Grid>
                </Grid>
                <Typography variant='h5' align="center">
                  Album cover
                </Typography>
                <Grid border={3} margin={2} padding={2} justifyContent="space-evenly" alignItems="center" container item>
                  <Canvas image={image} onChange={setImage} />
                  <Button disabled={loading} variant="contained" component="label" >
                    Subir imagen de portada
                    <input hidden accept="image/*" type="file" onChange={getImage} />
                  </Button>
                  O
                  <TextField disabled={loading} label="Url imagen" margin="normal" sx={{ bgcolor: "#ffffff", width: "30%", height: "25%" }} onChange={e => setImage(e.target.value)} />
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid alignItems="center" justifyContent="center" container item>
            <Checkbox
              checked={wheel}
              onChange={e => setWheel(e.target.checked)}
              disabled={loading}
            />
            <Typography>
              ¿Quieres Probar Suerte?
            </Typography>
          </Grid>
          <Grid item>
            <Button disabled={loading} variant="contained" sx={{ bgcolor: "#94440C" }} onClick={downloadAudio}>
              Descargar
            </Button>
          </Grid>
          {loading ?
            <Grid sx={{ width: '80%' }} item>
              {wheel ? <Ruleta></Ruleta> : null}
              <Typography variant='h6' align="center">
                {value}
              </Typography>
                <LinearProgress />
            </Grid> : <></>
          }
          <a ref={download} href={blob} download={`${title}.mp3`} style={{ visibility: "hidden" }}>No deverias de ver esto xddd</a>
        </Grid> : <></>
      }
    </Box>
  );
}

export default Info;