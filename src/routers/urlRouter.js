import { Router } from "express";
import { shorten } from "../controllers/urlController.js";
import { urlSchema } from "../schemas/urlSchema.js";
import { validationSchema } from "../middlewares/validationSchema.js";
import tokenValidation from "../middlewares/tokenValidation.js";

const urlRouter = Router()

urlRouter.post("/urls/shorten", tokenValidation, validationSchema(urlSchema), shorten)

export default urlRouter