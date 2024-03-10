import express from "express";
import {
    bookSlots,
    fetchAllTutors,
    fetchBookedTutorSlotsOfDate,
    fetchFlashCards,
    fetchUpcomingSlots,
    generateChat1,
    generateChat3,
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
studentRouter.post("/tutorRecommendationAI", fetchFlashCards);
studentRouter.post("/fetchTutorDetailsAI", generateChat3);
studentRouter.post("/languageQuestionAnswerAI", generateChat1
);


export default studentRouter;
