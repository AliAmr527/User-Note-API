import userRouter from "./modules/user/user.router.js"
import noteRouter from "./modules/note/note.router.js"
import connectDB from "../DB/connection.js"

const bootstrap = (app, express) => {
    app.use(express.json())
    connectDB()
    app.use("/user", userRouter)
    app.use("/note", noteRouter)
    app.use("/*", (req, res) => {
        return res.json({ message: "invalid routing!" })
    })
}

export default bootstrap