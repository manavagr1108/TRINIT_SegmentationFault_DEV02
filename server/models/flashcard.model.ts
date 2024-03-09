import { Schema, Types, model } from "mongoose";
import { FlashcardInterface } from "../interface";

const OrderSchema = new Schema<FlashcardInterface>({
    language: { type: String, default: '' },
    key: { type: String, default: "" },
    value: { type: String, default: "" }
})

const OrderModel = model<FlashcardInterface>("FlashcardModel", OrderSchema);

export default OrderModel;
