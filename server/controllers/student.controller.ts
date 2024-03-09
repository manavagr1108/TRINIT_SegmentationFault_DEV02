import { RequestWithAuthenticatedStudent } from "../interface/auth.interface";
import { Response } from "express";
import { StudentModel } from "../models";
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
