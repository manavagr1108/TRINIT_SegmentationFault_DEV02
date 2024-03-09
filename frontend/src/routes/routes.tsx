import { Navigate } from "react-router-dom";
import {
  TutorLogin,
  GoogleCallbackTutor,
  GoogleCallbackStudent,
  StudentLogin,
  Home,
  StudentHome,
} from "../pages";
import UpdateStudentDetails from "../pages/Student/Home/UpdateStudentDetails";
import SearchTutor from "../pages/Student/Home/SearchTutor";

export const unprotectedRoutes: RouteType[] = [
  {
    path: "/auth/student",
    element: <StudentLogin />,
    title: "Login",
    description: "Login page for student",
  },
  {
    path: "/auth/student/callback/google",
    element: <GoogleCallbackStudent />,
    title: "Login",
    description: "Login page for students",
  },
  {
    path: "/auth/tutor",
    element: <TutorLogin />,
    title: "Tutor Login",
    description: "Login page for tutor",
  },
  {
    path: "/auth/tutor/callback/google",
    element: <GoogleCallbackTutor />,
    title: "Tutor Login",
    description: "Login page for tutor",
  },
  {
    path: "/home",
    element: <Home />,
    title: "Home Page",
    description: "Home page for users",
  },
  {
    path: "*",
    element: <Navigate to="/home" />,
    title: "Login",
    description: "Login page for users",
  },
];
