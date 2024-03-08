import { Navigate } from "react-router";
import { StudentHome } from "../pages";

export const studentRoutes: RouteType[] = [
  {
    path: "/student/home",
    element: <StudentHome />,
    title: "Home",
    description: "Home page for student",
  },
  {
    path: "*",
    element: <Navigate to="/student/home" />,
    title: "Home",
    description: "Home page for students",
  },
];
