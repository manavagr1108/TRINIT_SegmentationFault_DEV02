import { Document, ObjectId } from "mongoose";
import { Language } from "./interface";

interface PriceList {
    minutes: number;
    price: number;
}

export default interface TutorInterface extends Document {
    email: string;
    name: string;
    id: string;
    phoneNo: string;
    age: number;
    gender: string;
    classesTaken: [ObjectId];
    isProfileUpdated: boolean;
    languages: [Language],
    availableTimeZone: [string],
    prices: [PriceList],
}
