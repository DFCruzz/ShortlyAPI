import UrlRepository from "../repositories/urlRepository.js";
import { nanoid } from "nanoid";

const urlRepository = new UrlRepository()

export async function shorten(req, res) {
    const { url } = req.body
    const userId = res.locals.session.userId
    const shortUrl = nanoid(12)

    try {

        await urlRepository.urlShorten(url, shortUrl, userId)

        const result = await urlRepository.partialCheckShortUrl(url)

        return res.status(201).send(result.rows[0])

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function checkUrlById(req, res) {
    const { id } = req.params

    try {

        const isValid = await urlRepository.partialCheckUrl(id)

        if (!isValid) {
            return res.sendStatus(404)
        }

        return res.status(200).send(isValid)
    
        
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function urlRedirect(req, res) {
    const { shortUrl } = req.params

    try {
        
        const isValid = await urlRepository.checkShortUrl(shortUrl)

        if (!isValid) {
            return res.sendStatus(404)
        }

        const normalUrl = isValid.url
        const visits = isValid.visitCount + 1

        await urlRepository.updateCount(visits, shortUrl)

        res.redirect(normalUrl)

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function urlDelete(req, res) {
    const { id } = req.params
    const userId = res.locals.session.userId

    try {
        
        const isValid = await urlRepository.checkUrl(id)

        if (!isValid) {
            return res.sendStatus(404)
        }

        const urlUserId = isValid.userId

        if(urlUserId !== userId) {
            return res.sendStatus(401)
        }

        await urlRepository.deleteUrl(id)

        res.sendStatus(204)

    } catch (error) {
        res.status(500).send(error.message)
    }
}