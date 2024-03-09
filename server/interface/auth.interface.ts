import { Request } from "express";
import { ObjectId } from "mongoose";

export interface RequestWithAuthenticatedStudent extends Request {
    studentId?: ObjectId;
}

export interface RequestWithAuthenticatedTutor extends Request {
    tutorId?: ObjectId;
}
