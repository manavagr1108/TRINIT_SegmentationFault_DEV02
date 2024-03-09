import { Schema, model } from "mongoose";
import { TutorInterface } from "../interface";

const TutorSchema = new Schema<TutorInterface>({
    email: {
        type: String,
        default: "",
        unique: true,
        required: true,
    },
    name: {
        type: String,
        default: "",
    },
});

const TutorModel = model<TutorInterface>("TutorModel", TutorSchema);

export default TutorModel;
