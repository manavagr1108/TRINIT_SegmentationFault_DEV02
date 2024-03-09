import { Document, ObjectId } from "mongoose";

export default interface SlotInterface extends Document {
    tutorId: ObjectId;
    studentId: ObjectId;
    language: string;
    date: Date;
    timezone: string;
    time: number;
}
