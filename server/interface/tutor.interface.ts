import { Document, ObjectId } from "mongoose";

interface PriceList {
    minutes: number;
    price: number;
}

export default interface TutorInterface extends Document {
    email: string;
    name: string;
    id: string;
    age: number;
    gender: string;
    classesTaken: [ObjectId];
    isProfileUpdated: boolean;
    languages: [string],
    availableTimeZone: [string],
    prices: [PriceList],
}
