import { Navigate } from "react-router-dom";
import {
  TutorLogin,
  GoogleCallbackTutor,
  GoogleCallbackStudent,
  StudentLogin,
} from "../pages";

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
    path: "*",
    element: <Navigate to="/auth/student" />,
    title: "Login",
    description: "Login page for Student",
  },
];
