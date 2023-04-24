import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema 

const ItemSchema = new Schema({
    title: String,
    author: String,
    image: String,
    comment: String,
    email: String,
})

const UserSchema = new Schema({
    name: {
        type: String,
    },
    affiliation: {
        type: String,
    },
    twitter: {
        type: String,
    },
    instagram: {
        type: String,
    },
    github: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

export const ItemModel = mongoose.models.Item || mongoose.model("Item", ItemSchema)
export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema)