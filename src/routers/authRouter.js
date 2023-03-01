import { Router } from "express";
import { signUp } from "../controllers/authController.js";
import { signUpSchema, signInSchema } from "../schemas/authSchema.js";
import { validationSchema } from "../middlewares/validationSchema.js";

const authRouter = Router()

authRouter.post("/signup", validationSchema(signUpSchema), signUp)


export default authRouter