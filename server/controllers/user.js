import { errorMonitor } from "multer-gridfs-storage";
import User from "../models/User";

// READ


export const getUser =async(req,res)=>{
    try{
            const {id}=req.params;
            const user=await User.findById(id);
            res.status(200).json(user);

    }
    catch(err){
        res.status(404).json({message:err.message})
    }
}

export const getUserFriend = async(req,res)=>{
    try{
            const {id}=req.params;
            const user=await User.findById(id);
            const friends = await Promise.all(
                user.friend.map((id)=>User.findById(id))
            );
            const formattedFriends=friend.map(
               ( {
                _id,
                    firstName,
                    lastName,
                    location,
                    occupation,
                    picturePath
                })=>{
                    return {
                        _id,
                            firstName,
                            lastName,
                            location,
                            occupation,
                            picturePath
                        }
                }
            );
        res.status(200).json(formattedFriends);
    }
    catch(err){
        res.status(404).json({message:err.message})
    }
}