import * as express from "express"
import path from "path"

import upload from "../middlewares/UploadMiddleware"
import AuthMiddleware from "../middlewares/AuthMiddleware"

import UserController from "../controllers/UserController"
import TransactionController from "../controllers/TransactionController"
import CategoryController from "../controllers/CategoryController"
import WalletController from "../controllers/WalletController"


const router = express.Router()

// user
router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.post("/logout", AuthMiddleware.auth, UserController.logout)

// transaction
router.post("/addTransaction", AuthMiddleware.auth, TransactionController.addTransaction)
router.get("/findLastMonthTransaction", AuthMiddleware.auth, TransactionController.findLastMonthTransaction)
router.get("/findThisMonthTransaction", AuthMiddleware.auth, TransactionController.findThisMonthTransaction)
router.get("/findFutureTransaction", AuthMiddleware.auth, TransactionController.findFutureTransaction)

// category
router.post("/addCategory", AuthMiddleware.auth, upload.single("image"), CategoryController.addCategory)
router.get("/findCategory", AuthMiddleware.auth, CategoryController.findCategory)

// wallet
router.get("/findWalletByUserId", AuthMiddleware.auth, WalletController.findWalletByUserId)

router.use("/uploads", express.static(path.join(__dirname, "uploads")))

export default router