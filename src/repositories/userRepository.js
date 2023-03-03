import database from "../database/database.connection.js";

class UserRepository {

    async getUserUrls(userId) {
        
        const request = database.query(
            `
                SELECT users.id, users.name, SUM (urls."visitCount") AS "visitCount",
                    JSON_AGG(
                        JSON_BUILD_OBJECT(
                            'id', urls.id,
                            'shortUrl', urls."shortUrl",
                            'url', urls.url,
                            'visitCount', urls."visitCount"
                        )
                    ) AS "shortenedUrls"
                FROM users JOIN urls ON users.id = urls."userId" WHERE users.id = $1 GROUP BY users.id;            
            `, [userId]
        )

        return request
    }
}

export default UserRepository