import AuthRepository from "../repositories/authRepository.js";

async function tokenValidation (req, res, next) {
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer ", "")

    if (!token) {
        return res.sendStatus(401)
    }

    try {

        const userSession = await AuthRepository.checkSession(token)
        
        if (!userSession) {
            return res.sendStatus(401)
        }

        res.locals.session = userSession

        next()

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export default tokenValidation