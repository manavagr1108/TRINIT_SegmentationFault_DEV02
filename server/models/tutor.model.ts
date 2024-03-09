import { Schema, Types, model } from "mongoose";
import { TutorInterface } from "../interface";

const TutorSchema = new Schema<TutorInterface>({
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
    classesTaken: {
        type: [Types.ObjectId],
        default: []
    },
    availableTimeZone: {
        type: [String],
        default: []
    },
    languages: {
        type: [
            { language: String, experience: String }
        ],
        default: []
    },
    prices: {
        type: [{ minutes: Number, price: Number }],
        default: []
    }
});

const TutorModel = model<TutorInterface>("TutorModel", TutorSchema);

export default TutorModel;
