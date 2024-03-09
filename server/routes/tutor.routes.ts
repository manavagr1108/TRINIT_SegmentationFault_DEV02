import express from "express";
import {
    getCurrentTutorDetails,
    getRegisteredUsers,
    updateProfile,
} from "../controllers/tutor.controller";
const tutorRouter = express.Router();

tutorRouter.get("/getDetails", getCurrentTutorDetails);
tutorRouter.post("/updateProfile", updateProfile);
tutorRouter.get("/registeredStudents", getRegisteredUsers);

export default tutorRouter;
