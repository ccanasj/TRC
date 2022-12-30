import React, { useState, useRef, useEffect } from "react"

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
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import LinearProgress from '@mui/material/LinearProgress'
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import SearchIcon from '@mui/icons-material/Search';
import UploadRoundedIcon from '@mui/icons-material/UploadRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';

import Trends from "../downloader/trends.js";
import Canvas from "../downloader/canvas.js";
import SearchResults from "../downloader/searchResults.js";
// import Ruleta from "../games/ruleta.js";
import YoutubeAudio from "../../services/audio.js";

const minDistance = 20;

function Downloader() {

  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [lengthSeconds, setLengthSeconds] = useState(0);
  const [seconds, setSeconds] = useState([0, 0]);
  const [videoId, setVideoId] = useState('');
  const [quality, setQuality] = useState('128');
  const [image, setImage] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [blob, setBlob] = useState('');
  const [checked, setChecked] = useState(false);
  const [removeSilence, setRemoveSilence] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [tab, setTab] = useState(0);
  // const [wheel, setWheel] = useState(false);
  // const [directDownload, setDirectDownload] = useState(false);
  const download = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => setValue(value + 1), 1000);

    return () => {
      clearInterval(interval);
    };
  }, [value]);

  function sendURL() {
    const req = { url: url };
    // console.log(req)
    // if (!directDownload) {
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
    // } else {
    //   YoutubeAudio.downloadAudio(req).then(response => {
    //     console.log(response);
    //   }).catch(e => {
    //     setAlertMessage('Ah ocurrido un error descargando el audio, intentalo de nuevo')
    //     setOpen(true)
    //   });
    // }
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function downloadAudio() {

    const req = {
      id: videoId,
      title: title,
      artist: artist,
      album: album ? album : title,
      seconds: seconds,
      quality: quality,
      normLoud: checked,
      removeSilence: removeSilence,
      image: image.split(',')[1]
    };

    // console.log(req)
    setLoading(true)
    setValue(0)
    YoutubeAudio.downloadAudioMetadata(req).then(async (response) => {
      console.log(response);
      const objectURL = URL.createObjectURL(response.data);
      setBlob(objectURL)
      await sleep(500);
      download.current.click()
      await sleep(500);
      URL.revokeObjectURL(objectURL);
      window.location.reload();
    })
      .catch(e => {
        setAlertMessage('A ocurrido un error procesando el audio, vuelve a intentarlo')
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
    if (file.size / 1024 / 1024 > 3) {
      setAlertMessage('La imagen debe pesar menos de 3 mb')
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
    await navigator.clipboard.writeText(e.target.innerText);
  }

  function pasteImage(event) {
    if (loading) {
      return
    }
    // use event.originalEvent.clipboard for newer chrome versions
    var items = (event.clipboardData || event.originalEvent.clipboardData).items;
    // find pasted image among pasted items
    console.log(items)
    var blob = null;
    for (var i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") === 0) {
        blob = items[i].getAsFile();
      }
    }
    // load image if there is a pasted image
    if (blob !== null) {
      var reader = new FileReader();
      reader.onload = function (event) {
        setImage(event.target.result) // data url!
      };
      reader.readAsDataURL(blob);
    }
  }

  return (
    <Box sx={{ border: 10, borderTop: 0, borderBottom: 0 }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert variant="filled" severity="error" onClose={handleClose} sx={{ mb: 2 }}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center" padding={1}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={(event, newValue) => setTab(newValue)} variant="fullWidth" centered>
            <Tab sx={{ color: 'black' }} label="Buscador" icon={<SearchIcon />} iconPosition="start" />
            <Tab sx={{ color: 'black' }} label="Link" icon={<LinkRoundedIcon />} iconPosition="end" />
          </Tabs>
        </Box>
        <SearchResults tab={tab} setTab={setTab} loading={loading} onSelect={setUrl} alertOpen={setOpen} alertText={setAlertMessage} />
        <Trends tab={tab} setTab={setTab} onSelect={setUrl} />
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={tab === 1 ? {} : { display: "none" }}>
          <h1 className="App-header">
            Ingresa el link de la canción de YouTube
          </h1>
          <TextField disabled={loading} required margin="normal" sx={{ bgcolor: "#ffffff", width: "90%" }} onKeyPress={e => { if (e.key === 'Enter') { sendURL(e) } }} InputProps={{ autoComplete: 'off', endAdornment: (<IconButton disabled={loading} onClick={async (e) => setUrl(await navigator.clipboard.readText())}><ContentPasteIcon /></IconButton>) }} value={url} onChange={e => setUrl(e.target.value)} />
          <Button disabled={loading || !url} variant="contained" sx={{ bgcolor: "#94440C" }} onClick={sendURL}>
            Enviar
          </Button>
        </Grid>
        {/* <Typography variant='h6' align="center">
          ¿Descargar directamente?
        </Typography>
        <Switch disabled={loading} checked={directDownload} onChange={e => setDirectDownload(e.target.checked)} />
        <Divider sx={{ m: 3 }} flexItem /> */}
      </Grid>
      {videoId ?
        <Grid container alignItems="center"
          justifyContent="center"
          direction="column"
          spacing={2} padding={1}
          sx={tab === 1 ? {} : { display: "none" }}>
          <Grid container alignItems="center"
            justifyContent="center" item>
            <Accordion defaultExpanded={true} sx={{ width: "97%", border: 1, backgroundColor: "#faf1e6" }}>
              <AccordionSummary sx={{ backgroundColor: "#d46312", borderBottom: 1 }} expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}>
                <Typography sx={{ color: "white" }}>Opciones generales</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid item>
                  <Typography variant='h5' style={{ fontFamily: "Impact", wordBreak: 'break-all' }}>
                    {title}
                  </Typography>
                </Grid>
                <Grid container direction={{ xs: 'column', sm: 'row' }} item>
                  <Grid container border={3} xs sx={{ boxShadow: 3 }} alignItems="center" justifyContent="center" item direction="column" component="form" autoComplete="off" noValidate>
                    <TextField disabled={loading} required error={!title} margin="normal" label="Título" sx={{ bgcolor: "#ffffff", width: { xs: "95%", sm: "80%" } }} value={title} onChange={e => setTitle(e.target.value)} InputProps={{ endAdornment: (<IconButton disabled={loading} onClick={async (e) => setTitle(await navigator.clipboard.readText())}><ContentPasteIcon /></IconButton>) }} />
                    <TextField disabled={loading} margin="normal" label="Artista" sx={{ bgcolor: "#ffffff", width: { xs: "95%", sm: "80%" } }} value={artist} onChange={e => setArtist(e.target.value)} InputProps={{ endAdornment: (<IconButton disabled={loading} onClick={async (e) => setArtist(await navigator.clipboard.readText())}><ContentPasteIcon /></IconButton>) }} />
                    <TextField disabled={loading} margin="normal" label="Álbum" sx={{ bgcolor: "#ffffff", width: { xs: "95%", sm: "80%" } }} value={album} onChange={e => setAlbum(e.target.value)} InputProps={{ endAdornment: (<IconButton disabled={loading} onClick={async (e) => setAlbum(await navigator.clipboard.readText())}><ContentPasteIcon /></IconButton>) }} />
                  </Grid>
                  <Grid item border={3} xs={4} sx={{ boxShadow: 3 }}>
                    <Typography variant='h6' align="center">
                      Palabras clave (Click para copiar)
                    </Typography>
                    <List style={{ maxHeight: 250, overflow: 'auto' }} >
                      {keywords.map((value, index) => (
                        <ListItem key={index} divider>
                          <Button disabled={loading} variant="contained" sx={{ bgcolor: "#94440C", textTransform: "capitalize" }} onClick={copy}>
                            {value}
                          </Button>
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                </Grid>
                <Grid padding={2} container alignItems="center" justifyContent="center" item>
                  <Button disabled={loading} href={`https://musicbrainz.org/search?query=${title}+${artist}&type=recording&limit=25&method=indexed`} target="_blank" variant="contained" sx={{ bgcolor: "#94440C", textTransform: "capitalize" }} startIcon={<SearchIcon />}>
                    Buscar más información
                  </Button>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid container alignItems="center"
            justifyContent="center" item>
            <Accordion sx={{ width: "97%", border: 1, backgroundColor: "#faf1e6" }}>
              <AccordionSummary sx={{ backgroundColor: "#d46312", borderBottom: 1 }} expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}>
                <Typography sx={{ color: "white" }}>Opciones avanzadas</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid sx={{ boxShadow: 3 }} container border={3} direction="column" alignItems="center" justifyContent="center" item>
                  <Typography variant='h5' align="center">
                    Tiempo inicio - duración del audio
                  </Typography>
                  <Typography align="center" variant='h6'>
                    El audio inicia en el segundo {seconds[0]}s
                  </Typography>
                  <Box sx={{ width: "80%" }}>
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
                  <Typography align="center" variant='h6'>
                    El audio tiene una duración de {fancyTime(seconds[1] - seconds[0])}
                  </Typography>
                </Grid>
                <Typography variant='h5' align="center" padding={1}>
                  Calidad del audio
                </Typography>
                <Grid padding={2} container alignItems="center" justifyContent="space-between" item>
                  <Stack>
                    <Grid alignItems="center" container item>
                      <Radio
                        checked={quality === '320'}
                        onChange={e => setQuality(e.target.value)}
                        disabled={loading}
                        value={'320'} />
                      <Tooltip disableFocusListener disableTouchListener arrow leaveDelay={300} placement="right" title="La mayor calidad para un archivo MP3 (Tarda más en descargar y el archivo pesa más)">
                        <Typography>
                          Máxima calidad (320kbps)
                        </Typography>
                      </Tooltip>
                    </Grid>
                    <Grid alignItems="center" container item>
                      <Radio
                        checked={quality === '192'}
                        onChange={e => setQuality(e.target.value)}
                        disabled={loading}
                        value={'192'} />
                      <Tooltip disableFocusListener disableTouchListener arrow leaveDelay={300} placement="right" title="Entre mayor la calidad mejor se escuchara el audio pero sera mas pesado el archivo (Tarda más en descargar)">
                        <Typography>
                          Mayor calidad (192kbps)
                        </Typography>
                      </Tooltip>
                    </Grid>
                    <Grid alignItems="center" container item>
                      <Radio
                        checked={quality === '128'}
                        onChange={e => setQuality(e.target.value)}
                        disabled={loading}
                        value={'128'} />
                      <Tooltip disableFocusListener disableTouchListener arrow leaveDelay={300} placement="right" title="Calidad normal">
                        <Typography>
                          Calidad normal (128kbps)
                        </Typography>
                      </Tooltip>
                    </Grid>

                    <Grid alignItems="center" container item>
                      <Radio
                        checked={quality === '64'}
                        onChange={e => setQuality(e.target.value)}
                        disabled={loading}
                        value={'64'} />
                      <Tooltip disableFocusListener disableTouchListener arrow placement="right" title="La menor calidad de audio, pero menos pesado">
                        <Typography>
                          Menor calidad (64kbps)
                        </Typography>
                      </Tooltip>
                    </Grid>
                  </Stack>
                  <Stack>
                    <Grid alignItems="center" container item>
                      <Checkbox
                        checked={removeSilence}
                        onChange={e => setRemoveSilence(e.target.checked)}
                        disabled={loading}
                      />
                      <Tooltip disableFocusListener disableTouchListener arrow placement="top" title="Remueve el silencio que sea menor a -40db al incio de la canción y al final (Tarda mas en descargar)">
                        <Typography>
                          Remover silencio al incio y final
                        </Typography>
                      </Tooltip>
                    </Grid>
                    <Grid alignItems="center" container item>
                      <Checkbox
                        checked={checked}
                        onChange={e => setChecked(e.target.checked)}
                        disabled={loading}
                      />
                      <Tooltip disableFocusListener disableTouchListener arrow placement="bottom" title="Reducira los sonidos fuertes (Tarda mas en descargar)">
                        <Typography>
                          Normalizar ruido del audio
                        </Typography>
                      </Tooltip>
                    </Grid>
                  </Stack>
                </Grid>
                <Typography variant='h5' align="center">
                  Álbum cover
                </Typography>
                <Grid border={3} padding={2} sx={{ boxShadow: 3 }} justifyContent="space-evenly" alignItems="center" container item onPaste={pasteImage}>
                  <Canvas image={image} onChange={setImage} />
                  <Button disabled={loading} variant="contained" component="label" style={{ textAlign: 'center', textTransform: "capitalize" }} endIcon={<UploadRoundedIcon />}>
                    Subir imagen de portada
                    <input hidden accept="image/*" type="file" onChange={getImage} />
                  </Button>
                  <Button variant="contained" sx={{ mt: { xs: 2, sm: 0 }, backgroundColor: 'black', color: 'white', textAlign: 'center', textTransform: "capitalize", ':hover': { backgroundColor: '#c55a10' } }} endIcon={<ContentPasteIcon />} disabled={loading} onClick={async (e) => setImage(await navigator.clipboard.readText())}>
                    Pegar URL
                  </Button>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
          {/* <Grid alignItems="center" justifyContent="center" container item>
            <Checkbox
              checked={wheel}
              onChange={e => setWheel(e.target.checked)}
              disabled={loading}
            />
            <Typography>
              ¿Quieres Probar Suerte?
            </Typography>
          </Grid> */}
          <Grid item>
            <Button disabled={loading} variant="contained" sx={{ bgcolor: "#94440C" }} onClick={downloadAudio} endIcon={<DownloadRoundedIcon />}>
              Descargar
            </Button>
          </Grid>
          {loading ?
            <Grid sx={{ width: '80%', color: '#d46312' }} item padding={2}>
              {/* {wheel ? <Ruleta></Ruleta> : null} */}
              <Typography variant='h6' align="center">
                {value}
              </Typography>
              <LinearProgress color="inherit" />
            </Grid> : null
          }
          <a ref={download} href={blob} download={`${title}.mp3`} hidden>No deverias de ver esto xddd</a>
        </Grid> : null
      }
    </Box >
  );
}

export default Downloader;