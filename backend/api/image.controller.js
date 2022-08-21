import fetch from 'node-fetch';

export default class image {

    static async getImage(req, res, next) {
        const imageURL = req.body.url;
        fetch(imageURL).then(async (response) => {
            const blob = await response.arrayBuffer();
            res.send(`data:${response.headers.get("content-type")};base64,${Buffer.from(blob).toString("base64")}`);
        }).catch(e => {
            res.send('A ocurrido un error con la imagen');
            console.log(e)
        })
    }

}