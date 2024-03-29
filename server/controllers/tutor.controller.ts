import { RequestWithAuthenticatedTutor } from "../interface/auth.interface";
import { Response } from "express";
import { PaymentModel, SlotModel, StudentModel, TutorModel } from "../models";
import logger from "../utils/logger";
import { isValidObjectId } from "mongoose";

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
        const { name, email, gender, age, languages } = req.body;
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
            },
        });
        return res
            .status(200)
            .json({ message: "Profile updated successfully" });
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

export const getRegisteredUsers = async (
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
        const registeredUsers = await PaymentModel.find({
            tutorId: req.tutorId,
        });
        const data = await Promise.all(
            registeredUsers.map(async (elem) => {
                const user = await StudentModel.findOne({
                    _id: elem.studentId,
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
                trace: "updateProfile",
            })
        );
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const fetchUpcomingSlots = async (
    req: RequestWithAuthenticatedTutor,
    res: Response
) => {
    try {
        const student = await TutorModel.findById(req.tutorId);
        if (!student) {
            return res
                .cookie("idToken", "", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    path: "/",
                })
                .status(404)
                .json({ message: "Student doesn't exist" });
        }
        const tutorSlots = await SlotModel.find({ tutorId: req.tutorId });
        const date = new Date(new Date().toDateString());
        const data = tutorSlots.map((val) => {
            if (new Date(val.date).getTime() >= date.getTime()) {
                return val;
            }
        });
        const finalData = data.filter(
            (elem) => elem != null && elem != undefined
        );
        const tutors = await Promise.all(
            finalData.map(async (slot) => {
                const tutor = await StudentModel.findOne({
                    _id: slot?.studentId,
                });
                return { student: tutor, slot: slot };
            })
        );
        const finalTutors = tutors.filter(
            (elem) => elem != undefined && elem.student != undefined
        );
        return res.status(200).json({ data: finalTutors });
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

export const toggleAutoApproval = async (req: RequestWithAuthenticatedTutor, res: Response) => {
    try {
        const student = await TutorModel.findById(req.tutorId);
        if (!student) {
            return res
                .cookie("idToken", "", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    path: "/",
                })
                .status(404)
                .json({ message: "Student doesn't exist" });
        }
        await TutorModel.findOneAndUpdate({ _id: student._id }, { $set: { isAutoApprovalOn: !student.isAutoApprovalOn } });
        return res.status(200).json({ message: "Auto approval turned " + (student.isAutoApprovalOn == false ? "on" : "off") });
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

export const changeAprovalStatusOfMeet = async (req: RequestWithAuthenticatedTutor, res: Response) => {
    try {
        const student = await TutorModel.findById(req.tutorId);
        if (!student) {
            return res
                .cookie("idToken", "", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    path: "/",
                })
                .status(404)
                .json({ message: "Student doesn't exist" });
        }
        const { slotId } = req.body;
        if (!isValidObjectId(slotId)) {
            return res.status(403).json({ message: "Slot id is invalid" });
        }
        const slotModel = await SlotModel.findOne({ _id: slotId, tutorId: req.tutorId });
        if (!slotModel) {
            return res.status(403).json({ message: "Slot not found" });
        }
        await SlotModel.findOneAndUpdate({ _id: slotModel._id }, { $set: { isApproved: !slotModel.isApproved } });
        return res.status(200).json({ message: "Slot has been " + (slotModel.isApproved == false ? "approved" : "rejected") });
    } catch (err: any) {
        logger.warn(
            JSON.stringify({
                message: err.message,
                trace: "fetchTutorSlotsOfDate",
            })
        );
        return res.status(500).json({ message: "Internal server error" });
    }
}
