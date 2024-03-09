import { Request, Response } from "express";
import {
    getGoogleStudent,
    getTokensGoogle,
    signToken,
} from "../utils/utils";
import { TutorModel, StudentModel } from "../models";

export const studentLoginGoogle = async (req: Request, res: Response) => {
    const code = req.query.code as string;
    if (!code || code.length == 0) {
        return res.status(401).json({ message: "Invalid code" });
    }
    try {
        const { id_token, access_token } = await getTokensGoogle(code, false);
        if (id_token === undefined || access_token === undefined) {
            return res
                .status(401)
                .json({
                    message: "Authorisation failed. Received invalid tokens",
                });
        }

        const studentDetails = await getGoogleStudent(id_token, access_token);
        if (studentDetails.status != 200) {
            return res
                .status(404)
                .json({ message: "Google student doesn't exist" });
        }

        let student = await StudentModel.findOne({ email: studentDetails.data.email });
        if (!student) {
            student = await StudentModel.create({
                email: studentDetails.data.email,
                name: studentDetails.data.name,
            });
            await student.save();
        }

        return res
            .cookie("token", signToken(student._id, false), {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                path: "/",
            })
            .status(200)
            .json({ data: student, message: "Logged in successfully" });
    } catch(err:any) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const tutorLoginGoogle = async (req: Request, res: Response) => {
    const code = req.query.code as string;
    if (!code || code.length == 0) {
        return res.status(401).json({ message: "Invalid code" });
    }
    try {
        const { id_token, access_token } = await getTokensGoogle(code, true);
        if (id_token === undefined || access_token === undefined) {
            return res
                .status(401)
                .json({
                    message: "Authorisation failed. Received invalid tokens",
                });
        }

        const tutorDetails = await getGoogleStudent(id_token, access_token);
        if (tutorDetails.status != 200) {
            return res
                .status(404)
                .json({ message: "Google student doesn't exist" });
        }

        const tutor = await TutorModel.findOneAndUpdate(
            { email: tutorDetails.data.email },
            { name: tutorDetails.data.name }
        );
        if (!tutor) {
            const newTutor = await TutorModel.create({
                email: tutorDetails.data.email,
                name: tutorDetails.data.name,
            });
            await newTutor.save();
            return res
                .cookie("token", signToken(newTutor._id, false), {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    path: "/",
                })
                .status(200)
                .json({ data: newTutor, message: "Logged in successfully" });
        }

        return res
            .cookie("idToken", signToken(tutor._id, true), {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                path: "/",
            })
            .status(200)
            .json({ data: tutor, message: "Logged in successfully" });
    } catch(err:any) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const studentLogout = (req: Request, res: Response) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1,
    })
        .status(200)
        .json({ message: "Logged out successfully" });
};

export const tutorLogout = (req: Request, res: Response) => {
    res.cookie("idToken", "", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1,
    })
        .status(200)
        .json({ message: "Logged out successfully" });
};
