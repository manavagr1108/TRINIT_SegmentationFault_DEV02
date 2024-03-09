import { Document, ObjectId } from "mongoose";
import { Language } from "./interface";

interface PriceList {
    price: number,
    minutes: number;
}

interface LanguagePriceList {
    price: [PriceList]
    language: string;
    experience: number;
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
    languages: [LanguagePriceList],
    availableTimeZone: [string]
}
