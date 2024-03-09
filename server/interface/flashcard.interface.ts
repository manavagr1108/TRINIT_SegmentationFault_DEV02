import { Document } from "mongoose";

export default interface FlashcardInterface extends Document {
    language: string;
    key: string;
    value: string;
}
