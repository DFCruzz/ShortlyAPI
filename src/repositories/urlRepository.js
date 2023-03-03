import database from "../database/database.connection.js";

class UrlRepository {

    async urlShorten (url, shortUrl, userId) {

        const request = database.query(
            `INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3);`, [url, shortUrl, userId]
        )

        return request
    }

    async partialCheckUrl (id) {
        const request = database.query(
            `SELECT (id, url, "shortUrl") FROM urls WHERE  id = $1;` [id]
        )

        return request.rows[0]
    }

    async checkShortUrl(url) {
        const request = database.query(
            `SELECT (id, "shortUrl") FROM urls WHERE url = $1;`, [url]
        )

        return request.rows[0]
    }

    async checkUrl (id) {
        const request = database.query(
            `SELECT * FROM urls WHERE  id = $1;` [id]
        )

        return request.rows[0]
    }

    async checkShortUrl (shortUrl) {
        const request = database.query(
            `SELECT * FROM urls WHERE "shortUrl = $1";` [shortUrl]
        )

        return request.rows[0]
    }

    async updateCount (visits, shortUrl) {
        const request = database.query(
            `UPDATE urls SET "visitCount = $1 WHERE "shortUrl = $2";` [visits, shortUrl]
        )

        return request
    }

    async deleteUrl (id) {
        const request = database.query(
            `DELETE FROM urls WHERE id = $1;`, [id]
        )

        return request
    }
}

export default UrlRepository