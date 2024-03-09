import express from "express";
import { getCurrentTutorDetails, updateProfile } from "../controllers/tutor.controller";
const tutorRouter = express.Router();

tutorRouter.get("/getDetails", getCurrentTutorDetails);
tutorRouter.post("/updateProfile", updateProfile);


export default tutorRouter;
