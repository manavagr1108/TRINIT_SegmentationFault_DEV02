import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
dotenv.config({
    path: __dirname.replace("build", ".env"),
});
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDatabase from "./utils/connectDatabase";
import config from "./config/config";
import morgan from "morgan";
import {
    authRouter,
    studentRouter,
    tutorRouter,
    paymentRouter,
} from "./routes/index.routes";
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
app.use("/payment", paymentRouter);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});

const io = new Server(8000, {
    cors: {
        origin: ["http://localhost:3000", process.env.FRONTEND_URL as string],
        credentials: true,
    },
});

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection", (socket) => {
    console.log(`Socket Connected`, socket.id);
    socket.on("room:join", (data) => {
        const { email, room } = data;
        console.log(email, room);
        emailToSocketIdMap.set(email, socket.id);
        socketidToEmailMap.set(socket.id, email);
        io.to(room).emit("user:joined", { email, id: socket.id });
        socket.join(room);
        io.to(socket.id).emit("room:join", data);
    });

    socket.on("user:call", ({ to, offer }) => {
        io.to(to).emit("incomming:call", { from: socket.id, offer });
    });

    socket.on("call:accepted", ({ to, ans }) => {
        io.to(to).emit("call:accepted", { from: socket.id, ans });
    });

    socket.on("peer:nego:needed", ({ to, offer }) => {
        console.log("peer:nego:needed", offer);
        io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
    });

    socket.on("peer:nego:done", ({ to, ans }) => {
        console.log("peer:nego:done", ans);
        io.to(to).emit("peer:nego:final", { from: socket.id, ans });
    });
});
