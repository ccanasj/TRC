import express from "express";
import audio from "./audio.controller.js";
import image from "./image.controller.js";
import search from "./search.controller.js";
import trends from "./trends.controller.js";

const router = express.Router()

router.route("/").get((req,res) => res.send("Wuenas mundo"))
router.route("/getImage").post(image.getImage)
router.route("/audioInfo").post(audio.getAudio)
router.route("/downloadAudio").post(audio.downloadFF)
router.route("/downloadWriter").post(audio.downloadWriter)
router.route("/search").post(search.getResult)
router.route("/trends").get(trends.getTrends)

export default router