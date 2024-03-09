import dotenv from "dotenv";
dotenv.config({
    path: __dirname.replace("build", ".env"),
});
import config from "../config/config";

import { TutorModel } from "../models";
import connectDatabase from "../utils/connectDatabase";
const seederWorkshop = async () => {
    await connectDatabase(config.db, "mongodb://localhost:27017/");

    const languages = ["Spanish",
        "German",
        "Arabic",
        "Chinese",
        "Japanese",
        "Russian",
        "French",
        "English",
        "Hindi",
        "Korean",];
    const prices = [45, 60, 90];
    const experiences = [0, 1, 2];
    const availableTimeZones = ['Morning', 'Afternoon', 'Evening', 'Night'];

    for (let i = 0; i < 20; i++) {
        const randomLanguages = [];
        for (let j = 0; j < 3; j++) {
            const language = languages[Math.floor(Math.random() * languages.length)];
            const experience = experiences[Math.floor(Math.random() * experiences.length)];
            const randomPrices = prices.map(minutes => ({ minutes, price: Math.floor(Math.random() * 10000) }));

            randomLanguages.push({ language, experience, price: randomPrices });
        }


        const randomTimeZones = [];

        const timeZoneIndex = Math.floor(Math.random() * availableTimeZones.length);
        randomTimeZones.push(availableTimeZones[timeZoneIndex]);
        randomTimeZones.push(availableTimeZones[(timeZoneIndex + 1) % availableTimeZones.length]);

        const tutor = new TutorModel({
            name: `Tutor ${i + 1}`,
            email: `tutor${i + 1}@example.com`,
            age: Math.floor(Math.random() * 40) + 20, // Random age between 20 and 59
            gender: Math.random() < 0.5 ? 'Male' : 'Female',
            classesTaken: [], // You can populate this as needed
            availableTimeZone: randomTimeZones,
            languages: randomLanguages,
        });

        await tutor.save();
        console.log(`Tutor ${i + 1} created`);
    }
};

seederWorkshop();