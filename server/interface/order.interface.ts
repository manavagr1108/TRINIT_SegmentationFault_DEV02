import { Document, ObjectId } from "mongoose";
export default interface OrderInterface extends Document {
    razorpayOrderId: string;
    tutorId: ObjectId;
    price: number;
    studentId: ObjectId;
    language: string;
}
