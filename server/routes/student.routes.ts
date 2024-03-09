import express from "express";
import { getCurrentStudentDetails, updateProfile } from "../controllers/student.controller";
const studentRouter = express.Router();

studentRouter.get("/getDetails", getCurrentStudentDetails);
studentRouter.post("/updateProfile", updateProfile);
export default studentRouter;
