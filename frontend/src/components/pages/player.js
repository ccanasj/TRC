import React, { useState, useRef, useEffect } from "react"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';

import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import ReplayIcon from '@mui/icons-material/Replay';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';

import FAB from "../FAB";

import MP3Tag from "mp3tag.js";
import { Buffer } from "buffer";
import AudioMotionAnalyzer from 'audiomotion-analyzer';

const presets = [
  {
    name: 'Defaults',
    options: {
      mode: 3,
      barSpace: .6,
      gradient: 'prism',
      showScaleX: false,
      minDecibels: -70,
      maxFreq: 32000,
      height: 450,
      showPeaks: true,
      showBgColor: false,
      overlay: true
    }
  },
  {
    name: 'Classic LEDs',
    options: {
      mode: 3,
      barSpace: .5,
      bgAlpha: .7,
      gradient: 'classic',
      ledBars: true,
      minDecibels: -70,
      height: 450,
      lumiBars: false,
      radial: false,
      reflexRatio: 0,
      showBgColor: false,
      showPeaks: true,
    }
  },
  {
    name: 'Mirror wave',
    options: {
      mode: 10,
      bgAlpha: .7,
      fillAlpha: .6,
      gradient: 'rainbow',
      lineWidth: 2,
      lumiBars: false,
      radial: false,
      reflexAlpha: 1,
      reflexBright: 1,
      reflexRatio: .5,
      minDecibels: -70,
      maxFreq: 32000,
      height: 450,
      showBgColor: false,
      showPeaks: false,
      overlay: true
    }
  },
  {
    name: 'Radial',
    options: {
      mode: 3,
      barSpace: .1,
      bgAlpha: .5,
      gradient: 'prism',
      ledBars: false,
      minDecibels: -70,
      maxFreq: 32000,
      height: 450,
      radial: true,
      showBgColor: false,
      showPeaks: true,
      spinSpeed: 2,
      overlay: true
    }
  },
  {
    name: 'Reflex Bars',
    options: {
      mode: 5,
      barSpace: .25,
      bgAlpha: .5,
      ledBars: false,
      lumiBars: false,
      radial: false,
      showScaleX: false,
      minDecibels: -70,
      maxFreq: 32000,
      height: 450,
      reflexAlpha: .5,
      reflexFit: true,
      reflexRatio: .3,
      showBgColor: false,
      showPeaks: true,
      overlay: true
    }
  },
  {
    name: 'TRC Style',
    options:
    {
      mode: 3,
      barSpace: .6,
      gradient: 'TRC',
      showScaleX: false,
      minDecibels: -70,
      maxFreq: 32000,
      height: 450,
      showPeaks: true,
      showBgColor: false,
      overlay: true
    }
  }
];

