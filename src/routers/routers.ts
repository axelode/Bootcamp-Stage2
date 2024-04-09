import UserController from "../controllers/UserController"
import TransactionController from "../controllers/TransactionController"
import CategoryController from "../controllers/CategoryController"
import WalletController from "../controllers/WalletController"

import * as express from "express"
import upload from "../middlewares/UploadMiddleware"
import AuthMiddleware from "../middlewares/AuthMiddleware"
import path from "path"

const router = express.Router()

// user
router.post("/register", UserController.register)
router.post("/login", UserController.login)

// transaction
router.post("/addTransaction", AuthMiddleware.auth, TransactionController.addTransaction)
router.get("/findTransactionByUserId", AuthMiddleware.auth, TransactionController.findTransactionByUserId)
router.get("/findLastMonthTransaction", AuthMiddleware.auth, TransactionController.findLastMonthTransaction)
router.get("/findThisMonthTransaction", AuthMiddleware.auth, TransactionController.findThisMonthTransaction)
router.get("/findFutureTransaction", AuthMiddleware.auth, TransactionController.findFutureTransaction)

// category
router.post("/addCategory", AuthMiddleware.auth, upload.single('image'), CategoryController.addCategory)
router.get("/findCategoryByUserId", AuthMiddleware.auth, CategoryController.findCategoryByUserId)

// wallet
router.get("/findWalletByUserId", AuthMiddleware.auth, WalletController.findWalletByUserId)

router.use("/uploads", express.static(path.join(__dirname, "uploads")))

export default router