import express from "express";
import { getCurrentTutorDetails } from "../controllers/tutor.controller";
const tutorRouter = express.Router();

tutorRouter.get("/getDetails", getCurrentTutorDetails);

export default tutorRouter;