function Player() {

  const [fileName, setFileName] = useState('');
  const [image, setImage] = useState('');
  const [lyrics, setLyrics] = useState([]);
  const [isSync, setIsSync] = useState(false);
  const [lyricLine, setLyricLine] = useState(0);
  const [metadata, setMetadata] = useState('');
  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(false);
  const [audio, setAudio] = useState(new Audio());
  const [option, setOption] = useState(5);
  const [color, setColor] = useState(getRandomColor());
  const [audioMotion, setAudioMotion] = useState(null);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const container = useRef(null)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  function displayImage(buffer) {
    // console.log(buffer)
    if (buffer) {
      const base64 = `data:${buffer[0].format};base64,${Buffer.from(buffer[0].data).toString('base64')}`
      setImage(base64)
    } else {
      setImage("/images/NotImageFound.png")
    }
  }

  useEffect(() => {
    const Gradientoptions = {
      colorStops: [
        'black',
        { pos: .6, color: 'gray' },
        '#ff6a00'

      ]
    }
    const obj = new AudioMotionAnalyzer(
      container.current,
      {
        source: audio,
      }
    )
    obj.registerGradient('TRC', Gradientoptions);
    obj.setOptions(presets[4].options)
    setAudioMotion(obj)
  }, [audio]);

  function aud_fade() {
    if (audio.volume > 0.01) {
      audio.volume -= 0.01;
      setTimeout(aud_fade, 3);
    } else {
      audio.volume = 0;
      audio.pause();
    }
  }

  function audioControl(e) {
    if (paused) {
      aud_fade()
    } else {
      audio.volume = 1;
      audio.play();
    }
    setPaused(!paused)
  }

  function rewind(e) {
    audio.currentTime = 0;
    setLyricLine(0)
  }

  function changeVolume(e) {
    if (muted) {
      audio.volume = 1;
    } else {
      audio.volume = 0;
    }
    setMuted(!muted)
  }

  function changeOptions(e) {
    audioMotion.setOptions(presets[option].options)
    if (option === presets.length - 1) {
      setOption(0)
    } else {
      setOption(option + 1)
    }
  }

  const handleChange = (event, newValue) => {
    if (!isSync) {
      setTime(newValue);
      audio.currentTime = newValue;
    }
  };

  function fancyTime(time) {
    return Math.floor(time % 3600 / 60).toString().padStart(2, '0') + ':' + Math.floor(time % 60).toString().padStart(2, '0')
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
      setMetadata(mp3tag.tags)
      console.log(mp3tag.tags)
      if (mp3tag.tags.v2.SYLT) {
        setLyrics(mp3tag.tags.v2.SYLT[0].lyrics.split("\n").slice(0, -1).map(line => {
          let timestamp = line.substring(0, line.indexOf(' '))
          const text = line.substring(line.indexOf(' ') + 1)
          const [minutes, seconds] = timestamp.slice(1).slice(0, -1).split(":")
          return `${((Number(minutes) * 60) + Number(seconds)).toFixed(3)} ${text}`
        }))
        setIsSync(true)
      } else if (mp3tag.tags.v2.USLT) {
        setLyrics(mp3tag.tags.v2.USLT[0].text.split("\n"))
      } else {
        setLyrics([])
      }
    }
    if (file) {
      audio.src = URL.createObjectURL(file);
      audio.play();
      setPaused(true)
      setMuted(false)
      audio.volume = 1;
      setLyricLine(0)
      setIsSync(false)
      audio.addEventListener("error", (e) => {
        setAlertMessage('A ocurrido un error con el audio por favor intentalo de nuevo')
        setOpenAlert(true)
      });
      audio.addEventListener('loadedmetadata', (e) => {
        setDuration(e.target.duration)
      });
      audio.addEventListener('timeupdate', function (e) {
        setTime(e.target.currentTime)
        if (e.target.currentTime >= e.target.duration) {
          setPaused(!paused)
          e.target.currentTime = 0;
          setLyricLine(0)
        }
      }, false);
      reader.readAsArrayBuffer(file)
      setFileName(file.name)
    }
  }

  function displayLyric(line, nextLine) {
    if (nextLine) {
      const nextTimestamp = Number(nextLine.substring(0, nextLine.indexOf(' '))) <= time
      const text = line.substring(line.indexOf(' ') + 1)
      if (nextTimestamp) {
        setLyricLine(lyricLine + 1)
        setColor(getRandomColor())
      }
      return text
    }
  }

  function getRandomColor() {
    var letters = '0123456789A';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  }

  return (
    <Box sx={{ border: 10, borderTop: 0, borderBottom: 0 }}>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert variant="filled" severity="error" onClose={handleClose} sx={{ mb: 2 }}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <FAB />
      <Fade in={true} timeout={500}>
        <Grid container
          direction="column"
          alignItems="center"
          justifyContent="center" padding={1}>
          <h1 className="App-header">
            TRC Player
          </h1>
          <Button variant="contained" component="label" sx={{ bgcolor: "#94440C" }}>
            Subir archivo de audio
            <input hidden accept="audio/mp3" type="file" onChange={getAudioMetada} />
          </Button>
        </Grid>
      </Fade>
      <Grid container
        direction="column"
        alignItems="center"
        justifyContent="center" padding={2}>
        {fileName ?
          <Grid sx={{ width: { xs: "100%", sm: "85%" } }}>
            <Stack direction="row" alignItems="center" justifyContent="space-evenly">
              <IconButton size="large" sx={{ backgroundColor: 'black', color: 'white', ':hover': { backgroundColor: '#c55a10' } }} onClick={audioControl}>
                {paused ? <PauseRoundedIcon fontSize="inherit" /> : <PlayArrowRoundedIcon fontSize="inherit" />}
              </IconButton>
              <IconButton size="large" sx={{ backgroundColor: 'black', color: 'white', ':hover': { backgroundColor: '#c55a10' } }} onClick={rewind}>
                <ReplayIcon fontSize="inherit" />
              </IconButton>
              <IconButton size="large" sx={{ backgroundColor: 'black', color: 'white', ':hover': { backgroundColor: '#c55a10' } }} onClick={changeVolume}>
                {muted ? <VolumeUpRoundedIcon fontSize="inherit" /> : <VolumeOffRoundedIcon fontSize="inherit" />}
              </IconButton>
              <IconButton size="large" sx={{ backgroundColor: 'black', color: 'white', ':hover': { backgroundColor: '#c55a10' } }} onClick={changeOptions}>
                <SettingsSuggestRoundedIcon fontSize="inherit" />
              </IconButton>
            </Stack>
            <Slider
              size="small"
              value={time}
              min={0}
              step={1}
              max={duration}
              sx={{ color: "black", mt: 2 }}
              onChange={handleChange}
            />
            <Typography align="center">
              {fancyTime(time)} / {fancyTime(duration)}
            </Typography>
          </Grid>
          : null
        }
        {isSync ?
          <Grid padding={1} item>
            {
              <Typography className="fade-item fadein" sx={{ color: color }} align="center" variant="h4">{displayLyric(lyrics[lyricLine], lyrics[lyricLine + 1])}</Typography>
            }
          </Grid> : null
        }
        <Grid container direction={{ xs: 'column-reverse', sm: 'row' }} padding={2} item>
          <Grid container xs direction="column" alignItems="center" justifyContent="center" item>
            <Typography align="center" sx={{ m: 1, wordBreak: 'break-all' }}>
              {fileName}
            </Typography>
            {fileName ?
              <img className="album-cover-player" src={image} alt="Album Cover" />
              : null
            }
            <Typography variant="h4" align="center">
              {metadata.title}
            </Typography>
            <Typography variant="h5" align="center">
              {metadata.artist}
            </Typography>
            <Typography variant="h6" align="center">
              {metadata.album}
            </Typography>
            <Typography align="center">
              {metadata.year}
            </Typography>
          </Grid>
          <Grid ref={container} xs item component="div">
          </Grid>
        </Grid>
        {!isSync ?
          <Grid padding={1} item>
            {lyrics.map((i, key) => {
              return <Typography key={key}>{i}</Typography>;
            })}
          </Grid> : null
        }
      </Grid>
    </Box>
  );
}

export default Player;