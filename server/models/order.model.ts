import { Schema, Types, model } from "mongoose";
import { OrderInterface } from "../interface";

const OrderSchema = new Schema<OrderInterface>({
    razorpayOrderId: {
        required: true,
        type: String,
        default: "",
        unique: true
    },
    tutorId: {
        type: Types.ObjectId,
        default: "",
        refs: "TutorModel"
    },
    studentId: {
        type: Types.ObjectId,
        default: "",
        refs: "StudentModel"
    },
    price: {
        type: Number,
        default: 5000
    },
    language: {
        type: String,
        default: ""
    }
})

const OrderModel = model<OrderInterface>("OrderModel", OrderSchema);

export default OrderModel;
