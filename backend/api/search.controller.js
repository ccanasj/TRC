import ytsr from 'ytsr';

export default class search {

    static async getResult(req, res, next) {
        try {
            const searchResults = await ytsr(req.body.search, { limit: 10, gl: 'CO', hl: 'es', safeSearch: true });
            const result = searchResults.items.filter(video => {
                if (video.duration && !video.isUpcoming) {
                    const time = video.duration.split(":")
                    if (time.length < 3) {
                        if (Number(time[0]) <= 14) {
                            return video
                        }
                    }
                }
            }).map(video => {
                return { id: video.id, title: video.title, thumbnail: video.bestThumbnail.url, duration: video.duration }
            })
            res.json({ message: result })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "No se encontró información" })
        }
    }

}