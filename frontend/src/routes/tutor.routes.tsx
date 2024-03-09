import { Navigate } from "react-router-dom";
import { TutorHome, TutorUpdateProfile } from "../pages";

export const tutorRoutes: RouteType[] = [
  {
    path: "/tutor/home",
    element: <TutorHome children={<TutorUpdateProfile />}></TutorHome>,
    title: "Home",
    description: "Home page for tutor",
  },
  {
    path: "*",
    element: <Navigate to="/tutor/home" />,
    title: "Home",
    description: "Home page for tutor",
  },
];
