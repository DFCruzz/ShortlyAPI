import database from "../database/database.connection.js";

class UrlRepository {

    async urlShorten (url, shortUrl, userId) {

        const request = database.query(
            `INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3);`, [url, shortUrl, userId]
        )

        return request
    }
}

export default UrlRepository