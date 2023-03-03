import { Router } from "express";
import { checkUrlById, shorten, urlDelete, urlRedirect } from "../controllers/urlController.js";
import { urlSchema } from "../schemas/urlSchema.js";
import { validationSchema } from "../middlewares/validationSchema.js";
import tokenValidation from "../middlewares/tokenValidation.js";

const urlRouter = Router()

urlRouter.post("/urls/shorten", tokenValidation, validationSchema(urlSchema), shorten)
urlRouter.get("/urls/:id?", checkUrlById)
urlRouter.get("/urls/open/:shortUrl?", urlRedirect)
urlRouter.delete("/urls/:id?", tokenValidation, urlDelete)

export default urlRouter