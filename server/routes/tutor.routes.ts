import express from "express";
import {
    fetchUpcomingSlots,
    getCurrentTutorDetails,
    getRegisteredUsers,
    updateProfile,
} from "../controllers/tutor.controller";
const tutorRouter = express.Router();

tutorRouter.get("/getDetails", getCurrentTutorDetails);
tutorRouter.post("/updateProfile", updateProfile);
tutorRouter.get("/registeredStudents", getRegisteredUsers);
tutorRouter.get("/getUpcomingClasses", fetchUpcomingSlots);

export default tutorRouter;
