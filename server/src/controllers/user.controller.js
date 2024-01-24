const { PrismaClient } = require('@prisma/client');
const path = require('path');


const prismaClient = new PrismaClient({
    log: ["query"]
})


const createProfile = async (req, res, next) => {
    try {
        const { username, bio, occupation, location, phone} = req.body;
        const profileImage = req.file.filename;

        const user = await prismaClient.user.findFirst({
            where: {
                id: req.user.id
            }
        })

        if(!user) {
            return res.status(400).json({ message:"User not found"})
        }

        let newProfile;

        const profile = await prismaClient.profile.findFirst({
            where: {
                userId: user.id,
            }
        }) 


        if(profile) {
          newProfile =   await prismaClient.profile.update({
                where: {
                    id: profile.id,
                },
                data: {
                    username: username,
                    bio: bio,
                    occupation: occupation,
                    location: location,
                    phone: phone,
                    profileImage: `http://localhost:8000/uploads/${profileImage}`   
                }
            })
        } else {
            newProfile = await prismaClient.profile.create({
                data: {
                    userId: user.id,
                    username: username,
                    bio: bio,
                    occupation: occupation,
                    location: location,
                    phone: phone,
                    profileImage: `http://localhost:8000/uploads/${profileImage}`   
                }
            })
        }

        res.status(201).json({ newProfile, message: "Profile updated successfully"})
  
    } catch (error) {
        res.status(500).json({ message: "problem creating profile", error})
        console.log(error)
    }
}


const getProfile = async (req, res) => {
    try {
        console.log(req.params.id)
        const profile = await prismaClient.profile.findFirstOrThrow({
            where: {
                userId: +req.params.id
            }
        })

        console.log("Profile: " + profile);

        res.status(200).json(profile)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "problem fetching profile"})
    }
}

module.exports = {
    createProfile,
    getProfile
}