import UrlRepository from "../repositories/urlRepository.js";
import { nanoid } from "nanoid";

const urlRepository = new UrlRepository()

export async function shorten(req, res) {
    const { url } = req.body
    const userId = res.locals.session.userId
    const shortUrl = nanoid(12)

    try {

        await urlRepository.urlShorten(url, shortUrl, userId)

        return res.status(201).send({ id, shortUrl })

    } catch (error) {
        res.status(500).send(error.message)
    }
}