import axios from "axios"

const apis = axios.create({
    baseURL: "https://my-json-server.typicode.com/rahmatwahyuramadan/stage2"
})

export default apis