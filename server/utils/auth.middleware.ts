import { verify } from "jsonwebtoken";
import { isValidObjectId } from "mongoose";
import { NextFunction, Response } from "express";
import {
    RequestWithAuthenticatedTutor,
    RequestWithAuthenticatedStudent,
} from "../interface/auth.interface";

export const authenticateStudentToken = (
    req: RequestWithAuthenticatedStudent,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies?.token;

    if (!token) {
        return res
            .status(401)
            .json({ message: "Authorization failed. No access token." });
    }

    verify(token, process.env.JWT_SECRET as string, (err: any, student: any) => {
        if (err || (student && (student.isTutor || !isValidObjectId(student.id)))) {
            return res
                .cookie("token", "", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    path: "/",
                })
                .status(401)
                .json({ message: "Invalid cookies" });
        }
        req.studentId = student.id;
        next();
    });
};

export const authenticateTokenTutor = (
    req: RequestWithAuthenticatedTutor,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies?.idToken;

    if (!token) {
        return res
            .status(401)
            .json({ message: "Authorization failed. No access token." });
    }

    verify(token, process.env.JWT_SECRET as string, (err: any, tutor: any) => {
        if (err || (tutor && (!tutor.isTutor || !isValidObjectId(tutor.id)))) {
            return res
                .cookie("idToken", "", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    path: "/",
                })
                .status(401)
                .json({ message: "Invalid cookies" });
        }
        req.tutorId = tutor.id;
        next();
    });
};
