import { Schema, Types, model } from "mongoose";

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: Types.ObjectId, ref: 'User', //to simulate a many to one relation between note and user
        required: true
    }
},
    {
        timestamps: true
    }
)

const noteModel = model('Note', noteSchema)
export default noteModel