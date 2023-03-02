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

export async function checkUrlById(req, res) {
    const { id } = req.params

    try {

        const isValid = await urlRepository.checkUrl(id)

        if (!isValid) {
            return res.sendStatus(404)
        }

        return res.status(200).send(isValid)
    
        
    } catch (error) {
        res.status(500).send(error.message)
    }
}