
import { express } from "express";
import {getUser,getUserFriend,addRemoveFriend} from "../controllers/user.js"
import {verifyToken} from "../middleware/auth.js";

const router=express.Router();


router.get("/:id",verifyToken,getUser);
router.get("/:id/friends",verifyToken,getUserFriend);


router.patch("/:id/friendId",verifyToken,addRemoveFriend);

export default router;