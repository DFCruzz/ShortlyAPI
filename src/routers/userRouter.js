import { Router } from "express";
import { getUrls } from "../controllers/usersController.js";
import tokenValidation from "../middlewares/tokenValidation.js";

const userRouter = Router()

userRouter.get("/users/me", tokenValidation, getUrls)

export default userRouter