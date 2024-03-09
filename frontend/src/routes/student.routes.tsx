import { Navigate } from "react-router";
import { StudentHome } from "../pages";
import UpdateStudentDetails from "../pages/Student/Home/UpdateStudentDetails";
import SearchTutor from "../pages/Student/Home/SearchTutor";

export const studentRoutes: RouteType[] = [
  {
    path: "/student/searchTutor",
    element: <StudentHome children={<SearchTutor />}></StudentHome>,
    title: "Home",
    description: "Home page for student",
  },
  {
    path: "/student/home",
    element: <StudentHome children={<UpdateStudentDetails />}></StudentHome>,
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
