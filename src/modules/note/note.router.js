import * as noteController from "./controller/note.js"

import { Router } from "express"
const router = Router()

//end points
router.get("/", noteController.getNote)
router.get("/getNoteOrdered", noteController.getNoteOrdered)
router.get("/getNoteswithUsers", noteController.getNoteswithUsers)
router.post("/addNote", noteController.addNote)
router.delete("/deleteNote/:id/:userId", noteController.deleteNote)
router.put("/updateNote/:id/:userId", noteController.updateNote)

export default router