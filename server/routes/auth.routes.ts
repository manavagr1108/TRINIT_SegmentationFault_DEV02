import express from "express";
const authRouter = express.Router();

import {
    studentLoginGoogle,
    studentLogout,
    tutorLoginGoogle,
    tutorLogout,
} from "../controllers/auth.controller";

authRouter.get("/student/google", studentLoginGoogle);
authRouter.get("/tutor/google", tutorLoginGoogle);

authRouter.get("/student/logout", studentLogout);
authRouter.get("/tutor/logout", tutorLogout);

export default authRouter;
