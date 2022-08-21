import express from "express";
import audio from "./audio.controller.js";
import image from "./image.controller.js";

const router = express.Router()

router.route("/").get((req,res) => res.send("Wuenas mundo"))
router.route("/getImage").post(image.getImage)
router.route("/audioInfo").post(audio.getAudio)
router.route("/downloadAudio").post(audio.downloadFF)
router.route("/downloadWriter").post(audio.downloadWriter)

export default router