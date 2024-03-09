import { Document } from "mongoose";
export default interface TutorInterface extends Document {
    email: string;
    name: string;
}
