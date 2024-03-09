import { Schema, Types, model } from "mongoose";
import { SlotInterface } from "../interface";

const TutorSchema = new Schema<SlotInterface>({
    studentId: { type: Types.ObjectId, default: "" },
    tutorId: { type: Types.ObjectId, default: "" },
    language: { type: String, default: "" },
    date: { type: Date, default: new Date() },
    // Have time in minutes. Any time of day will be represented as minutes
    startTime: { type: Number, default: 0 },
    endTime: { type: Number, default: 0 },
    code: { type: Number, default: 0 }
});

const TutorModel = model<SlotInterface>("SlotModel", TutorSchema);

export default TutorModel;
