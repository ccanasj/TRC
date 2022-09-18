import React, { useRef, useEffect } from 'react'
import YoutubeAudio from "../../services/audio.js";

const Canvas = props => {

    const { image, onChange, ...rest } = props
    const canvasRef = useRef(null)

    useEffect(() => {

        const imageObj1 = new Image();

        imageObj1.onload = function () {
            const canvas = canvasRef.current
            const context = canvas.getContext('2d')
            context.mozImageSmoothingEnabled = false;
            context.webkitImageSmoothingEnabled = false;
            context.msImageSmoothingEnabled = false;
            context.imageSmoothingEnabled = false;

            canvas.width = 350;
            canvas.height = 350;
            context.drawImage(imageObj1, 0, 0, imageObj1.width, imageObj1.height, 0, 0, canvas.width, canvas.height);

            const dataURL = canvas.toDataURL("image/jpeg");
            onChange(dataURL)
        }

        if (image.startsWith('https://')) {
            const req = { url: image };
            // console.log(req)
            YoutubeAudio.getImage(req).then(response => {
                // console.log(response);
                imageObj1.src = response.data
            }).catch(e => {
                imageObj1.src = ''
                // console.log(e);
            });
        } else {
            imageObj1.src = image
        }

    }, [image, onChange])

    return <canvas className='album-cover' ref={canvasRef} {...rest} />
}

export default Canvas