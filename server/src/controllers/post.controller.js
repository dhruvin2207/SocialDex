const { PrismaClient } = require('@prisma/client');


const prismaClient = new PrismaClient({
    log: ["query"]
})

const createPost = async (req, res) => {
    try {
        const { title, description } = req.body;
        console.log(req.body)
        if(!title || !description) {
            return res.status(400).json({ message: "missing fields"})
        }
        const postImage = req.file.filename

        // get the profile of person posting
        const posterProfile = await prismaClient.profile.findFirst({
            where: {
                userId: req.user.id
            }
        })


        const post = await prismaClient.post.create({
            data: {
                userId: req.user.id,
                title: title,
                description: description,
                userImage: posterProfile?.profileImage,
                postImage: `http://localhost:8000/posts/${postImage}`
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
                likes: true.value,
                user: true
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