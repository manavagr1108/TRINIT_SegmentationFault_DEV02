import { Schema, Types, model } from "mongoose";
import { PaymentInterface } from "../interface";

const OrderSchema = new Schema<PaymentInterface>({
    razorpayPaymentId: {
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
    orderModelId: {
        type: Types.ObjectId,
        default: "",
        refs: "OrderModel"
    },
    language: {
        type: String,
        default: ""
    }
})

const PaymentModel = model<PaymentInterface>("PaymentModel", OrderSchema);

export default PaymentModel;
