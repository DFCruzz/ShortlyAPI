import database from "../database/database.connection.js";

class UrlRepository {

    async urlShorten (url, shortUrl, userId) {

        const request = database.query(
            `INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3);`, [url, shortUrl, userId]
        )

        return request
    }

    async checkUrl (id) {
        const request = database.query(
            `SELECT (id, url, "shortUrl") FROM urls WHERE  id = $1;` [id]
        )

        return request.rows[0]
    }
}

export default UrlRepository