const { PrismaClient } = require('@prisma/client');


const prismaClient = new PrismaClient({
    log: ["query"]
})

const createPost = async (req, res) => {
    try {
        const { title, description } = req.body;
        if(!title || !description) {
            return res.status(400).json({ message: "missing fields"})
        }

        const post = await prismaClient.post.create({
            data: {
                userId: req.user.id,
                title: title,
                description: description
            }
        })

        res.status(201).json({post, message: "post created successfully"})

    } catch (error) {
        console.log(error)
    }
}

const getPosts = async (req, res) => {
    try {
        const posts = await prismaClient.post.findMany({
            include: {
                comments:true,
                likes: true
            }
        })

        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({message: "couldn't fetch posts"})
    }
}



module.exports = {
    createPost,
    getPosts
}