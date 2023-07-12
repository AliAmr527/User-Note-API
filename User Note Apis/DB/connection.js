import mongoose from "mongoose";

const connectDB = async () => {
    return await mongoose.connect(`mongodb://127.0.0.1:27017/week5assignment`).then(result => {
        console.log("connected to DB")
    }).catch(err => {
        console.log(`failed to connect to DB..... ${err}`)
    })
}

export default connectDB