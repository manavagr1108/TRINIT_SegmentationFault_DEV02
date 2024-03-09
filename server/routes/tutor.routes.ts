import express from "express";
import {
    changeAprovalStatusOfMeet,
    fetchUpcomingSlots,
    getCurrentTutorDetails,
    getRegisteredUsers,
    toggleAutoApproval,
    updateProfile,
} from "../controllers/tutor.controller";
const tutorRouter = express.Router();

tutorRouter.get("/getDetails", getCurrentTutorDetails);
tutorRouter.post("/updateProfile", updateProfile);
tutorRouter.get("/registeredStudents", getRegisteredUsers);
tutorRouter.get("/getUpcomingClasses", fetchUpcomingSlots);
tutorRouter.get("/toggleAutoSubmit", toggleAutoApproval);
tutorRouter.post("/changeStatusMeet", changeAprovalStatusOfMeet);

export default tutorRouter;
