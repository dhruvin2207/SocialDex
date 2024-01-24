const { PrismaClient } = require('@prisma/client');


const prismaClient = new PrismaClient({
    log: ["query"]
})

const createComment = async (req, res) => {
    try {
        const { content } = req.body;
        const postId = req.params.id
        console.log("POST_SI", postId)
        const comment = await prismaClient.comment.create({
            data: {
                userId: +req.user.id,
                postId: +postId,
                content: content
            }
        })

        res.status(200).json(comment)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message:"Problem commenting "})
    }
}

module.exports = { createComment}