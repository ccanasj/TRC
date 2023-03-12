import apm from "elastic-apm-node"
import express from "express"
import cors from "cors"

apm.start()

import download from "./api/download.route.js"

const app = express()

app.use(cors())
app.use(express.json({limit: '5mb'}))

app.use("/api/v1/download", download)
app.use("*",(req,res) => res.status(404).json({error: "Donde vas flipao xd"}))

export default app