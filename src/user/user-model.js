import mongoose from "mongoose";
import { compareToHash } from "../utils/crypto.js";

const userSchema = new mongoose.Schema({
    username: {
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
    }
}, {timestamps: true});

userSchema.set("toJSON", {
    transform:(document, returnedObject) => {
        delete returnedObject.password;
    }
});

userSchema.methods.comparePassword = async function (password){
    return compareToHash(password, this.password);
}


export default mongoose.model("User", userSchema);