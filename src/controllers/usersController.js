import UserRepository from "../repositories/userRepository.js";

const userRepository = new UserRepository()

export async function getUrls (req, res) {
    const userId = res.locals.session.userId

    try {
        
        const userUrls = await userRepository.getUserUrls(userId)

        res.status(200).send(userUrls.rows[0])

    } catch (error) {
        res.status(500).send(error.message)
    }
}