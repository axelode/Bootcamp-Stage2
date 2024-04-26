import * as express from "express"
import * as path from "path"

import AuthMiddleware from "../middlewares/AuthMiddleware"
import upload from "../middlewares/UploadMiddleware"

import AuthController from "../controllers/AuthController"
import UserController from "../controllers/UserController"
import FollowController from "../controllers/FollowController"
import ThreadController from "../controllers/ThreadController"
import RepliesController from "../controllers/RepliesController"
import LikeController from "../controllers/LikeController"

const router = express.Router()

// Auth
router.post("/register", AuthController.Register)
router.post("/login", AuthController.Login)
router.get("/check", AuthMiddleware.auth, AuthController.Check)
router.post("/logout", AuthController.Logout)

// User
router.get("/find_user/:page", AuthMiddleware.auth, UserController.FindUserAll)
router.get("/find_user_by_id/:user_id", AuthMiddleware.auth, UserController.FindUserById)
router.get("/find_user_by_name/:name", AuthMiddleware.auth, UserController.FindUserByName)
router.put("/update_profile/:id", AuthMiddleware.auth, UserController.UpdateProfile)
router.put("/update_profile_picture/:id", AuthMiddleware.auth, upload.single("image"), UserController.UpdateProfilePicture)
router.put("/update_password/:id", AuthMiddleware.auth, UserController.UpdatePassword)
router.get("/get_suggested_user", AuthMiddleware.auth, UserController.GetSuggestedUser)
router.delete("/delete_user/:id", AuthMiddleware.auth, UserController.DeleteUser)

// Follow
router.post("/follow/:following_id", AuthMiddleware.auth, FollowController.Follow)

// Thread
router.get("/find_threads/:page", ThreadController.FindThreadAll)
router.get("/find_thread_by_id/:thread_id", AuthMiddleware.auth, ThreadController.FindThreadById)
router.post("/add_thread/:id", AuthMiddleware.auth, upload.single("image"), ThreadController.AddThread)
router.put("/update_thread/:thread_id", AuthMiddleware.auth, upload.single("image"), ThreadController.UpdateThread)
router.delete("/delete_thread/:thread_id", AuthMiddleware.auth, ThreadController.DeleteThread)

// Replies
router.post("/add_replies/:thread_id", AuthMiddleware.auth, upload.single("image"), RepliesController.AddReplies)
router.put("/update_replies/:thread_id/:replies_id", AuthMiddleware.auth, upload.single("image"), RepliesController.UpdateReplies)
router.delete("/delete_replies/:replies_id", AuthMiddleware.auth, RepliesController.DeleteReplies)

// Like
router.post("/like/:thread_id", AuthMiddleware.auth, LikeController.Like)

// uploads
router.use("/uploads", express.static(path.join(__dirname, "uploads")))

export default router