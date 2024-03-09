import { RequestWithAuthenticatedStudent } from "../interface/auth.interface";
import { Response } from "express";
import { StudentModel, TutorModel } from "../models";
import logger from "../utils/logger";

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
                    language: { $in: languages }, experience: { $gte: experience }, price: {
                        $elemMatch: {
                            price: {
                                $lte: upperPrice, $gte: lowerPrice
                            }
                        }
                    }
                }
            }
        } else {
            query.languages = {
                $elemMatch: {
                    experience: { $gte: experience },
                    price: {
                        $elemMatch: {
                            price: {
                                $lte: upperPrice, $gte: lowerPrice
                            }
                        }
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