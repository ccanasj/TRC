import fetch from 'node-fetch';

export default class metadata {

    static async getMetadata(req, res, next) {
        try {
            res.json({ message: "Piola xd" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "No se encontró información" })
        }
    }

}