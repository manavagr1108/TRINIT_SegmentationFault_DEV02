import express from "express";
import { getCurrentStudentDetails } from "../controllers/student.controller";
const studentRouter = express.Router();

studentRouter.get("/getDetails", getCurrentStudentDetails);

export default studentRouter;
