import { Schema, Types, model } from "mongoose";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    notes: [
        { type: Types.ObjectId, ref: 'Note' } //to simulate a one to many relation between user and note
    ]
},
    {
        timestamps: false
    }
)

const userModel = model('User', userSchema)
export default userModel