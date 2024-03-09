import express from "express";
import { getCurrentStudentDetails, searchTutor, updateProfile } from "../controllers/student.controller";
const studentRouter = express.Router();

studentRouter.get("/getDetails", getCurrentStudentDetails);
studentRouter.post("/updateProfile", updateProfile);
studentRouter.post("/searchTutor", searchTutor);

export default studentRouter;
