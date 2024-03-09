import { Schema, model } from "mongoose";
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
});

const StudentModel = model<StudentInterface>("StudentModel", StudentSchema);

export default StudentModel;
