import AuthRepository from "../repositories/authRepository.js";
import bcrypt from "bcrypt";
import {v4 as uuid } from "uuid";

const authRepository = new AuthRepository()

export async function signUp (req, res) {
    const { name, email, password } = req.body

    try {

        const isRegistered = await authRepository.checkEmail(email)

        if (isRegistered) {
            return res.status(409).send("E-mail já cadastrado!")
        }

        await authRepository.signUp(name, email, password)

        return res.sendStatus(201)

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function signIn (req, res) {
    const { email, password } = req.body

    try {
        
        const isRegistered = await authRepository.checkEmail(email)

        if (!isRegistered) {
            return res.status(401).send("Usuário não encontrado!")
        }

        const userPassword = isRegistered.password
        const userId = isRegistered.id

        if (bcrypt.compareSync(password, userPassword)) {
            const token = uuid()

            await authRepository.signIn(token, userId)

            return res.status(200).send({token: token})
        }
        
        return res.status(401).send("Senha incorreta")
        
    } catch (error) {
        res.status(500).send(error.message)
    }
}
