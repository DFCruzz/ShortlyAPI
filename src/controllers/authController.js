import AuthRepository from "../repositories/authRepository.js"

const authRepository = new AuthRepository()

export async function signUp (req, res) {
    const { name, email, password } = req.body

    try {

        const isRegistered = await authRepository.checkEmail(email)

        if (isRegistered.rowCount > 0) {
            return res.status(409).send("E-mail já cadastrado!")
        }

        await authRepository.signUp(name, email, password)

        return res.sendStatus(201)

    } catch (error) {
        res.status(500).send(error.message)
    }
}