import { Document, ObjectId } from "mongoose";
export default interface StudentInterface extends Document {
    name: string;
    email: string;
    id:string;
    phoneNo:string;
    age:number;
    gender:string;
    classesRegistered:[ObjectId];
    isProfileUpdated:boolean;
}
