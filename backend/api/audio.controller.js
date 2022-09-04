import ytdl from "ytdl-core";
import fs from "fs";
import FFmpegStatic from "ffmpeg-static";
import ffmpeg from 'fluent-ffmpeg';
import path from "path";
import crypto from "crypto"

export default class audio {
    static async getAudio(req, res, next) {
        try {
            const videoUrl = req.body.url
            if (ytdl.validateURL(videoUrl)) {
                const COOKIE = "GPS=1; YSC=bA5l_nKB5wg; VISITOR_INFO1_LIVE=p8Qt9mhSxu0; PREF=tz=America.Bogota&f6=40000000; CONSISTENCY=AGXVzq_6pYSke-EqKtQgyLkAq2wTPEoGmIndCwcaP5w-WDDsKL02q-H-fNUy7V9TvUB4gXbNtc7JkCK1RxLOROST44rcs9Y67S5G4I-qkHzB78fk6TrNtdtfRUS8ARMnKhUrKLk1TQAJ-g2FCU3dkNg"
                const basic = await ytdl.getBasicInfo(videoUrl, {
                    requestOptions: {
                        headers: {
                            cookie: COOKIE
                        }
                    }
                });

                if (!basic.player_response.videoDetails.isLiveContent && Number(basic.player_response.videoDetails.lengthSeconds) <= 600 && Number(basic.player_response.videoDetails.lengthSeconds) >= 30) {

                    res.json(basic.player_response.videoDetails)
                } else {
                    res.status(400).json({ message: "El video no puede ser en vivo, debe ser mayor a 30 segundos y menor a 10 minutos" })
                }
            } else {
                res.status(400).json({ message: "Url invalida" })
            }

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Revisa que el video no este en privado, este marcado para mayores de edad o este eliminado" })
        }
    }

    static async downloadFF(req, res, next) {
        try {
            const videoUrl = req.body.url;
            const download = ytdl(videoUrl, { quality: 'lowestaudio' })

            res.writeHead(206, { 'Accept-Ranges': 'bytes', 'Content-Type': 'audio/mp3' })

            download.pipe(res);

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Ocurrió un error con el audio" });
        }
    }

    static async downloadWriter(req, res, next) {
        try {
            const videoUrl = req.body.id;
            const COOKIE = "GPS=1; YSC=bA5l_nKB5wg; VISITOR_INFO1_LIVE=p8Qt9mhSxu0; PREF=tz=America.Bogota&f6=40000000; CONSISTENCY=AGXVzq_6pYSke-EqKtQgyLkAq2wTPEoGmIndCwcaP5w-WDDsKL02q-H-fNUy7V9TvUB4gXbNtc7JkCK1RxLOROST44rcs9Y67S5G4I-qkHzB78fk6TrNtdtfRUS8ARMnKhUrKLk1TQAJ-g2FCU3dkNg"
            const download = ytdl(videoUrl, {
                quality: 'lowestaudio',
                requestOptions: {
                    headers: {
                        cookie: COOKIE
                    }
                }
            });

            const name = crypto.randomUUID();

            const filename = `./audio/${name}.temp.mp3`;

            const imageName = `./img/${name}.temp.jpeg`;

            fs.writeFile(imageName, req.body.image, { encoding: 'base64' }, (err) => {
                if (err)
                    console.log(err);
                else {
                    const stream = ffmpeg(download).setFfmpegPath(FFmpegStatic)
                        .seekInput(req.body.seconds[0])
                        .audioFrequency(44100)
                        .audioBitrate(req.body.quality)
                        .addInput(imageName)
                        .addOutputOptions(
                            '-map', '0', '-map', '1', '-c', 'copy',
                            '-c:a', 'libmp3lame', '-id3v2_version', '3',
                            '-metadata', `title=${req.body.title}`,
                            '-metadata', `artist=${req.body.artist}`,
                            '-metadata', `album=${req.body.album}`)
                        .format('mp3')
                        .duration(req.body.seconds[1] - req.body.seconds[0])
                        .save(filename);
                    const filters = []
                    if (req.body.removeSilence) {
                        filters.push("silenceremove=stop_periods=-1:stop_duration=1:stop_threshold=-40dB")
                    }
                    if (req.body.normLoud) {
                        filters.push("loudnorm")
                    }
                    if (filters.length) {
                        stream.audioFilters(...filters)
                    }


                    stream.on('end', () => {
                        res.sendFile(path.resolve(filename), err => {
                            if (err) {
                                console.log(err);
                                res.status(500).json({ message: "Ocurrió un error con el audio" });
                            }
                            download._destroy()
                            fs.unlink(path.resolve(filename), err => {
                                if (err) {
                                    console.log(err);
                                }
                            });
                            fs.unlink(path.resolve(imageName), err => {
                                if (err) {
                                    console.log(err);
                                }
                            });

                        });
                        stream.kill()
                    }).on('error', function (err, stdout, stderr) {
                        if (err) {
                            console.log(err.message);
                            console.log("stdout:\n" + stdout);
                            console.log("stderr:\n" + stderr);
                            res.status(500).json({ message: "Ocurrió un error con el audio" });
                            download._destroy()
                            stream.kill()
                            fs.unlink(path.resolve(filename), err => {
                                if (err) {
                                    console.log(err);
                                }
                            });
                            fs.unlink(path.resolve(imageName), err => {
                                if (err) {
                                    console.log(err);
                                }
                            });
                        }
                    });
                }
            });

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Ocurrió un error con el audio" });
        }
    }
}
