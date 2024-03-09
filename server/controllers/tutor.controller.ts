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
