import ytdl from "ytdl-core";
import fs from "fs";
import FFmpegStatic from "ffmpeg-static";
import childProcess from "child_process";
import ffmpeg from 'fluent-ffmpeg';
import path from "path";

export default class audio {
    static async getAudio(req, res, next) {
        try {
            const videoUrl = req.body.url
            if (ytdl.validateURL(videoUrl)) {
                const basic = await ytdl.getBasicInfo(videoUrl);

                if (!basic.player_response.videoDetails.isLiveContent && Number(basic.player_response.videoDetails.lengthSeconds) <= 600 && Number(basic.player_response.videoDetails.lengthSeconds) >= 40) {

                    res.json(basic.player_response.videoDetails)
                } else {
                    res.status(400).json({ message: "El video no puede ser en vivo, debe ser mayor a 40 segundos y menor a 10 minutos" })
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
            let ffmpeg = childProcess.spawn(FFmpegStatic, [
                //'-y', '-v', 'error',
                //'-ss', '0',
                '-i', 'pipe:0',
                // '-i', 'Kirb.png',
                // '-map', '0',
                // '-map', '1',
                // '-c:v', 'copy',
                // '-id3v2_version', '3',
                // '-metadata', 'title="Holi"',
                // '-metadata', 'artist="Someone"',
                // '-metadata', 'album="Si"',
                // '-acodec', 'mp3',
                // "-f", "mp3",
                // '-metadata:s:v', 'title="Album cover"',
                // '-metadata:s:v', 'comment="Cover (front)"',
                //'-t', '10',
                //'-filter:a', "volume=-14dB",
                //'-filter:a', "loudnorm",
                // 'pipe:1'
            ]);

            download.pipe(ffmpeg.stdin);

            res.writeHead(206, { 'Accept-Ranges': 'bytes', 'Content-Type': 'audio/mp3' })
            //ffmpeg.stdout.pipe(res);
            // ffmpeg.on('close', () => {
            //     console.log("Acabe xd");
            //     res.json({ message: "Melisimo" })
            // })

            ffmpeg.stdout.pipe(res);

            //error logging
            ffmpeg.stderr.setEncoding('utf8');
            ffmpeg.stderr.on('data', (data) => {
                console.log(data);
            });

            res.on("close", () => { ffmpeg.kill(); });

            // const writeStream = fs.createWriteStream('./test.mp3');
            // download.pipe(writeStream);

        } catch (error) {
            console.log(error)
            res.json({ message: "F" })
        }
    }

    static async downloadWriter(req, res, next) {
        try {
            const videoUrl = req.body.id;
            const download = ytdl(videoUrl, { quality: req.body.quality })

            const name = req.body.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()

            const filename = `./audio/${name}.temp.mp3`;

            const imageName = `./img/${name}.temp.jpeg`

            fs.writeFile(imageName, req.body.image, { encoding: 'base64' }, (err) => {
                if (err)
                    console.log(err);
                else {
                    const stream = ffmpeg(download).setFfmpegPath(FFmpegStatic)
                        .seekInput(req.body.seconds[0])
                        .audioFrequency(44100)
                        .audioBitrate(128)
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
                    if (req.body.normLoud) {
                        console.log('a')
                        stream.audioFilter("loudnorm")
                    }

                    stream.on('end', () => {
                        res.sendFile(path.resolve(filename), err => {
                            if (err) {
                                console.log(err);
                                res.status(500).json({ message: "Ocurrio un error con el audio" });
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
                            res.status(500).json({ message: "Ocurrio un error con el audio" });
                            download._destroy()
                            stream.kill()
                        }
                    });
                }
            });

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Ocurrio un error con el audio" });
        }
    }
}
