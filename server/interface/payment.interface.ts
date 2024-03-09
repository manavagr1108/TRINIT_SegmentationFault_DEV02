import { Document, ObjectId } from "mongoose";
export default interface OrderInterface extends Document {
    orderModelId: ObjectId;
    razorpayPaymentId: string;
    tutorId: ObjectId;
    studentId: ObjectId;
    language: string;
}
