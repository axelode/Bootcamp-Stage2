import UserController from "../controllers/UserController"
import TransactionController from "../controllers/TransactionController"
import * as express from "express"
import upload from "../middlewares/UploadMiddleware"
import AuthMiddleware from "../middlewares/AuthMiddleware"
import path from "path"

const router = express.Router()

router.post("/register", upload.single('image'), UserController.register)
router.post("/login", UserController.login)

router.post("/addTransaction", AuthMiddleware.auth, TransactionController.addTransaction)

router.use("/uploads", express.static(path.join(__dirname, "uploads")))

export default router