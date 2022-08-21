import axios from "../http-commons.js"

class YoutubeAudio {
    audioInfo(data){
        return axios.post("/audioInfo", data)
    }

    downloadAudio(data){
        return axios.post("/downloadWriter", data, {responseType: 'blob'})
    }

    getImage(data){
        return axios.post("/getImage", data)
    }

}

export default new YoutubeAudio();