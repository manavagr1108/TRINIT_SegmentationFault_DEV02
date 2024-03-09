import express from "express";
import { orderForBookingTutor, paymentCallback } from "../controllers/payments.controller";
import { authenticateStudentToken } from "../utils/auth.middleware";
const studentRouter = express.Router();

studentRouter.post("/generateOrder", authenticateStudentToken, orderForBookingTutor);
studentRouter.post("/callback", paymentCallback);

export default studentRouter;
