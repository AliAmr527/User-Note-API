import * as userController from "./controller/user.js"

import { Router } from "express"
const router = Router()

//end points
router.get("/", userController.getUser)
router.get("/searchLike/:searchKey/:age", userController.search1)
router.get("/searchBetween/:age1/:age2", userController.search2)
router.post("/addUser", userController.signUp)
router.post("/signIn", userController.signIn)
router.put("/updateUser/:id", userController.updateUser)
router.delete("/deleteUser/:id", userController.deleteUser)
router.get("/getUserProfile/:id", userController.getUserProfile)

export default router