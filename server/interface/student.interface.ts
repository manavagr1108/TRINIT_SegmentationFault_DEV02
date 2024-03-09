import { Document } from "mongoose";
export default interface StudentInterface extends Document {
    name: string;
    email: string;
}
