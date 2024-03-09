import express from "express";
import {
    bookSlots,
    fetchAllTutors,
    fetchBookedTutorSlotsOfDate,
    fetchFlashCards,
    fetchUpcomingSlots,
    getCurrentStudentDetails,
    searchTutor,
    updateProfile,
} from "../controllers/student.controller";
const studentRouter = express.Router();

studentRouter.get("/getDetails", getCurrentStudentDetails);
studentRouter.post("/updateProfile", updateProfile);
studentRouter.post("/searchTutor", searchTutor);
studentRouter.get("/fetchTutors", fetchAllTutors);
studentRouter.post("/fetchTutorSlots", fetchBookedTutorSlotsOfDate);
studentRouter.post("/bookSlot", bookSlots);
studentRouter.get("/getUpcomingClasses", fetchUpcomingSlots);
studentRouter.post("/getFlashCards", fetchFlashCards);

export default studentRouter;
