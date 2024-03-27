import UserController from "../controllers/UserController"
import * as express from "express"

const router = express.Router()

router.get("/users", UserController.find)
router.get("/user/:id", UserController.findById)
router.post("/addUser", UserController.addUser)
router.put("/updateUser/:id", UserController.updateUser)
router.delete("/deleteUser/:id", UserController.deleteUser)

export default router