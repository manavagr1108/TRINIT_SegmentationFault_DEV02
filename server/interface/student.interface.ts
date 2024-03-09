import { Document, ObjectId } from "mongoose";
import { Language } from "./interface";
export default interface StudentInterface extends Document {
    name: string;
    email: string;
    id:string;
    age:number;
    gender:string;
    classesRegistered:[ObjectId];
    isProfileUpdated:boolean;
    languages: [Language];
}
