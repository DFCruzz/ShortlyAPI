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

export async function getRankings(req, res) {

    try {
        
        const rankings = await userRepository.checkRanking()

        res.status(200).send(rankings.rows)

    } catch (error) {
        res.status(500).send(error.message)
    }
}