import ytrend from "@freetube/yt-trending-scraper";

const parameters = {
    geoLocation: 'CO',
    parseCreatorOnRise: false,
    page: 'music'
}

export default class trends {

    static async getTrends(req, res, next) {
        ytrend.scrapeTrendingPage(parameters).then((data) => {
            const result = data.map(video => {
                return { id: video.videoId, title: video.title, thumbnail: video.videoThumbnails[2].url, views: video.viewCount, duration: video.timeText, published: video.publishedText }
            })
            res.send(result);
        }).catch((error) => {
            console.error(error);
            res.status(500).json({ message: error })
        });
    }

}