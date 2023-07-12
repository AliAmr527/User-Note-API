import userModel from "../../../../DB/models/user.model.js"
import noteModel from "../../../../DB/models/note.model.js"
//schema
//firstName ,lastName ,userName, email , password ,age,gender, phone
export const getUser = async (req, res, next) => { //gets all users
    try {
        const users = await userModel.find().populate([{
            path: "notes"
        }])//select all from users
        return res.json({ message: "hello users!", users })
    } catch (error) {
        return res.json({ message: "error occured" })
    }
}

export const getUserProfile = async (req, res, next) => { //gets specific user with their notes
    try {
        const { id } = req.params
        const user = await userModel.findById(id).populate([{
            path: "notes"
        }])
        if (user) {
            return res.json({ message: "hello user!", user })
        }
        return res.json({ message: "user not found!" })
    } catch (error) {
        return res.json({ message: "error occured" })
    }
}

export const signUp = async (req, res, next) => { //function that simulates signing up
    try {
        const { firstName, lastName, userName, email, password, age, gender, phone } = req.body
        const users = await userModel.create({ firstName: firstName, lastName, userName, email, password, age, gender, phone })
        return res.json({ message: "done!", users })
    } catch (error) {
        if (error.code == 11000) { return res.json({ message: "this email or username already exists!" }) }
        return res.json({ message: "error occured!" })
    }
}

export const signIn = async (req, res, next) => { //function that simulates signing in
    try {
        const { userName, phone, email, password } = req.body
        //query for each type if we are signing in with email or username or password
        const q1 = await userModel.findOne({ email: email, password: password })
        const q2 = await userModel.findOne({ userName, password: password })
        const q3 = await userModel.findOne({ phone, password: password })
        if (q1 || q2 || q3) {
            return res.json({ message: "user signed-in successfully!" })
        }
        return res.json({ message: "In-Valid email or password!" })
    } catch (error) {
        return res.json({ message: "error occured!" })
    }
}

export const search1 = async (req, res, next) => { // search using like and less than
    try {
        const { searchKey } = req.params
        const { age } = req.params
        const users = await userModel.find({
            firstName: { "$regex": `^${searchKey}` },
            age: { $lt: age }
        })

        return res.json({ message: "done!", users })
    } catch (error) {
        return res.json({ message: "error occured!" })
    }
}

export const search2 = async (req, res, next) => { //search using between but between isnt a keyword so we work around it with (greater than and less than)
    try {
        const { age1 } = req.params
        const { age2 } = req.params
        console.log({ age1, age2 })
        console.log(age1, age2)
        const users = await userModel.find({
            age: { $gt: age1 },
            age: { $lt: age2 }
        })

        return res.json({ message: "done!", users })
    } catch (error) {
        return res.json({ message: "error occured!" })
    }
}

export const updateUser = async (req, res, next) => { //update user firstName, lastName and phone
    try {
        const { id } = req.params
        const { firstName, lastName, phone } = req.body

        const user = await userModel.updateOne({ _id: id }, { firstName, lastName, phone })
        return user.modifiedCount ? res.json({ message: "Done!", user }) : res.json({ message: "user does not exist" })
    } catch (error) {
        return res.json({ message: "error occured" })
    }
}

export const deleteUser = async (req, res, next) => { //udelete user and his notes with him
    try {
        const { id } = req.params

        const notes = await noteModel.deleteMany({ userId: id })
        const user = await userModel.deleteOne({ _id: id })

        return user.deletedCount ? res.json({ message: "Done!", user }) : res.json({ message: "user does not exist" })
    } catch (error) {
        return res.json({ message: "error occured" })
    }
}