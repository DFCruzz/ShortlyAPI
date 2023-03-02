import database from "../database/database.connection.js";
import bcrypt from "bcrypt";
class AuthRepository {

    async checkEmail(email) {

        const request = await database.query(
            `SELECT * FROM users WHERE email = $1;`, [email]
        )

        return request.rows[0]
    }

    async signUp(name, email, password) {

        const encryptedPassword = bcrypt.hashSync(password, 8) 

        const request = await database.query(
            `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, encryptedPassword]
        )

        return request
    }

    async signIn(token, userId) {

        const request = await database.query(
            `INSERT INTO auth (token, "userId") VALUES ($1, $2);`, [token, userId]
        )

        return request
    }

    async checkSession(token) {

        const request = await database.query(
            `SELECT * FROM auth WHERE token = $1;`, [token]
        )

        return request.rows[0]
    }
}

export default AuthRepository
