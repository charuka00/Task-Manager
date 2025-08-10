import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: [true, 'First name is required'],
        trim: true
    },
    lastName: { 
        type: String, 
        required: [true, 'Last name is required'],
        trim: true
    },
    address: { 
        type: String, 
        required: [true, 'Address is required'],
        trim: true
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phoneNumber: { 
        type: String, 
        required: [true, 'Phone number is required'],
        trim: true
    },
    birthDate: { 
        type: Date, 
        required: [true, 'Birth date is required']
    },
    password: { 
        type: String, 
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    }
}, { 
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            delete ret.password;
            return ret;
        }
    }
});

export default mongoose.model("User", userSchema);