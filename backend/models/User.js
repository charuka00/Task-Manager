import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    email: { 
        type: String, required: true, unique: true, lowercase: true, trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
    },
    phoneNumber: { type: String, required: true, trim: true },
    birthDate: { type: Date, required: true },
    password: { type: String, required: true, minlength: 6 },
    isAdmin: { type: Boolean, default: false }
}, { 
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            delete ret.password;
            return ret;
        }
    }
});

export default mongoose.model("User", userSchema);
