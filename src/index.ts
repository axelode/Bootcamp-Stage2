import express from "express"
import * as dotenv from "dotenv"
import router from "./routers/routers"

const app = express()

app.use(express.json())

dotenv.config()

app.use("/api/v1/", router)

app.listen(process.env.PORT, () => {
    console.log(`Successfully running on port ${process.env.PORT}`)
})