import express from "express";
import dotenv from "dotenv";
dotenv.config({
    path: __dirname.replace("build", ".env"),
});
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDatabase from "./utils/connectDatabase";
import config from "./config/config";
import morgan from "morgan";
import { authRouter, studentRouter, tutorRouter } from "./routes/index.routes";
import {
    authenticateTokenTutor,
    authenticateStudentToken,
} from "./utils/auth.middleware";
connectDatabase(config.db);
const app = express();

// Neccessary Middlewares
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(cookieParser());
app.use(
    cors({
        origin: ["http://localhost:3000", process.env.FRONTEND_URL as string],
        credentials: true,
    })
);
app.use(express.json());
app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
);

// Routes
app.use("/auth", authRouter);
app.use("/student", authenticateStudentToken, studentRouter);
app.use("/tutor", authenticateTokenTutor, tutorRouter);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
