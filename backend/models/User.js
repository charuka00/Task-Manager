import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    birthDate: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("User", userSchema);