import { model, Schema } from "mongoose";
import { TStudent } from "./student.interface";

const studentSchema = new Schema<TStudent>({
    name: {
        type: String,
        required: true,
        maxlength: 100,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/@/, 'Please fill a valid email address']
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/^\d{10}$/, 'Please fill a valid 10-digit phone number']
    },
    course: {
        type: String,
        required: true,
        trim: true
    },
});

export const Student = model<TStudent>('Student', studentSchema);