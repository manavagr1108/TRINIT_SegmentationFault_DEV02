import { Schema, Types, model } from "mongoose";
import { StudentInterface } from "../interface";

const StudentSchema = new Schema<StudentInterface>({
    name: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        default: "",
        unique: true,
        required: true,
    },
    isProfileUpdated: {
        type: Boolean,
        default: false
    },
    id: {
        type: String,
        default: ""
    },
    age: {
        type: Number,
        default: 0
    },
    gender: {
        type: String,
        default: ""
    },
    classesRegistered: {
        type: [Types.ObjectId],
        default: []
    },
    languages: {
        type: [
            { language: String, experience: String }
        ],
        default: []
    },
});

const StudentModel = model<StudentInterface>("StudentModel", StudentSchema);

export default StudentModel;
