import axios from "../http-commons.js"

class YoutubeAudio {
    audioInfo(data) {
        return axios.post("/audioInfo", data)
    }

    downloadAudioMetadata(data) {
        return axios.post("/downloadWriter", data, { responseType: 'blob' })
    }

    downloadAudio(data) {
        return axios.post("/downloadAudio", data, { responseType: 'blob' })
    }

    getImage(data) {
        return axios.post("/getImage", data)
    }

    search(data) {
        return axios.post("/search", data)
    }

    trends() {
        return axios.get("/trends")
    }

}

export default new YoutubeAudio();