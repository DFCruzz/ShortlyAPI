import { Router } from "express";
import { getRankings, getUrls } from "../controllers/usersController.js";
import tokenValidation from "../middlewares/tokenValidation.js";

const userRouter = Router()

userRouter.get("/users/me", tokenValidation, getUrls)
userRouter.get("/ranking", getRankings)

export default userRouter