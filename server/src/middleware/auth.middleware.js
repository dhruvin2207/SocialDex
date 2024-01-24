const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken')

const prismaClient = new PrismaClient({
    log: ["query"]
})

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        // very the token
        const verified = jwt.verify(token, process.env.JWT_SECRETE)
        const user = await prismaClient.user.findFirst({
            where: {
                id: verified.userId
            }
        })
        if(!user) {
            return res.status(400).json({ message: "Unauthrozed access"})
        }

        req.user = user

        next()
    } catch (error) {
        res.status(500).json({ message: "Unauthrozed access"})
    }
}

module.exports = {
    authMiddleware
}