const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken')



const prismaClient = new PrismaClient({
    log: ["query"]
})

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if(!username || !password || !email) {
            return res.status(400).json({ message: "missing fields"});
        }

        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })
        if(user) {
            return res.status(400).json({status:"bad", message: "user already exists"});
        }
        // create a new user
        const newUser = await prismaClient.user.create({
            data: {
                email: email,
                username: username,
                password: bcrypt.hashSync(password, 10)
            }
        })

        return res.status(201).json({newUser, message: "User created successfully"})
    } catch (error) {
        res.status(500).json({ status:"bad", message:"Problem registering user"})
    }
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if(!password || !email) {
            return res.status(400).json({ message: "missing fields"});
        }
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            },
            include: {
                profile: true
            }
        })

        if(!user) {
            return res.status(404).json({status:"bad", message: "User not found. please register"});
        }

        // comapare password
        if(!password === bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({status:"bad", message: "wrong password"});
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRETE, { expiresIn: "24h"})
        res.status(200).json({token, user})


    } catch (error) {
        res.status(500).json({ status:"bad", message:"Problem login in user"})
    }
}

module.exports = {
    registerUser,
    loginUser
}