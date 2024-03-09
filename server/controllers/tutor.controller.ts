import { RequestWithAuthenticatedTutor } from "../interface/auth.interface";
import { Response } from "express";
import { TutorModel } from "../models";
import logger from "../utils/logger";

export const getCurrentTutorDetails = async (
    req: RequestWithAuthenticatedTutor,
    res: Response
) => {
    try {
        const tutor = await TutorModel.findById(req.tutorId);
        if (!tutor) {
            return res
                .cookie("isToken", "", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    path: "/",
                })
                .status(404)
                .json({ message: "Student doesn't exist" });
        }
        return res.status(200).json({ data: tutor });
    } catch (err: any) {
        logger.warn(
            JSON.stringify({
                message: err.message,
                trace: "getCurrentTutorDetails",
            })
        );
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const updateProfile = async (
    req: RequestWithAuthenticatedTutor,
    res: Response
) => {
    try {
        const student = await TutorModel.findById(req.tutorId);
        if (!student) {
            return res
                .cookie("isToken", "", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    path: "/",
                })
                .status(404)
                .json({ message: "Student doesn't exist" });
        }
        const { name, email, gender, age, languages, timezone } = req.body;
        if (email != student.email && name != student.name) {
            return res
                .status(403)
                .json({ message: "Email and name couldn't be changed" });
        }
        await TutorModel.findByIdAndUpdate(req.tutorId, {
            $set: {
                name: name,
                gender: gender,
                age: age,
                languages: languages || [],
                isProfileUpdated: true,
                availableTimeZone: timezone
            },
        });
        return res.status(200).json({ message: "Profile updated successfully" });
    } catch (err: any) {
        logger.warn(
            JSON.stringify({
                message: err.message,
                trace: "updateProfile",
            })
        );
        return res.status(500).json({ message: "Internal server error" });
    }
};
