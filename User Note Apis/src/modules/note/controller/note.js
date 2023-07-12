import noteModel from "../../../../DB/models/note.model.js"
import userModel from "../../../../DB/models/user.model.js"

export const getNote = async (req, res, next) => { //gets all notes
    try {
        const notes = await noteModel.find({})
        return res.json({ message: "hello note!", notes })
    } catch (error) {
        return res.json({ message: "error occured" })
    }
}

export const getNoteOrdered = async (req, res, next) => { //gets all notes but ordered DESC
    try {
        const notes = await noteModel.find({}).sort({ createdAt: -1 })
        return res.json({ message: "hello note!", notes })
    } catch (error) {
        return res.json({ message: "error occured" })
    }
}

export const getNoteswithUsers = async (req, res, next) => { //get all notes but populates it with users that are associated with their notes
    try {
        const notes = await noteModel.find({}).populate([{
            path: "userId"
        }])
        console.log()
        return res.json({ message: "hello note!", notes })
    } catch (error) {
        return res.json({ message: "error occured" })
    }
}

export const addNote = async (req, res, next) => { //adds a note but checks if user exists first!
    try {
        const { title, description, userId } = req.body

        const checkUser = await userModel.findById(userId)
        if (checkUser) {
            const note = await noteModel.create({ title, description, userId })

            const userById = await userModel.findById(userId);
            //this saves the note to the "notes" array in user schema
            userById.notes.push(note);
            await userById.save();

            return res.json({ message: "done!", note })
        }

        return res.json({ message: "this user doesnt exist!" })
    } catch (error) {
        return res.json({ message: "error occured" })
    }
}

export const deleteNote = async (req, res, next) => { //deletes note and at the same time deletes it from the array that the user has
    try {
        const { id } = req.params
        const { userId } = req.params
        console.log({ id }, { userId })

        const userById = await userModel.findById(userId);

        if (userById) {

            const notes = await noteModel.deleteOne({ _id: id })
            //to delete the note from the user notes array since they are not actually connected!!!
            const indexOfObject = userById.notes.indexOf(id) //gets index of this note in the notes array in users schema
            if (indexOfObject != -1) {
                userById.notes.splice(indexOfObject, 1) //splice deletes this note from the specific place in user schema
                await userById.save();
            }

            return notes.deletedCount ? res.json({ message: "Done!" }) : res.json({ message: "this note either does not exist or does not belond to this user" })
        }
        return res.json({ message: "user doesn't not exist!" })
    } catch (error) {
        return res.json({ message: "error occured" })
    }
}

export const updateNote = async (req, res, next) => { //update note
    try {
        const { id } = req.params
        const { userId } = req.params
        const { title, description } = req.body

        const userById = await userModel.findById(userId);

        if (userById) {
            const notes = await noteModel.updateOne({ _id: id }, { title, description })
            return notes.modifiedCount ? res.json({ message: "Done!", notes }) : res.json({ message: "this note either does not exist or does not belond to this user" })
        }
        return res.json({ message: "user doesn't not exist!" })
    } catch (error) {
        return res.json({ message: "error occured" })
    }
}

