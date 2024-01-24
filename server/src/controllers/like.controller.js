const { PrismaClient } = require('@prisma/client');

const prismaClient = new PrismaClient({
    log: ["query"]
});



const likePost = async (req, res) => {
    try {
        const postId = +req.params.id;

        // fetch post
        const post = await prismaClient.post.findFirst({
            where: { id: postId },
            include: {
                likes: true,
            }
        });

        console.log(post);

        // check if user already liked post
        const isLiked = post.likes.some((like) => like.userId === +req.user.id)
        
        console.log(isLiked);
        if (isLiked) {
            await prismaClient.like.delete({
                where: {
                    userId: +req.user.id,
                    postId: postId,
                }
            });
        }

        const like = await prismaClient.likePost.create({
            data: {
                userId: +req.user.id,
                postId: +req.params.id,

            },

        });

        res.status(200).json(like);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Problem liking post" });
    }
};

const likeComment = async (req, res) => {
    try {
        const commentId = +req.params.id;

        // fetch comment
        const comment = await prismaClient.comment.findFirst({
            where: { id: commentId },
            include: {
                likes: true
            }
        });

        // check if user already liked comment
        const isLiked = comment.likes.some(like => like.userId === +req.user.id);
        if (isLiked) {
            await prismaClient.like.delete({
                where: {
                    userId: +req.user.id,
                    commentId: commentId,
                }
            });
        }

        const like = await prismaClient.likeComment.create({
            data: {
                userId: +req.user.id,
                commentId: commentId,
            }
        });

        res.status(200).json(like);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Problem liking comment" });
    }
};

module.exports = {
    likeComment,
    likePost
};
