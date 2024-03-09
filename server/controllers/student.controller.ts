import { RequestWithAuthenticatedStudent } from "../interface/auth.interface";
import { Response } from "express";
import { PaymentModel, SlotModel, StudentModel, TutorModel } from "../models";
import logger from "../utils/logger";
import { isValidObjectId } from "mongoose";

export const getCurrentStudentDetails = async (
    req: RequestWithAuthenticatedStudent,
    res: Response
) => {
    try {
        const student = await StudentModel.findById(req.studentId);
        if (!student) {
            return res
                .cookie("token", "", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    path: "/",
                })
                .status(404)
                .json({ message: "Student doesn't exist" });
        }
        return res.status(200).json({ data: student });
    } catch (err: any) {
        logger.warn(
            JSON.stringify({
                message: err.message,
                trace: "getCurrentStudentDetails",
            })
        );
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateProfile = async (
    req: RequestWithAuthenticatedStudent,
    res: Response
) => {
    try {
        const student = await StudentModel.findById(req.studentId);
        if (!student) {
            return res
                .cookie("token", "", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    path: "/",
                })
                .status(404)
                .json({ message: "Student doesn't exist" });
        }
        const { name, email, gender, age, languages } = req.body;
        if (email != student.email && name != student.name) {
            return res
                .status(403)
                .json({ message: "Email and name couldn't be changed" });
        }
        await StudentModel.findByIdAndUpdate(req.studentId, {
            $set: {
                name: name,
                gender: gender,
                age: age,
                languages: languages || [],
                isProfileUpdated: true,
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

export const searchTutor = async (
    req: RequestWithAuthenticatedStudent,
    res: Response
) => {
    try {
        const student = await StudentModel.findById(req.studentId);
        if (!student) {
            return res
                .cookie("token", "", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    path: "/",
                })
                .status(404)
                .json({ message: "Student doesn't exist" });
        }
        const { languages, experience, lowerPrice, upperPrice } = req.body;
        let query: any = {};
        if (languages.length > 0) {
            query.languages = {
                $elemMatch: {
                    language: { $in: languages }, experience: { $gte: experience },
                    price: {
                        $lte: upperPrice, $gte: lowerPrice
                    }
                }
            }
        } else {
            query.languages = {
                $elemMatch: {
                    experience: { $gte: experience },
                    price: {
                        $lte: upperPrice, $gte: lowerPrice
                    }
                }
            }
        }

        const tutors = await TutorModel.find(query);
        return res.status(200).json({ data: tutors });
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

export const fetchAllTutors = async (
    req: RequestWithAuthenticatedStudent,
    res: Response
) => {
    try {
        const student = await StudentModel.findById(req.studentId);
        if (!student) {
            return res
                .cookie("token", "", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    path: "/",
                })
                .status(404)
                .json({ message: "Student doesn't exist" });
        }
        const registeredTutors = await PaymentModel.find({
            studentId: req.studentId,
        });
        const data = await Promise.all(
            registeredTutors.map(async (elem) => {
                const user = await TutorModel.findOne({
                    _id: elem.tutorId,
                });

                if (user) {
                    return { user: user, language: elem.language };
                }
            })
        );
        const finalData = data.filter(
            (elem) => elem != null && elem != undefined
        );
        return res.status(200).json({ data: finalData });
    } catch (err: any) {
        logger.warn(
            JSON.stringify({
                message: err.message,
                trace: "fetchAllTutors",
            })
        );
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const fetchBookedTutorSlotsOfDate = async (req: RequestWithAuthenticatedStudent,
    res: Response
) => {
    try {
        const student = await StudentModel.findById(req.studentId);
        if (!student) {
            return res
                .cookie("token", "", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    path: "/",
                })
                .status(404)
                .json({ message: "Student doesn't exist" });
        }
        const { tutorId, date } = req.body;
        const newDate = new Date(date);
        if (!isValidObjectId(tutorId)) {
            return res.status(403).json({ message: "Invalid tutor id" });
        }
        if (new Date(date).toString() == new Date("Invalid Date").toString()) {
            return res.status(403).json({ message: "Invalid date" })
        }
        const tutorSlots = await SlotModel.find({ tutorId: tutorId, date: newDate });

        return res.status(200).json({ data: tutorSlots });
    } catch (err: any) {
        logger.warn(
            JSON.stringify({
                message: err.message,
                trace: "fetchTutorSlotsOfDate",
            })
        );
        return res.status(500).json({ message: "Internal server error" });
    }
};